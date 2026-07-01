import CollapsibleSection from "../ui/CollapsibleSection";

const ratingColor = {
  EXCELLENT: "text-green-600",
  GOOD:      "text-blue-600",
  FAIR:      "text-yellow-600",
  POOR:      "text-red-600",
};

export default function PerformanceReview({ performanceReview = {} }) {
  const { overallRating = "GOOD", findings = [] } = performanceReview;

  return (
    <CollapsibleSection title="Performance Review" icon="⚡" count={findings.length}>
      <div className="mt-2">
        <p className={`text-sm font-bold mb-3 ${ratingColor[overallRating]}`}>
          Rating: {overallRating}
        </p>
        {findings.length === 0 ? (
          <p className="text-sm text-gray-400 italic">No performance issues found.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {findings.map((f, i) => (
              <li key={i} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-gray-800 mb-1">{f.description}</p>
                {f.impact && (
                  <p className="text-xs text-yellow-700 mb-1"><span className="font-medium">Impact:</span> {f.impact}</p>
                )}
                {f.suggestion && (
                  <p className="text-xs text-blue-700"><span className="font-medium">Fix:</span> {f.suggestion}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </CollapsibleSection>
  );
}
