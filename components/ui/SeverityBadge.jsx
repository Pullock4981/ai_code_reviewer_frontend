const map = {
  CRITICAL: "bg-red-100 text-red-700 border border-red-300",
  HIGH:     "bg-orange-100 text-orange-700 border border-orange-300",
  MEDIUM:   "bg-yellow-100 text-yellow-700 border border-yellow-300",
  LOW:      "bg-gray-100 text-gray-600 border border-gray-300",
  INFO:     "bg-blue-100 text-blue-700 border border-blue-300",
  NONE:     "bg-green-100 text-green-700 border border-green-300",
};

export default function SeverityBadge({ level }) {
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${map[level] || map.INFO}`}>
      {level}
    </span>
  );
}
