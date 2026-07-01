"use client";

export default function CodePasteInput({ value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        Paste Code
      </label>
      <textarea
        className="code-area w-full h-56 border border-gray-200 rounded-lg p-3 text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
        placeholder="// Paste student code here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
      />
      <p className="text-xs text-gray-400">{value.length} / 50,000 chars</p>
    </div>
  );
}
