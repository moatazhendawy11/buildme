"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AssessmentFields } from "@/components/AssessmentFields";
import { ScoreBadge } from "@/components/ScoreBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { calculateScore } from "@/lib/scoring-model";
import { useInitiatives, useScoringModel } from "@/lib/storage";
import type { Rating } from "@/lib/types";

export default function InitiativeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [initiatives, setInitiatives] = useInitiatives();
  const [model] = useScoringModel();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (initiatives === null || model === null) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-sm text-gray-500">Loading…</p>
      </main>
    );
  }

  const initiative = initiatives.find((item) => item.id === id);

  if (!initiative) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10 text-center">
        <p className="text-sm font-medium text-gray-900">
          We couldn&apos;t find that initiative
        </p>
        <p className="mt-1 text-sm text-gray-500">
          It may have been deleted, or the link may be wrong.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block text-sm font-medium text-gray-900 underline"
        >
          Back to initiatives
        </Link>
      </main>
    );
  }

  const score = calculateScore(initiative, model);

  function handleDelete() {
    setInitiatives(initiatives!.filter((item) => item.id !== id));
    router.push("/");
  }

  function handleRatingChange(criterionId: string, value: Rating | null) {
    const updated = initiatives!.map((item) =>
      item.id === id
        ? {
            ...item,
            ratings: { ...item.ratings, [criterionId]: value },
            updatedAt: new Date().toISOString(),
          }
        : item
    );
    setInitiatives(updated);
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">
        ← Back to initiatives
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            {initiative.name}
          </h1>
          {initiative.isSample && (
            <span className="shrink-0 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
              Sample
            </span>
          )}
          <StatusBadge status={initiative.status} />
        </div>
        <div className="text-right">
          <p className="text-xs font-medium text-gray-500">Score</p>
          <ScoreBadge score={score} />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <Link
          href={`/initiatives/${id}/edit`}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Edit
        </Link>
        <button
          type="button"
          onClick={() => setShowDeleteConfirm(true)}
          className="rounded-md border border-red-300 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50"
        >
          Delete
        </button>
      </div>

      {showDeleteConfirm && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
        >
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
            <h2
              id="delete-dialog-title"
              className="text-lg font-semibold text-gray-900"
            >
              Delete &ldquo;{initiative.name}&rdquo;?
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              This can&apos;t be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <dl className="mt-8 flex flex-col gap-6">
        <Field label="Problem" value={initiative.problem} />
        <Field label="Proposed solution" value={initiative.proposedSolution} />
        <Field label="Owner" value={initiative.owner} />
        <Field label="Objective" value={initiative.objective} />
        <Field label="KPI affected" value={initiative.kpi} />
        <Field
          label="Expected KPI outcome"
          value={initiative.expectedKpiOutcomes}
        />
      </dl>

      <h2 className="mt-10 text-lg font-semibold tracking-tight">
        Assessment
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        Rate each criterion 0-5. Leave a criterion unrated if it hasn&apos;t
        been assessed yet — the score only appears once every criterion has
        a rating.
      </p>
      <div className="mt-4">
        <AssessmentFields
          model={model}
          ratings={initiative.ratings}
          onChange={handleRatingChange}
        />
      </div>

      {(initiative.recommendation || initiative.decisionNote) && (
        <div className="mt-10 flex flex-col gap-6">
          {initiative.recommendation && (
            <Field label="Recommendation" value={initiative.recommendation} />
          )}
          {initiative.decisionNote && (
            <Field label="Decision note" value={initiative.decisionNote} />
          )}
        </div>
      )}
    </main>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value}</dd>
    </div>
  );
}
