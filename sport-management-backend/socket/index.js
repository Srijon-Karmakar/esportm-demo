import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

/** Small JWT helper compatible with your existing tokens */
function authenticateSocket(socket, next) {
  try {
    const header = socket.handshake.headers?.authorization || "";
    const bearer = header.startsWith("Bearer ") ? header.split(" ")[1] : null;
    const token = socket.handshake.auth?.token || bearer;
    if (!token) return next(new Error("unauthorized: missing token"));

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = { id: String(payload.sub), role: payload.role, name: payload.name };
    next();
  } catch {
    next(new Error("unauthorized: bad token"));
  }
}

export const mountSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: { origin: process.env.CORS_ORIGIN?.split(",") || "*" },
  });

  io.use(authenticateSocket);

  io.on("connection", (socket) => {
    const me = socket.user;

    socket.on("join", async ({ roomId }) => {
      if (!roomId) return;
      const ok = await Conversation.exists({ roomId, "participants.userId": me.id });
      if (!ok) return;
      socket.join(roomId);
      socket.to(roomId).emit("presence", { userId: me.id, role: me.role, online: true });
    });

    socket.on("typing", ({ roomId, isTyping }) => {
      if (!roomId) return;
      socket.to(roomId).emit("typing", { userId: me.id, isTyping: !!isTyping });
    });

    socket.on("message:send", async ({ roomId, text = "", attachments = [] }) => {
      if (!roomId) return;
      const convo = await Conversation.findOne({ roomId, "participants.userId": me.id });
      if (!convo) return;

      const doc = await Message.create({
        roomId,
        sender: { userId: me.id, role: me.role },
        text: String(text).slice(0, 3000),
        attachments,
      });

      await Conversation.updateOne(
        { roomId },
        {
          $set: {
            lastMessage: doc.text || (doc.attachments?.length ? "[attachment]" : ""),
            lastMessageAt: doc.createdAt,
          },
        }
      );

      io.to(roomId).emit("message:new", doc);
    });

    socket.on("message:read", async ({ roomId }) => {
      if (!roomId) return;
      await Conversation.updateOne(
        { roomId, "participants.userId": me.id },
        { $set: { "participants.$.lastReadAt": new Date() } }
      );
      await Message.updateMany(
        { roomId, "readBy.userId": { $ne: me.id } },
        { $push: { readBy: { userId: me.id, at: new Date() } } }
      );
      socket.to(roomId).emit("message:read", { userId: me.id, at: new Date() });
    });
  });

  return io;
};
