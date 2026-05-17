import os
from django.core.wsgi import get_wsgi_application
from scheduler import start_scheduler

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
application = get_wsgi_application()

if os.environ.get("RUN_MAIN") == "true":
    start_scheduler()
