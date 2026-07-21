"use client";
import { useState, useEffect } from "react";
import CodeInputTabs from "../components/input/CodeInputTabs";
import ReviewParameters from "../components/parameters/ReviewParameters";
import ReviewResult from "../components/result/ReviewResult";
import RepoReviewResult from "../components/result/RepoReviewResult";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorAlert from "../components/ui/ErrorAlert";
import { reviewCode, reviewGithubFile, reviewGithubRepo } from "../lib/api";
import { useHistory } from "../context/HistoryContext";

const DEFAULT_PARAMS = {
  studentLevel:       "BEGINNER",
  reviewDepth:        "STANDARD",
  strictnessLevel:    "STANDARD",
  focusAreas:         [],
  assignmentContext:  "",
  customInstructions: "",
};

const DEFAULT_INPUT = {
  activeTab:   "paste",
  code:        "",
  githubUrl:   "",
  liveUrl:     "",
  accessToken: "",
  filename:    "",
};

export default function HomePage() {
  const { addReview } = useHistory();
  const [input, setInput]     = useState(DEFAULT_INPUT);
  const [params, setParams]   = useState(DEFAULT_PARAMS);
  const [result, setResult]   = useState(null);
  const [resultType, setResultType] = useState("single"); // "single" | "repo"
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const [isRestored, setIsRestored] = useState(false);

  // Restore state from sessionStorage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem("appState");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setInput(parsed.input || DEFAULT_INPUT);
        setParams(parsed.params || DEFAULT_PARAMS);
        setResult(parsed.result || null);
        setResultType(parsed.resultType || "single");
      } catch (e) {
        console.error("Failed to restore state", e);
      }
    }
    setIsRestored(true);
  }, []);

  // Save state to sessionStorage on change
  useEffect(() => {
    if (isRestored) {
      sessionStorage.setItem("appState", JSON.stringify({ input, params, result, resultType }));
    }
  }, [input, params, result, resultType, isRestored]);

  const buildPayload = () => {
    const reviewParameters = { ...params };
    const { activeTab, code, githubUrl, liveUrl, accessToken } = input;

    if (activeTab === "paste" || activeTab === "file") {
      return { type: "code", payload: { code, reviewParameters } };
    }
    if (activeTab === "github_file") {
      return { type: "github_file", payload: { githubUrl, accessToken: accessToken || undefined, reviewParameters } };
    }
    if (activeTab === "github_repo") {
      return { type: "github_repo", payload: { repositoryUrl: githubUrl, accessToken: accessToken || undefined, reviewParameters } };
    }
    if (activeTab === "live_url") {
      return { type: "ui_review", payload: { liveUrl, reviewParameters } };
    }
  };

  const validate = () => {
    const { activeTab, code, githubUrl, liveUrl } = input;
    if ((activeTab === "paste" || activeTab === "file") && !code.trim()) {
      return "Please paste or upload code to review.";
    }
    if ((activeTab === "github_file" || activeTab === "github_repo") && !githubUrl.trim()) {
      return "Please enter a GitHub URL.";
    }
    if (activeTab === "live_url" && !liveUrl?.trim()) {
      return "Please enter a live website URL.";
    }
    return null;
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) { setError(err); return; }

    setError(null);
    setLoading(true);
    setResult(null);

    try {
      const { type, payload } = buildPayload();
      let data;

      if (type === "code") {
        data = await reviewCode(payload);
        setResultType("single");
      }
      if (type === "github_file") {
        data = await reviewGithubFile(payload);
        setResultType("single");
      }
      if (type === "github_repo") {
        data = await reviewGithubRepo(payload);
        setResultType("repo");
      }
      if (type === "ui_review") {
        const { reviewUI } = require("../lib/api");
        data = await reviewUI(payload);
        setResultType("single");
      }

      setResult(data);
      if (data?._id) addReview(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setInput(DEFAULT_INPUT);
    setParams(DEFAULT_PARAMS);
    setResult(null);
    setError(null);
  };

  return (
    <div className="flex h-[calc(100vh-52px)] overflow-hidden">
      {/* ── LEFT PANEL ─────────────────────────────────── */}
      <div className="w-[42%] min-w-[360px] bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
        <div className="p-5 flex-1 flex flex-col gap-5">
          <CodeInputTabs state={input} setState={setInput} />
          <ReviewParameters params={params} setParams={setParams} />
        </div>

        <div className="p-5 border-t border-gray-100 bg-gray-50 flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-[#1F4E79] hover:bg-[#2E75B6] disabled:bg-gray-300 text-white font-semibold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Analyzing...
              </>
            ) : (
              "🚀 Review Now"
            )}
          </button>
          {result && (
            <button
              onClick={handleReset}
              className="px-4 py-3 border border-gray-200 text-gray-600 rounded-xl text-sm hover:bg-gray-100 transition-colors"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* ── RIGHT PANEL ────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
        {error && (
          <div className="mb-4">
            <ErrorAlert message={error} onClose={() => setError(null)} />
          </div>
        )}

        {loading && (
          <LoadingSpinner
            message={
              input.activeTab === "github_repo"
                ? "Reviewing all repo files... this may take a minute"
                : "AI is reviewing the code..."
            }
          />
        )}

        {!loading && !result && !error && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-4 text-gray-400">
            <div className="text-6xl">🤖</div>
            <p className="text-lg font-medium text-gray-500">Ready to Review</p>
            <p className="text-sm max-w-xs">
              Paste code, upload a file, or enter a GitHub URL on the left — then hit Review Now.
            </p>
          </div>
        )}

        {!loading && result && resultType === "single" && (
          <ReviewResult review={result} />
        )}

        {!loading && result && resultType === "repo" && (
          <RepoReviewResult result={result} />
        )}
      </div>
    </div>
  );
}
