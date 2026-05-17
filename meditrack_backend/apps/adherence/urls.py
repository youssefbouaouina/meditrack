from rest_framework.routers import DefaultRouter
from .views import AdherenceLogViewSet

router = DefaultRouter()
router.register("adherence-logs", AdherenceLogViewSet, basename="adherence-logs")

urlpatterns = router.urls
