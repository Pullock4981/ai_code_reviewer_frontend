import CollapsibleSection from "../ui/CollapsibleSection";

export default function CodeExplanation({ codeExplanation = {} }) {
  const { overview, keyComponents = [] } = codeExplanation;

  return (
    <CollapsibleSection title="Code Explanation" icon="🧠">
      <div className="mt-2 flex flex-col gap-3">
        {overview && (
          <p className="text-sm text-gray-700 leading-relaxed">{overview}</p>
        )}
        {keyComponents.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Key Components
            </p>
            <ul className="flex flex-col gap-2">
              {keyComponents.map((c, i) => (
                <li key={i} className="flex gap-3 bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <div className="w-2 h-2 rounded-full bg-[#2E75B6] mt-1.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{c.name}</p>
                    <p className="text-sm text-gray-600">{c.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </CollapsibleSection>
  );
}
