# TranslateHub — Backend (Django)

Translation API backend for the TranslateHub frontend. Uses Google Translate
(via the free `deep-translator` library — no API key needed) and stores every
translation in SQLite for the History feature.

## Setup

```bash
# 1. Create and activate a virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # macOS/Linux

# 2. Install dependencies
pip install -r requirements.txt

# 3. Set up the database
python manage.py migrate

# 4. (Optional) create an admin login to view saved translations
python manage.py createsuperuser

# 5. Run the server
python manage.py runserver
```

The API will be live at **http://127.0.0.1:8000/**

## Endpoints

| Method | URL                       | Body                                                              | Description                        |
|--------|---------------------------|--------------------------------------------------------------------|-------------------------------------|
| POST   | `/api/translate/`         | `{ "text", "source_lang", "target_lang", "session_id"? }`         | Translates text, saves to history   |
| GET    | `/api/history/?session_id=` | —                                                                 | Returns the last 50 translations (for the logged-in user, or the given anonymous session) |
| POST   | `/api/history/clear/`     | `{ "session_id"? }`                                                | Deletes translation history         |
| POST   | `/api/auth/signup/`       | `{ "name", "email", "password" }`                                  | Creates an account and logs in      |
| POST   | `/api/auth/login/`        | `{ "email", "password" }`                                          | Logs in (session cookie)            |
| POST   | `/api/auth/logout/`       | —                                                                   | Logs out                            |
| GET    | `/api/auth/me/`           | —                                                                   | Returns the current logged-in user (or null) |
| GET/POST | `/api/auth/profile/`    | `{ "name", "phone", "preferred_lang" }` (POST only)                | View/update your profile — requires login |
| GET/POST | `/admin/`               | —                                                                  | Django admin (view saved data)      |

`source_lang` can be `"detect"` — the API treats that as auto-detect.

Login/Profile/History use a **session cookie**, so the frontend calls these
with `credentials: "include"` — that's already wired up in `script.js`.

## If you already had this backend running before (updating from an older version)

A new migration (`0002_userprofile_translation_user`) adds accounts/profiles.
Just run:
```bash
python manage.py migrate
```
again — your existing `db.sqlite3` and translation history are kept.

## Connecting the frontend

The frontend's `script.js` already points to:
```js
const API_BASE_URL = "http://localhost:8000/api";
```
Just make sure this backend is running on port 8000 while you use the
frontend's Live Server — CORS is already enabled for all origins in
development (`CORS_ALLOW_ALL_ORIGINS = True` in `settings.py`).

## Notes

- This uses **`deep-translator`**'s free Google Translate wrapper, so no
  Google Cloud billing/API key is required to get started. If you have an
  official Google Cloud Translation API key and want to use that instead,
  swap the translation call in `translator_app/views.py` for the
  `google-cloud-translate` client library.
- `DEBUG = True` and `SECRET_KEY` in `settings.py` are for local development
  only — change both before deploying anywhere public.
