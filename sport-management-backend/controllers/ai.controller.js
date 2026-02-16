// controllers/ai.controllers.js
import {
    playerRecommendation,
    playerHealth,
    transferRecommendations,
    scheduleGenerate,
  } from '../services/ai.services.js';
  
  export const recommendPlayer = async (req, res) => {
    try {
      const { name } = req.body;
      const imageBuffer = req.file?.buffer || null;
      const result = await playerRecommendation({ name, imageBuffer });
      res.json(result);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Failed to compute player recommendation' });
    }
  };
  
  export const analyzeHealth = async (req, res) => {
    try {
      const { playerId } = req.body; // Mongo _id
      const result = await playerHealth({ playerId });
      res.json(result);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Failed to analyze player health' });
    }
  };
  
  export const recommendTransfers = async (req, res) => {
    try {
      const result = await transferRecommendations(req.body);
      res.json(result);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Failed to compute transfer recommendations' });
    }
  };
  
  export const generateSchedule = async (req, res) => {
    try {
      const result = await scheduleGenerate(req.body);
      res.json(result);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Failed to generate schedule' });
    }
  };
  