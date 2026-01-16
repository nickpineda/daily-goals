'use client';

import Link from 'next/link';

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const days: (Date | null)[] = [];

  // Empty cells before first day
  for (let i = 0; i < firstDay.getDay(); i++) {
    days.push(null);
  }

  // Actual days
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(new Date(year, month, d));
  }

  return days;
}

export default function Month() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const days = getCalendarDays(year, month);

  const monthLabel = now.toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  });

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <main className="mx-auto max-w-xl px-6 py-12">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">{monthLabel}</h1>
      </div>

      {/* Weekday header row */}
      <div className="grid grid-cols-7 text-xs text-neutral-500 mb-2">
        {weekdays.map(d => (
          <div key={d} className="text-center">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, idx) => {
          if (!date) {
            return <div key={idx} />;
          }

          const key = date.toISOString().split('T')[0];
          const completed = JSON.parse(
            localStorage.getItem(`daily-${key}`) || '[]'
          );

          return (
            <Link
              key={key}
              href={`/?date=${key}`}
              className="border border-neutral-700 p-2 hover:bg-neutral-800 transition"
            >
              <div className="text-xs text-neutral-400">
                {date.getDate()}
              </div>
              {completed.length > 0 && (
                <div className="text-[10px] text-neutral-500 mt-1">
                  {completed.length}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer nav */}
      <div className="mt-16 text-sm text-neutral-500">
        <a href="/" className="hover:text-neutral-300">Daily</a>
        <span className="mx-2">·</span>
        <a href="/week" className="hover:text-neutral-300">Week</a>
        <span className="mx-2">·</span>
        <span>Month</span>
        <span className="mx-2">·</span>
        <a href="/year" className="hover:text-neutral-300">Year</a>
      </div>
    </main>
  );
}