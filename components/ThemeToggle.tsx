'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const saved =
      (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    document.documentElement.dataset.theme = saved;
    setTheme(saved);
  }, []);

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
    setTheme(next);
  };

  return (
    <button
      onClick={toggle}
      className="text-sm text-neutral-500 hover:text-neutral-800"
    >
      Theme: {theme === 'light' ? 'Light' : 'Dark'}
    </button>
  );
}