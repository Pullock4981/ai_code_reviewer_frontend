import CollapsibleSection from "../ui/CollapsibleSection";

export default function PositiveFindings({ findings = [] }) {
  return (
    <CollapsibleSection title="Positive Findings" icon="✅" count={findings.length} defaultOpen={true}>
      {findings.length === 0 ? (
        <p className="text-sm text-gray-400 italic py-2">No positive findings recorded.</p>
      ) : (
        <ul className="flex flex-col gap-3 mt-2">
          {findings.map((f, i) => (
            <li key={i} className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm font-semibold text-green-800">{f.title}</p>
              <p className="text-sm text-green-700 mt-0.5">{f.description}</p>
              {f.lineNumbers?.length > 0 && (
                <p className="text-xs text-green-500 mt-1">Lines: {f.lineNumbers.join(", ")}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </CollapsibleSection>
  );
}
