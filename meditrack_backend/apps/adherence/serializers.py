from rest_framework import serializers
from .models import AdherenceLog
from apps.medications.serializers import UserMedicationSerializer

class AdherenceLogSerializer(serializers.ModelSerializer):
    user_medication = UserMedicationSerializer(read_only=True)

    class Meta:
        model = AdherenceLog
        fields = "__all__"
        read_only_fields = ("user_medication", "scheduled_time", "taken_at")
