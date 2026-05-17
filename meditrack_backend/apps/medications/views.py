from django.db import models
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import UserMedication
from .serializers import UserMedicationSerializer
from .services import OpenFDAService

class UserMedicationViewSet(viewsets.ModelViewSet):
    serializer_class = UserMedicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserMedication.objects.filter(
            user=self.request.user
        ).select_related("medication").order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=["get"])
    def stats(self, request):
        qs = self.get_queryset()
        total = qs.count()
        active = qs.filter(is_active=True).count()
        low_stock = qs.filter(stock_count__lte=models.F("stock_threshold")).count()
        critical = qs.filter(stock_count=0).count()
        return Response({
            "total_medications": total,
            "active_medications": active,
            "low_stock_count": low_stock,
            "critical_stock_count": critical,
        })

    @action(detail=False, methods=["post"])
    def scan(self, request):
        barcode = request.data.get("barcode")
        if not barcode:
            return Response({"detail": "Barcode requis."}, status=400)
        service = OpenFDAService()
        data = service.fetch_by_barcode(barcode)
        if not data:
            return Response({"detail": "Médicament introuvable."}, status=404)
        return Response(service.enrich_medication(data))
