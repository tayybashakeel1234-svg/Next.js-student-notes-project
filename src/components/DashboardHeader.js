"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function DashboardHeader({ onMenuToggle }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error) {
        setUser(data.user);
      }
    };
    getUser();
  }, []);

  return (
    <header className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Hamburger menu only on mobile */}
        <button
          onClick={onMenuToggle}
          className="p-2 border border-gray-300 dark:border-gray-700 rounded md:hidden"
        >
          ☰
        </button>

        {/* User email always visible on desktop */}
        <div className="hidden md:block">
          {user ? user.email : "Loading..."}
        </div>
      </div>
    </header>
  );
}
