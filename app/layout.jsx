import "./globals.css";
import { HistoryProvider } from "../context/HistoryContext";
import Link from "next/link";

export const metadata = {
  title: "AI Code Reviewer",
  description: "AI-powered code review for technical instructors",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <HistoryProvider>
          {/* Header */}
          <header className="bg-[#1F4E79] text-white px-6 py-3 flex items-center justify-between shadow-md">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#2E75B6] rounded-lg flex items-center justify-center font-bold text-sm">
                AI
              </div>
              <span className="font-semibold text-lg tracking-tight">
                Code Reviewer
              </span>
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/" className="hover:text-blue-300 transition-colors">
                Review
              </Link>
              <Link
                href="/history"
                className="hover:text-blue-300 transition-colors"
              >
                History
              </Link>
            </nav>
          </header>

          {/* Global Notification Banner */}
          <div className="bg-amber-50 border-b border-amber-200 px-6 py-2 text-center shadow-sm">
            <p className="text-sm font-medium text-amber-800">
              <span className="mr-2">📢</span>
              Welcome to <span className="font-bold">Version 2.0!</span> We now support <strong>React, TypeScript, and UI Reviews</strong> alongside standard web technologies. Version 3 is coming soon!
            </p>
          </div>

          {/* Page content */}
          <main className="min-h-[calc(100vh-52px)]">{children}</main>
        </HistoryProvider>
      </body>
    </html>
  );
}
