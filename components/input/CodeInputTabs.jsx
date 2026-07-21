"use client";
import CodePasteInput from "./CodePasteInput";
import FileUploadInput from "./FileUploadInput";
import GithubUrlInput from "./GithubUrlInput";
import LiveUrlInput from "./LiveUrlInput";

const TABS = [
  { id: "paste",       label: "Paste Code",  icon: "📋" },
  { id: "file",        label: "File Upload",  icon: "📂" },
  { id: "github_file", label: "GitHub File",  icon: "🔗" },
  { id: "github_repo", label: "GitHub Repo",  icon: "📦" },
  { id: "live_url",    label: "Live URL (UI)",icon: "🌐" },
];

export default function CodeInputTabs({ state, setState }) {
  const { activeTab, code, githubUrl, liveUrl, accessToken } = state;

  const setTab = (tab) => setState((s) => ({ ...s, activeTab: tab }));
  const setCode = (val) => setState((s) => ({ ...s, code: val }));
  const setGithubUrl = (val) => setState((s) => ({ ...s, githubUrl: val }));
  const setLiveUrl = (val) => setState((s) => ({ ...s, liveUrl: val }));
  const setToken = (val) => setState((s) => ({ ...s, accessToken: val }));

  const handleFile = (content, filename) => {
    setState((s) => ({ ...s, code: content, filename }));
  };

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 border-b border-gray-200 mb-4 overflow-x-auto pb-1 scrollbar-hide">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-t-lg transition-colors border-b-2 -mb-px whitespace-nowrap ${
              activeTab === t.id
                ? "border-[#2E75B6] text-[#2E75B6] bg-blue-50"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <span>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "paste" && (
        <CodePasteInput value={code} onChange={setCode} />
      )}
      {activeTab === "file" && (
        <FileUploadInput onFileRead={handleFile} />
      )}
      {activeTab === "github_file" && (
        <GithubUrlInput
          type="file"
          value={githubUrl}
          onChange={setGithubUrl}
          accessToken={accessToken}
          onTokenChange={setToken}
        />
      )}
      {activeTab === "github_repo" && (
        <GithubUrlInput
          type="repo"
          value={githubUrl}
          onChange={setGithubUrl}
          accessToken={accessToken}
          onTokenChange={setToken}
        />
      )}
      {activeTab === "live_url" && (
        <LiveUrlInput
          value={liveUrl}
          onChange={setLiveUrl}
        />
      )}
    </div>
  );
}
