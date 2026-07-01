"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ReviewResult from "../../../components/result/ReviewResult";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import ErrorAlert from "../../../components/ui/ErrorAlert";
import { getReview } from "../../../lib/api";

export default function ReviewPage() {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getReview(id)
      .then(setReview)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          ← Back to Review
        </Link>
        <span className="text-gray-300">|</span>
        <span className="text-sm text-gray-500 font-mono">{id}</span>
      </div>

      {loading && <LoadingSpinner message="Loading review..." />}
      {error && <ErrorAlert message={error} />}
      {!loading && review && <ReviewResult review={review} />}
    </div>
  );
}
