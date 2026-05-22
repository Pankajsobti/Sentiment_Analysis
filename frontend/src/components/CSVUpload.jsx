import { useState } from "react";

export default function CSVUpload({ onResults, loading, setLoading }) {
  const [fileName, setFileName] = useState("");
  const [error, setError]   = useState("");

  function parseCSV(text) {
    return text
      .split("\n")
      .map((line) => line.replace(/^"|"$/g, "").trim())
      .filter((line) => line.length > 2);
  }

  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    setError("");
    setLoading(true);

    const text = await file.text();
    const texts = parseCSV(text);

    if (texts.length === 0) {
      setError("No valid text found in CSV. Make sure each row has text.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/analyze-bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texts: texts.slice(0, 100) }),
      });
      const data = await res.json();
      onResults(data.results);
    } catch {
      setError("Could not reach backend.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6 border-2 border-dashed border-gray-200 rounded-xl p-5 text-center hover:border-green-400 transition-colors">
      <p className="text-sm font-semibold text-gray-500 mb-1">Bulk analyze via CSV</p>
      <p className="text-xs text-gray-400 mb-3">One text per row, up to 100 rows</p>

      <label className="cursor-pointer inline-block bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-sm px-4 py-2 rounded-lg transition-colors">
        {loading ? "Analyzing..." : "Choose CSV file"}
        <input type="file" accept=".csv,.txt" onChange={handleFile} className="hidden" disabled={loading} />
      </label>

      {fileName && !error && (
        <p className="text-xs text-green-600 mt-2">✓ {fileName}</p>
      )}
      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
    </div>
  );
}