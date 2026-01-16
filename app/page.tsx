'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ThemeToggle from '../components/ThemeToggle';

/* ---------- Storage keys ---------- */

const GOALS_KEY = 'goals';

/* ---------- Component ---------- */

export default function Home() {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get('date');

  // Determine active date (today or from URL)
  const activeDate = dateParam ? new Date(dateParam) : new Date();
  const dateKey = activeDate.toISOString().split('T')[0];

  const todayLabel = activeDate.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  const COMPLETED_KEY = `daily-${dateKey}`;
  const NOTES_KEY = `notes-${dateKey}`;

  const [goals, setGoals] = useState<string[]>([]);
  const [completed, setCompleted] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [newGoal, setNewGoal] = useState('');

  /* ----- Load saved data for active date ----- */
  useEffect(() => {
    const savedGoals = localStorage.getItem(GOALS_KEY);
    const savedCompleted = localStorage.getItem(COMPLETED_KEY);
    const savedNotes = localStorage.getItem(NOTES_KEY);

    setGoals(
      savedGoals ? JSON.parse(savedGoals) : ['Exercise', 'Write', 'Learn']
    );

    setCompleted(savedCompleted ? JSON.parse(savedCompleted) : []);
    setNotes(savedNotes || '');
  }, [COMPLETED_KEY, NOTES_KEY]);

  /* ----- Persist data ----- */
  useEffect(() => {
    localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem(COMPLETED_KEY, JSON.stringify(completed));
  }, [completed, COMPLETED_KEY]);

  useEffect(() => {
    localStorage.setItem(NOTES_KEY, notes);
  }, [notes, NOTES_KEY]);

  /* ----- Actions ----- */
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

  const removeGoal = (goal: string) => {
    setGoals(prev => prev.filter(g => g !== goal));
    setCompleted(prev => prev.filter(g => g !== goal));
  };

  /* ---------- UI ---------- */

  return (
    <main className="mx-auto max-w-xl px-6 py-12">
      {/* Header */}
      <div className="flex justify-between items-baseline mb-10">
        <div>
          <h1 className="text-3xl font-semibold">Daily</h1>
          <p className="text-sm text-neutral-500 mt-1">{todayLabel}</p>
        </div>
        <ThemeToggle />
      </div>

      {/* Goals */}
      <div className="space-y-3">
        {goals.map(goal => {
          const isDone = completed.includes(goal);

          return (
            <div
              key={goal}
              className={`flex items-center justify-between transition-opacity ${
                isDone ? 'opacity-40' : 'opacity-100'
              }`}
            >
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={() => toggleGoal(goal)}
                />
                <span className="text-lg">{goal}</span>
              </label>

              <button
                onClick={() => removeGoal(goal)}
                className="text-xs text-neutral-400 hover:text-neutral-600"
              >
                remove
              </button>
            </div>
          );
        })}
      </div>

      {/* Add goal */}
      <div className="mt-8">
        <input
          type="text"
          value={newGoal}
          onChange={e => setNewGoal(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addGoal()}
          placeholder="Add a goal"
          className="w-full bg-transparent border-b border-neutral-300 py-2 text-sm focus:outline-none"
        />
      </div>

      {/* Notes */}
      <div className="mt-10">
        <p className="text-sm text-neutral-500 mb-2">Notes</p>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Anything worth remembering today…"
          rows={4}
          className="w-full bg-transparent border border-neutral-300 rounded-md p-3 text-sm focus:outline-none"
        />
      </div>

      {/* Footer nav */}
      <div className="mt-16 text-sm text-neutral-500">
        <span>Daily</span>
        <span className="mx-2">·</span>
        <a href="/week" className="hover:text-neutral-300">Week</a>
        <span className="mx-2">·</span>
        <a href="/month" className="hover:text-neutral-300">Month</a>
        <span className="mx-2">·</span>
        <a href="/year" className="hover:text-neutral-300">Year</a>
      </div>
    </main>
  );
}