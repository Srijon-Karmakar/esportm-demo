// import React, { useEffect, useRef, useState } from "react";
// import { useLocation } from "react-router-dom";
// import "./aiChat.css";

// export default function ChatPage() {
//   const { state } = useLocation();
//   const [query, setQuery] = useState("");
//   const [conversation, setConversation] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [theme, setTheme] = useState("dark"); // 🔹 theme state

//   const chatRef = useRef(null);
//   const endRef = useRef(null);

//   const scrollToBottom = () => requestAnimationFrame(() => {
//     endRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
//   });
//   useEffect(() => { scrollToBottom(); }, [conversation, isLoading]);

//   useEffect(() => {
//     if (state?.seedQuery) askAI(state.seedQuery, true);
//     // eslint-disable-next-line
//   }, []);

//   const askAI = async (text, seeded = false) => {
//     if (!text?.trim()) return;
//     setConversation((prev) =>
//       seeded ? [{ sender: "user", text }] : [...prev, { sender: "user", text }]
//     );
//     setIsLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/ai/ask", {
//         method: "POST", headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ query: text }),
//       });
//       const data = await res.json();
//       setConversation((prev) => [...prev, { sender: "ai", text: data?.response ?? "…" }]);
//     } catch {
//       setConversation((prev) => [...prev, { sender: "ai", text: "I couldn’t reach the server. Please try again." }]);
//     } finally { setIsLoading(false); setQuery(""); }
//   };

//   const handleSubmit = (e) => { e.preventDefault(); askAI(query); };

//   return (
//     <div className="sbai chat-root" data-theme={theme}>
//       {/* Header */}
//       <header className="chat-header">
//         <div className="chat-title">Sportbit AI</div>

//         {/* top-right theme toggle */}
//         <button
//           className="theme-toggle"
//           type="button"
//           onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
//           aria-label="Toggle theme"
//           title="Toggle theme"
//         >
//           {/* simple sun/moon glyph */}
//           {theme === "dark" ? (
//             <svg viewBox="0 0 24 24" fill="currentColor">
//               <path d="M12 18a6 6 0 1 1 0-12 7 7 0 0 0 0 12Z" />
//             </svg>
//           ) : (
//             <svg viewBox="0 0 24 24" fill="currentColor">
//               <path d="M12 4a1 1 0 0 1 1 1v1.1a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1Zm0 12.8A4.8 4.8 0 1 0 12 7.2a4.8 4.8 0 0 0 0 9.6ZM4 11a1 1 0 0 1 1-1h1.1a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Zm13.9 0a1 1 0 0 1 1-1H20a1 1 0 1 1 0 2h-1.1a1 1 0 0 1-1-1ZM6.3 6.3a1 1 0 0 1 1.4 0l.8.8a1 1 0 1 1-1.4 1.4l-.8-.8a1 1 0 0 1 0-1.4Zm9.2 9.2a1 1 0 0 1 1.4 0l.8.8a1 1 0 1 1-1.4 1.4l-.8-.8a1 1 0 0 1 0-1.4Zm0-9.2a1 1 0 0 1 1.4 0l.8.8a1 1 0 1 1-1.4 1.4l-.8-.8a1 1 0 0 1 0-1.4ZM6.3 15.5a1 1 0 0 1 1.4 0l.8.8a1 1 0 1 1-1.4 1.4l-.8-.8a1 1 0 0 1 0-1.4Z" />
//             </svg>
//           )}
//         </button>
//       </header>

//       {/* Scrollable pane */}
//       <main ref={chatRef} className="chat-pane">
//         {conversation.map((msg, i) => (
//           <div key={i} className={`row ${msg.sender === "user" ? "me" : "bot"}`}>
//             <div className={`bubble ${msg.sender === "user" ? "me" : "bot"}`}>
//               {msg.text}
//             </div>
//           </div>
//         ))}

//         {isLoading && (
//           <div className="row bot">
//             <div className="bubble bot">
//               <span className="typing">
//                 <span className="dot" /><span className="dot" /><span className="dot" />
//               </span>
//             </div>
//           </div>
//         )}
//         <div ref={endRef} style={{ height: 1 }} />
//       </main>

//       {/* Composer */}
//       <footer className="composer-fixed">
//         <form onSubmit={handleSubmit} className="composer">
//           <input
//             type="text"
//             placeholder="Message Sportbit AI…"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//           />
//           <button type="submit">Send</button>
//         </form>
//       </footer>
//     </div>
//   );
// }








// import React, { useEffect, useRef, useState, useMemo } from "react";
// import { useLocation } from "react-router-dom";
// import "./aiChat.css";

// export default function ChatPage() {
//   const { state } = useLocation();

//   /* ---------- Theme (default = light) ---------- */
//   const [theme, setTheme] = useState(() => localStorage.getItem("sb_theme") || "light");
//   useEffect(() => { localStorage.setItem("sb_theme", theme); }, [theme]);

//   /* ---------- Chat + History ---------- */
//   const [query, setQuery] = useState("");
//   const [conversation, setConversation] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   // history is a list of { id, title, messages, createdAt }
//   const [history, setHistory] = useState(() => {
//     try { return JSON.parse(localStorage.getItem("sb_history") || "[]"); }
//     catch { return []; }
//   });
//   const [activeId, setActiveId] = useState(() => localStorage.getItem("sb_active_id") || null);

//   // sidebar
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const chatRef = useRef(null);
//   const endRef = useRef(null);

//   const activeChatIndex = useMemo(
//     () => history.findIndex(h => h.id === activeId),
//     [history, activeId]
//   );

//   const scrollToBottom = () =>
//     requestAnimationFrame(() => endRef.current?.scrollIntoView({ block: "end", behavior: "smooth" }));
//   useEffect(() => { scrollToBottom(); }, [conversation, isLoading]);

//   /* ---------- Helpers: save / load chats ---------- */
//   const persistHistory = (next) => {
//     setHistory(next);
//     localStorage.setItem("sb_history", JSON.stringify(next));
//   };
//   const setActive = (id) => {
//     setActiveId(id);
//     localStorage.setItem("sb_active_id", id ?? "");
//   };

//   const newChat = (seedText = "") => {
//     const id = `c_${Date.now()}`;
//     const title = seedText?.trim()?.slice(0, 40) || "New chat";
//     const initialMessages = seedText ? [{ sender: "user", text: seedText }] : [];
//     const chat = { id, title, messages: initialMessages, createdAt: Date.now() };
//     const next = [chat, ...history];
//     persistHistory(next);
//     setActive(id);
//     setConversation(initialMessages);
//     return id;
//   };

//   const loadChat = (id) => {
//     const chat = history.find(h => h.id === id);
//     if (!chat) return;
//     setActive(id);
//     setConversation(chat.messages || []);
//   };

//   const updateActiveChatMessages = (updater) => {
//     if (!activeId) return;
//     const next = history.map(h =>
//       h.id === activeId ? { ...h, messages: updater(h.messages || []) } : h
//     );
//     persistHistory(next);
//   };

//   const renameActiveTitleIfNeeded = (firstUserText) => {
//     if (!activeId) return;
//     const next = history.map(h => {
//       if (h.id !== activeId) return h;
//       if (!h.title || h.title === "New chat") {
//         return { ...h, title: (firstUserText || "New chat").slice(0, 40) };
//       }
//       return h;
//     });
//     persistHistory(next);
//   };

//   const deleteChat = (id) => {
//     const next = history.filter(h => h.id !== id);
//     persistHistory(next);
//     if (id === activeId) {
//       setActive(next[0]?.id || null);
//       setConversation(next[0]?.messages || []);
//     }
//   };

//   /* ---------- Seed query support ---------- */
//   useEffect(() => {
//     if (state?.seedQuery) {
//       const id = newChat(state.seedQuery);
//       // immediately ask (without duplicating the seeded user bubble)
//       askAI(state.seedQuery, true, id);
//     } else {
//       // ensure at least one chat exists
//       if (!activeId && history.length === 0) {
//         const id = newChat();
//         setActive(id);
//       } else if (activeId) {
//         loadChat(activeId);
//       } else if (history[0]) {
//         loadChat(history[0].id);
//       }
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   /* ---------- Ask AI ---------- */
//   const askAI = async (text, seeded = false, forcedChatId = null) => {
//     const cleaned = text?.trim();
//     if (!cleaned) return;

//     // ensure we have an active chat
//     let id = activeId;
//     if (!id) id = newChat(cleaned);
//     if (forcedChatId) id = forcedChatId;
//     setActive(id);

//     // optimistic append user msg (avoid duplicate if seeded already in messages)
//     if (!seeded) {
//       setConversation(prev => [...prev, { sender: "user", text: cleaned }]);
//       updateActiveChatMessages(prev => [...prev, { sender: "user", text: cleaned }]);
//       renameActiveTitleIfNeeded(cleaned);
//     }

//     setIsLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/ai/ask", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ query: cleaned }),
//       });
//       const data = await res.json();
//       const aiText = data?.response ?? "…";

//       setConversation(prev => [...prev, { sender: "ai", text: aiText }]);
//       updateActiveChatMessages(prev => [...prev, { sender: "ai", text: aiText }]);
//     } catch {
//       const fallback = "I couldn’t reach the server. Please try again.";
//       setConversation(prev => [...prev, { sender: "ai", text: fallback }]);
//       updateActiveChatMessages(prev => [...prev, { sender: "ai", text: fallback }]);
//     } finally {
//       setIsLoading(false);
//       setQuery("");
//     }
//   };

//   const handleSubmit = (e) => { e.preventDefault(); askAI(query); };

//   return (
//     <div className={`sbai chat-root ${sidebarOpen ? "with-sidebar" : "sidebar-collapsed"}`} data-theme={theme}>
//       {/* Header */}
//       <header className="chat-header">
//         {/* left: burger + title */}
//         <div className="header-left">
//           <button
//             className="burger"
//             type="button"
//             onClick={() => setSidebarOpen(v => !v)}
//             aria-label="Toggle sidebar"
//             title="Toggle sidebar"
//           >
//             <span /><span /><span />
//           </button>
//           <div className="chat-title">Sportbit AI</div>
//         </div>

//         {/* right: theme toggle */}
//         <button
//           className="theme-toggle"
//           type="button"
//           onClick={() => setTheme(t => (t === "dark" ? "light" : "dark"))}
//           aria-label="Toggle theme"
//           title="Toggle theme"
//         >
//           {theme === "dark" ? (
//             <svg viewBox="0 0 24 24" fill="currentColor">
//               <path d="M12 18a6 6 0 1 1 0-12 7 7 0 0 0 0 12Z" />
//             </svg>
//           ) : (
//             <svg viewBox="0 0 24 24" fill="currentColor">
//               <path d="M12 4a1 1 0 0 1 1 1v1.1a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1Zm0 12.8A4.8 4.8 0 1 0 12 7.2a4.8 4.8 0 0 0 0 9.6ZM4 11a1 1 0 0 1 1-1h1.1a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Zm13.9 0a1 1 0 0 1 1-1H20a1 1 0 1 1 0 2h-1.1a1 1 0 0 1-1-1ZM6.3 6.3a1 1 0 0 1 1.4 0l.8.8a1 1 0 1 1-1.4 1.4l-.8-.8a1 1 0 0 1 0-1.4Zm9.2 9.2a1 1 0 0 1 1.4 0l.8.8a1 1 0 1 1-1.4 1.4l-.8-.8a1 1 0 0 1 0-1.4Zm0-9.2a1 1 0 0 1 1.4 0l.8.8a1 1 0 1 1-1.4 1.4l-.8-.8a1 1 0 0 1 0-1.4ZM6.3 15.5a1 1 0 0 1 1.4 0l.8.8a1 1 0 1 1-1.4 1.4l-.8-.8a1 1 0 0 1 0-1.4Z" />
//             </svg>
//           )}
//         </button>
//       </header>

//       {/* Sidebar */}
//       <aside className={`sb-sidebar ${sidebarOpen ? "open" : "closed"}`}>
//         <div className="sb-sidebar-inner">
//           <button className="new-chat" onClick={() => newChat()}>
//             + New chat
//           </button>

//           <div className="sb-history">
//             {history.length === 0 && <div className="empty-hint">No chats yet</div>}
//             {history.map(h => (
//               <div
//                 key={h.id}
//                 className={`sb-history-item ${h.id === activeId ? "active" : ""}`}
//                 onClick={() => loadChat(h.id)}
//                 title={h.title}
//               >
//                 <div className="title">{h.title || "New chat"}</div>
//                 <button
//                   className="delete"
//                   onClick={(e) => { e.stopPropagation(); deleteChat(h.id); }}
//                   aria-label="Delete chat"
//                   title="Delete chat"
//                 >
//                   ×
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </aside>

//       {/* Scrollable pane */}
//       <main ref={chatRef} className="chat-pane">
//         {conversation.map((msg, i) => (
//           <div key={i} className={`row ${msg.sender === "user" ? "me" : "bot"}`}>
//             <div className={`bubble ${msg.sender === "user" ? "me" : "bot"}`}>
//               {msg.text}
//             </div>
//           </div>
//         ))}

//         {isLoading && (
//           <div className="row bot">
//             <div className="bubble bot">
//               <span className="typing">
//                 <span className="dot" /><span className="dot" /><span className="dot" />
//               </span>
//             </div>
//           </div>
//         )}
//         <div ref={endRef} style={{ height: 1 }} />
//       </main>

//       {/* Composer */}
//       <footer className="composer-fixed">
//         <form onSubmit={handleSubmit} className="composer">
//           <input
//             type="text"
//             placeholder="Message Sportbit AI…"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//           />
//           <button type="submit">Send</button>
//         </form>
//       </footer>
//     </div>
//   );
// }














import React, { useEffect, useRef, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import "./aiChat.css";

export default function ChatPage() {
  const { state } = useLocation();

  /* ---------- Theme (default = light) ---------- */
  const [theme, setTheme] = useState(() => localStorage.getItem("sb_theme") || "light");
  useEffect(() => { localStorage.setItem("sb_theme", theme); }, [theme]);

  /* ---------- Chat + History ---------- */
  const [query, setQuery] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // history is a list of { id, title, messages, createdAt }
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem("sb_history") || "[]"); }
    catch { return []; }
  });
  const [activeId, setActiveId] = useState(() => localStorage.getItem("sb_active_id") || null);

  // sidebar (overlay)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const chatRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    requestAnimationFrame(() => endRef.current?.scrollIntoView({ block: "end", behavior: "smooth" }));
  }, [conversation, isLoading]);

  /* ---------- Helpers: save / load chats ---------- */
  const persistHistory = (next) => {
    setHistory(next);
    localStorage.setItem("sb_history", JSON.stringify(next));
  };
  const setActive = (id) => {
    setActiveId(id);
    localStorage.setItem("sb_active_id", id ?? "");
  };

  const newChat = (seedText = "") => {
    const id = `c_${Date.now()}`;
    const title = seedText?.trim()?.slice(0, 40) || "New chat";
    const initialMessages = seedText ? [{ sender: "user", text: seedText }] : [];
    const chat = { id, title, messages: initialMessages, createdAt: Date.now() };
    const next = [chat, ...history];
    persistHistory(next);
    setActive(id);
    setConversation(initialMessages);
    return id;
  };

  const loadChat = (id) => {
    const chat = history.find(h => h.id === id);
    if (!chat) return;
    setActive(id);
    setConversation(chat.messages || []);
    setSidebarOpen(false);
  };

  const updateActiveChatMessages = (updater) => {
    if (!activeId) return;
    const next = history.map(h =>
      h.id === activeId ? { ...h, messages: updater(h.messages || []) } : h
    );
    persistHistory(next);
  };

  const renameActiveTitleIfNeeded = (firstUserText) => {
    if (!activeId) return;
    const next = history.map(h => {
      if (h.id !== activeId) return h;
      if (!h.title || h.title === "New chat") {
        return { ...h, title: (firstUserText || "New chat").slice(0, 40) };
      }
      return h;
    });
    persistHistory(next);
  };

  const deleteChat = (id) => {
    const next = history.filter(h => h.id !== id);
    persistHistory(next);
    if (id === activeId) {
      setActive(next[0]?.id || null);
      setConversation(next[0]?.messages || []);
    }
  };

  /* ---------- Seed query support ---------- */
  useEffect(() => {
    if (state?.seedQuery) {
      const id = newChat(state.seedQuery);
      askAI(state.seedQuery, true, id);
    } else {
      if (!activeId && history.length === 0) {
        const id = newChat();
        setActive(id);
      } else if (activeId) {
        loadChat(activeId);
      } else if (history[0]) {
        loadChat(history[0].id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- Ask AI ---------- */
  const askAI = async (text, seeded = false, forcedChatId = null) => {
    const cleaned = text?.trim();
    if (!cleaned) return;

    // ensure we have an active chat
    let id = activeId;
    if (!id) id = newChat(cleaned);
    if (forcedChatId) id = forcedChatId;
    setActive(id);

    // optimistic append user msg (avoid duplicate if seeded already in messages)
    if (!seeded) {
      setConversation(prev => [...prev, { sender: "user", text: cleaned }]);
      updateActiveChatMessages(prev => [...prev, { sender: "user", text: cleaned }]);
      renameActiveTitleIfNeeded(cleaned);
    }

    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/ai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: cleaned }),
      });
      const data = await res.json();
      const aiText = data?.response ?? "…";

      setConversation(prev => [...prev, { sender: "ai", text: aiText }]);
      updateActiveChatMessages(prev => [...prev, { sender: "ai", text: aiText }]);
    } catch {
      const fallback = "I couldn’t reach the server. Please try again.";
      setConversation(prev => [...prev, { sender: "ai", text: fallback }]);
      updateActiveChatMessages(prev => [...prev, { sender: "ai", text: fallback }]);
    } finally {
      setIsLoading(false);
      setQuery("");
    }
  };

  const handleSubmit = (e) => { e.preventDefault(); askAI(query); };

  return (
    <div
      className={`sbai chat-root ${sidebarOpen ? "sidebar-open" : ""}`}
      data-theme={theme}
    >
      {/* Header */}
      <header className="chat-header">
        {/* Left: Burger */}
        <button
          className="burger"
          type="button"
          onClick={() => setSidebarOpen(v => !v)}
          aria-label="Toggle sidebar"
          title="Toggle sidebar"
        >
          <span /><span /><span />
        </button>

        {/* Center: Title */}
        <div className="chat-title">Sportbit AI</div>

        {/* Right: Theme toggle + Home */}
        <div className="header-right">
          {/* Theme toggle */}
          <button
            className="theme-toggle"
            type="button"
            onClick={() => setTheme(t => (t === "dark" ? "light" : "dark"))}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 18a6 6 0 1 1 0-12 7 7 0 0 0 0 12Z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4a1 1 0 0 1 1 1v1.1a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1Zm0 12.8A4.8 4.8 0 1 0 12 7.2a4.8 4.8 0 0 0 0 9.6ZM4 11a1 1 0 0 1 1-1h1.1a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Zm13.9 0a1 1 0 0 1 1-1H20a1 1 0 1 1 0 2h-1.1a1 1 0 0 1-1-1ZM6.3 6.3a1 1 0 0 1 1.4 0l.8.8a1 1 0 1 1-1.4 1.4l-.8-.8a1 1 0 0 1 0-1.4Zm9.2 9.2a1 1 0 0 1 1.4 0l.8.8a1 1 0 1 1-1.4 1.4l-.8-.8a1 1 0 0 1 0-1.4Zm0-9.2a1 1 0 0 1 1.4 0l.8.8a1 1 0 1 1-1.4 1.4l-.8-.8a1 1 0 0 1 0-1.4ZM6.3 15.5a1 1 0 0 1 1.4 0l.8.8a1 1 0 1 1-1.4 1.4l-.8-.8a1 1 0 0 1 0-1.4Z" />
              </svg>
            )}
          </button>

          {/* 🏠 Home button */}
          <button
            className="home-btn"
            onClick={() => window.location.href = "/"}
            title="Go to Home"
            aria-label="Go to Home"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9.5L12 3l9 6.5v11a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-11Z" />
            </svg>
          </button>
        </div>
      </header>



      {/* Backdrop for sidebar (click to close) */}
      <div
        className="sb-backdrop"
        aria-hidden="true"
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar (overlay) */}
      <aside className="sb-sidebar">
        <div className="sb-sidebar-inner">
          <button className="new-chat" onClick={() => newChat()}>
            + New chat
          </button>

          <div className="sb-history">
            {history.length === 0 && <div className="empty-hint">No chats yet</div>}
            {history.map(h => (
              <div
                key={h.id}
                className={`sb-history-item ${h.id === activeId ? "active" : ""}`}
                onClick={() => loadChat(h.id)}
                title={h.title}
              >
                <div className="title">{h.title || "New chat"}</div>
                <button
                  className="delete"
                  onClick={(e) => { e.stopPropagation(); deleteChat(h.id); }}
                  aria-label="Delete chat"
                  title="Delete chat"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Scrollable pane */}
      <main ref={chatRef} className="chat-pane">
        {conversation.map((msg, i) => (
          <div key={i} className={`row ${msg.sender === "user" ? "me" : "bot"}`}>
            <div className={`bubble ${msg.sender === "user" ? "me" : "bot"}`}>
              {msg.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="row bot">
            <div className="bubble bot">
              <span className="typing">
                <span className="dot" /><span className="dot" /><span className="dot" />
              </span>
            </div>
          </div>
        )}
        <div ref={endRef} style={{ height: 1 }} />
      </main>

      {/* Composer */}
      <footer className="composer-fixed">
        <form onSubmit={handleSubmit} className="composer">
          <input
            type="text"
            placeholder="Message Sportbit AI…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </footer>
    </div>
  );
}
