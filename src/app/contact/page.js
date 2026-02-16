"use client";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function Contact() {
  const { dark } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been sent.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${dark ? "bg-[#0b0b0b]" : "bg-white"}`}>
      <div className="max-w-4xl mx-auto px-6 py-24">
        <h1 className={`text-5xl font-extrabold mb-6 transition-colors duration-500 ${dark ? "text-white" : "text-gray-900"}`}>
          Contact Us
        </h1>
        <p className={`mb-12 text-lg transition-colors duration-500 ${dark ? "text-gray-300" : "text-gray-700"}`}>
          Have a question or feedback? Send us a message and we'll get back to you as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className={`px-4 py-3 rounded-md border focus:outline-none transition-colors duration-500 ${
              dark
                ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-yellow-500"
            }`}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className={`px-4 py-3 rounded-md border focus:outline-none transition-colors duration-500 ${
              dark
                ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-yellow-500"
            }`}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            className={`px-4 py-3 rounded-md border focus:outline-none transition-colors duration-500 ${
              dark
                ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-yellow-500"
            }`}
            required
          />
          <button
            type="submit"
            className={`px-6 py-3 font-semibold rounded-full transition ${
              dark ? "bg-yellow-500 text-black hover:bg-yellow-400" : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
