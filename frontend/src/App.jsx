import { useState } from "react";
import axios from "axios";
import TextInput   from "./components/TextInput";
import ResultCard  from "./components/ResultCard";
import WordHighlight from "./components/WordHighlight";
import SentimentChart from "./components/SentimentChart";
import CSVUpload   from "./components/CSVUpload";

const API_URL = "http://localhost:8000";

export default function App() {
  const [text, setText]           = useState("");
  const [result, setResult]       = useState(null);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [bulkResults, setBulkResults] = useState([]);

  async function handleAnalyze() {
    if (!text.trim()) return;
    setLoading(true);
    setError("");
    setBulkResults([]);
    try {
      const { data } = await axios.post(`${API_URL}/analyze`, { text });
      setResult(data);
    } catch {
      setError("Could not reach the backend. Make sure it's running on port 8000.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-2xl">

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-green-700">Sentiment Analysis</h1>
          <p className="text-gray-500 mt-2">
            Analyze text to discern sentiment — positive, negative, or neutral.
          </p>
        </div>

        <TextInput
          value={text}
          onChange={setText}
          onSubmit={handleAnalyze}
          loading={loading}
        />

        {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}

        {result && (
          <>
            <ResultCard result={result} />
            <WordHighlight highlights={result.highlights} />
          </>
        )}

        <CSVUpload
          onResults={setBulkResults}
          loading={loading}
          setLoading={setLoading}
        />

        {bulkResults.length > 0 && (
          <SentimentChart results={bulkResults} />
        )}

      </div>
    </div>
  );
}