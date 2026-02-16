import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useChat } from "../../context/ChatContext";

export default function ChatList() {
  const [items, setItems] = useState([]);
  const { setActiveRoom, join, loadHistory } = useChat();

  useEffect(() => {
    axios.get("/chat/conversations").then(({ data }) => setItems(data));
  }, []);

  const openChat = async (room) => {
    setActiveRoom(room.roomId);
    join(room.roomId);
    await loadHistory(room.roomId);
  };

  return (
    <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
      {items.map((c) => (
        <div
          key={c.roomId}
          onClick={() => openChat(c)}
          className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
        >
          <p className="font-semibold">{c.roomId}</p>
          <p className="text-sm text-gray-500">{c.lastMessage || "No messages yet"}</p>
        </div>
      ))}
    </div>
  );
}
