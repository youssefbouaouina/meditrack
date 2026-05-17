import requests
from django.utils import timezone
from django.conf import settings
from apps.medications.models import UserMedication
from .models import DrugInteraction

class InteractionService:
    CACHE_HOURS = 72

    def check_interactions(self, user, user_medication_ids: list[int]) -> list[dict]:
        meds = UserMedication.objects.filter(
            user=user, id__in=user_medication_ids
        ).select_related("medication")
        substances = [m.medication.active_substance for m in meds if m.medication.active_substance]
        pairs = self._get_pairs(substances)
        results = []

        for a, b in pairs:
            cached = DrugInteraction.objects.filter(substance_a=a, substance_b=b).first()
            if cached and not cached.is_expired():
                results.append({
                    "id": cached.id,
                    "substance_a": a,
                    "substance_b": b,
                    "severity": cached.severity,
                    "description": cached.description
                })
                continue
            data = self._fetch_from_openfda(a, b)
            if data:
                obj, _ = DrugInteraction.objects.update_or_create(
                    substance_a=a, substance_b=b,
                    defaults={
                        "severity": data["severity"],
                        "description": data["description"],
                        "cached_at": timezone.now()
                    }
                )
                results.append({
                    "id": obj.id,
                    "substance_a": a,
                    "substance_b": b,
                    "severity": obj.severity,
                    "description": obj.description
                })
        return results

    def _get_pairs(self, substances: list[str]) -> list[tuple]:
        from itertools import combinations
        return list(combinations(sorted(set(substances)), 2))

    def _fetch_from_openfda(self, substance_a: str, substance_b: str) -> dict | None:
        try:
            params = {"search": f"drug_interactions:{substance_a}+AND+drug_interactions:{substance_b}", "limit": 1}
            api_key = getattr(settings, "OPENFDA_API_KEY", None) or ""
            if api_key:
                params["api_key"] = api_key
            response = requests.get("https://api.fda.gov/drug/label.json", params=params, timeout=10)
            response.raise_for_status()
            results = response.json().get("results", [])
            if not results:
                return None
            description = results[0].get("drug_interactions", ["Interaction détectée."])[0]
            return {"severity": "moderate", "description": description}
        except requests.exceptions.RequestException:
            return None
