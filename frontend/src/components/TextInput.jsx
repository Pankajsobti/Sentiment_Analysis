export default function TextInput({ value, onChange, onSubmit, loading }) {
  return (
    <div className="w-full">
      <textarea
        className="w-full border border-gray-300 rounded-xl p-4 text-base resize-none focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[140px]"
        placeholder="Paste a customer review, tweet, or any text..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        onClick={onSubmit}
        disabled={loading || !value.trim()}
        className="mt-3 w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-semibold py-3 rounded-xl transition-colors"
      >
        {loading ? "Analyzing..." : "Analyze Sentiment"}
      </button>
    </div>
  );
}