import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import heroImg from "/images/signup/red-race.jpg";
import axios from "axios";

export default function SignupClub() {
  const [formData, setFormData] = useState({
    club_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    establish_date: "",
    phone_number: "",
    description: "",
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
      const response = await axios.post("http://localhost:5000/club/signup", {
        club_name: formData.club_name,
        email: formData.email,
        password: formData.password,
        location: formData.location,
        establish_date: formData.establish_date,
        phone_number: formData.phone_number,
        description: formData.description,
      });
      alert(response.data.message);
      const redirectPath = location.state?.from || "/login3";
      navigate(redirectPath);
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.response?.data?.message || error.message || "Signup failed");
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
      <div className="grid w-full max-w-[850px] overflow-hidden rounded-[28px] bg-white shadow-[0_40px_80px_rgba(40,8,80,0.12)] md:grid-cols-2">
        {/* LEFT: form */}
        <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
            Club Signup
          </h1>
          <p className="mt-1 mb-6 text-sm text-slate-500">
            Create your official club account
          </p>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <input
              type="text"
              name="club_name"
              placeholder="Club Name"
              value={formData.club_name}
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

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-violet-400"
            />

            <input
              type="date"
              name="establish_date"
              value={formData.establish_date}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 outline-none focus:bg-white focus:border-violet-400"
            />

            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-violet-400"
            />

            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
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
                onClick={() => (window.location.href = "/login-club")}
              >
                Login
              </button>
            </p>
          </form>
        </div>

        {/* RIGHT: hero image */}
        <div className="relative hidden md:block">
          <img
            src={heroImg}
            alt="Club Signup"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute bottom-10 left-6 right-6 rounded-xl bg-white/50 backdrop-blur-sm p-4 text-black">
            <h3 className="text-lg md:text-2xl font-extrabold leading-tight">
              Build Legacy with Your Club
            </h3>
            <p className="mt-1 text-xs md:text-sm text-black/90">
              Register your club, connect with players, and grow your presence
              in the sport.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
