import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaUser,
  FaUsers,
  FaChalkboardTeacher,
  FaUserTie,
  FaHeartbeat,
  FaUtensils,
  FaRunning,
  FaMapMarkerAlt,
  FaGoogle,
  FaFacebookF,
} from "react-icons/fa";
import axios from "axios";
import Lottie from "lottie-react";
import { UserContext } from "../context/UserContext";
// import sportbitVideo from "../assets/sportbit_dot_black.json";

// role images for login
import playerImg from "/images/login/player.png";
import clubImg from "/images/login/club.png";
import managerImg from "/images/login/manager.png";
import agentImg from "/images/login/agent.png";
import physioImg from "/images/login/physio.png";
import coachImg from "/images/login/coach.png";
import nutritionImg from "/images/login/nutritionist.png";
import pitchImg from "/images/login/pitch-manager.png";

const ROLE_OPTIONS = [
  { key: "player", label: "Player", icon: <FaRunning />, api: "/player/login", redirect: "/NmdDashboard" },
  { key: "club", label: "Club", icon: <FaUsers />, api: "/club/login", redirect: "/clubDashboard" },
  { key: "manager", label: "Manager", icon: <FaUserTie />, api: "/manager/login", redirect: "/ManagerDash" },
  { key: "agent", label: "Agent", icon: <FaUser />, api: "/agent/login", redirect: "/AgentDashboard" },
  { key: "physio", label: "Physio", icon: <FaHeartbeat />, api: "/physio/login", redirect: "/PhysioDashboard" },
  { key: "coach", label: "Coach", icon: <FaChalkboardTeacher />, api: "/coach/login", redirect: "/CoachDashboard" },
  { key: "nutritionist", label: "Nutritionist", icon: <FaUtensils />, api: "/nutritionist/login", redirect: "/NutriDashboard" },
  { key: "pitchmanager", label: "Pitch Manager", icon: <FaMapMarkerAlt />, api: "/pitchmanager/login", redirect: "/PitchManagerDash" },
];

// Gradient + Image mapping
const ROLE_VISUALS = {
  player: { gradient: "from-green-400 via-emerald-500 to-teal-600", image: playerImg },
  club: { gradient: "from-yellow-400 via-orange-500 to-red-500", image: clubImg },
  manager: { gradient: "from-indigo-400 via-violet-500 to-purple-600", image: managerImg },
  agent: { gradient: "from-blue-400 via-cyan-500 to-teal-500", image: agentImg },
  physio: { gradient: "from-pink-400 via-rose-500 to-red-600", image: physioImg },
  coach: { gradient: "from-sky-400 via-indigo-500 to-blue-600", image: coachImg },
  nutritionist: { gradient: "from-lime-400 via-green-500 to-emerald-600", image: nutritionImg },
  pitchmanager: { gradient: "from-fuchsia-400 via-purple-500 to-indigo-600", image: pitchImg },
};

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);

  const currentVisual = ROLE_VISUALS[role] || ROLE_VISUALS.player;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role) {
      alert("Please select your role.");
      return;
    }
    const current = ROLE_OPTIONS.find((r) => r.key === role);
    setLoading(true);
    try {
      const { data } = await axios.post(`http://localhost:5000${current.api}`, { email, password });
      alert(data.message);
      localStorage.setItem("token", data.token);
      if (role === "player") localStorage.setItem("playerToken", data.token);
      localStorage.setItem("role", role);
      if (role === "manager") localStorage.setItem("managerToken", data.token);
      if (role === "coach")   localStorage.setItem("coachToken",   data.token);




      if ((role === "club" || role === "manager") && data.club_id) {
        localStorage.setItem("club_id", data.club_id);
        localStorage.setItem("club_name", data.club_name || data.name || "");
      }
      if (role === "manager" && data.manager_name) {
        localStorage.setItem("manager_name", data.manager_name);
      }
      if (role === "physio" && data.physio?.name) {
        localStorage.setItem("physio_name", data.physio.name);
      }
      if (role === "agent" && data.agent?.name) {
        localStorage.setItem("agent_name", data.agent.name);
      }
      if (role === "coach" && data.coach?.name) {
        localStorage.setItem("coach_name", data.coach.name);
      }
      if (role === "nutritionist" && data.nutritionist?.name) {
        localStorage.setItem("nutritionist_name", data.nutritionist.name);
      }
      if (role === "pitchmanager" && data.pitchmanager?.name) {
        localStorage.setItem("pitchmanager_name", data.pitchmanager.name);
      }
      if (data.username) localStorage.setItem("username", data.username);

      try {
        setUser?.(data.user || { role, email: data.email || email });
      } catch {}

      navigate(current.redirect);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative grid min-h-screen w-screen place-items-center overflow-hidden bg-[#F4EAFB]">
      {/* soft bg swooshes */}
      <svg className="pointer-events-none absolute -left-40 top-0 h-[140%] w-[120%] opacity-40" viewBox="0 0 1440 900" fill="none">
        <path d="M-20,120 C320,260 560,40 940,220 C1220,350 1330,150 1500,260" stroke="#E6D3F9" strokeWidth="8" strokeLinecap="round" />
        <path d="M-40,420 C280,520 600,300 980,480 C1260,610 1380,420 1540,520" stroke="#E6D3F9" strokeWidth="6" strokeLinecap="round" />
      </svg>

      <button
        className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-md backdrop-blur hover:bg-white"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft /> Back
      </button>

      {/* CARD (centered) */}
      <div
        className="
          grid w-[92%] max-w-[1000px] overflow-hidden rounded-[24px] bg-white
          shadow-[0_40px_80px_rgba(40,8,80,0.12)] md:grid-cols-2 md:min-h-[560px]
        "
      >
        {/* LEFT / FORM */}
        <div className="relative p-6 sm:p-8 md:p-10">
          {/* logo */}
          {/* <div className="mb-4 flex items-center gap-2">
            <div className="h-8 w-14">
              <Lottie animationData={sportbitVideo} loop />
            </div>
          </div> */}

          <h2 className="mb-1 text-[26px] font-semibold text-slate-800">
            <span className="relative mr-2 inline-block">
              <span className="absolute -left-3 top-1 h-3 w-3 rounded-full bg-violet-400" />
            </span>
            Log In
          </h2>
          <p className="mb-7 text-sm text-slate-500">Welcome back! Please enter your details</p>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <button
              type="button"
              onClick={() => setShowRoleModal(true)}
              className="w-full rounded-lg border border-slate-200 bg-[#b2eba9] px-4 py-2.5 text-left font-medium text-[#198009] transition hover:border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-300"
            >
              {role ? `Role: ${ROLE_OPTIONS.find((r) => r.key === role)?.label}` : "Select your role"}
            </button>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-800 placeholder-slate-400 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-300"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPass(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-800 placeholder-slate-400 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-300"
              required
            />

            <div className="text-right">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-sm font-medium text-violet-500 hover:underline"
              >
                forgot password ?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-violet-500 py-2.5 font-semibold text-white shadow-md transition hover:bg-violet-600 disabled:opacity-60"
            >
              {loading ? "Please wait…" : role ? `Log in as ${ROLE_OPTIONS.find((r) => r.key === role)?.label}` : "Log in"}
            </button>

            {/* Divider */}
            <div className="relative my-2 flex items-center">
              <span className="h-px w-full bg-slate-200" />
              <span className="px-3 text-xs text-slate-400">Or Continue With</span>
              <span className="h-px w-full bg-slate-200" />
            </div>

            {/* Social */}
            <div className="flex gap-3">
              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2 text-sm font-medium text-slate-700 hover:border-slate-300"
              >
                <FaGoogle /> Google
              </button>
              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2 text-sm font-medium text-slate-700 hover:border-slate-300"
              >
                <FaFacebookF /> Facebook
              </button>
            </div>

            <div className="pt-1.5 text-center text-sm text-slate-500">
              Don’t have account?{" "}
              <button
                type="button"
                className="font-semibold text-violet-500 hover:underline"
                onClick={() => (role ? navigate(`/signup/${role}`) : alert("Please select a role first"))}
              >
                Sign up
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT / VISUAL */}
        <div className="relative hidden min-h-[420px] md:block">
          {/* gradient BACKGROUND */}
          <div className={`absolute inset-0 z-0 bg-gradient-to-br ${currentVisual.gradient}`} />
          {/* IMAGE FOREGROUND */}
          <img
            src={currentVisual.image}
            alt="role visual"
            className="absolute inset-0 z-10  w-full object-cover object-center transition-all duration-500"
          />
          {/* soft highlight overlay */}
          <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-transparent via-transparent to-black/10" />
        </div>
      </div>

      {/* Role Selection Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4 backdrop-blur-[10px]">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800">Select your role</h3>
              <button
                onClick={() => setShowRoleModal(false)}
                className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600 hover:bg-slate-200"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {ROLE_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => {
                    setRole(opt.key);
                    setShowRoleModal(false);
                  }}
                  className={`flex flex-col items-center justify-center gap-2 rounded-xl border p-4 text-center transition hover:shadow-md ${
                    role === opt.key ? "border-violet-400 bg-violet-50" : "border-slate-200 bg-white"
                  }`}
                >
                  <span className="text-xl text-violet-600">{opt.icon}</span>
                  <span className="text-sm font-medium text-slate-700">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
