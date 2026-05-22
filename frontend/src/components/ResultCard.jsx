const colors = {
  POSITIVE: { bg: "bg-green-50", border: "border-green-400", text: "text-green-700", emoji: "😊" },
  NEGATIVE: { bg: "bg-red-50",   border: "border-red-400",   text: "text-red-700",   emoji: "😞" },
  NEUTRAL:  { bg: "bg-gray-50",  border: "border-gray-400",  text: "text-gray-700",  emoji: "😐" },
};

export default function ResultCard({ result }) {
  if (!result) return null;
  const c = colors[result.label] || colors.NEUTRAL;
  const pct = Math.round(result.score * 100);

  return (
    <div className={`mt-6 rounded-xl border-2 p-6 ${c.bg} ${c.border}`}>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-4xl">{c.emoji}</span>
        <div>
          <p className={`text-2xl font-bold ${c.text}`}>{result.label}</p>
          <p className="text-gray-500 text-sm">Confidence: {pct}%</p>
        </div>
      </div>

      {/* Confidence bar */}
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`h-3 rounded-full transition-all duration-700 ${
            result.label === "POSITIVE" ? "bg-green-500" :
            result.label === "NEGATIVE" ? "bg-red-500" : "bg-gray-500"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-4 text-gray-600 italic text-sm">"{result.text}"</p>
    </div>
  );
}