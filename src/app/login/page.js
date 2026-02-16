"use client";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { FiEye, FiEyeOff } from "react-icons/fi"; // 🔹 Eye icons

export default function Login() {
  const { dark } = useContext(ThemeContext);
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // 🔹 Password visibility state
  const [showPassword, setShowPassword] = useState(false);

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

          {/* 🔹 Password Field with Eye Icon */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-md border ${
                dark
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
              required
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
          </div>

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
