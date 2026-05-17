from apscheduler.schedulers.background import BackgroundScheduler
from django_apscheduler.jobstores import DjangoJobStore
from .jobs import mark_missed_doses, generate_upcoming_logs, cleanup_old_jobs

scheduler = BackgroundScheduler()
scheduler.add_jobstore(DjangoJobStore(), "default")

def start_scheduler():
    if scheduler.running:
        return
    scheduler.add_job(mark_missed_doses, "cron", hour=0, minute=5, id="mark_missed_doses", replace_existing=True)
    scheduler.add_job(generate_upcoming_logs, "cron", hour=0, minute=10, id="generate_upcoming_logs", replace_existing=True)
    scheduler.add_job(cleanup_old_jobs, "cron", day_of_week="mon", hour=0, minute=0, id="cleanup_old_jobs", replace_existing=True)
    scheduler.start()
