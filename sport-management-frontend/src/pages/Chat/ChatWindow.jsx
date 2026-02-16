import { useEffect, useRef, useState } from "react";
import { useChat } from "../../context/ChatContext";

export default function ChatWindow() {
  const { activeRoom, messages, sendMessage, markRead } = useChat();
  const [text, setText] = useState("");
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (activeRoom) markRead(activeRoom);
  }, [activeRoom]);

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage({ roomId: activeRoom, text });
    setText("");
  };

  if (!activeRoom)
    return <div className="flex-1 flex items-center justify-center text-gray-400">Select a conversation</div>;

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m) => (
          <div key={m._id} className={`flex ${m.sender.userId === window.myId ? "justify-end" : "justify-start"}`}>
            <div className="px-3 py-2 rounded-lg bg-blue-100 dark:bg-blue-800">
              <p>{m.text}</p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="p-3 flex gap-2 border-t border-gray-200 dark:border-gray-700">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 bg-gray-100 dark:bg-gray-900 px-3 py-2 rounded-lg outline-none"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
