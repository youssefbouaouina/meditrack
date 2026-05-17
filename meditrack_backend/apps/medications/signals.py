from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from datetime import datetime, timedelta
from .models import UserMedication
from apps.adherence.models import AdherenceLog

@receiver(post_save, sender=UserMedication, dispatch_uid="create_initial_adherence_logs")
def create_initial_adherence_logs(sender, instance, created, **kwargs):
    if not created:
        return
    now = timezone.now()
    logs = []
    for day_offset in range(0, 7):
        date = now.date() + timedelta(days=day_offset)
        if date < instance.start_date:
            continue
        if instance.end_date and date > instance.end_date:
            continue
        for time_str in instance.schedule_times:
            try:
                hour, minute = map(int, time_str.split(":"))
            except ValueError:
                continue
            scheduled = timezone.make_aware(datetime.combine(date, datetime.min.time()).replace(hour=hour, minute=minute))
            logs.append(AdherenceLog(user_medication=instance, scheduled_time=scheduled))
    AdherenceLog.objects.bulk_create(logs)
