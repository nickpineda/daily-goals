'use client';

export const dynamic = 'force-dynamic';

import Link from 'next/link';

function getLast7Days() {
  const days = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);

    days.push({
      key: d.toISOString().split('T')[0],
      label: d.toLocaleDateString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }),
    });
  }

  return days;
}

export default function Week() {
  const goals =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('goals') || '[]')
      : [];

  const days = getLast7Days();

  return (
    <main className="mx-auto max-w-xl px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold">Week</h1>
        <p className="text-sm text-neutral-500 mt-1">Last 7 days</p>
      </div>

      {/* Days */}
      <div className="space-y-3">
        {days.map(day => {
          const completed = JSON.parse(
            localStorage.getItem(`daily-${day.key}`) || '[]'
          );

          return (
            <div
              key={day.key}
              className="flex justify-between border-b border-neutral-700 py-2 text-sm"
            >
              <span>{day.label}</span>
              <span className="text-neutral-500">
                {completed.length} / {goals.length}
              </span>
            </div>
          );
        })}
      </div>

      {/* Back link */}
      <div className="mt-10">
        <Link
          href="/"
          className="text-sm text-neutral-500 hover:text-neutral-300"
        >
          {/* Footer nav */}
<div className="mt-16 text-sm text-neutral-500">
  <a
    href="/"
    className="hover:text-neutral-300"
  >
    Daily
  </a>
  <span className="mx-2">·</span>
  <span>Week</span>
</div>
<div className="grid grid-cols-2 gap-4 mt-8">

</div>
        </Link>
      </div>
    </main>
  );
}