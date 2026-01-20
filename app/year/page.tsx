'use client';

export const dynamic = 'force-dynamic';

import Link from 'next/link';

export default function Year() {
  const year = new Date().getFullYear();

  return (
    <main className="mx-auto max-w-xl px-6 py-12">
      <h1 className="text-3xl font-semibold mb-6">{year}</h1>

      <div className="space-y-2">
        {Array.from({ length: 12 }, (_, i) => {
          const label = new Date(year, i, 1).toLocaleDateString(undefined, {
            month: 'long',
          });

          return (
            <Link
              key={i}
              href="/month"
              className="border-b py-2 block hover:text-neutral-300"
            >
              {label}
            </Link>
          );
        })}
      </div>
    </main>
  );
}