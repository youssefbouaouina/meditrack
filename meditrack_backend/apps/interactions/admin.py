from django.contrib import admin
from .models import DrugInteraction

@admin.register(DrugInteraction)
class DrugInteractionAdmin(admin.ModelAdmin):
    list_display = ("substance_a", "substance_b", "severity", "cached_at")
    list_filter = ("severity",)
