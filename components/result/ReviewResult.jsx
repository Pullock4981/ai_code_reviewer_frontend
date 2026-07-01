import VerdictCard from "./VerdictCard";
import SummaryCard from "./SummaryCard";
import ExaminerFeedbackCard from "./ExaminerFeedbackCard";

export default function ReviewResult({ review }) {
  if (!review) return null;

  return (
    <div className="flex flex-col gap-4">
      <VerdictCard review={review} />
      <SummaryCard summary={review.summary} />
      <ExaminerFeedbackCard feedback={review.examinerFeedback} />
    </div>
  );
}
