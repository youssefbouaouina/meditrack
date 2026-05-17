from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/", include("apps.accounts.urls")),
    path("api/", include("apps.medications.urls")),
    path("api/", include("apps.adherence.urls")),
    path("api/", include("apps.interactions.urls")),
]
