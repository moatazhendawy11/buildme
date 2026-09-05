"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ScoreBadge } from "@/components/ScoreBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { calculateScore } from "@/lib/scoring-model";
import { useInitiatives, useScoringModel } from "@/lib/storage";
import type { Initiative, ScoringModel } from "@/lib/types";

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

  const yourInitiatives = rank(
    initiatives.filter((initiative) => !initiative.isSample),
    model
  );
  const sampleInitiatives = rank(
    initiatives.filter((initiative) => initiative.isSample),
    model
  );

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

      {initiatives.length === 0 ? (
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
        <div className="mt-8 flex flex-col gap-8">
          {yourInitiatives.length > 0 && (
            <InitiativeSection title="Your initiatives" items={yourInitiatives} />
          )}
          {sampleInitiatives.length > 0 && (
            <InitiativeSection
              title="Sample initiatives"
              description="Fictional examples included to show how BuildMe works — not your data."
              items={sampleInitiatives}
            />
          )}
        </div>
      )}
    </main>
  );
}

function rank(items: Initiative[], model: ScoringModel) {
  return items
    .map((initiative) => ({
      initiative,
      score: calculateScore(initiative, model),
    }))
    .sort((a, b) => (b.score ?? -1) - (a.score ?? -1));
}

function InitiativeSection({
  title,
  description,
  items,
}: {
  title: string;
  description?: string;
  items: ReturnType<typeof rank>;
}) {
  const router = useRouter();

  return (
    <section className="min-w-0">
      <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
      {description && (
        <p className="mt-0.5 text-sm text-gray-500">{description}</p>
      )}
      <div className="mt-3 overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-xs font-medium tracking-wide text-gray-500">
              <th scope="col" className="px-4 py-2">
                Initiative
              </th>
              <th scope="col" className="px-4 py-2">
                Score
              </th>
              <th scope="col" className="px-4 py-2">
                Owner
              </th>
              <th scope="col" className="px-4 py-2">
                Status
              </th>
              <th scope="col" className="w-8 px-2 py-2">
                <span className="sr-only">Open</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map(({ initiative, score }) => {
              const href = `/initiatives/${initiative.id}`;
              return (
                <tr
                  key={initiative.id}
                  onClick={() => router.push(href)}
                  className="cursor-pointer border-b border-gray-100 last:border-0 hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        href={href}
                        onClick={(e) => e.stopPropagation()}
                        className="font-medium text-gray-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
                      >
                        {initiative.name}
                      </Link>
                      {initiative.isSample && (
                        <span className="shrink-0 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                          Sample
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 line-clamp-1 text-gray-500">
                      {initiative.objective}
                    </p>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <ScoreBadge score={score} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                    {initiative.owner}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={initiative.status} />
                  </td>
                  <td className="px-2 py-3 text-gray-400">
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="size-4"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
