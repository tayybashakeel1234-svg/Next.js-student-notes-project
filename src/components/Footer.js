"use client";

import { useContext } from "react";
import { usePathname } from "next/navigation";

import { ThemeContext } from "../context/ThemeContext";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  const { dark } = useContext(ThemeContext);
    const pathname = usePathname();

     // Routes where footer should NOT appear
  const hideOnRoutes = ["/signup", "/login", "/dashboard"];

  // Hide footer for dashboard subroutes also (e.g., /dashboard/notes)
  const shouldHide =
    hideOnRoutes.includes(pathname) ||
    pathname.startsWith("/dashboard");

  if (shouldHide) return null;

  return (
    <footer className={`w-full transition-colors duration-500 ${dark ? "bg-[#0b0b0b] text-gray-300" : "bg-gray-100 text-gray-700"}`}>
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="text-2xl font-extrabold mb-4 flex items-center gap-2">
            <span className="text-yellow-400">Daily</span>
            <span className={dark ? "text-white" : "text-black"}>Note</span>
          </div>
          <p className="text-sm">
            DailyNote helps students organize their notes, access anywhere, and manage study materials efficiently.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-yellow-400 transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-yellow-400 transition-colors">About</Link></li>
            <li><Link href="/contact" className="hover:text-yellow-400 transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Connect & Useful Links</h3>
          <div className="flex gap-4 mb-4">
            <a href="#" className="hover:text-yellow-400 transition-colors"><FaFacebookF /></a>
            <a href="#" className="hover:text-yellow-400 transition-colors"><FaTwitter /></a>
            <a href="#" className="hover:text-yellow-400 transition-colors"><FaInstagram /></a>
            <a href="#" className="hover:text-yellow-400 transition-colors"><FaLinkedinIn /></a>
          </div>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-yellow-400 transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-yellow-400 transition-colors">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>

      <div className={`border-t ${dark ? "border-gray-800" : "border-gray-300"} py-4 mt-8 text-center text-sm`}>
        &copy; {new Date().getFullYear()} DailyNote. All rights reserved.
      </div>
    </footer>
  );
}
