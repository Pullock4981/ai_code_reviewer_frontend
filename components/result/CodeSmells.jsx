import CollapsibleSection from "../ui/CollapsibleSection";

export default function CodeSmells({ codeSmells = [] }) {
  return (
    <CollapsibleSection title="Code Smells" icon="🧹" count={codeSmells.length}>
      {codeSmells.length === 0 ? (
        <p className="text-sm text-gray-400 italic py-2">No code smells detected.</p>
      ) : (
        <ul className="flex flex-col gap-2 mt-2">
          {codeSmells.map((s, i) => (
            <li key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded font-medium">
                  {s.type}
                </span>
                {s.location && (
                  <span className="text-xs text-gray-400">{s.location}</span>
                )}
              </div>
              <p className="text-sm text-gray-700">{s.description}</p>
            </li>
          ))}
        </ul>
      )}
    </CollapsibleSection>
  );
}
