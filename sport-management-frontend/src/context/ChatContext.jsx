// src/context/ChatContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import useChatSocket from "../hooks/useChatSocket";
import axios from "../api/axios";

const ChatCtx = createContext(null);
export const useChat = () => useContext(ChatCtx);

export function ChatProvider({ token, children }) {
  const { socket, connected, join, sendMessage, markRead, typing } = useChatSocket(token);
  const [activeRoom, setActiveRoom] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!socket) return;
    const onNew = (m) => setMessages((prev) => prev.concat(m));
    const onTyping = ({ userId, isTyping }) => {/* show typing badge */};
    socket.on("message:new", onNew);
    socket.on("typing", onTyping);
    return () => {
      socket.off("message:new", onNew);
      socket.off("typing", onTyping);
    };
  }, [socket]);

  const loadHistory = async (roomId) => {
    const { data } = await axios.get("/chat/messages", { params: { roomId, limit: 30 } });
    setMessages(data.items);
  };

  const value = useMemo(() => ({
    connected, activeRoom, setActiveRoom, join, sendMessage, markRead, typing, messages, loadHistory
  }), [connected, activeRoom, messages]);

  return <ChatCtx.Provider value={value}>{children}</ChatCtx.Provider>;
}
