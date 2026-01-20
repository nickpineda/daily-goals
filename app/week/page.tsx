'use client';

export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { getDateKey, getDayRecord } from '../../lib/dayStore';

export default function Week() {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay());

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });

  return (
    <main className="mx-auto max-w-xl px-6 py-12">
      <h1 className="text-3xl font-semibold mb-6">Week</h1>

      <div className="space-y-3">
        {days.map(date => {
          const key = getDateKey(date);
          const record = getDayRecord(key);
          return (
            <Link
              key={key}
              href={{ pathname: '/', query: { date: key } }}
              className="flex justify-between border-b py-2"
            >
              <span>
                {date.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' })}
              </span>
              <span className="text-xs text-neutral-400">
                {record.completedGoals.length}
              </span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}