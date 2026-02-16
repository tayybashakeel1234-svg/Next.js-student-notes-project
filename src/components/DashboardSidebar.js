"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "My Notes", href: "/dashboard/my-notes" },
    { name: "Create Note", href: "/dashboard/create-note" },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ... shadow-lg hidden md:flex flex-col">

      <div className="p-6 text-2xl font-bold border-b">
        Student Notes
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block text-gray-900 dark:text-gray-100 ... px-4 py-2 rounded-lg transition ${
              pathname === link.href
                ? "bg-yellow-400 text-white"
                : "text-black hover:bg-gray-200"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>

    </aside>
  );
}
