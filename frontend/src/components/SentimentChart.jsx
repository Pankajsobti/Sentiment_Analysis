import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = {
  POSITIVE: "#22c55e",
  NEGATIVE: "#ef4444",
  NEUTRAL:  "#9ca3af",
};

export default function SentimentChart({ results }) {
  if (!results || results.length === 0) return null;

  const counts = results.reduce((acc, r) => {
    acc[r.label] = (acc[r.label] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(counts).map(([label, count]) => ({
    name: label,
    value: count,
  }));

  const avgScore = Math.round(
    (results.reduce((a, r) => a + r.score, 0) / results.length) * 100
  );

  return (
    <div className="mt-6 bg-white border border-gray-100 rounded-xl p-5">
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
        Bulk results — {results.length} texts analyzed
      </h2>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="w-full md:w-64 h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({name, value}) => `${name}: ${value}`}>
                {data.map((entry) => (
                  <Cell key={entry.name} fill={COLORS[entry.name] || "#ccc"} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => [`${v} texts`]} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 w-full space-y-2">
          {data.map((d) => (
            <div key={d.name} className="flex items-center gap-3">
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ background: COLORS[d.name] }}
              />
              <span className="text-sm text-gray-700 w-24">{d.name}</span>
              <div className="flex-1 bg-gray-100 rounded-full h-3">
                <div
                  className="h-3 rounded-full"
                  style={{
                    width: `${Math.round((d.value / results.length) * 100)}%`,
                    background: COLORS[d.name],
                  }}
                />
              </div>
              <span className="text-sm text-gray-500 w-10 text-right">
                {Math.round((d.value / results.length) * 100)}%
              </span>
            </div>
          ))}
          <p className="text-xs text-gray-400 pt-2">
            Avg confidence: {avgScore}%
          </p>
        </div>
      </div>

      {/* Results table */}
      <div className="mt-4 max-h-56 overflow-y-auto rounded-lg border border-gray-100">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="text-left px-3 py-2 text-gray-500 font-medium">#</th>
              <th className="text-left px-3 py-2 text-gray-500 font-medium">Text</th>
              <th className="text-left px-3 py-2 text-gray-500 font-medium">Sentiment</th>
              <th className="text-left px-3 py-2 text-gray-500 font-medium">Score</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-3 py-2 text-gray-400">{i + 1}</td>
                <td className="px-3 py-2 text-gray-700 max-w-xs truncate">{r.text}</td>
                <td className="px-3 py-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    r.label === "POSITIVE" ? "bg-green-100 text-green-700" :
                    r.label === "NEGATIVE" ? "bg-red-100 text-red-700" :
                    "bg-gray-100 text-gray-600"
                  }`}>
                    {r.label}
                  </span>
                </td>
                <td className="px-3 py-2 text-gray-500">{Math.round(r.score * 100)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}