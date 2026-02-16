// import express from 'express';
// // import { getClubPlayers } from '../controllers/ClubControllers.js';
// import { protectClub } from '../utils/authClub.js'; 
// import { getClubPlayers, signupClub, loginClub, removeFromClub } from '../controllers/ClubControllers.js';

// const router = express.Router();

// router.post('/signup', signupClub);
// router.post('/login', loginClub);
// router.get('/my-players', protectClub, getClubPlayers); 
// router.put('/remove-from-club/:id', protectClub, removeFromClub); 

// export default router;
















// src/routes/clubRoutes.js
import express from "express";
import { protectClub } from "../utils/authClub.js";
import {
  getClubPlayers, signupClub, loginClub, removeFromClub,
  getMeClub, updateMeClub
} from "../controllers/ClubControllers.js";

const router = express.Router();

router.post("/signup", signupClub);
router.post("/login", loginClub);

// profile
router.get("/me", protectClub, getMeClub);
router.put("/me", protectClub, updateMeClub);

// players
router.get("/my-players", protectClub, getClubPlayers);
router.put("/remove-from-club/:id", protectClub, removeFromClub);

export default router;
