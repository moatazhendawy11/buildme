import Link from "next/link";

export default function ScoringSettingsPlaceholderPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-center">
      <p className="text-sm font-medium text-gray-900">
        Scoring settings aren&apos;t built yet
      </p>
      <p className="mt-1 text-sm text-gray-500">
        This is a later milestone — coming soon.
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
