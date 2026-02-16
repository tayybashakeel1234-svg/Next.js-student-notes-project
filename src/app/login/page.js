// 'use client'

// import { useState } from 'react'
// import { supabase } from '../../lib/supabase'
// import { useRouter } from 'next/navigation'

// export default function Login() {
//   const router = useRouter()
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [loading, setLoading] = useState(false)

//   const handleLogin = async () => {
//     setLoading(true)

//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     })

//     if (error) {
//       alert(error.message)
//       setLoading(false)
//       return
//     }

//     alert('Login successful ✅')
//     router.push('/dashboard')
//     setLoading(false)
//   }

//   return (
//     <div style={{ padding: 40 }}>
//       <h2>Login</h2>

//       <input
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <br /><br />

//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <br /><br />

//       <button onClick={handleLogin} disabled={loading}>
//         {loading ? 'Logging in...' : 'Login'}
//       </button>
//     </div>
//   )
// }


"use client";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const { dark } = useContext(ThemeContext);
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    // ✅ Successful login
    setFormData({ email: "", password: "" });
    setLoading(false);

    router.push("/dashboard");
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${dark ? "bg-[#0b0b0b]" : "bg-white"}`}>
      <div className={`w-full max-w-md p-8 rounded-xl shadow-xl ${dark ? "bg-gray-900" : "bg-gray-100"}`}>
        <h1 className={`text-3xl font-extrabold mb-6 text-center ${dark ? "text-white" : "text-gray-900"}`}>
          Login to Your Account
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className={`px-4 py-3 rounded-md border ${
              dark
                ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`px-4 py-3 rounded-md border ${
              dark
                ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 px-6 py-3 font-semibold rounded-full transition ${
              dark
                ? "bg-yellow-500 text-black hover:bg-yellow-400"
                : "bg-black text-white hover:bg-gray-800"
            } ${loading && "opacity-50 cursor-not-allowed"}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* 🔴 Error Message */}
          {errorMsg && (
            <p className="text-red-500 text-sm text-center mt-2">
              {errorMsg}
            </p>
          )}
        </form>

        <p className={`mt-6 text-center text-sm ${dark ? "text-gray-400" : "text-gray-700"}`}>
          Don't have an account?{" "}
          <Link href="/signup" className="text-yellow-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

