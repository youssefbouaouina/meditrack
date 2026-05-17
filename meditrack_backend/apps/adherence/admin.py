from django.contrib import admin
from .models import AdherenceLog

@admin.register(AdherenceLog)
class AdherenceLogAdmin(admin.ModelAdmin):
    list_display = ("user_medication", "scheduled_time", "status")
    list_filter = ("status",)
