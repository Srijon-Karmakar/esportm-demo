import React, { useState } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import heroImg from "/videos/signup-video.mp4";

export default function SignupAgent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/agent/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      alert(response.data.message);
      const redirectPath = location.state?.from || "/login3";
      navigate(redirectPath);
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="relative min-h-screen w-screen bg-[#F4EAFB] flex items-center justify-center px-4 py-8">
      {/* Back button */}
      <button
        className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-md backdrop-blur hover:bg-white z-20"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft /> Back
      </button>

      {/* Centered split card */}
      <div className="grid w-full max-w-[850px] rounded-[28px] overflow-hidden bg-white shadow-[0_40px_80px_rgba(40,8,80,0.12)] md:grid-cols-2">
        {/* LEFT: form */}
        <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
            Agent Signup
          </h1>
          <p className="mt-1 mb-6 text-sm text-slate-500">
            Create your agent account
          </p>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-violet-400"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-violet-400"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-violet-400"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-type Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-violet-400"
            />

            <button
              type="submit"
              className="mt-1.5 w-full rounded-lg bg-gradient-to-r from-purple-400 to-violet-600 py-2.5 font-semibold text-white shadow-md transition hover:opacity-90"
            >
              Sign up
            </button>

            <p className="pt-2 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <button
                type="button"
                className="font-medium text-slate-900 underline underline-offset-2 hover:opacity-80"
                onClick={() => (window.location.href = "/login3")}
              >
                Login
              </button>
            </p>
          </form>
        </div>

        {/* RIGHT: hero video */}
        <div className="relative hidden md:block">
          <video
            // src={heroImg}
            src="/videos/signup-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute bottom-10 left-6 right-6 rounded-xl bg-white/50 backdrop-blur-sm p-4 text-black">
            <h3 className="text-lg font-extrabold leading-tight md:text-2xl">
              Manage Players & Deals Smartly
            </h3>
            <p className="mt-1 text-xs md:text-sm text-black/90">
              Signup as an Agent to streamline transfers, negotiations, and
              player management.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
