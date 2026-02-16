// import React, { useState, useEffect } from "react";
// import { Power } from "lucide-react"; // for power icon
// import Orb from './orbAi';

// const SportbitAI = () => {
//   const [darkMode, setDarkMode] = useState(true);
//   const [query, setQuery] = useState("");
//   // const [response, setResponse] = useState("");
//   const [conversation, setConversation] = useState([]);



//   // AI 
//   const handleAsk = async (e) => {
//     e.preventDefault();
//     if (!query) return;

//     setConversation((prev) => [...prev, { sender: "user", text: query }]);

//     try {
//       const res = await fetch("http://localhost:5000/ai/ask", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ query }),
//       });
//       const data = await res.json();

//       // setResponse(data.response);
//       setConversation((prev) => [...prev, { sender: "user", text: query }]);
//     } catch (err) {
//       console.error(err);
//     }
//   };


//   const predefinedQueries = {
//     "AI schedule Management": "Create a weekly training schedule for the team",
//     "AI Player Recomendation": "Recommend top 3 players for the next match based on form",
//     "AI Skill analysis": "Analyze current team weaknesses and suggest drills",
//   };

//   const handlePredefined = async (text) => {
//     setQuery(predefinedQueries[text]);
//     const res = await fetch("http://localhost:5000/ai/ask", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ query: predefinedQueries[text] }),
//     });
//     const data = await res.json();
//     setResponse(data.response);
//   };


//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [darkMode]);

//   return (
//     // <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1a0f1e] to-[#0d0d0d] dark:from-[#f0edf6] dark:to-[#dcd8e6] transition-all duration-500 relative">
//     <div className="flex flex-col w-full h-screen items-center">


//       {/* Power Button */}
//       <button
//         onClick={() => setDarkMode(!darkMode)}
//         className="absolute top-6 right-6 p-2 rounded-full bg-white/10 dark:bg-black/10 hover:scale-105 transition"
//       >
//         <Power className="text-white dark:text-gray-800" size={28} />
//       </button>

//       {/* Welcome */}
//       <div className="absolute top-6 left-6 text-lg font-medium text-purple-300 dark:text-purple-600">
//         Welcome <br />
//         <span className="font-semibold">Sportbit User</span>
//       </div>

//       {/* AI Blob */}
//       <div className="flex flex-col items-center">
//         {/* <img
//           src="https://res.cloudinary.com/demo/image/upload/v1693306931/ai-blob.png"
//           alt="AI Blob"
//           className="w-[220px] md:w-[280px]"
//         /> */}
//         <Orb />

//         {/* Title */}
//         <h1 className="text-2xl md:text-3xl font-semibold mt-6 text-purple-300 dark:text-purple-600">
//           Sportbit AI
//         </h1>

//         {/* Options */}
//         <div className="flex gap-6 mt-8">
//           {["AI schedule Management", "AI Player Recomendation", "AI Skill analysis"].map(
//             (text, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => handlePredefined(text)}
//                 className="px-5 py-3 bg-gray-700/60 dark:bg-gray-200/60 rounded-full text-white dark:text-gray-800 text-sm font-medium shadow-md hover:scale-105 transition"
//               >
//                 {text}
//               </button>
//             )
//           )}
//         </div>

//         {/* Input */}
//         {/* <div className="mt-12 w-[70%] md:w-[50%]">
//           <input
//             type="text"
//             placeholder="Ask something !"
//             className="w-full px-6 py-4 rounded-full bg-gray-800/70 dark:bg-gray-100/70 text-white dark:text-black placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none shadow-lg"
//           />
//         </div> */}


//         {/*updated  Input */}
//         <form onSubmit={handleAsk} className="mt-12 w-[70%] md:w-[50%] flex gap-3">
//           <input
//             type="text"
//             placeholder="Ask something !"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="w-full px-6 py-4 rounded-full bg-gray-800/70 text-purple focus:outline-none"
//           />
//           <button
//             type="submit"
//             className="px-6 py-4 rounded-full bg-purple-600 text-white font-medium"
//           >
//             send
//           </button>
//         </form>

//         {/* Response */}
//         {/* {response && (
//           <div className="mt-6 p-4 bg-white/10 rounded-lg text-center text-purple">
//             {response}
//           </div>
//         )} */}


//         {/* Full Page AI Response */}
//         {conversation.length > 0 && (
//           <div className="mt-10 w-full flex-1 overflow-y-auto bg-white/5 dark:bg-black/10 backdrop-blur-md rounded-xl shadow-xl p-8">
//             {conversation.map((msg, i) => (
//               <div
//                 key={i}
//                 className={`mb-6 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
//               >
//                 <div
//                   className={`px-6 py-4 rounded-2xl text-lg leading-relaxed shadow-lg max-w-[80%] animate-fade-in
//             ${msg.sender === "user"
//                       ? "bg-purple-600 text-white rounded-br-none"
//                       : "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 rounded-bl-none"
//                     }`}
//                 >
//                   {msg.text}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}





//       </div>
//     </div>
//   );
// };

// export default SportbitAI;










import React, { useEffect, useRef, useState } from "react";
import { Power } from "lucide-react";
import Orb from "./orbAi";
import "./aiAgent.css"; 

export default function SportbitAI() {
  const [darkMode, setDarkMode] = useState(true);
  const [query, setQuery] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const chatRef = useRef(null);
  const hasStarted = conversation.length > 0;

  useEffect(() => {
    const root = document.documentElement;
    darkMode ? root.classList.add("dark") : root.classList.remove("dark");
  }, [darkMode]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [conversation, isLoading]);

  const askAI = async (text) => {
    if (!text?.trim()) return;
    setConversation((p) => [...p, { sender: "user", text }]);
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/ai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text }),
      });
      const data = await res.json();
      setConversation((p) => [...p, { sender: "ai", text: data?.response ?? "…" }]);
    } catch {
      setConversation((p) => [
        ...p,
        { sender: "ai", text: "I couldn’t reach the server. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
      setQuery("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    askAI(query);
  };

  const predefined = {
    "AI schedule Management": "Create a weekly training schedule for the team",
    "AI Player Recomendation": "Recommend top 3 players for the next match based on form",
    "AI Skill analysis": "Analyze current team weaknesses and suggest drills",
  };

  return (
    <div
      className={[
        "min-h-screen w-full flex flex-col bg-gradient-to-b from-[#1a0f1e] to-[#0d0d0d] dark:from-[#f0edf6] dark:to-[#dcd8e6]",
        hasStarted ? "overflow-hidden" : "overflow-auto",
      ].join(" ")}
    >
      {/* Top utility */}
      <button
        onClick={() => setDarkMode((v) => !v)}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 dark:bg-black/10 hover:scale-105 transition"
        aria-label="Toggle theme"
      >
        <Power className="text-white dark:text-gray-800" size={24} />
      </button>
      <div className="absolute top-4 left-4 text-base font-medium text-purple-300 dark:text-purple-600">
        Welcome <br />
        <span className="font-semibold">Sportbit User</span>
      </div>

      {/* HEADER */}
      <header
        className={`w-full flex flex-col items-center transition-all duration-300 ${
          hasStarted ? "pt-10 pb-2 scale-95 opacity-90" : "pt-24 pb-8"
        }`}
      >
        <Orb />
        <h1 className="text-2xl md:text-3xl font-semibold mt-4 text-purple-300 dark:text-purple-600">
          Sportbit AI
        </h1>

        {!hasStarted && (
          <div className="mt-6 flex gap-3 flex-wrap justify-center px-4">
            {Object.keys(predefined).map((k) => (
              <button
                key={k}
                onClick={() => askAI(predefined[k])}
                className="px-5 py-3 bg-gray-700/60 dark:bg-gray-200/70 rounded-full text-white dark:text-gray-800 text-sm font-medium shadow-md hover:scale-105 transition"
              >
                {k}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* CHAT REGION */}
      <main
        ref={chatRef}
        className={`w-full max-w-4xl mx-auto px-4 transition-all ${
          hasStarted
            ? "h-[80vh] overflow-y-auto pb-40"
            : "flex-1 overflow-visible pb-28"
        }`}
      >
        {!hasStarted && (
          <div className="mx-auto max-w-2xl mt-4 rounded-xl bg-white/10 dark:bg-black/10 backdrop-blur-md shadow-lg p-4 text-center text-sm text-white/80 dark:text-gray-900/80">
            Ask anything about training, players, drills, analytics…
          </div>
        )}

        {conversation.map((msg, i) => (
          <div
            key={i}
            className={`mt-4 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-3 rounded-2xl text-sm md:text-base leading-relaxed shadow-lg max-w-[85%] sportbit-fade-in
                ${
                  msg.sender === "user"
                    ? "bg-purple-600 text-white rounded-br-none"
                    : "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 rounded-bl-none"
                }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="mt-4 flex justify-start">
            <div className="px-4 py-3 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 rounded-bl-none shadow-lg">
              <span className="inline-flex gap-1 items-center">
                <span className="sportbit-dot" />
                <span className="sportbit-dot" />
                <span className="sportbit-dot" />
              </span>
            </div>
          </div>
        )}
      </main>

      {/* COMPOSER */}
      <footer className="w-full">
        <div className="fixed bottom-0 left-0 right-0">
          <div className="mx-auto max-w-4xl w-full px-4 pt-2 pb-4 bg-gradient-to-t from-black/10 to-transparent dark:from-white/10">
            {hasStarted && (
              <div className="sportbit-no-scrollbar overflow-x-auto mb-2">
                <div className="flex gap-2 w-max">
                  {Object.keys(predefined).map((k) => (
                    <button
                      key={k}
                      onClick={() => askAI(predefined[k])}
                      className="px-3 py-2 bg-gray-700/60 dark:bg-gray-200/70 rounded-full text-white dark:text-gray-800 text-xs md:text-sm font-medium shadow"
                    >
                      {k}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="text"
                placeholder="Ask something !"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-5 py-4 rounded-full bg-gray-800/70 text-white placeholder-gray-400 focus:outline-none shadow-lg"
              />
              <button
                type="submit"
                className="px-6 py-4 rounded-full bg-purple-600 text-white font-medium shadow-lg hover:brightness-110 active:scale-[0.98]"
              >
                send
              </button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
}
