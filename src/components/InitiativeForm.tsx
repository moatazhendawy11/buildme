"use client";

import { useState } from "react";
import Link from "next/link";

export interface InitiativeFormValues {
  name: string;
  problem: string;
  proposedSolution: string;
  owner: string;
  objective: string;
  kpi: string;
  expectedKpiOutcomes: string;
}

const inputClass =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900";
const inputErrorClass =
  "w-full rounded-md border border-red-400 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500";

export function InitiativeForm({
  initialValues,
  onSubmit,
  cancelHref,
  submitLabel,
}: {
  initialValues?: Partial<InitiativeFormValues>;
  onSubmit: (values: InitiativeFormValues) => void;
  cancelHref: string;
  submitLabel: string;
}) {
  const [name, setName] = useState(initialValues?.name ?? "");
  const [problem, setProblem] = useState(initialValues?.problem ?? "");
  const [proposedSolution, setProposedSolution] = useState(
    initialValues?.proposedSolution ?? ""
  );
  const [owner, setOwner] = useState(initialValues?.owner ?? "");
  const [objective, setObjective] = useState(initialValues?.objective ?? "");
  const [kpi, setKpi] = useState(initialValues?.kpi ?? "");
  const [expectedKpiOutcomes, setExpectedKpiOutcomes] = useState(
    initialValues?.expectedKpiOutcomes ?? ""
  );
  const [nameError, setNameError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      setNameError(true);
      return;
    }

    onSubmit({
      name: name.trim(),
      problem,
      proposedSolution,
      owner,
      objective,
      kpi,
      expectedKpiOutcomes,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
          {submitLabel}
        </button>
        <Link
          href={cancelHref}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </Link>
      </div>
    </form>
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
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-900"
      >
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      <div className="mt-1">{children}</div>
    </div>
  );
}
