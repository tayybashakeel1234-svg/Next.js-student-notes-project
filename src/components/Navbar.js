"use client";

import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Link from "next/link";
import { supabase } from "../lib/supabase";

export default function Navbar() {
  const { dark, setDark } = useContext(ThemeContext);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <>
      <header
        className={`w-full border-b border-gray-200 dark:border-gray-800 transition-colors duration-300 fixed top-0 left-0 z-50 ${
          dark ? "bg-[#0b0b0b]" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* LEFT: Logo */}
          <div className="flex items-center gap-6">
            <Link href="/">
              <div className="text-2xl font-extrabold tracking-wide transition-colors duration-300">
                <span className="text-yellow-400">Daily</span>
                <span className={dark ? "text-white" : "text-black"}>Note</span>
              </div>
            </Link>
          </div>

          {/* CENTER: Navigation */}
          <nav
            className={`lg:flex items-center gap-6 text-sm font-semibold
              ${menuOpen ? "flex flex-col absolute top-20 left-0 w-full bg-white dark:bg-[#0b0b0b] p-4 lg:p-0" : "hidden lg:flex"}
            `}
            style={{ zIndex: 60 }}
          >
            <Link href="/" className={`hover:text-yellow-400 transition-colors duration-300 ${dark ? "text-gray-300" : "text-gray-700"}`}>Home</Link>
            <Link href="/about" className={`hover:text-yellow-400 transition-colors duration-300 ${dark ? "text-gray-300" : "text-gray-700"}`}>About</Link>
            <Link href="/faq" className={`hover:text-yellow-400 transition-colors duration-300 ${dark ? "text-gray-300" : "text-gray-700"}`}>FAQ's</Link>
            <Link href="/tips" className={`hover:text-yellow-400 transition-colors duration-300 ${dark ? "text-gray-300" : "text-gray-700"}`}>Tips</Link>
            <Link href="/contact" className={`hover:text-yellow-400 transition-colors duration-300 ${dark ? "text-gray-300" : "text-gray-700"}`}>Contact</Link>
            {user && (
              <Link href="/dashboard" className={`hover:text-yellow-400 transition-colors duration-300 ${dark ? "text-gray-300" : "text-gray-700"}`}>Dashboard</Link>
            )}
          </nav>

          {/* RIGHT: Auth + Toggle + Hamburger */}
          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <Link href="/signup" className={`px-6 py-2 font-semibold rounded-full transition ${dark ? "bg-yellow-500 text-black hover:bg-yellow-400" : "bg-black text-white hover:bg-gray-800"}`}>Signup</Link>
                <Link href="/login" className={`px-6 py-2 font-semibold rounded-full transition ${dark ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white text-black border border-gray-300 hover:bg-gray-100"}`}>Login</Link>
              </>
            ) : (
              <button onClick={handleLogout} className={`px-6 py-2 font-semibold rounded-full transition ${dark ? "bg-red-600 text-white hover:bg-red-500" : "bg-red-500 text-white hover:bg-red-600"}`}>Logout</button>
            )}

            <button onClick={() => setDark(!dark)} className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              {dark ? "🌙" : "☀️"}
            </button>

            {/* Hamburger Menu (Mobile) */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden w-10 h-10 flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded">
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Push content down so it’s not hidden behind navbar */}
      <div className="h-20"></div>
    </>
  );
}
