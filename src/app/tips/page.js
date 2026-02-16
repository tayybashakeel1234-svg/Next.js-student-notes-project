"use client";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function Tips() {
  const { dark } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${dark ? "bg-[#0b0b0b]" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-6 py-24">
        <h1 className={`text-5xl font-extrabold mb-12 transition-colors duration-500 ${dark ? "text-white" : "text-gray-900"}`}>
          Note-Taking Tips
        </h1>

        <div className="grid gap-8 md:grid-cols-2">
          <div className={`p-6 rounded-lg shadow-md transition-colors duration-500 ${dark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}>
            <h3 className="text-2xl font-bold mb-3">Organize Your Notes</h3>
            <p>Sort your notes by subject, category, or date to quickly find them whenever needed.</p>
          </div>

          <div className={`p-6 rounded-lg shadow-md transition-colors duration-500 ${dark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}>
            <h3 className="text-2xl font-bold mb-3">Use Headings & Bullet Points</h3>
            <p>Headings and bullet points make your notes clear and easy to read.</p>
          </div>

          <div className={`p-6 rounded-lg shadow-md transition-colors duration-500 ${dark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}>
            <h3 className="text-2xl font-bold mb-3">Highlight Important Points</h3>
            <p>Use colors, bold text, or underlines to mark key points in your notes.</p>
          </div>

          <div className={`p-6 rounded-lg shadow-md transition-colors duration-500 ${dark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}>
            <h3 className="text-2xl font-bold mb-3">Review Regularly</h3>
            <p>Revisiting notes periodically helps retain information and improves learning.</p>
          </div>

          <div className={`p-6 rounded-lg shadow-md transition-colors duration-500 ${dark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}>
            <h3 className="text-2xl font-bold mb-3">Add Visuals</h3>
            <p>Include diagrams, charts, or images to better understand complex topics.</p>
          </div>

          <div className={`p-6 rounded-lg shadow-md transition-colors duration-500 ${dark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}>
            <h3 className="text-2xl font-bold mb-3">Keep it Concise</h3>
            <p>Focus on key points. Avoid writing long paragraphs to make notes faster and clearer.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
