"use client";

import Link from "next/link";
import { calculateScore, ratingProgress } from "@/lib/scoring-model";
import { useInitiatives, useScoringModel } from "@/lib/storage";

export default function InitiativeListPage() {
  const [initiatives] = useInitiatives();
  const [model] = useScoringModel();

  if (initiatives === null || model === null) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-sm text-gray-500">Loading…</p>
      </main>
    );
  }

  const ranked = initiatives
    .map((initiative) => ({
      initiative,
      score: calculateScore(initiative, model),
      progress: ratingProgress(initiative, model),
    }))
    .sort((a, b) => (b.score ?? -1) - (a.score ?? -1));

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Initiatives
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Compare proposed initiatives under a shared scoring model.
          </p>
        </div>
        <Link
          href="/initiatives/new"
          className="shrink-0 rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
        >
          + New initiative
        </Link>
      </div>

      {ranked.length === 0 ? (
        <div className="mt-10 rounded-lg border border-dashed border-gray-300 px-6 py-12 text-center">
          <p className="text-sm font-medium text-gray-900">
            No initiatives yet
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Create your first initiative to start assessing it.
          </p>
          <Link
            href="/initiatives/new"
            className="mt-4 inline-block rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
          >
            + New initiative
          </Link>
        </div>
      ) : (
        <ul className="mt-8 flex flex-col gap-3">
          {ranked.map(({ initiative, score, progress }) => (
            <li key={initiative.id}>
              <Link
                href={`/initiatives/${initiative.id}`}
                className="block rounded-lg border border-gray-200 px-4 py-3 hover:border-gray-400"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-medium text-gray-900">
                    {initiative.name}
                  </span>
                  {score !== null ? (
                    <span className="shrink-0 rounded-full bg-gray-900 px-2.5 py-0.5 text-sm font-semibold text-white">
                      {score}
                    </span>
                  ) : (
                    <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-0.5 text-sm text-gray-600">
                      {progress.rated}/{progress.total} rated
                    </span>
                  )}
                </div>
                <p className="mt-1 line-clamp-1 text-sm text-gray-500">
                  {initiative.objective}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
