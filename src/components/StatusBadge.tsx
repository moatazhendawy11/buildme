import type { InitiativeStatus } from "@/lib/types";

const STATUS_LABELS: Record<InitiativeStatus, string> = {
  "under-review": "Under review",
  recommended: "Recommended",
  "not-recommended": "Not recommended",
  decided: "Decided",
};

const STATUS_STYLES: Record<InitiativeStatus, string> = {
  "under-review": "bg-gray-100 text-gray-700",
  recommended: "bg-green-100 text-green-800",
  "not-recommended": "bg-red-100 text-red-700",
  decided: "bg-purple-100 text-purple-800",
};

export function StatusBadge({ status }: { status: InitiativeStatus }) {
  return (
    <span
      className={`inline-block shrink-0 rounded-full px-2.5 py-0.5 text-sm font-medium ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
