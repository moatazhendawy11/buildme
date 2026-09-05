"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { InitiativeForm, type InitiativeFormValues } from "@/components/InitiativeForm";
import { useInitiatives, useScoringModel } from "@/lib/storage";
import type { Initiative, Rating } from "@/lib/types";

export default function NewInitiativePage() {
  const router = useRouter();
  const [initiatives, setInitiatives] = useInitiatives();
  const [model] = useScoringModel();
  const [ratings, setRatings] = useState<Record<string, Rating | null>>({});

  if (initiatives === null || model === null) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-sm text-gray-500">Loading…</p>
      </main>
    );
  }

  function handleRatingChange(criterionId: string, value: Rating | null) {
    setRatings((prev) => ({ ...prev, [criterionId]: value }));
  }

  function handleCreate(values: InitiativeFormValues) {
    const now = new Date().toISOString();
    const fullRatings: Record<string, Rating | null> = {};
    model!.themes.forEach((theme) => {
      theme.criteria.forEach((criterion) => {
        fullRatings[criterion.id] = ratings[criterion.id] ?? null;
      });
    });

    const newInitiative: Initiative = {
      id: crypto.randomUUID(),
      ...values,
      ratings: fullRatings,
      recommendation: "",
      decisionNote: "",
      status: "under-review",
      isSample: false,
      createdAt: now,
      updatedAt: now,
    };

    setInitiatives([...initiatives!, newInitiative]);
    router.push(`/initiatives/${newInitiative.id}`);
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">
        ← Back to initiatives
      </Link>

      <h1 className="mt-4 text-2xl font-semibold tracking-tight">
        New initiative
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        Capture the basics, and rate it now if you&apos;re ready to.
      </p>

      <div className="mt-8">
        <InitiativeForm
          onSubmit={handleCreate}
          cancelHref="/"
          submitLabel="Save initiative"
          assessment={{ model, ratings, onChange: handleRatingChange }}
        />
      </div>
    </main>
  );
}
