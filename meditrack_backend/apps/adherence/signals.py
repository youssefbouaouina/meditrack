from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from django.db.models import F
from .models import AdherenceLog

@receiver(pre_save, sender=AdherenceLog, dispatch_uid="adherence_log_pre_save")
def store_previous_status(sender, instance, **kwargs):
    if instance.pk:
        old = AdherenceLog.objects.filter(pk=instance.pk).values_list("status", flat=True).first()
        instance._previous_status = old

@receiver(post_save, sender=AdherenceLog, dispatch_uid="decrement_stock_on_taken")
def decrement_stock_on_taken(sender, instance, **kwargs):
    previous = getattr(instance, "_previous_status", None)
    if instance.status == "taken" and previous != "taken":
        instance.user_medication.__class__.objects.filter(
            pk=instance.user_medication_id, stock_count__gt=0
        ).update(stock_count=F("stock_count") - 1)
