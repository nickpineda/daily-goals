'use client';

import Link from 'next/link';

export default function Year() {
  const year = new Date().getFullYear();

  const months = Array.from({ length: 12 }, (_, i) => i);

  return (
    <main className="mx-auto max-w-xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold">{year}</h1>
      </div>

      <div className="grid grid-cols-3 gap-4 text-sm">
        {months.map(month => {
          const label = new Date(year, month).toLocaleDateString(undefined, {
            month: 'short',
          });

          return (
            <Link
              key={month}
              href="/month"
              className="border border-neutral-700 p-4 hover:bg-neutral-800 transition"
            >
              {label}
            </Link>
          );
        })}
      </div>
      <div className="grid grid-cols-2 gap-4">
  <div className="bg-red-500">A</div>
  <div className="bg-blue-500">B</div>
</div>

      {/* Footer nav */}
      <div className="mt-16 text-sm text-neutral-500">
        <a href="/" className="hover:text-neutral-300">Daily</a>
        <span className="mx-2">·</span>
        <a href="/week" className="hover:text-neutral-300">Week</a>
        <span className="mx-2">·</span>
        <a href="/month" className="hover:text-neutral-300">Month</a>
        <span className="mx-2">·</span>
        <span>Year</span>
      </div>
    </main>
  );
}