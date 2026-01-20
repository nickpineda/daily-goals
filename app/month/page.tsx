'use client';

export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { getDateKey, getDayRecord } from '../../lib/dayStore';

export default function Month() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);

  const days: (Date | null)[] = [];
  for (let i = 0; i < first.getDay(); i++) days.push(null);
  for (let d = 1; d <= last.getDate(); d++) {
    days.push(new Date(year, month, d));
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-12">
      <h1 className="text-3xl font-semibold mb-6">
        {first.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
      </h1>

      <div className="grid grid-cols-7 gap-1">
        {days.map((date, i) =>
          date ? (
            <Link
              key={i}
              href={{ pathname: '/', query: { date: getDateKey(date) } }}
              className="border p-2 text-xs hover:bg-neutral-800"
            >
              {date.getDate()}
            </Link>
          ) : (
            <div key={i} />
          )
        )}
      </div>
    </main>
  );
}