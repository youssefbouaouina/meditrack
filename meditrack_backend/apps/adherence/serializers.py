from rest_framework import serializers
from .models import AdherenceLog
from apps.medications.serializers import UserMedicationSerializer

class AdherenceLogSerializer(serializers.ModelSerializer):
    user_medication = UserMedicationSerializer()

    class Meta:
        model = AdherenceLog
        fields = "__all__"
