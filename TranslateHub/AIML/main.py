from voice_input import listen
from text_preprocessing import preprocess_text
from translator import translate_text
from voice_output import speak
from language_config import LANGUAGES

print("===== Speech-to-Speech Multilingual Translator =====")

while True:

    print("\n1. Type Text")
    print("2. Voice Input")

    choice = input("Select Option (1/2): ")

    source = input("Source Language: ").strip().title()
    target = input("Target Language: ").strip().title()

    if choice == "1":
        text = input("Enter Text: ")

    elif choice == "2":
        print("Speak Now...")
        text = listen()

        if text is None:
            continue

    else:
        print("Invalid Choice")
        continue

    clean_text = preprocess_text(text)

    translated = translate_text(clean_text, source, target)

    print("\nTranslated Text:")
    print(translated)

    target_code = LANGUAGES.get(target, "en")
    speak(translated, target_code)

    again = input("\nTranslate Again? (yes/no): ").lower()

    if again != "yes":
        break