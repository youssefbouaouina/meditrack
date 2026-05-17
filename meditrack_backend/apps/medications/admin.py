from django.contrib import admin
from .models import Medication, UserMedication

@admin.register(Medication)
class MedicationAdmin(admin.ModelAdmin):
    list_display = ("name", "active_substance", "form", "manufacturer")
    search_fields = ("name", "barcode")

@admin.register(UserMedication)
class UserMedicationAdmin(admin.ModelAdmin):
    list_display = ("user", "medication", "dosage", "frequency", "stock_count", "is_active")
    list_filter = ("is_active", "frequency")
