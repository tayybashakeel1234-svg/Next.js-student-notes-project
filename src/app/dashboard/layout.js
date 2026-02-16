
"use client";

import DashboardSidebar from "../../components/DashboardSidebar";
import DashboardHeader from "../../components/DashboardHeader";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
  <DashboardSidebar />
  <div className="flex-1 flex flex-col border-l border-gray-200 dark:border-gray-700">
    <DashboardHeader />
    <main className="p-6 flex-1">{children}</main>
  </div>
</div>

  );
}
