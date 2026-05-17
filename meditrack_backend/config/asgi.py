import os
from django.core.asgi import get_asgi_application
from scheduler import start_scheduler

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
application = get_asgi_application()

if os.environ.get("RUN_MAIN") == "true":
    start_scheduler()
