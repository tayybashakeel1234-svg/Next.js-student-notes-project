"use client";
// import { useContext } from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Link from "next/link";

export default function Home() {
  const { dark } = useContext(ThemeContext);

  const testimonials = [
  {
    name: "Ayesha Khan",
    role: "Computer Science Student",
    review:
      "This platform keeps all my notes structured and easy to access before exams.",
  },
  {
    name: "Ali Raza",
    role: "Engineering Student",
    review:
      "I love how simple and fast it is. Managing study material has never been easier.",
  },
  {
    name: "Fatima Noor",
    role: "Business Student",
    review:
      "Clean interface, secure storage, and available anytime. Exactly what students need.",
  },
];

const [currentIndex, setCurrentIndex] = useState(0);

// Auto Slide
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  }, 4000);

  return () => clearInterval(interval);
}, []);


const statsRef = useRef(null);
const [startCount, setStartCount] = useState(false);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setStartCount(true);
      }
    },
    { threshold: 0.4 }
  );

  if (statsRef.current) {
    observer.observe(statsRef.current);
  }

  return () => {
    if (statsRef.current) {
      observer.unobserve(statsRef.current);
    }
  };
}, []);

const Counter = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCount) return;

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(counter);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [startCount, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};


  return (
    <div className={`min-h-screen transition-colors duration-500 ${dark ? "bg-[#0b0b0b]" : "bg-white"}`}>

      {/* ================= HERO SECTION ================= */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-12 py-24 relative overflow-hidden">

        <span className="absolute rounded-full w-32 h-32 top-10 left-10 opacity-20 bg-yellow-400 animate-pulse"></span>
        <span className="absolute rounded-full w-48 h-48 bottom-10 right-10 opacity-15 bg-blue-500 animate-pulse"></span>

        <div className="flex-1 text-center lg:text-left z-10">
          <h1 className={`text-5xl lg:text-6xl font-extrabold mb-6 leading-tight ${dark ? "text-white" : "text-gray-900"}`}>
            Create and Organize Notes Easily
          </h1>
          <p className={`text-lg lg:text-xl mb-4 ${dark ? "text-gray-300" : "text-gray-700"}`}>
            Keep all your study notes in one place, access anytime, and stay on top of your classes.
          </p>
          <p className={`text-md lg:text-lg mb-8 ${dark ? "text-gray-400" : "text-gray-600"}`}>
            Your personal note-taking platform for students. Simple, fast, and organized.
          </p>

          <Link
            href="/signup"
            className={`px-8 py-3 font-semibold rounded-full transition ${
              dark ? "bg-yellow-500 text-black hover:bg-yellow-400" : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            Create Notes
          </Link>
        </div>

        <div className="flex-1 flex justify-center lg:justify-end z-10">
          <div className="overflow-hidden rounded-lg shadow-xl hover:scale-105 transition duration-500">
            <img
              src="https://i0.wp.com/highschool.latimes.com/wp-content/uploads/2019/01/45692459364_2d91368a04_z.jpg?fit=640%2C427&ssl=1"
              alt="Hero Illustration"
              className="w-full max-w-md"
            />
          </div>
        </div>
      </div>

      

      {/* ================= FEATURES SECTION ================= */}
<section className="py-20 bg-gray-50 dark:bg-[#1a1a1a]">
  <div className="max-w-7xl mx-auto px-6 text-center">
    <h2 className={`text-3xl md:text-4xl font-bold mb-12 ${dark ? "text-white" : "text-gray-900"}`}>
      Powerful Features for Students
    </h2>

    <div className="grid md:grid-cols-3 gap-10">
      {[
        {
          icon: (
            <svg
              className="w-12 h-12 mx-auto mb-5 text-yellow-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7h18M3 12h18M3 17h18"
              />
            </svg>
          ),
          title: "Secure Cloud Storage",
          desc: "Your notes are safely stored in Supabase with encrypted authentication and backup support."
        },
        {
          icon: (
            <svg
              className="w-12 h-12 mx-auto mb-5 text-yellow-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17v-6h13M9 7V5a2 2 0 00-2-2H5a2 2 0 00-2 2v2h6z"
              />
            </svg>
          ),
          title: "Organized Dashboard",
          desc: "Easily create, edit, and delete notes while keeping your study workflow efficient."
        },
        {
          icon: (
            <svg
              className="w-12 h-12 mx-auto mb-5 text-yellow-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          ),
          title: "Access Anywhere",
          desc: "Open your notes anytime from any device with internet access, keeping learning on the go."
        }
      ].map((feature, index) => (
        <div
          key={index}
          className={`group p-8 rounded-2xl shadow-xl border border-transparent hover:border-yellow-500 transition transform hover:-translate-y-3 hover:shadow-2xl duration-300 ${
            dark ? "bg-[#1a1a1a] text-gray-300" : "bg-white text-gray-700"
          }`}
        >
          {feature.icon}
          <h3 className="text-xl font-semibold mb-3 group-hover:text-yellow-500 transition">
            {feature.title}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">{feature.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>



    {/* ================= HOW IT WORKS SECTION ================= */}
<section className={`py-20 ${dark ? "bg-[#111]" : "bg-gray-50"}`}>
  <div className="max-w-7xl mx-auto px-6 text-center">
    <h2 className={`text-3xl md:text-4xl font-bold mb-12 ${dark ? "text-white" : "text-gray-900"}`}>
      How It Works
    </h2>

    <div className="grid md:grid-cols-3 gap-10 relative">
      {[
        { 
          step: "1", 
          title: "Sign Up", 
          desc: "Create your account in seconds and securely log in.",
          icon: (
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="8.5" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 8v6M23 11h-6" />
            </svg>
          )
        },
        { 
          step: "2", 
          title: "Create Notes", 
          desc: "Write, organize, and manage your study notes easily.",
          icon: (
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4h9M12 12h9" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h.01M3 12h.01M3 18h.01" />
            </svg>
          )
        },
        { 
          step: "3", 
          title: "Manage & Review", 
          desc: "Edit, delete, and review your notes anytime from any device.",
          icon: (
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )
        }
      ].map((item, index) => (
        <div
          key={index}
          className={`group p-8 rounded-2xl shadow-lg border border-transparent hover:border-yellow-500 transition transform hover:-translate-y-3 hover:shadow-2xl duration-300 ${
            dark ? "bg-[#1a1a1a] text-gray-300" : "bg-white text-gray-700"
          }`}
        >
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-yellow-500 mb-4 mx-auto">
            {item.icon}
          </div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-yellow-500 transition">
            {item.title}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>


     
      {/* ================= ANIMATED STATISTICS SECTION ================= */}
<section
  ref={statsRef}
  className={`py-24 transition-colors duration-500 ${
    dark ? "bg-[#0f0f0f]" : "bg-gray-50"
  }`}
>
  <div className="max-w-7xl mx-auto px-6 text-center">

    <h2 className={`text-4xl font-bold mb-16 ${dark ? "text-white" : "text-gray-900"}`}>
      Our Impact in Numbers
    </h2>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">

      <div className="transform transition duration-700 hover:-translate-y-2">
        <h3 className="text-5xl font-extrabold mb-3 text-yellow-500">
          <Counter target={850} suffix="+" />
        </h3>
        <p className={`${dark ? "text-gray-300" : "text-gray-600"}`}>
          Notes Created
        </p>
      </div>

      <div className="transform transition duration-700 hover:-translate-y-2">
        <h3 className="text-5xl font-extrabold mb-3 text-yellow-500">
          <Counter target={420} suffix="+" />
        </h3>
        <p className={`${dark ? "text-gray-300" : "text-gray-600"}`}>
          Active Students
        </p>
      </div>

      <div className="transform transition duration-700 hover:-translate-y-2">
        <h3 className="text-5xl font-extrabold mb-3 text-yellow-500">
          <Counter target={98} suffix="%" />
        </h3>
        <p className={`${dark ? "text-gray-300" : "text-gray-600"}`}>
          Satisfaction Rate
        </p>
      </div>

      <div className="transform transition duration-700 hover:-translate-y-2">
        <h3 className="text-5xl font-extrabold mb-3 text-yellow-500">
          24/7
        </h3>
        <p className={`${dark ? "text-gray-300" : "text-gray-600"}`}>
          Access Anytime
        </p>
      </div>

    </div>
  </div>
</section>



      {/* ================= ANIMATED TESTIMONIAL CAROUSEL ================= */}
<section className="py-24">
  <div className="max-w-4xl mx-auto px-6 text-center">

    <h2 className={`text-4xl font-bold mb-16 ${dark ? "text-white" : "text-gray-900"}`}>
      What Students Say
    </h2>

    <div
      className={`relative p-10 rounded-2xl shadow-2xl transition-all duration-700 ${
        dark ? "bg-[#1a1a1a] text-gray-300" : "bg-white text-gray-700"
      }`}
    >
      {/* Stars */}
      <div className="text-yellow-500 text-xl mb-4">★★★★★</div>

      {/* Review Text */}
      <p className="italic text-lg mb-6 min-h-[80px]">
        "{testimonials[currentIndex].review}"
      </p>

      {/* Name */}
      <h3 className="font-semibold text-xl">
        {testimonials[currentIndex].name}
      </h3>
      <p className="text-sm opacity-70">
        {testimonials[currentIndex].role}
      </p>

      {/* Arrows */}
      <div className="flex justify-between absolute top-1/2 left-0 right-0 px-4 -translate-y-1/2">
        <button
          onClick={() =>
            setCurrentIndex(
              currentIndex === 0
                ? testimonials.length - 1
                : currentIndex - 1
            )
          }
          className="bg-yellow-500 text-black px-3 py-2 rounded-full hover:bg-yellow-400 transition"
        >
          ‹
        </button>

        <button
          onClick={() =>
            setCurrentIndex(
              currentIndex === testimonials.length - 1
                ? 0
                : currentIndex + 1
            )
          }
          className="bg-yellow-500 text-black px-3 py-2 rounded-full hover:bg-yellow-400 transition"
        >
          ›
        </button>
      </div>
    </div>

    {/* Dots Indicator */}
    <div className="flex justify-center mt-6 gap-3">
      {testimonials.map((_, index) => (
        <span
          key={index}
          onClick={() => setCurrentIndex(index)}
          className={`w-3 h-3 rounded-full cursor-pointer transition ${
            index === currentIndex
              ? "bg-yellow-500 scale-125"
              : "bg-gray-400"
          }`}
        ></span>
      ))}
    </div>

  </div>
</section>




      {/* ================= FINAL CTA SECTION ================= */}
     
      {/* ================= CTA ================= */}
      <section className={`py-20 text-center ${dark ? "bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-500 text-black" : "bg-yellow-500 text-black"}`}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">Start Organizing Your Notes Today</h2>
          <p className="mb-8 text-lg opacity-80">Join students who are improving their productivity with Student Notes.</p>
          <Link href="/signup" className="px-10 py-4 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition">Get Started Now</Link>
        </div>
      </section>


    </div>
  );
}
