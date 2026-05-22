# Sentiment Analysis Tool

A full-stack NLP application that analyzes text sentiment using a pre-trained RoBERTa transformer model.

## Features
- Detects Positive, Negative, and Neutral sentiment
- Word-level highlighting showing which words drove the result
- Bulk CSV upload to analyze up to 100 texts at once
- Live pie chart and confidence score visualization

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite + TailwindCSS + Recharts |
| Backend | Python + FastAPI |
| ML Model | HuggingFace Transformers (RoBERTa) |

## How to Run

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Then open http://localhost:5173

## Project Structure
```
Sentiment_Analysis/
├── backend/
│   ├── main.py        # FastAPI routes
│   ├── model.py       # ML model + word highlighting
│   └── requirements.txt
└── frontend/
    └── src/
        ├── App.jsx
        └── components/
            ├── TextInput.jsx
            ├── ResultCard.jsx
            ├── WordHighlight.jsx
            ├── SentimentChart.jsx
            └── CSVUpload.jsx
```