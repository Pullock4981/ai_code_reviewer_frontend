import CollapsibleSection from "../ui/CollapsibleSection";
import SeverityBadge from "../ui/SeverityBadge";

const typeColor = {
  LOGIC:        "bg-purple-50 border-purple-200",
  SYNTAX:       "bg-red-50 border-red-200",
  STYLE:        "bg-gray-50 border-gray-200",
  ARCHITECTURE: "bg-orange-50 border-orange-200",
  SECURITY:     "bg-red-50 border-red-200",
  PERFORMANCE:  "bg-yellow-50 border-yellow-200",
};

export default function IssuesList({ issues = [] }) {
  return (
    <CollapsibleSection title="Issues Found" icon="⚠️" count={issues.length} defaultOpen={issues.length > 0}>
      {issues.length === 0 ? (
        <p className="text-sm text-gray-400 italic py-2">No issues found. Great code!</p>
      ) : (
        <ul className="flex flex-col gap-3 mt-2">
          {issues.map((issue, i) => (
            <li key={i} className={`border rounded-lg p-3 ${typeColor[issue.type] || "bg-gray-50 border-gray-200"}`}>
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-sm font-semibold text-gray-800">{issue.title}</p>
                <div className="flex gap-1.5 shrink-0">
                  <SeverityBadge level={issue.severity} />
                  <span className="text-xs bg-white border border-gray-200 text-gray-500 px-2 py-0.5 rounded-full font-medium">
                    {issue.type}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-2">{issue.description}</p>
              {issue.lineNumbers?.length > 0 && (
                <p className="text-xs text-gray-500 mb-1">📍 Lines: {issue.lineNumbers.join(", ")}</p>
              )}
              {issue.suggestion && (
                <div className="bg-white border border-gray-200 rounded p-2 mt-2">
                  <p className="text-xs font-medium text-blue-700 mb-0.5">💡 Suggestion</p>
                  <p className="text-xs text-gray-700">{issue.suggestion}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </CollapsibleSection>
  );
}
