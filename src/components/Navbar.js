// "use client";
// import { useContext } from "react";
// import { ThemeContext } from "../context/ThemeContext";
// import Link from "next/link";

// export default function Navbar() {
//   const { dark, setDark } = useContext(ThemeContext);

//   return (
//     <header
//       className={`w-full border-b border-gray-200 dark:border-gray-800 transition-colors duration-300 ${
//         dark ? "bg-[#0b0b0b]" : "bg-white"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

//         {/* LEFT: Logo */}
//         <div className="flex items-center gap-6">
//           <Link href="/">
//             <div className="text-2xl font-extrabold tracking-wide transition-colors duration-300">
//               <span className="text-yellow-400">Daily</span>
//               <span className={dark ? "text-white" : "text-black"}>Note</span>
//             </div>
//           </Link>
//         </div>

//         {/* CENTER: Navigation */}
//         <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold">
//           {/* Home */}
//            <Link href="/" className={`hover:text-yellow-400 transition-colors duration-300 ${dark ? "text-gray-300" : "text-gray-700"}`}>Home</Link>

          
//           {/* Subjects Dropdown */}
//           {/* <div className="relative group cursor-pointer">
//             <span className={`px-3 py-1 rounded transition-colors duration-200 ${dark ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"}`}>
//               Subjects ▾
//             </span>
//             <div className="absolute top-8 left-0 hidden group-hover:block rounded-md shadow-lg w-44 z-50">
//               <p className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-200 text-black dark:text-gray-300 bg-white dark:bg-[#121212]">
//                 Math
//               </p>
//               <p className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-200 text-black dark:text-gray-300 bg-white dark:bg-[#121212]">
//                 Physics
//               </p>
//               <p className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-200 text-black dark:text-gray-300 bg-white dark:bg-[#121212]">
//                 Chemistry
//               </p>
//               <p className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-200 text-black dark:text-gray-300 bg-white dark:bg-[#121212]">
//                 Computer Science
//               </p>
//               <p className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-200 text-black dark:text-gray-300 bg-white dark:bg-[#121212]">
//                 English
//               </p>
//               <p className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-200 text-black dark:text-gray-300 bg-white dark:bg-[#121212]">
//                 Urdu
//               </p>
//             </div>
//           </div> */}

//           {/* Classes Dropdown */}
//           {/* <div className="relative group cursor-pointer">
//             <span className={`px-3 py-1 rounded transition-colors duration-200 ${dark ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"}`}>
//               Classes ▾
//             </span>
//             <div className="absolute top-8 left-0 hidden group-hover:block rounded-md shadow-lg w-36 z-50">
              
//               <p className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-200 text-black dark:text-gray-300 bg-white dark:bg-[#121212]">
//                 Class 9
//               </p>
//               <p className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-200 text-black dark:text-gray-300 bg-white dark:bg-[#121212]">
//                 Class 10
//               </p>
//               <p className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-200 text-black dark:text-gray-300 bg-white dark:bg-[#121212]">
//                 Class 11
//               </p>
//               <p className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-200 text-black dark:text-gray-300 bg-white dark:bg-[#121212]">
//                 Class 12
//               </p>
//             </div>
//           </div> */}

//           {/* About & Contact */}
//           <Link href="/about" className={`hover:text-yellow-400 transition-colors duration-300 ${dark ? "text-gray-300" : "text-gray-700"}`}>About</Link>
//           <Link href="/faq" className={`hover:text-yellow-400 transition-colors duration-300 ${dark ? "text-gray-300" : "text-gray-700"}`}>FAQ's</Link>
//           <Link href="/tips" className={`hover:text-yellow-400 transition-colors duration-300 ${dark ? "text-gray-300" : "text-gray-700"}`}>Tips</Link>
//          <Link href="/contact" className={`hover:text-yellow-400 transition-colors duration-300 ${dark ? "text-gray-300" : "text-gray-700"}`}>Contact</Link>
//         </nav>

//         {/* RIGHT: Auth + Toggle */}
//         <div className="flex items-center gap-4">
//           <Link
//             href="/signup"
//             className={`px-6 py-2 font-semibold rounded-full transition ${
//               dark
//                 ? "bg-yellow-500 text-black hover:bg-yellow-400"
//                 : "bg-black text-white hover:bg-gray-800"
//             }`}
//           >
//             Signup
//           </Link>
//           <Link
//             href="/login"
//             className={`px-6 py-2 font-semibold rounded-full transition ${
//               dark
//                 ? "bg-gray-800 text-white hover:bg-gray-700"
//                 : "bg-white text-black border border-gray-300 hover:bg-gray-100"
//             }`}
//           >
//             Login
//           </Link>

//           {/* Dark/Light Toggle */}
//           <button
//             onClick={() => setDark(!dark)}
//             className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition"
//           >
//             {dark ? "🌙" : "☀️"}
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }

"use client";

import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Link from "next/link";
import { supabase } from "../lib/supabase";

export default function Navbar() {
  const { dark, setDark } = useContext(ThemeContext);
  const [user, setUser] = useState(null);

  // Check if user is logged in
  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();

    // Subscribe to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // Logout function
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <header
      className={`w-full border-b border-gray-200 dark:border-gray-800 transition-colors duration-300 ${
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
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold">
          <Link
            href="/"
            className={`hover:text-yellow-400 transition-colors duration-300 ${
              dark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`hover:text-yellow-400 transition-colors duration-300 ${
              dark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            About
          </Link>
          <Link
            href="/faq"
            className={`hover:text-yellow-400 transition-colors duration-300 ${
              dark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            FAQ's
          </Link>
          <Link
            href="/tips"
            className={`hover:text-yellow-400 transition-colors duration-300 ${
              dark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Tips
          </Link>
          <Link
            href="/contact"
            className={`hover:text-yellow-400 transition-colors duration-300 ${
              dark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Contact
          </Link>

          {/* Show Dashboard only if user is logged in */}
          {user && (
            <Link
              href="/dashboard"
              className={`hover:text-yellow-400 transition-colors duration-300 ${
                dark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* RIGHT: Auth + Toggle */}
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link
                href="/signup"
                className={`px-6 py-2 font-semibold rounded-full transition ${
                  dark
                    ? "bg-yellow-500 text-black hover:bg-yellow-400"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                Signup
              </Link>
              <Link
                href="/login"
                className={`px-6 py-2 font-semibold rounded-full transition ${
                  dark
                    ? "bg-gray-800 text-white hover:bg-gray-700"
                    : "bg-white text-black border border-gray-300 hover:bg-gray-100"
                }`}
              >
                Login
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className={`px-6 py-2 font-semibold rounded-full transition ${
                dark
                  ? "bg-red-600 text-white hover:bg-red-500"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
            >
              Logout
            </button>
          )}

          {/* Dark/Light Toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {dark ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </header>
  );
}
