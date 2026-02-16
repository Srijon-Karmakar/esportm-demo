// import Player from '../models/Player.model.js';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// dotenv.config();

// // Signup Controller
// export const signupPlayer = async (req, res) => {
//   try {
    
//     const { name, email, password, phone_number, position, height, weight } = req.body;

//     // Check if the email already exists
//     const existingPlayer = await Player.findOne({ email });
//     if (existingPlayer) {
//       return res.status(400).json({ message: 'Email already exists' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new player
//     const newPlayer = new Player({
//       player_id: `PLAYER-${Date.now()}`,
//       name,
//       email,
//       password: hashedPassword,
//       phone_number,
//       position,
//       height,
//       weight,
//     });

//     await newPlayer.save();
//     res.status(201).json({ message: 'Player registered successfully', player: newPlayer });
//   } catch (error) {
    
//     res.status(500).json({ error: error.message });
//   }
// };

// // Login Controller
// export const loginPlayer = async (req, res) => {
//   try {
//     console.log('Login attempt:', req.body);
//     const { email, password } = req.body;

//     // Check if the player exists
//     const player = await Player.findOne({ email });
//     if (!player) {
//       return res.status(404).json({ message: 'Player not found' });
//     }

//     // Compare the password
//     const isPasswordValid = await bcrypt.compare(password, player.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Generate a JWT token
//     const token = jwt.sign({ id: player._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.status(200).json({ message: 'Login successful', token, username: player.name });
//   } catch (error) {
//     console.error('Login error:', error);

//     res.status(500).json({ error: error.message });
//   }
// };


// // sell player update 25/7/25
// // import Player from '../models/Player.model.js';

// // 1. REMOVE PLAYER FROM CLUB → Add to MARKET
// export const removeFromClub = async (req, res) => {
//   try {
//     const player = await Player.findById(req.params.id);
//     if (!player) return res.status(404).json({ message: 'Player not found' });

//     // Check if the player belongs to this club
//     if (player.club_id?.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ message: 'You do not own this player' });
//     }

//     player.club_id = null;
//     player.isAvailableOnMarket = true;

//     await player.save();
//     res.json({ message: 'Player moved to marketplace' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // 2. BUY PLAYER FROM MARKET
// export const buyPlayerFromMarket = async (req, res) => {
//   try {
//     const player = await Player.findById(req.params.id);
//     if (!player || !player.isAvailableOnMarket) {
//       return res.status(404).json({ message: 'Player not available on market' });
//     }

//     player.club_id = req.user._id;
//     player.isAvailableOnMarket = false;

//     await player.save();
//     res.json({ message: 'Player bought successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // 3. GET MARKETPLACE PLAYERS
// export const getMarketplacePlayers = async (req, res) => {
//   try {
//     const players = await Player.find({ isAvailableOnMarket: true });
//     res.json(players);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // sell player update 25/7/25


// // upd 26.7.25 
// export const addPlayer = async (req, res) => {
//   try {
//     const { name, age, position, status } = req.body;
//     const clubId = req.user._id; // from protectClub

//     if (!name || !age || !position) {
//       return res.status(400).json({ message: "Please provide all required fields." });
//     }

//     const newPlayer = new Player({
//       player_id: `PLAYER-${Date.now()}`,
//       name,
//       age,
//       position,
//       status: status || 'Active',
//       club_id: clubId,
//     });

//     await newPlayer.save();
//     res.status(201).json({ message: 'Player added successfully', player: newPlayer });
//   } catch (err) {
//     console.error('Error adding player:', err);
//     res.status(500).json({ message: 'Server error while adding player' });
//   }
// };

// // upd 26.7.25 

















// controllers/Player.controllers.js
import Player from '../models/Player.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

/* --------------------------------- Helpers -------------------------------- */
const genPlayerId = () => `PLAYER-${Date.now()}`;

/* =============================== AUTH (Player) ============================== */
// Signup Controller
export const signupPlayer = async (req, res) => {
  try {
    const { name, email, password, phone_number, position, height, weight } = req.body;

    // Basic validations
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    // Check if the email already exists
    const existingPlayer = await Player.findOne({ email });
    if (existingPlayer) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new player
    const newPlayer = new Player({
      player_id: genPlayerId(),
      name,
      email,
      password: hashedPassword,
      phone_number,
      position,
      height,
      weight,
    });

    await newPlayer.save();

    // (Optional) issue token on signup for smooth UX
    const token = jwt.sign({ id: newPlayer._id, role: 'player' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      message: 'Player registered successfully',
      player: newPlayer,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// Login Controller
export const loginPlayer = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if the player exists
    const player = await Player.findOne({ email });
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, player.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: player._id, role: 'player' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token, username: player.name });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

/* ========================== CLUB → MARKETPLACE FLOWS ======================== */
/**
 * SELL PLAYER UPDATE (25/7/25)
 * 1) Club removes player from its roster => move to marketplace
 * - Auth: protectClub (req.user is the club)
 */
export const removeFromClub = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ message: 'Player not found' });

    // Check if the player belongs to this club
    if (player.club_id?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You do not own this player' });
    }

    player.club_id = null;
    player.isAvailableOnMarket = true;

    await player.save();
    res.json({ message: 'Player moved to marketplace' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * 2) Club buys player from marketplace
 * - Auth: protectClub (req.user is the club)
 */
export const buyPlayerFromMarket = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player || !player.isAvailableOnMarket) {
      return res.status(404).json({ message: 'Player not available on market' });
    }

    player.club_id = req.user._id;
    player.isAvailableOnMarket = false;

    await player.save();
    res.json({ message: 'Player bought successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * 3) Public/Club: Get marketplace players (with optional filters)
 *    Supports: sport, location, visibility, minPrice, maxPrice, q (name search)
 */
export const getMarketplacePlayers = async (req, res) => {
  try {
    const { sport, location, visibility, minPrice, maxPrice, q } = req.query;

    const query = { isAvailableOnMarket: true };

    if (sport) query['market.sport'] = sport;
    if (location) query['market.location'] = location;
    if (visibility) query['market.visibility'] = visibility;
    if (minPrice || maxPrice) {
      query['market.askingPrice'] = {};
      if (minPrice) query['market.askingPrice'].$gte = Number(minPrice);
      if (maxPrice) query['market.askingPrice'].$lte = Number(maxPrice);
    }
    if (q) query.name = { $regex: q, $options: 'i' };

    const players = await Player.find(query).sort({ join_date: -1 });
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================================ CLUB: ADD PLAYER ================================ */
/**
 * upd 26.7.25 — Create player under a club
 * - Auth: protectClub (req.user is the club)
 * Note: Your schema doesn’t include 'age' by default; this controller tolerates it,
 * but if you need to persist age, add `age: Number` into Player.model.js.
 */
export const addPlayer = async (req, res) => {
  try {
    const { name, age, position, status, height, weight, phone_number, email } = req.body;
    const clubId = req.user._id; // from protectClub

    if (!name || !position) {
      return res.status(400).json({ message: 'Please provide required fields: name, position.' });
    }

    const newPlayer = new Player({
      player_id: genPlayerId(),
      name,
      position,
      status: status || 'Active',
      club_id: clubId,
      // tolerant write (will be ignored if not in schema unless you add it):
      age,
      height,
      weight,
      phone_number,
      email,
    });

    await newPlayer.save();
    res.status(201).json({ message: 'Player added successfully', player: newPlayer });
  } catch (err) {
    res.status(500).json({ message: 'Server error while adding player' });
  }
};

/* ======================= PLAYER SELF-SERVICE MARKETPLACE ===================== */
/**
 * Player registers themselves to marketplace
 * - Auth: protectPlayer (req.user is the player)
 */
export const selfRegisterToMarketplace = async (req, res) => {
  try {
    const player = req.user;
    const {
      sport,
      preferredPositions = [],
      location,
      askingPrice,
      currency,
      visibility = 'public',
      bio,
      highlightsVideoUrl,
      achievements = [],
      footOrHand,
      // optional moderation overrides:
      status,      // 'draft' | 'pending' | 'approved' | 'rejected'
      verified,    // boolean
    } = req.body;

    if (!sport) return res.status(400).json({ message: 'sport is required' });

    player.isAvailableOnMarket = true;
    player.market = {
      sport,
      preferredPositions,
      location,
      askingPrice,
      currency,
      visibility,
      bio,
      highlightsVideoUrl,
      achievements,
      footOrHand,
      // default moderation flags (can be overridden if provided and you allow it)
      status: status ?? 'approved', // change to 'pending' if you want manual review
      verified: verified ?? false,
    };

    // optional: detach from current club when listing
    // player.club_id = null;

    await player.save();
    res.status(201).json({ message: 'Listing created', player });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update their listing
// - Auth: protectPlayer
export const updateSelfListing = async (req, res) => {
  try {
    const player = req.user;
    if (!player.isAvailableOnMarket || !player.market) {
      return res.status(404).json({ message: 'No active listing' });
    }

    // Only allow updates to known market fields
    const allowed = [
      'sport',
      'preferredPositions',
      'location',
      'askingPrice',
      'currency',
      'visibility',
      'bio',
      'highlightsVideoUrl',
      'achievements',
      'footOrHand',
      'status',
      'verified',
    ];
    for (const key of Object.keys(req.body || {})) {
      if (allowed.includes(key)) player.market[key] = req.body[key];
    }

    await player.save();
    res.json({ message: 'Listing updated', player });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete/withdraw their listing
// - Auth: protectPlayer
export const withdrawSelfListing = async (req, res) => {
  try {
    const player = req.user;
    player.isAvailableOnMarket = false;
    player.market = null;
    await player.save();
    res.json({ message: 'Listing withdrawn' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};







// profile update 11.7.25

// GET /api/player/me
// export const getMePlayer = async (req, res) => {
//   const p = req.user; // from protectPlayer
//   res.json({
//     id: p._id,
//     name: p.name,
//     email: p.email,
//     phone_number: p.phone_number,
//     position: p.position,
//     height: p.height,
//     weight: p.weight,
//   });
// };

// export const getMePlayer = async (req, res) => {
//   const p = req.user;
//   res.json({
//     id: p._id, name: p.name, email: p.email, phone_number: p.phone_number,
//     position: p.position, height: p.height, weight: p.weight,
//     avatarUrl: p.avatarUrl, bannerUrl: p.bannerUrl,
//   });
// };

export const getMePlayer = async (req, res) => {
  const p = req.user; // set by protectPlayer
  return res.json({
    id: p._id,
    player_id: p.player_id,
    name: p.name,
    email: p.email,
    phone_number: p.phone_number,
    position: p.position,
    height: p.height,
    weight: p.weight,
    status: p.status,
    club_id: p.club_id,
    join_date: p.join_date,

    // profile fields
    about: p.about,
    location: p.location,
    website: p.website,
    pincode: p.pincode,
    club_history: p.club_history,
    stats: p.stats,
    club_name: p.club_name,
    avatarUrl: p.avatarUrl,
    bannerUrl: p.bannerUrl,
  });
};

// PUT /api/player/me
// export const updateMePlayer = async (req, res) => {
//   const p = req.user;
//   const { name, email, phone_number, position, height, weight } = req.body;
//   if (name !== undefined) p.name = name;
//   if (email !== undefined) p.email = email;
//   if (phone_number !== undefined) p.phone_number = phone_number;
//   if (position !== undefined) p.position = position;
//   if (height !== undefined) p.height = height;
//   if (weight !== undefined) p.weight = weight;
//   await p.save();
//   res.json({ message: "Player profile updated" });
// };


// export const updateMePlayer = async (req, res) => {
//   const p = req.user;
//   const { name, email, phone_number, position, height, weight, avatarUrl, bannerUrl } = req.body;
//   if (name !== undefined) p.name = name;
//   if (email !== undefined) p.email = email;
//   if (phone_number !== undefined) p.phone_number = phone_number;
//   if (position !== undefined) p.position = position;
//   if (height !== undefined) p.height = height;
//   if (weight !== undefined) p.weight = weight;
//   if (avatarUrl !== undefined) p.avatarUrl = avatarUrl;
//   if (bannerUrl !== undefined) p.bannerUrl = bannerUrl;
//   await p.save();
//   res.json({ message: "Player profile updated" });
// };


export const updateMePlayer = async (req, res) => {
  const p = req.user;
  const {
    name,
    email,
    phone_number,
    position,
    height,
    weight,

    about,
    location,
    website,
    pincode,
    club_history, // array of strings
    stats,        // {goals, matches, red, yellow}
    club_name,

    avatarUrl,
    bannerUrl,
  } = req.body;

  if (name !== undefined) p.name = name;
  if (email !== undefined) p.email = email;
  if (phone_number !== undefined) p.phone_number = phone_number;
  if (position !== undefined) p.position = position;
  if (height !== undefined) p.height = height;
  if (weight !== undefined) p.weight = weight;

  if (about !== undefined) p.about = about;
  if (location !== undefined) p.location = location;
  if (website !== undefined) p.website = website;
  if (pincode !== undefined) p.pincode = pincode;

  if (club_history !== undefined) p.club_history = Array.isArray(club_history) ? club_history : p.club_history;
  if (stats !== undefined && typeof stats === "object") {
    p.stats = {
      goals: Number(stats.goals ?? p.stats.goals ?? 0),
      matches: Number(stats.matches ?? p.stats.matches ?? 0),
      red: Number(stats.red ?? p.stats.red ?? 0),
      yellow: Number(stats.yellow ?? p.stats.yellow ?? 0),
    };
  }
  if (club_name !== undefined) p.club_name = club_name;

  if (avatarUrl !== undefined) p.avatarUrl = avatarUrl;
  if (bannerUrl !== undefined) p.bannerUrl = bannerUrl;

  await p.save();
  return res.json({ message: "Player profile updated" });
};


// profile update 11.7.25 
