"use client";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function Signup() {
  const { dark } = useContext(ThemeContext);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setLoading(true);

    // 🔹 Signup with Supabase
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

     // If email confirmation is required, user may be null
  if (!data.user) {
    setErrorMsg("Signup failed. Please try again.");
    setLoading(false);
    return;
  }

  // Step 2: Insert Profile
  const { error: profileError } = await supabase
    .from("profiles")
    .insert({
      id: data.user.id,
      name: formData.name,
      email: formData.email,
    });

  if (profileError) {
    setErrorMsg(profileError.message);
    setLoading(false);
    return;
  }

  setSuccessMsg("Signup successful! Please login.");
  setLoading(false);

  setTimeout(() => {
    router.push("/login");
  }, 1500);
};


  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${dark ? "bg-[#0b0b0b]" : "bg-white"}`}>
      <div className={`w-full max-w-md p-8 rounded-xl shadow-xl ${dark ? "bg-gray-900" : "bg-gray-100"}`}>
        <h1 className={`text-3xl font-extrabold mb-6 text-center ${dark ? "text-white" : "text-gray-900"}`}>
          Create Your Account
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className={`px-4 py-3 rounded-md border ${
              dark
                ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
            required
          />

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

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
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
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          {/* 🔴 Error Message */}
          {errorMsg && (
            <p className="text-red-500 text-sm text-center mt-2">
              {errorMsg}
            </p>
          )}

          {/* 🟢 Success Message */}
          {successMsg && (
            <p className="text-green-500 text-sm text-center mt-2">
              {successMsg}
            </p>
          )}
        </form>

        <p className={`mt-6 text-center text-sm ${dark ? "text-gray-400" : "text-gray-700"}`}>
          Already have an account?{" "}
          <Link href="/login" className="text-yellow-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

