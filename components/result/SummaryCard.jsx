export default function SummaryCard({ summary }) {
  if (!summary) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">📋 Summary</p>
      <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
    </div>
  );
}
