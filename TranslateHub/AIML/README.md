# AIML Part — Speech-to-Speech Multilingual Translator

## Overview
This is the AI/ML component of TranslateHub — a standalone Python script
that translates speech or text between 38+ languages using a pre-trained
Neural Machine Translation (NMT) model, accessed via the Google Translate
API (through the `deep-translator` library). It also supports voice input
and voice output, making it a full speech-to-speech pipeline.

## How it works — pipeline
```
User Input (voice or text)
        │
        ▼
voice_input.py  ──►  speech_recognition converts speech to text
        │
        ▼
text_preprocessing.py  ──►  cleans text (removes extra spaces, symbols)
        │
        ▼
translator.py  ──►  sends text to Google's pre-trained NMT model
        │
        ▼
voice_output.py  ──►  pyttsx3 converts translated text back to speech
```

## Files
| File | Purpose |
|---|---|
| `main.py` | Entry point — runs the interactive translator loop (text or voice input) |
| `translator.py` | Calls the pre-trained translation model (`GoogleTranslator`) |
| `language_config.py` | Maps 38+ language names to their language codes |
| `text_preprocessing.py` | Cleans/normalizes input text before translation |
| `voice_input.py` | Converts spoken audio to text using `speech_recognition` |
| `voice_output.py` | Converts translated text to speech using `pyttsx3` |
| `requirements.txt` | Python dependencies for this part |

## How to run standalone
```bash
cd AIML
pip install -r requirements.txt
python main.py
```
Then choose:
- **Option 1** — type text to translate
- **Option 2** — speak into your microphone

Enter the source and target language (e.g. `English`, `Hindi`, `Marathi`)
and the translated text will be printed and spoken aloud.

## Supported languages
38+ languages including English, Hindi, Marathi, Gujarati, Bengali,
Punjabi, Tamil, Telugu, Kannada, Malayalam, Urdu, French, German,
Spanish, Japanese, Chinese, Arabic, and more (full list in
`language_config.py`).

## Relationship to the Developer part
This AIML script is the standalone/offline version of the same
translation logic that is integrated into the Django backend at
`Developer/backend/translator_app/views.py`. Both use the same
underlying approach — a pre-trained NMT model accessed via
`deep-translator` — but this AIML folder additionally demonstrates
voice input/output, which the web app does not currently include.
