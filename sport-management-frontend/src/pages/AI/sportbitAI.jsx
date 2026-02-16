import React, { useEffect, useState } from "react";
import { Power } from "lucide-react";
import Orb from "../../pages/orbAi";
import { useNavigate } from "react-router-dom";




export default function SportbitAI() {
  const [darkMode, setDarkMode] = useState(true);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [username, setUsername] = useState("Sportbit User");

  // username update
     const readJSON = (k) => {
    try {
      return (
        JSON.parse(localStorage.getItem(k) || "null") ??
        JSON.parse(sessionStorage.getItem(k) || "null")
      );
    } catch {
      return null;    }
  };

  const pickName = (obj) => {
    if (!obj || typeof obj !== "object") return null;
    // try common places and nested shapes
    return (
      obj.name ||
      obj.username ||
      obj.fullName ||
      obj.displayName ||
      obj.profile?.name ||
      obj.profile?.full_name ||
      obj.user?.name ||
      obj.user?.username ||
      obj.manager?.name ||
      obj.manager?.username ||
      null
    );
  };

  const resolveUsername = () => {
    const candidates = [
      readJSON("sb_user"),
      readJSON("user"),
      readJSON("manager"),
      readJSON("managerUser"),
      readJSON("sb_manager"),
      readJSON("profile"),
    ];
    // any nested/flat name we can find
    const objName = candidates.map(pickName).find(Boolean);
    // also check plain strings some flows write
    const flatName =
      localStorage.getItem("username") ||
      localStorage.getItem("manager_name") ||
      sessionStorage.getItem("username") ||
      sessionStorage.getItem("manager_name");
    return objName || flatName || "Sportbit User";
  };

  // username update 

  useEffect(() => {
    const root = document.documentElement;
    darkMode ? root.classList.add("dark") : root.classList.remove("dark");
  }, [darkMode]);

  const predefined = {
    "AI schedule Management": "Create a weekly training schedule for the team",
    "AI Player Recomendation": "Recommend top 3 players for the next match based on form",
    "AI Skill analysis": "Analyze current team weaknesses and suggest drills",
  };

  

    useEffect(() => {
    // initial resolve
    setUsername(resolveUsername());
    // update if another tab/page writes after login
    const onStorage = () => setUsername(resolveUsername());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);


  const goToChat = (seed) => {
    // Navigate to the full chat page and pass the first message
    navigate("/ai/chat", { state: { seedQuery: seed ?? query } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    goToChat(query);
  };

  return (
    // <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-b from-[#1a0f1e] to-[#0d0d0d] dark:from-[#f0edf6] dark:to-[#dcd8e6]">
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1a0f1e] to-[#0d0d0d] dark:from-[#f0edf6] dark:to-[#dcd8e6] overflow-hidden">
      <button
        onClick={() => setDarkMode((v) => !v)}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 dark:bg-black/10"
        aria-label="Toggle theme"
      >
        <Power className="text-white dark:text-gray-800" size={24} />
      </button>

      {/* <div className="absolute top-4 left-4 text-base font-medium text-purple-300 dark:text-purple-600">
        Welcome <br />
        <span className="font-semibold">Sportbit User</span>
      </div> */}

      <div className="absolute top-4 left-4 text-base font-medium text-purple-300 dark:text-purple-600">
        Welcome <br />
        <span className="font-semibold">{username}</span>
      </div>


      <div className="pt-24 flex flex-col items-center">
        <Orb />
        <h1 className="text-2xl md:text-3xl font-semibold mt-4 text-purple-300 dark:text-purple-600">
          Sportbit AI
        </h1>

        {/* chips */}
        <div className="mt-8 flex gap-3 flex-wrap justify-center px-4">
          {Object.keys(predefined).map((k) => (
            <button
              key={k}
              onClick={() => goToChat(predefined[k])}
              className="px-5 py-3 bg-gray-700/60 dark:bg-gray-200/70 rounded-full text-white dark:text-gray-800 text-sm font-medium shadow-md hover:scale-105 transition"
            >
              {k}
            </button>
          ))}
        </div>

        {/* input */}
        <form onSubmit={handleSubmit} className="mt-8 w-[90%] max-w-2xl flex gap-3">
          <input
            type="text"
            placeholder="Ask something !"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-6 py-4 rounded-full bg-gray-800/70 text-purple placeholder-gray-400 focus:outline-none shadow-lg"
          />
          <button
            type="submit"
            className="px-6 py-4 rounded-full bg-purple-600 text-white font-medium shadow-lg"
          >
            send
          </button>
        </form>
      </div>
    </div>
  );
}
