from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import datetime, timedelta

class Medication(models.Model):
    name = models.CharField(max_length=255)
    barcode = models.CharField(max_length=100, blank=True, unique=True, null=True)
    active_substance = models.CharField(max_length=255, blank=True)
    form = models.CharField(max_length=100, blank=True)
    manufacturer = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name

class UserMedication(models.Model):
    FREQUENCY_CHOICES = [
        ("once_daily", "Once daily"),
        ("twice_daily", "Twice daily"),
        ("three_times_daily", "Three times daily"),
        ("custom", "Custom"),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="medications")
    medication = models.ForeignKey(Medication, on_delete=models.CASCADE)
    dosage = models.CharField(max_length=100)
    frequency = models.CharField(max_length=50, choices=FREQUENCY_CHOICES)
    schedule_times = models.JSONField(default=list)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    stock_count = models.PositiveIntegerField(default=0)
    stock_threshold = models.PositiveIntegerField(default=7)
    is_active = models.BooleanField(default=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def get_next_dose(self):
        now = timezone.now()
        for day_offset in range(0, 7):
            date = now.date() + timedelta(days=day_offset)
            if self.end_date and date > self.end_date:
                break
            if date < self.start_date:
                continue
            for time_str in sorted(self.schedule_times):
                try:
                    hour, minute = map(int, time_str.split(":"))
                except ValueError:
                    continue
                dt = timezone.make_aware(datetime.combine(date, datetime.min.time()).replace(hour=hour, minute=minute))
                if dt > now:
                    return dt
        return None

    def is_low_stock(self):
        return self.stock_count <= self.stock_threshold

    def __str__(self):
        return f"{self.user.username} - {self.medication.name}"
