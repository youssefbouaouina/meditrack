from rest_framework import serializers
from .models import Medication, UserMedication

class MedicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medication
        fields = "__all__"

class UserMedicationSerializer(serializers.ModelSerializer):
    medication = MedicationSerializer()

    class Meta:
        model = UserMedication
        fields = "__all__"
        read_only_fields = ("user",)

    def create(self, validated_data):
        medication_data = validated_data.pop("medication")
        medication, _ = Medication.objects.get_or_create(
            barcode=medication_data.get("barcode"),
            defaults=medication_data
        )
        return UserMedication.objects.create(medication=medication, **validated_data)

    def update(self, instance, validated_data):
        medication_data = validated_data.pop("medication", None)
        if medication_data:
            for k, v in medication_data.items():
                setattr(instance.medication, k, v)
            instance.medication.save()
        return super().update(instance, validated_data)
