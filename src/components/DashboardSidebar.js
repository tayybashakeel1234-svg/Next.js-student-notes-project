"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSidebar({ mobileOpen, onClose }) {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "My Notes", href: "/dashboard/my-notes" },
    { name: "Create Note", href: "/dashboard/create-note" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg hidden md:flex flex-col">
        <div className="p-6 text-2xl font-bold border-b">Student Notes</div>
        <nav className="flex-1 p-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-2 rounded-lg transition ${
                pathname === link.href
                  ? "bg-yellow-400 text-white"
                  : "text-black dark:text-gray-100 hover:bg-gray-200"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={onClose} // click outside to close
          />
          <div className="bg-white dark:bg-gray-800 w-64 p-6">
            <div className="text-2xl font-bold mb-6">Student Notes</div>
            <nav className="space-y-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose} // close sidebar on link click
                  className={`block px-4 py-2 rounded-lg transition ${
                    pathname === link.href
                      ? "bg-yellow-400 text-white"
                      : "text-black dark:text-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
