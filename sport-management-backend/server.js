// server.js
import express from 'express';
import dotenv from 'dotenv';
import http from "http";
import connectDB from './Config/db.js';
import playerRoutes from './routes/playerRoutes.js';
import clubRoutes from './routes/clubRoutes.js';
import managerRoutes from './routes/managerRoutes.js';
import cors from 'cors';
import chatRoutes from './routes/chatRoutes.js';
// import demoRoutes from './routes/DemoRoutes.js'; 
import adminRoutes from './routes/AdminRoutes.js';
import physioRoutes from './routes/PhysioRoutes.js';
import agentRoutes from './routes/AgentRoutes.js';
import coachRoutes from './routes/coach.routes.js';
import nutritionistRoutes from './routes/nutritionist.routes.js';
import pitchManagerRoutes from './routes/pitchmanager.routes.js';
// import aiRoutes from './routes/AiRoutes.js';
// import aiRoutes from './routes/AI/recomendationAI.js';
import bookDemoRoutes from "./routes/bookDemo.routes.js";
import { verifyMailer } from "./utils/mailer.js";
// import mongoose from "mongoose";
import aiAgentRoutes from './routes/aiAgent.routes.js';

import offerRoutes from './routes/offerRoutes.js';

// timeline and feed
import fs from 'fs';
import path from 'path';
import feedRoutes from './routes/feedRoutes.js';


import { mountSocket } from './socket/index.js'; 
import mediaRoutes from "./routes/mediaRoutes.js";


const tmpDir = path.join(process.cwd(), 'tmp_uploads');
if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });


dotenv.config();
connectDB(); // This runs db.js internally


const corsOptions = {
  origin: ['http://localhost:5173'], // Vite dev
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: false, // not needed for Bearer
};


const app = express();
app.use(express.json());
// app.use(cors());
app.use(cors(corsOptions)); 

// app.use(cors(corsOptions));
// app.options('*', cors(corsOptions)); 

// Routes
app.use('/player', playerRoutes);
app.use('/club', clubRoutes);
app.use('/manager', managerRoutes);
app.use('/api/chat', chatRoutes);
app.use('/admin/demo-requests', adminRoutes);
app.use('/physio', physioRoutes);
app.use('/agent', agentRoutes);
app.use('/coach', coachRoutes);
app.use('/nutritionist', nutritionistRoutes);
app.use('/pitchmanager', pitchManagerRoutes);
app.use("/api/book-demo", bookDemoRoutes);
app.use('/ai', aiAgentRoutes);
app.use('/offers', offerRoutes);
app.use('/api/feed', feedRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/media", mediaRoutes);

// app.use('/ai', aiRoutes);
verifyMailer();





const PORT = process.env.PORT || 5000;

// chat update 
const server = http.createServer(app);                     
mountSocket(server); 
// chat update 

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// chat update
 server.listen(PORT, () => console.log(`HTTP + Socket.IO running on port ${PORT}`));
// chat update 
