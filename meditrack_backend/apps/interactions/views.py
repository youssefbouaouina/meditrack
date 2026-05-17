from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from .services import InteractionService

class DrugInteractionViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=["get"])
    def check(self, request):
        ids = request.query_params.get("ids", "")
        id_list = [int(i) for i in ids.split(",") if i.isdigit()]
        service = InteractionService()
        data = service.check_interactions(request.user, id_list)
        return Response(data)
