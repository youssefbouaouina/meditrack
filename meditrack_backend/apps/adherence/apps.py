from django.apps import AppConfig

class AdherenceConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.adherence"

    def ready(self):
        from . import signals  # noqa
