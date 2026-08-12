import re

def preprocess_text(text):
    """
    Clean and preprocess input text.
    """

    # Remove leading and trailing spaces
    text = text.strip()

    # Remove multiple spaces
    text = re.sub(r'\s+', ' ', text)

    # Remove unwanted special characters
    text = re.sub(r'[^\w\s.,?!]', '', text)

    return text