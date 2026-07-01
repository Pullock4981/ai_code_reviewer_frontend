import Link from "next/link";
import ExaminerFeedbackCard from "./ExaminerFeedbackCard";

const verdictColor = {
  EXCELLENT:  "bg-green-100 text-green-700 border-green-300",
  GOOD:       "bg-blue-100 text-blue-700 border-blue-300",
  NEEDS_WORK: "bg-yellow-100 text-yellow-700 border-yellow-300",
  REDO:       "bg-red-100 text-red-700 border-red-300",
};

export default function RepoReviewResult({ result }) {
  if (!result) return null;

  const { totalFiles = 0, reviewed = 0, files = [] } = result;
  const successFiles = files.filter((f) => !f.error);
  const errorFiles   = files.filter((f) => f.error);

  // The AI evaluates out of 100, but we want to scale it to 60 as per user request
  const rawScore = result.repoSummary?.overallVerdict?.score || 0;
  const scaledScore = Math.round((rawScore / 100) * 60);

  const scoreColor = scaledScore >= 48 ? 'text-green-600' :
                     scaledScore >= 36 ? 'text-blue-600' :
                     scaledScore >= 24 ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className="flex flex-col gap-4">
      {/* Summary */}
      <div className="bg-[#1F4E79] text-white rounded-xl p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-300 mb-1">Repository Review</p>
        <p className="text-2xl font-bold">{reviewed} files reviewed</p>
        <p className="text-blue-200 text-sm mt-1">{totalFiles} source files found in repository</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-[#1F4E79]">{totalFiles}</p>
          <p className="text-xs text-gray-500 mt-1">Total Files</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{successFiles.length}</p>
          <p className="text-xs text-gray-500 mt-1">Reviewed</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-red-500">{errorFiles.length}</p>
          <p className="text-xs text-gray-500 mt-1">Failed</p>
        </div>
      </div>

      {/* General Review (Repo Summary) */}
      {result.repoSummary && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mt-2 mb-2">
          <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">📊</span>
              <p className="text-lg font-bold text-gray-800">General Review</p>
            </div>
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
              <span className="text-xs font-semibold text-gray-500 uppercase">Avg Score:</span>
              <span className={`text-lg font-bold ${scoreColor}`}>{scaledScore}</span>
              <span className="text-xs text-gray-400">/60</span>
            </div>
          </div>
          <div className="p-5 flex flex-col gap-5">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">📋 Overall Summary</p>
              <p className="text-sm text-gray-700 leading-relaxed">{result.repoSummary.summary}</p>
            </div>
            
            {result.repoSummary.examinerFeedback && (
              <div className="mt-2">
                <ExaminerFeedbackCard feedback={result.repoSummary.examinerFeedback} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* File list */}
      {successFiles.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
            <p className="text-sm font-semibold text-gray-700">✅ Reviewed Files</p>
          </div>
          <ul className="divide-y divide-gray-100">
            {successFiles.map((f, i) => (
              <li key={i} className="flex flex-col hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 text-xs font-mono w-5">{i + 1}</span>
                    <p className="text-sm font-mono text-gray-700">{f.file}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {f.verdict?.label && (
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${verdictColor[f.verdict.label] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
                        {f.verdict.label.replace("_", " ")}
                      </span>
                    )}
                    {f.reviewId && (
                      <Link
                        href={`/review/${f.reviewId}`}
                        className="text-xs text-blue-600 hover:underline whitespace-nowrap"
                      >
                        View Full Details →
                      </Link>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Errors */}
      {errorFiles.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-red-100">
            <p className="text-sm font-semibold text-red-700">❌ Failed Files</p>
          </div>
          <ul className="divide-y divide-red-100">
            {errorFiles.map((f, i) => (
              <li key={i} className="px-4 py-3">
                <p className="text-sm font-mono text-gray-700">{f.file}</p>
                <p className="text-xs text-red-600 mt-0.5">{f.error}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
