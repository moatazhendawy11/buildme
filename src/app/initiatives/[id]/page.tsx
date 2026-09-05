"use client";

import { use } from "react";
import Link from "next/link";
import { calculateScore } from "@/lib/scoring-model";
import { useInitiatives, useScoringModel } from "@/lib/storage";
import type { Rating } from "@/lib/types";

export default function InitiativeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [initiatives] = useInitiatives();
  const [model] = useScoringModel();

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

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">
        ← Back to initiatives
      </Link>

      <div className="mt-4 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          {initiative.name}
        </h1>
        {score !== null && (
          <span className="shrink-0 rounded-full bg-gray-900 px-3 py-1 text-sm font-semibold text-white">
            Score: {score}
          </span>
        )}
      </div>

      <dl className="mt-8 flex flex-col gap-6">
        <Field label="Problem" value={initiative.problem} />
        <Field label="Proposed solution" value={initiative.proposedSolution} />
        <Field label="Owner" value={initiative.owner} />
        <Field label="Objective" value={initiative.objective} />
        <Field
          label="Expected KPI outcomes"
          value={initiative.expectedKpiOutcomes}
        />
      </dl>

      <h2 className="mt-10 text-lg font-semibold tracking-tight">
        Assessment
      </h2>
      <div className="mt-4 flex flex-col gap-6">
        {model.themes.map((theme) => (
          <div key={theme.id}>
            <h3 className="text-sm font-semibold text-gray-900">
              {theme.name}{" "}
              <span className="font-normal text-gray-500">
                ({theme.weight}% of score)
              </span>
            </h3>
            <ul className="mt-2 flex flex-col gap-2">
              {theme.criteria.map((criterion) => {
                const rating = initiative.ratings[criterion.id] as
                  | Rating
                  | null
                  | undefined;
                return (
                  <li
                    key={criterion.id}
                    className="rounded-md border border-gray-200 px-3 py-2"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-medium text-gray-900">
                        {criterion.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {rating != null ? `${rating}/5` : "Not rated"}
                      </span>
                    </div>
                    {rating != null && (
                      <p className="mt-1 text-sm text-gray-500">
                        {criterion.ratingDefinitions[rating]}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
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
