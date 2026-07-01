"use client";
import { useRef, useState } from "react";

export default function FileUploadInput({ onFileRead }) {
  const inputRef = useRef();
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState("");

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target.result;
      setPreview(content.slice(0, 200));
      onFileRead(content, file.name);
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        Upload File
      </label>
      <div
        onClick={() => inputRef.current.click()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
      >
        <div className="text-3xl mb-2">📂</div>
        <p className="text-sm text-gray-600 font-medium">
          {fileName ? fileName : "Click to upload a code file"}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          .js .html .css .py .java and more
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept=".js,.ts,.jsx,.tsx,.html,.css,.py,.java,.cs,.php,.rb,.go,.rs,.sql,.json,.c,.cpp,.kt,.swift"
        onChange={handleFile}
        className="hidden"
      />
      {preview && (
        <div className="bg-gray-50 rounded p-3 border border-gray-200">
          <p className="text-xs text-gray-400 mb-1">Preview:</p>
          <pre className="text-xs text-gray-600 truncate whitespace-pre-wrap">{preview}...</pre>
        </div>
      )}
    </div>
  );
}
