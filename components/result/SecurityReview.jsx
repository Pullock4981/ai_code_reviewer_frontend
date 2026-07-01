import CollapsibleSection from "../ui/CollapsibleSection";
import SeverityBadge from "../ui/SeverityBadge";

const riskColor = {
  NONE:     "text-green-600 bg-green-50",
  LOW:      "text-blue-600 bg-blue-50",
  MEDIUM:   "text-yellow-600 bg-yellow-50",
  HIGH:     "text-orange-600 bg-orange-50",
  CRITICAL: "text-red-600 bg-red-50",
};

export default function SecurityReview({ securityReview = {} }) {
  const { overallRisk = "NONE", findings = [] } = securityReview;

  return (
    <CollapsibleSection title="Security Review" icon="🔒" count={findings.length}>
      <div className="mt-2">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold mb-3 ${riskColor[overallRisk]}`}>
          Overall Risk: {overallRisk}
        </div>
        {findings.length === 0 ? (
          <p className="text-sm text-gray-400 italic">No security issues found.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {findings.map((f, i) => (
              <li key={i} className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <SeverityBadge level={f.severity} />
                  <span className="text-sm font-semibold text-gray-800">{f.type}</span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{f.description}</p>
                {f.remediation && (
                  <div className="bg-white border border-red-100 rounded p-2">
                    <p className="text-xs font-medium text-red-700 mb-0.5">🛠 Remediation</p>
                    <p className="text-xs text-gray-700">{f.remediation}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </CollapsibleSection>
  );
}
