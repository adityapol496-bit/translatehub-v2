# TranslateHub — Project Structure

```
TranslateHub/
│
├── AIML/                                → AI/ML (translation engine) part
│   └── README.md                          Explains the translation model used
│
├── Developer/                           → All development work
│   │
│   ├── frontend/                        → Client-side (what the user sees)
│   │   ├── index.html                     Page structure/markup
│   │   ├── script.js                      All UI logic + API calls to backend
│   │   ├── style.css                      Styling / theme
│   │   └── assets/
│   │       └── logo.svg                   App logo
│   │
│   ├── backend/                         → Server-side (Django REST API)
│   │   ├── manage.py                      Django's command-line utility
│   │   ├── requirements.txt               Python dependencies
│   │   ├── README.md                      Backend setup instructions
│   │   ├── translatehub_backend/          Django project settings
│   │   │   ├── settings.py
│   │   │   ├── urls.py
│   │   │   ├── asgi.py / wsgi.py
│   │   └── translator_app/                Main Django app
│   │       ├── models.py                  Database tables (ORM models)
│   │       ├── views.py                   API endpoints (translate/history/auth)
│   │       ├── urls.py                    App-level routing
│   │       ├── admin.py                   Django admin registration
│   │       └── migrations/                Database migration history
│   │
│   └── sql/                             → Database layer
│       └── schema.sql                     Raw SQL schema (tables, keys, indexes)
│
└── PROJECT_STRUCTURE.md                 → This file
```

## Part-wise breakdown

### 1. AIML Part
Handles the actual language translation using a pre-trained NMT (Neural
Machine Translation) model, accessed via the `deep-translator` library.
See `AIML/README.md` for full details.

### 2. Developer Part
Split into three clear layers:

| Layer | Technology | Responsibility |
|---|---|---|
| **Frontend** | HTML, CSS, JavaScript | UI, user interaction, calling the API |
| **Backend** | Python, Django | API endpoints, business logic, auth, connecting AIML to the database |
| **SQL** | SQLite | Persistent storage — users, sessions, translation history |

## How the parts connect
```
User → Frontend (script.js)
          │  fetch() call
          ▼
      Backend (views.py) ──► AIML (deep-translator / Google model)
          │
          ▼
      SQL Database (schema.sql tables)
```

1. User types text and picks languages → **Frontend**
2. Frontend calls `/api/translate/` → **Backend**
3. Backend sends text to the translation model → **AIML**
4. Backend saves the result → **SQL (Database)**
5. Translated text is returned and shown → **Frontend**
