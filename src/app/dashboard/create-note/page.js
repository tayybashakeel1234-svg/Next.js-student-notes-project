"use client";
import NoteForm from "../../../components/NoteForm";


export default function CreateNotePage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Create New Note</h2>
      <NoteForm />
    </div>
  );
}

// export default function CreateNote() {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow border">
//       <h2 className="text-xl font-semibold mb-4">Create Note</h2>
//       <p>Note form will go here.</p>
//     </div>
//   );
// }
