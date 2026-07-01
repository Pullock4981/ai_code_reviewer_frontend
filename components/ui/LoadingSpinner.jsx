export default function LoadingSpinner({ message = "Analyzing code..." }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 py-20">
      <div className="w-12 h-12 border-4 border-blue-200 border-t-[#2E75B6] rounded-full animate-spin" />
      <p className="text-gray-500 text-sm font-medium">{message}</p>
      <p className="text-gray-400 text-xs">This may take 10–30 seconds</p>
    </div>
  );
}
