import requests
from django.conf import settings

class OpenFDAService:
    BASE_URL = "https://api.fda.gov/drug"

    def fetch_by_barcode(self, barcode: str) -> dict | None:
        try:
            params = {"search": f"openfda.upc:{barcode}", "limit": 1}
            api_key = getattr(settings, "OPENFDA_API_KEY", None) or ""
            if api_key:
                params["api_key"] = api_key
            response = requests.get(f"{self.BASE_URL}/ndc.json", params=params, timeout=10)
            response.raise_for_status()
            data = response.json()
            if not data.get("results"):
                return None
            return data["results"][0]
        except requests.exceptions.RequestException:
            return None

    def enrich_medication(self, data: dict) -> dict:
        openfda = data.get("openfda", {})
        return {
            "name": data.get("brand_name") or data.get("generic_name") or "Médicament inconnu",
            "barcode": (openfda.get("upc") or [None])[0],
            "active_substance": (openfda.get("substance_name") or [""])[0],
            "form": (openfda.get("dosage_form") or [""])[0],
            "manufacturer": (openfda.get("manufacturer_name") or [""])[0],
        }
