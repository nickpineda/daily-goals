'use client';

export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { getDayRecord, getDateKey } from '../../lib/dayStore';
/* ---------- Helpers ---------- */

function getLast7Days() {
  const days: { date: Date; key: string; label: string }[] = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    days.push({
      date,
      key: getDateKey(date),
      label: date.toLocaleDateString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }),
    });
  }

  return days;
}

/* ---------- Component ---------- */

export default function Week() {
  const days = getLast7Days();

  return (
    <main className="mx-auto max-w-xl px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold">Week</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Last 7 days
        </p>
      </div>

      {/* Days */}
      <div className="space-y-3">
        {days.map(day => {
          const record = getDayRecord(day.key);
          const count = record.completedGoals.length;

          return (
            <Link
              key={day.key}
              href={`/?date=${day.key}`}
              className="flex justify-between items-center border-b border-neutral-700 py-2 text-sm hover:text-neutral-300"
            >
              <span>{day.label}</span>
              <span className="text-neutral-500">
                {count}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Footer nav */}
      <div className="mt-16 text-sm text-neutral-500">
        <a href="/" className="hover:text-neutral-300">
          Daily
        </a>
        <span className="mx-2">·</span>
        <span>Week</span>
        <span className="mx-2">·</span>
        <a href="/month" className="hover:text-neutral-300">
          Month
        </a>
        <span className="mx-2">·</span>
        <a href="/year" className="hover:text-neutral-300">
          Year
        </a>
      </div>
    </main>
  );
}