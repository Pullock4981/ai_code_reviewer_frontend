"use client";

export default function LiveUrlInput({ value, onChange }) {
  return (
    <div className="flex flex-col h-full animate-fadeIn">
      <div className="flex flex-col h-[280px]">
        <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
          Live Website URL
        </label>
        
        <input
          type="url"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://yourwebsite.com"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#2E75B6]/50 focus:border-[#2E75B6] transition-all font-mono text-sm"
        />

        <div className="mt-4 bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex gap-3 text-sm text-blue-800">
          <div className="shrink-0 mt-0.5">ℹ️</div>
          <div>
            <p className="font-semibold mb-1">UI/UX Design Review</p>
            <p className="opacity-90">Provide a live website URL. The AI will capture a full-page screenshot and analyze its design, layout, accessibility, and user experience based on your custom instructions.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
