'use client';

export const dynamic = 'force-dynamic';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  getDayRecord,
  getDateKey,
} from '../../lib/dayStore';

/* ---------- Helpers ---------- */

function buildCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const cells: (Date | null)[] = [];

  // Padding before first weekday
  for (let i = 0; i < firstDay.getDay(); i++) {
    cells.push(null);
  }

  // Actual days
  for (let d = 1; d <= lastDay.getDate(); d++) {
    cells.push(new Date(year, month, d));
  }

  return cells;
}

/* ---------- Component ---------- */

export default function Month() {
  const searchParams = useSearchParams();
  const monthParam = searchParams.get('month');

  const now = new Date();
  const year = now.getFullYear();

  // ✅ FIX: respect month passed from Year view
  const month = monthParam
    ? Number(monthParam)
    : now.getMonth();

  const cells = buildCalendar(year, month);

  const monthLabel = new Date(year, month, 1).toLocaleDateString(
    undefined,
    { month: 'long', year: 'numeric' }
  );

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <main className="mx-auto max-w-xl px-6 py-12">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">{monthLabel}</h1>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 text-xs text-neutral-500 mb-2">
        {weekdays.map(d => (
          <div key={d} className="text-center">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} />;

          const key = getDateKey(date);
          const record = getDayRecord(key);
          const hasActivity =
            record.completedGoals.length > 0 ||
            record.notes.trim().length > 0;

          return (
            <Link
              key={key}
              href={`/?date=${key}`}
              className={`border border-neutral-700 p-2 transition hover:bg-neutral-800 ${
                hasActivity ? 'bg-neutral-900' : ''
              }`}
            >
              <div className="text-xs text-neutral-400">
                {date.getDate()}
              </div>
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
        <a href="/week" className="hover:text-neutral-300">
          Week
        </a>
        <span className="mx-2">·</span>
        <span>Month</span>
        <span className="mx-2">·</span>
        <a href="/year" className="hover:text-neutral-300">
          Year
        </a>
      </div>
    </main>
  );
}