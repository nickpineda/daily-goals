'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ThemeToggle from '../components/ThemeToggle';
import {
  getDayRecord,
  setDayRecord,
  getDateKey,
  parseDateKey,
} from '../lib/dayStore';

const GOALS_KEY = 'goals';

export default function Home() {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get('date');

  // SOURCE OF TRUTH: URL
  const activeDate = dateParam
    ? parseDateKey(dateParam)
    : new Date();

  const dateKey = getDateKey(activeDate);

  const label = activeDate.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  const [goals, setGoals] = useState<string[]>([]);
  const [completed, setCompleted] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [newGoal, setNewGoal] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(GOALS_KEY);
    setGoals(saved ? JSON.parse(saved) : ['Exercise', 'Write', 'Learn']);
  }, []);

  useEffect(() => {
    localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    const record = getDayRecord(dateKey);
    setCompleted(record.completedGoals);
    setNotes(record.notes);
  }, [dateKey]);

  useEffect(() => {
    setDayRecord(dateKey, { completedGoals: completed, notes });
  }, [completed, notes, dateKey]);

  const toggleGoal = (goal: string) => {
    setCompleted(prev =>
      prev.includes(goal)
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const addGoal = () => {
    if (!newGoal.trim()) return;
    setGoals(prev => [...prev, newGoal.trim()]);
    setNewGoal('');
  };

  const goToToday = () => {
    const todayKey = getDateKey(new Date());
    window.location.href = `/?date=${todayKey}`;
  };

  return (
    <main className="mx-auto max-w-xl px-6 py-12">
      <div className="flex justify-between items-baseline mb-10">
        <div>
          <h1 className="text-3xl font-semibold">{label}</h1>
          <p className="text-sm text-neutral-500 mt-1">
            {dateKey === getDateKey(new Date()) ? 'Today' : 'Viewing'}
          </p>
        </div>
        <ThemeToggle />
      </div>

      <div className="space-y-2">
        {goals.map(goal => {
          const done = completed.includes(goal);
          return (
            <div
              key={goal}
              className={`flex justify-between py-1 ${done ? 'opacity-40' : ''}`}
            >
              <label className="flex gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={done}
                  onChange={() => toggleGoal(goal)}
                />
                <span className="text-lg">{goal}</span>
              </label>
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        <input
          value={newGoal}
          onChange={e => setNewGoal(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addGoal()}
          placeholder="Add a goal"
          className="w-full bg-transparent border-b py-2"
        />
      </div>

      <div className="mt-10">
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          rows={4}
          placeholder="Notes…"
          className="w-full border rounded-md p-3 bg-transparent"
        />
      </div>

      <div className="mt-20 text-xs text-neutral-500 flex gap-3">
        <button onClick={goToToday} className="hover:text-neutral-300">
          Today
        </button>
        <span>·</span>
        <a href="/week">Week</a>
        <span>·</span>
        <a href="/month">Month</a>
        <span>·</span>
        <a href="/year">Year</a>
      </div>
    </main>
  );
}