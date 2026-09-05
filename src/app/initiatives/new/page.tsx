"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useInitiatives, useScoringModel } from "@/lib/storage";
import type { Initiative } from "@/lib/types";

const inputClass =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900";
const inputErrorClass =
  "w-full rounded-md border border-red-400 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500";

export default function NewInitiativePage() {
  const router = useRouter();
  const [initiatives, setInitiatives] = useInitiatives();
  const [model] = useScoringModel();

  const [name, setName] = useState("");
  const [problem, setProblem] = useState("");
  const [proposedSolution, setProposedSolution] = useState("");
  const [owner, setOwner] = useState("");
  const [objective, setObjective] = useState("");
  const [kpi, setKpi] = useState("");
  const [expectedKpiOutcomes, setExpectedKpiOutcomes] = useState("");
  const [nameError, setNameError] = useState(false);

  if (initiatives === null || model === null) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-sm text-gray-500">Loading…</p>
      </main>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      setNameError(true);
      return;
    }

    const now = new Date().toISOString();
    const ratings: Record<string, null> = {};
    model!.themes.forEach((theme) => {
      theme.criteria.forEach((criterion) => {
        ratings[criterion.id] = null;
      });
    });

    const newInitiative: Initiative = {
      id: crypto.randomUUID(),
      name: name.trim(),
      problem,
      proposedSolution,
      owner,
      objective,
      kpi,
      expectedKpiOutcomes,
      ratings,
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
        Capture the basics now — ratings and scoring settings come in a
        later milestone.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
        <FormField label="Initiative name" htmlFor="name" required>
          <input
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (nameError) setNameError(false);
            }}
            className={nameError ? inputErrorClass : inputClass}
            aria-invalid={nameError}
            aria-describedby={nameError ? "name-error" : undefined}
          />
          {nameError && (
            <p id="name-error" className="mt-1 text-sm text-red-600">
              Initiative name is required.
            </p>
          )}
        </FormField>

        <FormField label="Problem or opportunity" htmlFor="problem">
          <textarea
            id="problem"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            rows={3}
            className={inputClass}
          />
        </FormField>

        <FormField label="Proposed solution" htmlFor="proposedSolution">
          <textarea
            id="proposedSolution"
            value={proposedSolution}
            onChange={(e) => setProposedSolution(e.target.value)}
            rows={3}
            className={inputClass}
          />
        </FormField>

        <FormField label="Owning team" htmlFor="owner">
          <input
            id="owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            className={inputClass}
          />
        </FormField>

        <FormField label="Strategic objective" htmlFor="objective">
          <input
            id="objective"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            className={inputClass}
          />
        </FormField>

        <FormField label="KPI affected" htmlFor="kpi">
          <input
            id="kpi"
            value={kpi}
            onChange={(e) => setKpi(e.target.value)}
            className={inputClass}
          />
        </FormField>

        <FormField label="Expected KPI outcome" htmlFor="expectedKpiOutcomes">
          <input
            id="expectedKpiOutcomes"
            value={expectedKpiOutcomes}
            onChange={(e) => setExpectedKpiOutcomes(e.target.value)}
            className={inputClass}
          />
        </FormField>

        <div className="mt-2 flex items-center gap-3">
          <button
            type="submit"
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
          >
            Save initiative
          </button>
          <Link
            href="/"
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}

function FormField({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-900">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      <div className="mt-1">{children}</div>
    </div>
  );
}
