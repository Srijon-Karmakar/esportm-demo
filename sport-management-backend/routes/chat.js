import { Router } from "express";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

const router = Router();

/** Expect req.user = { id, role, name } from your auth middleware */
function requireAuth(req, res, next) {
  // If you already have middleware, replace this with `import auth from '../middleware/auth.js'`
  if (!req.user?.id || !req.user?.role) return res.status(401).json({ message: "Unauthorized" });
  next();
}

router.post("/open", requireAuth, async (req, res) => {
  const me = { role: req.user.role, userId: req.user.id };
  const you = { role: req.body.role, userId: req.body.userId };
  if (!["Player", "Manager"].includes(you.role)) return res.status(400).json({ message: "invalid role" });
  if (String(you.userId) === String(me.userId) && you.role === me.role)
    return res.status(400).json({ message: "cannot chat with self" });

  const roomId = Conversation.buildRoomId(me, you);
  const up = await Conversation.findOneAndUpdate(
    { roomId },
    {
      $setOnInsert: {
        roomId,
        participants: [
          { userId: me.userId, role: me.role },
          { userId: you.userId, role: you.role },
        ],
      },
    },
    { new: true, upsert: true }
  );
  res.json(up);
});

router.get("/conversations", requireAuth, async (req, res) => {
  const uid = req.user.id;
  const conversations = await Conversation.find({
    "participants.userId": uid,
  })
    .sort({ lastMessageAt: -1 })
    .limit(50);
  res.json(conversations);
});

router.get("/messages", requireAuth, async (req, res) => {
  const { roomId, before, limit = 30 } = req.query;
  if (!roomId) return res.status(400).json({ message: "roomId required" });

  // Access guard: user must be a participant
  const ok = await Conversation.exists({ roomId, "participants.userId": req.user.id });
  if (!ok) return res.status(403).json({ message: "forbidden" });

  const cursor = before ? { createdAt: { $lt: new Date(before) } } : {};
  const items = await Message.find({ roomId, ...cursor })
    .sort({ createdAt: -1 })
    .limit(Math.min(+limit, 100));

  res.json({ items: items.reverse(), nextBefore: items[0]?.createdAt ?? null });
});

router.post("/read", requireAuth, async (req, res) => {
  const { roomId, at } = req.body;
  const when = at ? new Date(at) : new Date();

  // Access guard
  const ok = await Conversation.exists({ roomId, "participants.userId": req.user.id });
  if (!ok) return res.status(403).json({ message: "forbidden" });

  await Conversation.updateOne(
    { roomId, "participants.userId": req.user.id },
    { $set: { "participants.$.lastReadAt": when } }
  );

  await Message.updateMany(
    { roomId, "readBy.userId": { $ne: req.user.id } },
    { $push: { readBy: { userId: req.user.id, at: when } } }
  );
  res.json({ ok: true, at: when });
});

export default router;
