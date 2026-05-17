from django.db import models
from django.utils import timezone
from apps.medications.models import UserMedication

class AdherenceLog(models.Model):
    STATUS_CHOICES = [
        ("upcoming", "Upcoming"),
        ("taken", "Taken"),
        ("missed", "Missed"),
    ]
    user_medication = models.ForeignKey(
        UserMedication, on_delete=models.CASCADE, related_name="logs"
    )
    scheduled_time = models.DateTimeField()
    taken_at = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="upcoming")
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ["scheduled_time"]
        indexes = [
            models.Index(fields=["user_medication", "scheduled_time"]),
            models.Index(fields=["status"]),
        ]

    def mark_taken(self):
        self.status = "taken"
        self.taken_at = timezone.now()
        self.save()

    def __str__(self):
        return f"{self.user_medication} @ {self.scheduled_time}"
