from rest_framework.routers import DefaultRouter
from .views import UserMedicationViewSet

router = DefaultRouter()
router.register("user-medications", UserMedicationViewSet, basename="user-medications")

urlpatterns = router.urls
