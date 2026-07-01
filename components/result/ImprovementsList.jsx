import CollapsibleSection from "../ui/CollapsibleSection";

export default function ImprovementsList({ improvements = [] }) {
  return (
    <CollapsibleSection title="Improvements" icon="💡" count={improvements.length}>
      {improvements.length === 0 ? (
        <p className="text-sm text-gray-400 italic py-2">No improvements suggested.</p>
      ) : (
        <ul className="flex flex-col gap-3 mt-2">
          {improvements.map((item, i) => (
            <li key={i} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm font-semibold text-blue-800">{item.title}</p>
              <p className="text-sm text-blue-700 mt-0.5">{item.description}</p>
              {item.codeExample && (
                <pre className="mt-2 bg-gray-800 text-green-300 text-xs p-3 rounded overflow-x-auto">
                  {item.codeExample}
                </pre>
              )}
            </li>
          ))}
        </ul>
      )}
    </CollapsibleSection>
  );
}
