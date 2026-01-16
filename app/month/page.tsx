'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type DayCell = {
  date: Date;
  key: string;
  completed: number;
};

function buildCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const cells: (DayCell | null)[] = [];

  // Padding before first weekday
  for (let i = 0; i < firstDay.getDay(); i++) {
    cells.push(null);
  }

  // Actual days
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const date = new Date(year, month, d);
    const key = date.toISOString().split('T')[0];
    cells.push({ date, key, completed: 0 });
  }

  return cells;
}

export default function Month() {
  const [cells, setCells] = useState<(DayCell | null)[]>([]);

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const calendar = buildCalendar(year, month).map(cell => {
      if (!cell) return null;

      const stored =
        typeof window !== 'undefined'
          ? JSON.parse(localStorage.getItem(`daily-${cell.key}`) || '[]')
          : [];

      return {
        ...cell,
        completed: stored.length,
      };
    });

    setCells(calendar);
  }, []);

  const monthLabel = new Date().toLocaleDateString(undefined, {
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
        {cells.map((cell, i) =>
          cell ? (
            <Link
              key={cell.key}
              href={`/?date=${cell.key}`}
              className="border border-neutral-700 p-2 hover:bg-neutral-800 transition"
            >
              <div className="text-xs text-neutral-400">
                {cell.date.getDate()}
              </div>
              {cell.completed > 0 && (
                <div className="text-[10px] text-neutral-500 mt-1">
                  {cell.completed}
                </div>
              )}
            </Link>
          ) : (
            <div key={`empty-${i}`} />
          )
        )}
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