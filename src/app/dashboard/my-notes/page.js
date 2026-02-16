"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

const PAGE_SIZE = 6;

export default function MyNotes() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [selectedNote, setSelectedNote] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    text_content: "",
  });

  useEffect(() => {
    fetchNotes();
  }, [search, filter, page]);

  async function fetchNotes() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    let query = supabase
      .from("notes")
      .select("*", { count: "exact" })
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (filter !== "all") {
      query = query.eq("type", filter);
    }

    if (search) {
      query = query.ilike("title", `%${search}%`);
    }

    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, count } = await query.range(from, to);

    setNotes(data || []);
    setTotalCount(count || 0);
  }

  async function handleDelete(id) {
    await supabase.from("notes").delete().eq("id", id);
    setSelectedNote(null);
    fetchNotes();
  }

  function openEdit(note) {
    setSelectedNote(note);
    setEditMode(true);
    setFormData({
      title: note.title,
      text_content: note.text_content || "",
    });
  }

  async function handleUpdate() {
    await supabase
      .from("notes")
      .update({
        title: formData.title,
        text_content: formData.text_content,
      })
      .eq("id", selectedNote.id);

    setSelectedNote(null);
    setEditMode(false);
    fetchNotes();
  }

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="space-y-6">

      {/* Search + Filter */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="border px-3 py-2 rounded dark:bg-gray-700 dark:text-gray-100"
        />

        <select
          value={filter}
          onChange={(e) => {
            setPage(1);
            setFilter(e.target.value);
          }}
          className="border px-3 py-2 rounded dark:bg-gray-700 dark:text-gray-100"
        >
          <option
            value="all"
            className="hover:bg-yellow-400 hover:text-white"
          >
            All
          </option>
          <option
            value="text"
            className="hover:bg-yellow-400 hover:text-white"
          >
            Text
          </option>
          <option
            value="pdf"
            className="hover:bg-yellow-400 hover:text-white"
          >
            PDF
          </option>
          <option
            value="image"
            className="hover:bg-yellow-400 hover:text-white"
          >
            Image
          </option>
        </select>
      </div>

      {/* Notes Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-5 rounded-xl shadow border transition-colors duration-300"
          >
            <h3 className="font-semibold">{note.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{note.type}</p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setSelectedNote(note)}
                className="text-yellow-600 dark:text-yellow-400 text-sm"
              >
                View
              </button>

              <button
                onClick={() => openEdit(note)}
                className="text-green-600 dark:text-green-400 text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(note.id)}
                className="text-red-600 dark:text-red-400 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              page === i + 1
                ? "bg-yellow-400 text-white"
                : "dark:bg-gray-700 dark:text-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modal */}
      {selectedNote && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 sm:p-6">
          <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-xl w-full max-w-xl transition-colors duration-300 overflow-auto max-h-[90vh]">
            {editMode ? (
              <>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="border w-full p-2 mb-3 rounded dark:bg-gray-700 dark:text-gray-100"
                />

                {selectedNote.type === "pdf" && selectedNote.file_url && (
                  <iframe
                    src={selectedNote.file_url}
                    className="w-full h-[400px] sm:h-[500px] md:h-[500px] rounded"
                  />
                )}

                {selectedNote.type === "text" && (
                  <textarea
                    value={formData.text_content}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        text_content: e.target.value,
                      })
                    }
                    className="border w-full p-2 rounded dark:bg-gray-700 dark:text-gray-100"
                    rows={6}
                  />
                )}

                <button
                  onClick={handleUpdate}
                  className="bg-green-600 text-white px-4 py-2 mt-3 rounded"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <h2 className="font-bold text-xl mb-4">{selectedNote.title}</h2>

                {selectedNote.type === "text" && (
                  <p>{selectedNote.text_content}</p>
                )}

                {selectedNote.type === "pdf" && selectedNote.file_url && (
                  <iframe
                    src={selectedNote.file_url}
                    className="w-full h-[400px] sm:h-[500px] md:h-[500px] rounded"
                  />
                )}
              </>
            )}

            <button
              onClick={() => {
                setSelectedNote(null);
                setEditMode(false);
              }}
              className="mt-4 text-gray-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
