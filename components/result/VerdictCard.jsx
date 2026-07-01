import Link from "next/link";

const verdictStyle = {
  EXCELLENT:  { bg: "bg-green-50 border-green-300",  text: "text-green-700",  icon: "✅", bar: "bg-green-500" },
  GOOD:       { bg: "bg-blue-50 border-blue-300",    text: "text-blue-700",   icon: "👍", bar: "bg-blue-500"  },
  NEEDS_WORK: { bg: "bg-yellow-50 border-yellow-300",text: "text-yellow-700", icon: "⚠️", bar: "bg-yellow-400"},
  REDO:       { bg: "bg-red-50 border-red-300",      text: "text-red-700",    icon: "❌", bar: "bg-red-500"   },
};

export default function VerdictCard({ review }) {
  const v = review.overallVerdict || {};
  const s = verdictStyle[v.label] || verdictStyle.GOOD;
  const rawScore = v.score ?? 0;
  const score = Math.round((rawScore / 100) * 60);

  const renderJustification = (text) => {
    if (!text) return null;
    const lines = text.split('\n');
    let colorClass = 'text-gray-700';
    
    return (
      <div className="text-sm space-y-1">
        {lines.map((line, i) => {
          let cleanLine = line.replace(/\*\*/g, '').trim();
          if (!cleanLine) return null;
          
          let lower = cleanLine.toLowerCase();
          let isHeader = false;
          
          if ((lower.includes('good point') || lower.includes('positive') || lower.includes('valuable')) && cleanLine.length < 50) {
            colorClass = 'text-green-700';
            isHeader = true;
          } else if ((lower.includes('improvement') || lower.includes('bad point') || lower.includes('negative')) && cleanLine.length < 50) {
            colorClass = 'text-red-700';
            isHeader = true;
          }
          
          return (
            <p key={i} className={`${isHeader ? 'font-semibold mt-2 not-italic' : 'italic pl-2'} ${colorClass}`}>
              {cleanLine}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`rounded-xl border-2 p-5 ${s.bg}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{s.icon}</span>
          <div>
            <p className={`text-2xl font-bold ${s.text}`}>{v.label?.replace("_", " ")}</p>
            <p className="text-xs text-gray-500 mt-0.5">
              {review.language?.toUpperCase()} · {review.studentLevel} · {review.reviewDepth}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-4xl font-bold ${s.text}`}>{score}</p>
          <p className="text-xs text-gray-500">/60</p>
        </div>
      </div>

      {/* Score bar */}
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
        <div
          className={`h-full rounded-full transition-all ${s.bar}`}
          style={{ width: `${rawScore}%` }}
        />
      </div>

      {renderJustification(v.justification)}

      {review._id && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <Link
            href={`/review/${review._id}`}
            className="text-xs text-blue-600 hover:underline"
          >
            View full review page →
          </Link>
        </div>
      )}
    </div>
  );
}
