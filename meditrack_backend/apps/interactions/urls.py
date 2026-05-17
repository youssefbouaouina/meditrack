from rest_framework.routers import DefaultRouter
from .views import DrugInteractionViewSet

router = DefaultRouter()
router.register("interactions", DrugInteractionViewSet, basename="interactions")

urlpatterns = router.urls
