import speech_recognition as sr

def listen():
    recognizer = sr.Recognizer()

    with sr.Microphone() as source:
        print("🎤 Speak Now...")

        recognizer.adjust_for_ambient_noise(source)

        audio = recognizer.listen(source)

    try:
        text = recognizer.recognize_google(audio)
        print("You Said:", text)
        return text

    except sr.UnknownValueError:
        print("Sorry, I could not understand your voice.")
        return None

    except sr.RequestError:
        print("Internet Connection Error!")
        return None


if __name__ == "__main__":
    listen()