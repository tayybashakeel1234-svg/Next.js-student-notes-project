"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import NoteForm from "../../../components/NoteForm";

export default function EditNotePage() {
  const router = useRouter();
  const params = useParams(); // Next.js App Router dynamic params
  const [noteData, setNoteData] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push("/dashboard");

      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("id", params.id)
        .single();
      if (error) return alert(error.message);
      setNoteData(data);
    };
    fetchNote();
  }, [params.id]);

  if (!noteData) return <p>Loading...</p>;

  return <NoteForm noteData={noteData} isEdit={true} />;
}
