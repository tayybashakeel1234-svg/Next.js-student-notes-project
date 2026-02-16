"use client";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function FAQ() {
  const { dark } = useContext(ThemeContext);

  const faqData = [
    {
      question: "How do I create a note?",
      answer: 'Create a note by going to your dashboard and clicking "Create Note". Fill the title and content, then save.',
    },
    {
      question: "Can I edit or delete notes?",
      answer: 'Yes, open "My Notes" in your dashboard. Click the note to edit or use delete button to remove it.',
    },
    {
      question: "Is my data safe?",
      answer: 'Yes, all notes are securely saved. Only you can access your notes unless you choose to share them.',
    },
    {
      question: "Can I access notes anywhere?",
      answer: 'Yes, all notes are online. You can access them from any device after signing in.',
    },
    {
      question: "Is there a limit to how many notes I can create?",
      answer: 'No, you can create as many notes as you need. Our platform is designed to handle all your study material.',
    },
    {
      question: "Can I search through my notes quickly?",
      answer: 'Absolutely! Use the search bar in your dashboard to find any note instantly by title or keyword.',
    },
    {
      question: "Can I share my notes with friends?",
      answer: 'Yes, you can generate a shareable link to your notes for collaboration or group studies.',
    },
    {
      question: "Do I need an internet connection to access notes?",
      answer: 'Yes, our platform works online. Notes are saved in the cloud, so you need internet to access or update them.',
    },
    {
      question: "What if I forget my password?",
      answer: 'No worries! Use the "Forgot Password" option on the login page to reset your password securely.',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${dark ? "bg-[#0b0b0b]" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-6 py-32 relative">

        {/* Soft background circles */}
        <span className="absolute top-0 left-0 w-72 h-72 rounded-full bg-yellow-400 opacity-10 -z-10"></span>
        <span className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-yellow-400 opacity-10 -z-10"></span>

        {/* Page Heading */}
        <h1 className={`text-4xl md:text-5xl font-extrabold mb-20 text-center ${dark ? "text-white" : "text-gray-900"}`}>
          Frequently Asked Questions
        </h1>

        {/* FAQ Grid */}
        <div className="grid gap-8 md:grid-cols-2">

          {faqData.map((item, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl shadow-lg border border-transparent transition-all duration-300 hover:shadow-2xl hover:border-yellow-500 cursor-pointer ${
                dark ? "bg-[#1a1a1a] text-gray-300" : "bg-gray-50 text-gray-800"
              }`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-2xl md:text-2xl font-semibold">{item.question}</h3>
                <span className={`text-yellow-500 text-3xl transform transition-transform duration-300 ${activeIndex === index ? "rotate-45" : "rotate-0"}`}>+</span>
              </div>
              {activeIndex === index && (
                <p className="mt-4 text-gray-400">{item.answer}</p>
              )}
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
