"use client";

export default function GithubUrlInput({ value, onChange, type = "file", accessToken, onTokenChange }) {
  const placeholder =
    type === "file"
      ? "https://github.com/username/repo/blob/main/index.js"
      : "https://github.com/username/repo";

  const label = type === "file" ? "GitHub File URL" : "GitHub Repository URL";
  const hint  = type === "file"
    ? "Paste the URL of a single file from GitHub"
    : "Paste the repo URL — all source files will be reviewed";

  return (
    <div className="flex flex-col gap-3">
      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        {label}
      </label>
      <input
        type="url"
        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <p className="text-xs text-gray-400">{hint}</p>

      <div className="mt-1">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Access Token <span className="text-gray-400 normal-case">(optional — for private repos)</span>
        </label>
        <input
          type="password"
          className="mt-1.5 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="ghp_xxxxxxxxxxxx"
          value={accessToken}
          onChange={(e) => onTokenChange(e.target.value)}
        />
      </div>
    </div>
  );
}
