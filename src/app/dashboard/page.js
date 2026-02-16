"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";



export default function DashboardHome() {
  const [notes, setNotes] = useState([]);
  const [pdfNotes, setPdfNotes] = useState([]);
  const [imageNotes, setImageNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userChecked, setUserChecked] = useState(false); // user auth check
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      // user not logged in, redirect to login page
      router.push("/login");
      return;
    }

    setUserChecked(true);
    fetchNotes();
  }

  async function fetchNotes() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setNotes(data || []);
    setPdfNotes((data || []).filter((n) => n.type === "pdf"));
    setImageNotes((data || []).filter((n) => n.type === "image"));
    setLoading(false);
  }

  // show nothing until user auth checked
  if (!userChecked) return null;

  return (
    <div className="space-y-6">

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Notes" value={notes.length} />
        <StatCard title="PDF Notes" value={pdfNotes.length} />
        <StatCard title="Image Notes" value={imageNotes.length} />
      </div>

      {/* Recent Notes */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-xl shadow-sm transition">
        <h2 className="text-lg font-semibold mb-4">
          Recent Notes
        </h2>

        {loading ? (
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        ) : notes.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No notes yet.</p>
        ) : (
          <div className="space-y-4">
            {notes.slice(0, 5).map((note) => (
              <div
                key={note.id}
                className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg bg-gray-50 dark:bg-gray-900"
              >
                <h3 className="font-semibold text-lg">
                  {note.title}
                </h3>

                {note.type === "text" && (
                  <p className="mt-2 text-gray-600 dark:text-gray-400 line-clamp-3">
                    {note.text_content || note.content}
                  </p>
                )}

                {note.type === "pdf" && note.file_url && (
                  <a
                    href={note.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-yellow-600 dark:text-yellow-400 underline"
                  >
                    Open PDF
                  </a>
                )}

                {note.type === "image" && note.file_url && (
                  <img
                    src={note.file_url}
                    alt={note.title}
                    className="mt-3 max-h-48 rounded"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-xl shadow-sm transition">
      <h3 className="text-gray-500 dark:text-gray-400 text-sm">
        {title}
      </h3>
      <p className="text-3xl font-bold mt-2">
        {value}
      </p>
    </div>
  );
}
