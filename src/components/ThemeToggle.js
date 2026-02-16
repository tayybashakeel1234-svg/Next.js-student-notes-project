"use client";
import { useEffect, useState } from "react";


export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDark(!dark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-2 rounded-md border text-sm
                 bg-white text-gray-900
                 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
    >
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
