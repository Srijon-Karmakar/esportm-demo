import express from "express";
import {
  createOffer,
  listSentOffers,
  listReceivedOffers,
  actOnOffer,
} from "../controllers/Offer.controllers.js";

import { protectManager } from "../utils/authManager.js";
import { protectCoach } from "../utils/authCoach.js";
import { protectPlayer } from "../utils/authPlayer.js";

const router = express.Router();

// Helper middlewares
const asManager = (req, _res, next) => { req.fromRole = "manager"; next(); };
const asCoach = (req, _res, next) => { req.fromRole = "coach"; next(); };

// Managers & Coaches
router.post("/manager", protectManager, asManager, createOffer);
router.post("/coach", protectCoach, asCoach, createOffer);
router.get("/manager/sent", protectManager, listSentOffers);
router.get("/coach/sent", protectCoach, listSentOffers);

// Players
router.get("/player/received", protectPlayer, listReceivedOffers);
router.post("/:id/action", protectPlayer, actOnOffer);

export default router;
