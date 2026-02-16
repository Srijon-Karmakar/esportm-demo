import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import heroImg from "../../assets/images/signup/physio-signup.jpg"; // ⚡ Replace with physio signup image

export default function SignupPhysio() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Physio Signup Data:", formData);
  };

  return (
    <div className="min-h-screen w-screen bg-[#F4EAFB]">
      {/* Back button */}
      <button
        className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-md backdrop-blur hover:bg-white z-20"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft /> Back
      </button>

      {/* Centered split card */}
      <div className="mx-auto w-screen px-0 py-10 md:py-14">
        <div className="grid grid-cols-1 overflow-hidden rounded-[28px] bg-white shadow-[0_40px_80px_rgba(40,8,80,0.12)] md:grid-cols-2">
          
          {/* LEFT: form */}
          <div className="p-6 sm:p-8 md:p-32">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Physio Signup
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Register as a physio to support athletes and teams
            </p>

            <form onSubmit={handleSubmit} className="space-y-2.5">
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
                className="mt-1.5 w-full rounded-lg bg-gradient-to-r from-purple-400 to-violet-600 py-3 font-semibold text-white shadow-md transition hover:opacity-90"
              >
                Sign up
              </button>

              <p className="pt-2 text-center text-sm text-slate-600">
                Already have an account?{" "}
                <button
                  type="button"
                  className="font-medium text-slate-900 underline underline-offset-2 hover:opacity-80"
                  onClick={() => (window.location.href = "/login-physio")}
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
              alt="Physio Signup"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute bottom-36 left-6 right-6 rounded-xl bg-transparent p-5 text-black">
              <h3 className="text-2xl font-extrabold leading-tight">
                Care. Recover. Perform.
              </h3>
              <p className="mt-1 text-sm text-black/90">
                Join Sportbit as a physio and help athletes reach peak recovery and performance.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
