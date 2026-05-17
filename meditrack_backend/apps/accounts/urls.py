from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView, CurrentUserView, CustomTokenObtainPairView, LogoutView

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("login/", CustomTokenObtainPairView.as_view()),
    path("refresh/", TokenRefreshView.as_view()),
    path("logout/", LogoutView.as_view()),
    path("me/", CurrentUserView.as_view()),
]
