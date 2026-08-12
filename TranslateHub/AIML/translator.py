from deep_translator import GoogleTranslator
from language_config import LANGUAGES

def translate_text(text, source_language, target_language):
    try:
        source_language = source_language.strip().title()
        target_language = target_language.strip().title()

        source_code = LANGUAGES[source_language]
        target_code = LANGUAGES[target_language]

        translated = GoogleTranslator(
            source=source_code,
            target=target_code
        ).translate(text)

        return translated

    except KeyError:
        return "Invalid Language Name!"

    except Exception as e:
        return f"Translation Error: {e}"


if __name__ == "__main__":
    text = input("Enter Text: ")

    source = input("Source Language: ").strip().title()
    target = input("Target Language: ").strip().title()

    result = translate_text(text, source, target)

    print("\nTranslated Text:")
    print(result)