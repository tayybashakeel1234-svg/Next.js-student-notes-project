"use client";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function NoteCard({ note }) {
  const router = useRouter();

  const deleteNote = async () => {
    const { error } = await supabase.from("notes").delete().eq("id", note.id);
    if (error) return alert(error.message);
    router.refresh();
  };

  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded shadow flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-lg">{note.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          {note.subjects?.name} {note.subjects?.class && `(${note.subjects.class})`}
        </p>
        {note.file_url && (
          <a href={note.file_url} target="_blank" className="text-yellow-400 text-sm">
            View File
          </a>
        )}
      </div>
      <div className="flex justify-between mt-2">
        <button onClick={() => router.push(`/dashboard/edit-note/${note.id}`)} className="text-yellow-400">Edit</button>
        <button onClick={deleteNote} className="text-red-500">Delete</button>
      </div>
    </div>
  );
}
