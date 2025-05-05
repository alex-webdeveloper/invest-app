// ui/ThemeToggle.tsx
'use client'

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const body = document.body;
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const systemTheme: Theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme: Theme = savedTheme || systemTheme;
    body.classList.remove('light', 'dark');
    body.classList.add(initialTheme);
    setTheme(initialTheme);
  }, [])

  const handleClick = () => {
    const body = document.body;
    const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    body.classList.remove('light', 'dark');
    body.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);

  }
  
  return (
    <button
      onClick={handleClick}
      className="cursor-pointer px-3 py-1"
    >
      {theme === 'dark' ? '☀️' : theme === 'light' ? '🌙' : null}
    </button>
  )
}
