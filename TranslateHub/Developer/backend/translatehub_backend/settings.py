"""
Django settings for the TranslateHub backend project.
"""

import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# Load variables from a local .env file (if one exists) into the process
# environment. This lets you set EMAIL_HOST_USER / EMAIL_HOST_PASSWORD (and
# anything else) locally without typing "set"/"export" commands every time
# you open a new terminal. Safe to leave in place for deployment too — on
# Railway there's simply no .env file, so this line does nothing there.
try:
    from dotenv import load_dotenv
    load_dotenv(BASE_DIR / ".env")
except ImportError:
    pass  # python-dotenv not installed — fine, just skip .env loading

# ---------------------------------------------------------------------------
# SECURITY
# ---------------------------------------------------------------------------
# Locally this falls back to the placeholder below. On Render, set a real
# SECRET_KEY environment variable (Render can generate one for you).
SECRET_KEY = os.environ.get("SECRET_KEY", "django-insecure-change-this-key-before-deploying")

# Get this from Google Cloud Console → APIs & Services → Credentials
# (see AIML/README or chat instructions for the step-by-step)
GOOGLE_CLIENT_ID = "720295536236-em8fiaha72rmkb9dqpp08nv2hc0fv4ra.apps.googleusercontent.com"

# Locally this defaults to True. On Render, set DEBUG=False as an env var.
DEBUG = os.environ.get("DEBUG", "True") == "True"

# Comma-separated list, e.g. "translatehub-backend.onrender.com" on Render.
ALLOWED_HOSTS = os.environ.get("ALLOWED_HOSTS", "localhost,127.0.0.1").split(",")

# ---------------------------------------------------------------------------
# APPLICATIONS
# ---------------------------------------------------------------------------
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",
    "translator_app",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# Allow the frontend (Live Server locally, or your Netlify site once deployed)
# to call this API, and allow the session cookie (used for login) to be sent
# with those requests. NOTE: CORS_ALLOW_CREDENTIALS requires an explicit
# origin list — it cannot be combined with "allow all origins".
# On Render, set CORS_ALLOWED_ORIGINS to your Netlify URL, e.g.
# "https://your-site-name.netlify.app"
CORS_ALLOWED_ORIGINS = [
    o
    for o in os.environ.get(
        "CORS_ALLOWED_ORIGINS",
        "http://127.0.0.1:5500,http://localhost:5500,http://127.0.0.1:5501,http://localhost:5501",
    ).split(",")
    if o
]
CORS_ALLOW_CREDENTIALS = True

ROOT_URLCONF = "translatehub_backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "translatehub_backend.wsgi.application"

# ---------------------------------------------------------------------------
# DATABASE — SQLite, as used in the project report
# ---------------------------------------------------------------------------
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "Asia/Kolkata"
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STORAGES = {
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# ---------------------------------------------------------------------------
# EMAIL — sends the forgot-password OTP code.
# ---------------------------------------------------------------------------
# With no env vars set (local dev), OTPs are printed to the terminal instead
# of being emailed — handy for testing without a real mailbox.
#
# To send real emails (e.g. on Railway), set these two env vars using a
# Gmail account:
#   EMAIL_HOST_USER      = your Gmail address, e.g. yourname@gmail.com
#   EMAIL_HOST_PASSWORD  = a 16-character Gmail "App Password" — NOT your
#                          normal Gmail password. Generate one at:
#                          https://myaccount.google.com/apppasswords
#                          (requires 2-Step Verification to be turned on)
EMAIL_HOST_USER = os.environ.get("EMAIL_HOST_USER", "")
EMAIL_HOST_PASSWORD = os.environ.get("EMAIL_HOST_PASSWORD", "")

if EMAIL_HOST_USER and EMAIL_HOST_PASSWORD:
    EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
    EMAIL_HOST = os.environ.get("EMAIL_HOST", "smtp.gmail.com")
    EMAIL_PORT = int(os.environ.get("EMAIL_PORT", "587"))
    EMAIL_USE_TLS = True
    DEFAULT_FROM_EMAIL = f"TranslateHub <{EMAIL_HOST_USER}>"
else:
    EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
    DEFAULT_FROM_EMAIL = "TranslateHub <no-reply@translatehub.local>"
