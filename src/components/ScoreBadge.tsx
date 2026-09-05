export function ScoreBadge({ score }: { score: number | null }) {
  if (score !== null) {
    return (
      <span className="shrink-0 rounded-full bg-gray-900 px-2.5 py-0.5 text-sm font-semibold text-white">
        Score: {score}
      </span>
    );
  }

  return (
    <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-0.5 text-sm font-medium text-amber-800">
      Incomplete
    </span>
  );
}
