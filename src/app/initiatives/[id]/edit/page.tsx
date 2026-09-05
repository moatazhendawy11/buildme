"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { InitiativeForm, type InitiativeFormValues } from "@/components/InitiativeForm";
import { useInitiatives } from "@/lib/storage";

export default function EditInitiativePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [initiatives, setInitiatives] = useInitiatives();

  if (initiatives === null) {
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

  function handleUpdate(values: InitiativeFormValues) {
    const now = new Date().toISOString();
    const updated = initiatives!.map((item) =>
      item.id === id ? { ...item, ...values, updatedAt: now } : item
    );
    setInitiatives(updated);
    router.push(`/initiatives/${id}`);
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link
        href={`/initiatives/${id}`}
        className="text-sm text-gray-500 hover:text-gray-900"
      >
        ← Back to {initiative.name}
      </Link>

      <h1 className="mt-4 text-2xl font-semibold tracking-tight">
        Edit initiative
      </h1>

      <div className="mt-8">
        <InitiativeForm
          initialValues={initiative}
          onSubmit={handleUpdate}
          cancelHref={`/initiatives/${id}`}
          submitLabel="Save changes"
        />
      </div>
    </main>
  );
}
