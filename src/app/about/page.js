"use client";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function About() {
  const { dark } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${dark ? "bg-[#0b0b0b]" : "bg-white"}`}>
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden">
        <span className={`absolute rounded-full w-32 h-32 top-10 left-10 opacity-20 bg-yellow-400 animate-pulse`}></span>
        <span className={`absolute rounded-full w-48 h-48 bottom-10 right-10 opacity-15 bg-blue-500 animate-pulse`}></span>

        <div className="flex-1 text-center lg:text-left z-10">
          <h1 className={`text-5xl lg:text-6xl font-extrabold mb-6 transition-colors duration-500 ${dark ? "text-white" : "text-gray-900"}`}>
            About DailyNote
          </h1>
          <p className={`text-lg lg:text-xl mb-4 transition-colors duration-500 ${dark ? "text-gray-300" : "text-gray-700"}`}>
            DailyNote is a dedicated platform for students to create, organize, and manage their study notes efficiently.
          </p>
          <p className={`text-md lg:text-lg mb-6 transition-colors duration-500 ${dark ? "text-gray-400" : "text-gray-600"}`}>
            Access your notes anywhere, categorize by subjects or classes, and stay on top of your studies effortlessly.
          </p>
        </div>

        <div className="flex-1 flex justify-center lg:justify-end z-10">
          <div className="overflow-hidden rounded-lg shadow-xl transition-transform duration-500 hover:scale-105">
            <img
              src="https://i0.wp.com/highschool.latimes.com/wp-content/uploads/2019/01/45692459364_2d91368a04_z.jpg?fit=640%2C427&ssl=1"
              alt="About Illustration"
              className="w-full max-w-md"
            />
          </div>
        </div>
      </div>

       {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {/* Feature 1 */}
        <div className={`p-6 rounded-lg shadow-md transition-colors duration-500 ${dark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}>
          <h3 className="text-2xl font-bold mb-3">Organize Notes</h3>
          <p>Sort your notes by subjects, classes, or custom categories to find them easily whenever you need.</p>
        </div>
        {/* Feature 2 */}
        <div className={`p-6 rounded-lg shadow-md transition-colors duration-500 ${dark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}>
          <h3 className="text-2xl font-bold mb-3">Access Anywhere</h3>
          <p>All your notes are stored online, so you can access them on any device, anytime, from anywhere.</p>
        </div>
        {/* Feature 3 */}
        <div className={`p-6 rounded-lg shadow-md transition-colors duration-500 ${dark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}>
          <h3 className="text-2xl font-bold mb-3">Create Quickly</h3>
          <p>Create new notes in seconds with an easy-to-use editor. Focus on learning, not formatting.</p>
        </div>
        {/* Feature 4 */}
        <div className={`p-6 rounded-lg shadow-md transition-colors duration-500 ${dark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}>
          <h3 className="text-2xl font-bold mb-3">Track Progress</h3>
          <p>Keep track of which subjects or topics you have completed and stay on top of your learning goals.</p>
        </div>
        {/* Feature 5 */}
        <div className={`p-6 rounded-lg shadow-md transition-colors duration-500 ${dark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}>
          <h3 className="text-2xl font-bold mb-3">Search Notes</h3>
          <p>Quickly search through your notes using keywords or tags to find exactly what you need.</p>
        </div>
        {/* Feature 6 */}
        <div className={`p-6 rounded-lg shadow-md transition-colors duration-500 ${dark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}>
          <h3 className="text-2xl font-bold mb-3">Secure & Private</h3>
          <p>Your notes are private and secure, accessible only to you after signing in.</p>
        </div>
      </div>


    </div>
  );
}


