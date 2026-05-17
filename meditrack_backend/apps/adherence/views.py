from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import AdherenceLog
from .serializers import AdherenceLogSerializer

class AdherenceLogViewSet(viewsets.ModelViewSet):
    serializer_class = AdherenceLogSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ["get", "patch", "head", "options"]

    def get_queryset(self):
        qs = AdherenceLog.objects.filter(
            user_medication__user=self.request.user
        ).select_related("user_medication__medication")
        start = self.request.query_params.get("start")
        end = self.request.query_params.get("end")
        if start:
            qs = qs.filter(scheduled_time__date__gte=start)
        if end:
            qs = qs.filter(scheduled_time__date__lte=end)
        return qs

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        status = request.data.get("status")
        if status not in ["taken", "missed"]:
            return Response({"detail": "Statut invalide."}, status=400)
        instance.status = status
        if status == "taken":
            instance.mark_taken()
        else:
            instance.save()
        return Response(self.get_serializer(instance).data)
