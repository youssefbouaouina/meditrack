# MediTrack — Fullstack Medication Management Platform

MediTrack is a Django + React application that helps users manage medications, adherence logs, and drug interactions.

---

## ✅ Features
- Medication inventory management
- Barcode scanning via OpenFDA
- Weekly adherence calendar
- Drug interaction checking
- Low-stock alerts
- Light/Dark themes

---

## ✅ Requirements

Backend:
- Python 3.11+
- Django 4.2
- DRF
- SQLite (dev)

Frontend:
- React 18
- Vite 5
- TypeScript 5
- TailwindCSS

---

## ✅ Setup (Backend)

```bash
cd meditrack_backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Backend runs at: http://localhost:8000

---

## ✅ Setup (Frontend)

```bash
cd meditrack_frontend
npm install
npm run dev
```

Frontend runs at: http://localhost:5173

---

## ✅ Logo

Place the provided image file here:

```
meditrack_frontend/public/logo meditrack.png
```

If you used the Base64 export, decode it into the PNG file before running the app.

---

## ✅ Notes
- Ensure backend is running before frontend.
- JWT auth handles login/refresh/logout.
