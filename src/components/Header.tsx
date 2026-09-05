"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Initiatives" },
  { href: "/settings", label: "Scoring settings" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-gray-900"
        >
          BuildMe
        </Link>
        <nav className="flex items-center gap-4">
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/" || pathname.startsWith("/initiatives")
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  active
                    ? "text-sm font-medium text-gray-900"
                    : "text-sm font-medium text-gray-500 hover:text-gray-900"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
