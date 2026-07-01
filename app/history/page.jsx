"use client";
import Link from "next/link";
import { useHistory } from "../../context/HistoryContext";

const verdictColor = {
  EXCELLENT:  "bg-green-100 text-green-700",
  GOOD:       "bg-blue-100 text-blue-700",
  NEEDS_WORK: "bg-yellow-100 text-yellow-700",
  REDO:       "bg-red-100 text-red-700",
};

export default function HistoryPage() {
  const { history } = useHistory();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-[#1F4E79]">Review History</h1>
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          + New Review
        </Link>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-5xl mb-4">📭</div>
          <p className="font-medium text-gray-500">No reviews yet this session</p>
          <p className="text-sm mt-1">Reviews you run will appear here</p>
          <Link
            href="/"
            className="mt-4 inline-block text-sm bg-[#1F4E79] text-white px-5 py-2 rounded-lg hover:bg-[#2E75B6] transition-colors"
          >
            Start a Review
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {history.map((r) => (
            <li key={r.id}>
              <Link
                href={`/review/${r.id}`}
                className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#EBF3FB] flex items-center justify-center text-sm font-bold text-[#2E75B6]">
                    {r.language?.slice(0, 2).toUpperCase() || "??"}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 capitalize">{r.language || "Unknown"}</p>
                    <p className="text-xs text-gray-400">{r.studentLevel} · {new Date(r.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {r.verdict && (
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${verdictColor[r.verdict] || "bg-gray-100 text-gray-600"}`}>
                      {r.verdict?.replace("_", " ")}
                    </span>
                  )}
                  {r.score !== undefined && (
                    <span className="text-sm font-bold text-gray-600">{r.score}/100</span>
                  )}
                  <span className="text-gray-300">→</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
