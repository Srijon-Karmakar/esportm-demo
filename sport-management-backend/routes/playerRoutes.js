


// routes/playerRoutes.js
import express from 'express';
import {
  signupPlayer,
  loginPlayer,
  removeFromClub,
  buyPlayerFromMarket,
  getMarketplacePlayers,
  addPlayer,
  selfRegisterToMarketplace,
  updateSelfListing,
  withdrawSelfListing,
  getMePlayer, 
  updateMePlayer
} from '../controllers/Player.controllers.js';

import { protectClub } from '../utils/authClub.js';
// import { protectPlayer } from '../middleware/auth.js';
import { protectPlayer } from '../utils/authPlayer.js';

const router = express.Router();

/* ------------------------- Auth Routes ------------------------- */
router.post('/signup', signupPlayer);
router.post('/login', loginPlayer);

/* --------------------- Club Managed Routes --------------------- */
// Club adds new player
router.post('/add', protectClub, addPlayer);

// Marketplace actions from a club perspective
router.put('/remove-from-club/:id', protectClub, removeFromClub);
router.put('/buy-player/:id', protectClub, buyPlayerFromMarket);

// Marketplace browsing (public/club can see available players)
router.get('/marketplace', getMarketplacePlayers);

 // profile
 router.get("/me", protectPlayer, getMePlayer);
 router.put("/me", protectPlayer, updateMePlayer);

/* ------------------ Player Self-Service Routes ----------------- */
// Player registers themselves to marketplace
router.post('/market/self-register', protectPlayer, selfRegisterToMarketplace);

// Update their listing
router.patch('/market/self-register', protectPlayer, updateSelfListing);

// Withdraw their listing
router.delete('/market/self-register', protectPlayer, withdrawSelfListing);

export default router;












// // src/routes/playerRoutes.js
// import express from "express";
// import {
//   signupPlayer, loginPlayer,
//   removeFromClub, buyPlayerFromMarket, getMarketplacePlayers,
//   addPlayer,
//   getMePlayer, updateMePlayer
// } from "../controllers/Player.controllers.js";
// import { protectClub } from "../utils/authClub.js";
// import { protectPlayer } from "../utils/authPlayer.js";

// const router = express.Router();

// router.post("/signup", signupPlayer);
// router.post("/login", loginPlayer);

// // profile
// router.get("/me", protectPlayer, getMePlayer);
// router.put("/me", protectPlayer, updateMePlayer);

// // marketplace/club
// router.put("/remove-from-club/:id", protectClub, removeFromClub);
// router.put("/buy-player/:id", protectClub, buyPlayerFromMarket);
// router.get("/marketplace", getMarketplacePlayers);
// router.post("/add", protectClub, addPlayer);

// export default router;
















