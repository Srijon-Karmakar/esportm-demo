// app.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken";              // ✅ top-level import
import chatRoutes from "./routes/chat.js";

// import connectDB from "./Config/db.js"; connectDB();

const app = express();

const origins = (process.env.CORS_ORIGIN || "*").split(",");
app.use(cors({ origin: origins.includes("*") ? "*" : origins }));
app.use(helmet());
app.use(express.json({ limit: "5mb" }));
app.use(rateLimit({ windowMs: 10 * 1000, max: 200 }));

// --- temporary auth attach (replace with your real middleware when ready) ---
app.use((req, _res, next) => {               // ✅ no async/await needed here
  try {
    const header = req.headers.authorization || "";
    if (header.startsWith("Bearer ")) {
      const token = header.split(" ")[1];
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { id: String(payload.sub), role: payload.role, name: payload.name };
    }
  } catch {}
  next();
});

// ----- routes -----
app.use("/api/chat", chatRoutes);

app.get("/health", (_req, res) => res.json({ ok: true }));

export default app;
