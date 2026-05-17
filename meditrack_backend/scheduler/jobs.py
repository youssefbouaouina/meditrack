from django.utils import timezone
from datetime import timedelta
from django_apscheduler.models import DjangoJobExecution
from apps.adherence.models import AdherenceLog
from apps.medications.models import UserMedication
from datetime import datetime

def mark_missed_doses():
    now = timezone.now()
    AdherenceLog.objects.filter(status="upcoming", scheduled_time__lt=now).update(status="missed")

def generate_upcoming_logs():
    today = timezone.now().date()
    target_date = today + timedelta(days=7)
    for med in UserMedication.objects.filter(is_active=True):
        for time_str in med.schedule_times:
            try:
                hour, minute = map(int, time_str.split(":"))
            except ValueError:
                continue
            scheduled = timezone.make_aware(datetime.combine(target_date, datetime.min.time()).replace(hour=hour, minute=minute))
            exists = AdherenceLog.objects.filter(user_medication=med, scheduled_time=scheduled).exists()
            if not exists:
                AdherenceLog.objects.create(user_medication=med, scheduled_time=scheduled)

def cleanup_old_jobs():
    DjangoJobExecution.objects.filter(run_time__lt=timezone.now() - timedelta(days=7)).delete()
