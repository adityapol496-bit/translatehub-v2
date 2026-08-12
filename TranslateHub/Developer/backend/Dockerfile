FROM python:3.13-slim

# tesseract-ocr is the system-level OCR engine that the pytesseract
# Python package calls out to. Without this, the photo-translate
# feature fails with "tesseract is not installed or it's not in your PATH".
RUN apt-get update \
    && apt-get install -y --no-install-recommends tesseract-ocr \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Runs migrations + collects static files on every deploy, then starts
# the app server. $PORT is provided by Railway at runtime.
CMD python manage.py migrate --no-input && \
    python manage.py collectstatic --no-input && \
    gunicorn translatehub_backend.wsgi --bind 0.0.0.0:${PORT:-8000}
