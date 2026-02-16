import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// Replace with your own hero image (or reuse the player one)
import heroImg from "/images/signup/red-race.jpg";

export default function SignupPitchManager() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    club_id: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) =>
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }
//     try {
//       const { data } = await axios.post("http://localhost:5000/pitchmanager/signup", {
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//         phone: formData.phone,
//         club_id: formData.club_id,
//       });
//       alert(data.message);
//       const redirectPath = location.state?.from || "/login3";
//       navigate(redirectPath);
//     } catch (err) {
//       alert(err.response?.data?.message || "Signup failed");
//     }
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/pitchmanager/signup', formData);
      alert(response.data.message);
      const redirectPath = location.state?.from || '/login3';
      navigate(redirectPath);
    } catch (error) {
      alert(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[#F4EAFB]">
      {/* Back button */}
      <button
        className="absolute left-6 top-6 z-20 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-md backdrop-blur hover:bg-white"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft /> Back
      </button>

      {/* Centered split card */}
      <div className="mx-auto w-screen px-4 py-10 md:px-8 md:py-14">
        <div className="mx-auto grid max-w-[1050px] grid-cols-1 overflow-hidden rounded-[28px] bg-white shadow-[0_40px_80px_rgba(40,8,80,0.12)] md:grid-cols-2">
          {/* LEFT: Form */}
          <div className="p-6 sm:p-8 md:p-12">
            <div className="mb-6 h-6 w-40 rounded bg-black/5" />
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Sign up now
            </h1>
            <p className="mt-1 text-sm text-slate-500">Create a free account</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-2.5">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 placeholder-slate-400 outline-none focus:border-violet-400 focus:bg-white"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 placeholder-slate-400 outline-none focus:border-violet-400 focus:bg-white"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 placeholder-slate-400 outline-none focus:border-violet-400 focus:bg-white"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-type Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 placeholder-slate-400 outline-none focus:border-violet-400 focus:bg-white"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 placeholder-slate-400 outline-none focus:border-violet-400 focus:bg-white"
              />
              <input
                type="text"
                name="club_id"
                placeholder="Club ID"
                value={formData.club_id}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 placeholder-slate-400 outline-none focus:border-violet-400 focus:bg-white"
              />

              <button
                type="submit"
                className="mt-1.5 w-full rounded-lg bg-gradient-to-r from-purple-400 to-violet-600 py-3 font-semibold text-white shadow-md transition hover:opacity-90"
              >
                Sign up
              </button>

              <p className="pt-2 text-center text-sm text-slate-600">
                Already have an account?{" "}
                <button
                  type="button"
                  className="font-medium text-slate-900 underline underline-offset-2 hover:opacity-80"
                  onClick={() => navigate("/login3")}
                >
                  Login
                </button>
              </p>
            </form>
          </div>

          {/* RIGHT: Hero image with caption */}
          <div className="relative hidden md:block">
            <img
              src={heroImg}
              alt="Pitch Manager Visual"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute bottom-10 left-6 right-6 rounded-xl bg-black/25 p-5 text-white backdrop-blur-sm">
              <h3 className="text-2xl font-extrabold leading-tight">
                Manage pitches with ease
              </h3>
              <p className="mt-1 text-sm text-white/90">
                Schedule, assign, and keep every facility running like clockwork.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
