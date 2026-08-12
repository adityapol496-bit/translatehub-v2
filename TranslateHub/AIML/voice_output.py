from gtts import gTTS
from playsound import playsound
import os
import uuid

def speak(text, lang="mr"):
    """
    Convert text to speech in the given language and play it.
    lang examples: 'en' (English), 'mr' (Marathi), 'hi' (Hindi)
    """
    print("Speaking:", text)

    try:
        tts = gTTS(text=text, lang=lang)
        filename = f"temp_{uuid.uuid4().hex}.mp3"
        tts.save(filename)
        playsound(filename)
        os.remove(filename)
    except Exception as e:
        print(f"Voice output error: {e}")


if __name__ == "__main__":
    text = input("Enter text to speak: ")
    lang = input("Language code (en/mr/hi/etc): ").strip() or "en"
    speak(text, lang)
