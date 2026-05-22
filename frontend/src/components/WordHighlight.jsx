export default function WordHighlight({ highlights }) {
  if (!highlights || highlights.length === 0) return null;

  const colorMap = {
    positive: "bg-green-100 text-green-800 border border-green-300",
    negative: "bg-red-100 text-red-800 border border-red-400",
    neutral:  "bg-gray-100 text-gray-600 border border-gray-200",
  };

  return (
    <div className="mt-5">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
        Word-level breakdown
      </p>
      <div className="flex flex-wrap gap-2">
        {highlights.map((item, i) => (
          <span
            key={i}
            title={`${item.sentiment} (${Math.round(item.score * 100)}%)`}
            className={`px-2 py-1 rounded-md text-sm cursor-default transition-all hover:scale-105 ${colorMap[item.sentiment]}`}
          >
            {item.word}
          </span>
        ))}
      </div>
      <div className="flex gap-4 mt-3 text-xs text-gray-400">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-200 inline-block"/>positive</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-200 inline-block"/>negative</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-gray-200 inline-block"/>neutral</span>
      </div>
    </div>
  );
}