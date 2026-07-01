import React from 'react';

export default function ExaminerFeedbackCard({ feedback }) {
  if (!feedback) return null;

  const lines = feedback.split('\n');

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mt-4">
      <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
        <span className="text-xl">📝</span>
        <h3 className="text-lg font-bold text-gray-800">Examiner's Feedback</h3>
      </div>
      <div className="p-5 text-sm font-medium leading-relaxed">
        {lines.map((line, i) => {
          if (line.startsWith('#')) {
            return (
              <h4 key={i} className="text-lg font-bold text-[#1F4E79] mt-6 mb-3 border-b pb-1">
                {line.replace(/#/g, '').trim()}
              </h4>
            );
          }
          if (line.trim().length === 0) {
            return <div key={i} className="h-2"></div>;
          }
          
          let colorClass = "text-gray-700";
          if (line.includes("okay।") || line.includes("okay") || line.includes("Awesome")) {
            colorClass = "text-green-700";
          } else if (line.includes("improvement") || line.includes("bad") || line.includes("fix")) {
            colorClass = "text-red-600";
          }
          
          return (
            <p key={i} className={`mb-1 ${colorClass}`}>
              {line}
            </p>
          );
        })}
      </div>
    </div>
  );
}
