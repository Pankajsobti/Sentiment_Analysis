from transformers import pipeline

sentiment_pipeline = pipeline(
    "sentiment-analysis",
    model="cardiffnlp/twitter-roberta-base-sentiment-latest"
)

# Separate pipeline for word-level scoring
word_pipeline = pipeline(
    "sentiment-analysis",
    model="cardiffnlp/twitter-roberta-base-sentiment-latest",
    truncation=True
)

LABEL_MAP = {
    "positive": "POSITIVE",
    "negative": "NEGATIVE",
    "neutral":  "NEUTRAL",
}

def analyze(text: str) -> dict:
    result = sentiment_pipeline(text[:512])[0]
    label = LABEL_MAP.get(result["label"].lower(), result["label"])
    return {
        "label": label,
        "score": round(result["score"], 4),
        "text":  text,
    }

def highlight_words(text: str) -> list:
    words = text.split()
    if len(words) > 30:
        words = words[:30]  # limit for speed
    highlighted = []
    for word in words:
        clean = word.strip(".,!?\"'")
        if len(clean) < 3:
            highlighted.append({"word": word, "sentiment": "neutral", "score": 0.5})
            continue
        try:
            res = word_pipeline(clean[:50])[0]
            label = LABEL_MAP.get(res["label"].lower(), "neutral")
            highlighted.append({
                "word": word,
                "sentiment": label.lower(),
                "score": round(res["score"], 3)
            })
        except:
            highlighted.append({"word": word, "sentiment": "neutral", "score": 0.5})
    return highlighted