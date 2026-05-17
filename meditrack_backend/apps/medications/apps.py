from django.apps import AppConfig

class MedicationsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.medications"

    def ready(self):
        from . import signals  # noqa
