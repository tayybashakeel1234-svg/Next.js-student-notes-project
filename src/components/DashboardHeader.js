// "use client";

// export default function DashboardHeader({ title }) {
//   return (
//     <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow">
//       <h2 className="text-2xl font-bold">{title}</h2>
//     </header>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function DashboardHeader() {
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
    <header className="bg-white  dark:bg-gray-800 text-gray-900 dark:text-gray-100 ... shadow px-6 py-4 flex justify-between items-center">

      <h1 className="text-xl font-semibold">
        Dashboard
      </h1>

      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ...">
        {user ? user.email : "Loading..."}
      </div>

    </header>
  );
}
