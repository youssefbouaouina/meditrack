from rest_framework import serializers
from .models import DrugInteraction

class DrugInteractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrugInteraction
        fields = "__all__"
