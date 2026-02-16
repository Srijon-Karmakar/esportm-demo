// // src/hooks/useChatSocket.js
// import { useEffect, useRef, useCallback, useState } from "react";
// import { io } from "socket.io-client";

// export default function useChatSocket(token) {
//   const socketRef = useRef(null);
//   const [connected, setConnected] = useState(false);

//   useEffect(() => {
//     const s = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000", {
//       transports: ["websocket"],
//       auth: { token }
//     });
//     socketRef.current = s;
//     s.on("connect", () => setConnected(true));
//     s.on("disconnect", () => setConnected(false));
//     return () => s.disconnect();
//   }, [token]);

//   const join = useCallback((roomId) => socketRef.current?.emit("join", { roomId }), []);
//   const sendMessage = useCallback((payload) => socketRef.current?.emit("message:send", payload), []);
//   const markRead = useCallback((roomId) => socketRef.current?.emit("message:read", { roomId }), []);
//   const typing = useCallback((roomId, isTyping) => socketRef.current?.emit("typing", { roomId, isTyping }), []);

//   return { socket: socketRef.current, connected, join, sendMessage, markRead, typing };
// }







// ✨ UPDATED socket hook that works without .env
// import { useEffect, useRef, useState, useCallback } from "react";
// import { io } from "socket.io-client";

// const SOCKET_URL =
//   typeof window !== "undefined" && window.location.hostname === "localhost"
//     ? "http://localhost:5000"        // dev
//     : window.location.origin;         // prod (same domain)

// export default function useChatSocket(token) {
//   const socketRef = useRef(null);
//   const [connected, setConnected] = useState(false);

//   useEffect(() => {
//     const s = io(SOCKET_URL, {
//       transports: ["websocket"],
//       auth: { token },
//     });
//     socketRef.current = s;
//     s.on("connect", () => setConnected(true));
//     s.on("disconnect", () => setConnected(false));
//     return () => s.disconnect();
//   }, [token]);

//   const join = useCallback((roomId) => socketRef.current?.emit("join", { roomId }), []);
//   const sendMessage = useCallback((payload) => socketRef.current?.emit("message:send", payload), []);
//   const markRead = useCallback((roomId) => socketRef.current?.emit("message:read", { roomId }), []);

//   return { socket: socketRef.current, connected, join, sendMessage, markRead };
// }



















// src/hooks/useChatSocket.js
import { useEffect, useRef, useState, useCallback } from "react";
import { io } from "socket.io-client";

// same auto URL logic you’re using:
const SOCKET_URL =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : window.location.origin;

// 👉 use the same token getter your axios uses
function getValidToken() {
  const keys = ["token","playerToken","managerToken","accessToken","jwt","adminToken","superadminToken"];
  for (const k of keys) {
    const raw = localStorage.getItem(k) ?? sessionStorage.getItem(k);
    if (!raw || raw === "null" || raw === "undefined") continue;
    try {
      const parsed = JSON.parse(raw);
      if (typeof parsed === "string" && parsed.length > 10) return parsed;
      if (parsed?.token && parsed.token.length > 10) return parsed.token;
    } catch {
      if (typeof raw === "string" && raw.length > 10) return raw;
    }
  }
  return null;
}

export default function useChatSocket() {
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const token = getValidToken(); // ✅ ensure we actually send a token
    const s = io(SOCKET_URL, {
      transports: ["websocket"],
      auth: { token },
    });

    socketRef.current = s;
    s.on("connect", () => setConnected(true));
    s.on("disconnect", () => setConnected(false));
    s.on("connect_error", (err) => {
      console.error("socket connect_error:", err?.message, err); // 👀 see exact reason
    });

    return () => s.disconnect();
  }, []);

  const join = useCallback((roomId) => socketRef.current?.emit("join", { roomId }), []);
  const sendMessage = useCallback((payload) => socketRef.current?.emit("message:send", payload), []);
  const markRead = useCallback((roomId) => socketRef.current?.emit("message:read", { roomId }), []);

  return { socket: socketRef.current, connected, join, sendMessage, markRead };
}

