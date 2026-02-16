// import ChatList from "./ChatList";
// import ChatWindow from "./ChatWindow";
// import { ChatProvider } from "../../context/ChatContext";

// export default function ChatPage() {
//   const token = localStorage.getItem("token"); // or your auth token key

//   return (
//     <ChatProvider token={token}>
//       <div className="flex h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
//         <ChatList />
//         <ChatWindow />
//       </div>
//     </ChatProvider>
//   );
// }









// src/pages/Chat/index.jsx
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import { ChatProvider, useChat } from "../../context/ChatContext";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function ChatBootstrapper() {
  const [params] = useSearchParams();
  const roomId = params.get("roomId");
  const { setActiveRoom, join, loadHistory } = useChat();

  useEffect(() => {
    if (!roomId) return;
    setActiveRoom(roomId);
    join(roomId);
    loadHistory(roomId);
  }, [roomId]);

  return (
    <div className="flex h-[100vh] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <ChatList />
      <ChatWindow />
    </div>
  );
}

export default function ChatPage() {
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("playerToken") ||
    localStorage.getItem("managerToken");

  return (
    <ChatProvider token={token}>
      <ChatBootstrapper />
    </ChatProvider>
  );
}
