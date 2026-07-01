"use client";

const FOCUS_OPTIONS = ["SECURITY", "PERFORMANCE", "STYLE", "LOGIC", "ARCHITECTURE"];

export default function ReviewParameters({ params, setParams }) {
  const set = (key, val) => setParams((p) => ({ ...p, [key]: val }));

  const toggleFocus = (area) => {
    setParams((p) => {
      const existing = p.focusAreas || [];
      return {
        ...p,
        focusAreas: existing.includes(area)
          ? existing.filter((a) => a !== area)
          : existing.length < 5
          ? [...existing, area]
          : existing,
      };
    });
  };

  return (
    <div className="flex flex-col gap-4 pt-3 border-t border-gray-100">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        Review Parameters
      </p>

      {/* Custom instructions (Highlighted & at the top) */}
      <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-200 shadow-sm">
        <label className="text-xs text-blue-700 font-bold block mb-2 uppercase tracking-wide flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
          Custom Instructions / Rubric
        </label>
        <textarea
          rows={5}
          value={params.customInstructions}
          onChange={(e) => set("customInstructions", e.target.value)}
          placeholder="Paste your Figma checklist, functional requirements, or specific things to check here..."
          className="w-full border border-blue-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
        />
      </div>

      {/* Row 1 — Level + Depth */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-500 font-medium block mb-1">Student Level</label>
          <select
            value={params.studentLevel}
            onChange={(e) => set("studentLevel", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500 font-medium block mb-1">Review Depth</label>
          <select
            value={params.reviewDepth}
            onChange={(e) => set("reviewDepth", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="QUICK">Quick</option>
            <option value="STANDARD">Standard</option>
            <option value="DETAILED">Detailed</option>
          </select>
        </div>
      </div>

      {/* Strictness */}
      <div>
        <label className="text-xs text-gray-500 font-medium block mb-1">Strictness</label>
        <div className="flex gap-2">
          {["LENIENT", "STANDARD", "STRICT"].map((s) => (
            <button
              key={s}
              onClick={() => set("strictnessLevel", s)}
              className={`flex-1 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                params.strictnessLevel === s
                  ? "bg-[#2E75B6] text-white border-[#2E75B6]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
              }`}
            >
              {s.charAt(0) + s.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Focus areas */}
      <div>
        <label className="text-xs text-gray-500 font-medium block mb-1">
          Focus Areas <span className="text-gray-400">(max 5)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {FOCUS_OPTIONS.map((area) => {
            const active = (params.focusAreas || []).includes(area);
            return (
              <button
                key={area}
                onClick={() => toggleFocus(area)}
                className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
                  active
                    ? "bg-[#1F4E79] text-white border-[#1F4E79]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
                }`}
              >
                {area}
              </button>
            );
          })}
        </div>
      </div>

      {/* Assignment context */}
      <div>
        <label className="text-xs text-gray-500 font-medium block mb-1">Assignment Context</label>
        <textarea
          rows={2}
          value={params.assignmentContext}
          onChange={(e) => set("assignmentContext", e.target.value)}
          placeholder="What was the student asked to build? (optional)"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        />
      </div>


    </div>
  );
}
