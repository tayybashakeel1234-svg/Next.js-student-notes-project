"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function NoteForm() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("text");
  const [textContent, setTextContent] = useState("");
  const [file, setFile] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first!");
      return;
    }

    let file_url = "";

    if (file && (type === "pdf" || type === "image")) {
      const folder = type === "pdf" ? "pdfs" : "images";
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;

      // Upload file
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(folder)
        .upload(`user-${user.id}/${fileName}`, file);

      if (uploadError) {
        console.log("Upload error:", uploadError);
        return;
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from(folder)
        .getPublicUrl(uploadData.path);

      file_url = publicUrlData.publicUrl;
    }

    const { error } = await supabase.from("notes").insert([
      {
        title,
        type,
        text_content: type === "text" ? textContent : null,
        file_url: type !== "text" ? file_url : null,
        user_id: user.id,
      },
    ]);

    if (error) {
      console.log("Error saving note:", error);
      return;
    }

    alert("Note created successfully!");
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-xl shadow space-y-4 transition-colors duration-300"
    >
      <h2 className="text-xl font-semibold">Create Note</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full rounded dark:bg-gray-700 dark:text-gray-100"
        required
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border p-2 w-full rounded dark:bg-gray-700 dark:text-gray-100"
      >
        <option value="text">Text</option>
        <option value="pdf">PDF</option>
        <option value="image">Image</option>
      </select>

      {type === "text" && (
        <textarea
          placeholder="Write your note..."
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
          className="border p-2 w-full rounded dark:bg-gray-700 dark:text-gray-100"
          required
        />
      )}

      {(type === "pdf" || type === "image") && (
        <input
          type="file"
          accept={type === "pdf" ? ".pdf" : "image/*"}
          onChange={(e) => setFile(e.target.files[0])}
          required
          className="dark:text-gray-100"
        />
      )}

      <button
        type="submit"
        className="bg-yellow-400 text-white px-4 py-2 rounded"
      >
        Create Note
      </button>
    </form>
  );
}
