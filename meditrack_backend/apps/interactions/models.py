from django.db import models
from django.utils import timezone
from datetime import timedelta

class DrugInteraction(models.Model):
    SEVERITY_CHOICES = [
        ("low", "Low"),
        ("moderate", "Moderate"),
        ("high", "High"),
    ]
    substance_a = models.CharField(max_length=255)
    substance_b = models.CharField(max_length=255)
    severity = models.CharField(max_length=20, choices=SEVERITY_CHOICES)
    description = models.TextField()
    cached_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ["substance_a", "substance_b"]
        ordering = ["-cached_at"]

    def is_expired(self):
        return timezone.now() > self.cached_at + timedelta(hours=72)

    def __str__(self):
        return f"{self.substance_a} + {self.substance_b}"
