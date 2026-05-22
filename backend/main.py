from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from model import analyze, highlight_words

app = FastAPI(title="Sentiment Analysis API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextRequest(BaseModel):
    text: str

class BulkRequest(BaseModel):
    texts: List[str]

@app.get("/")
def root():
    return {"status": "running"}

@app.post("/analyze")
def analyze_text(req: TextRequest):
    if not req.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    result = analyze(req.text)
    result["highlights"] = highlight_words(req.text)
    return result

@app.post("/analyze-bulk")
def analyze_bulk(req: BulkRequest):
    if not req.texts:
        raise HTTPException(status_code=400, detail="No texts provided")
    results = []
    for text in req.texts[:100]:  # max 100 rows
        if text.strip():
            r = analyze(text)
            r["highlights"] = []
            results.append(r)
    return {"results": results}