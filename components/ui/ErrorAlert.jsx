export default function ErrorAlert({ message, onClose }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
      <span className="text-red-500 text-lg mt-0.5">⚠️</span>
      <div className="flex-1">
        <p className="text-red-700 text-sm font-medium">Error</p>
        <p className="text-red-600 text-sm mt-0.5">{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-red-400 hover:text-red-600 text-lg leading-none">
          ×
        </button>
      )}
    </div>
  );
}
