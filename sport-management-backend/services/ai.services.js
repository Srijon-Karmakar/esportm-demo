// services/ai.service.js
import Player from '../models/Player.model.js';
import Performance from '../models/Performance.model.js';
import Club from '../models/Club.model.js';
import { computeKPIsFromAggregate, formFromAggregate } from './kpi.js';
import { healthScore, healthNarrative } from './healthEngine.js';
import { rankTransfers } from './transferEngine.js';
import { buildSchedule } from './scheduleEngine.js';
import { extractFaceVector, matchPlayerByFace } from './vision.js';

export async function playerRecommendation({ name, imageBuffer }) {
  let player = null;

  // A) Name exact/loose match
  if (name) {
    player = await Player.findOne({ name: new RegExp(`^${escapeRegex(name)}$`, 'i') }).lean();
    if (!player) {
      // loose contains match
      player = await Player.findOne({ name: new RegExp(escapeRegex(name), 'i') }).lean();
    }
  }

  // B) Optional face match if not found and image provided
  if (!player && imageBuffer) {
    const faceVec = await extractFaceVector(imageBuffer).catch(() => null);
    if (faceVec) player = await matchPlayerByFace(faceVec);
  }

  if (!player) return { found: false, message: 'Player not found by name or image.' };

  // NOTE: your Performance model is one-per-player aggregate (player_id unique). 
  const perfAgg = await Performance.findOne({ player_id: player._id }).lean();

  const form = formFromAggregate(perfAgg);           // works with rating/goals/assists/matches
  const kpis = computeKPIsFromAggregate(perfAgg);    // normalized 0..100 pillar scores

  const verdictScore = scorePlayer(kpis, form);
  const verdict = verdictScore >= 70 ? 'Recommended' : verdictScore >= 55 ? 'Borderline' : 'Not recommended';

  return {
    found: true,
    player: {
      _id: player._id,
      name: player.name,
      age: player.age,
      position: player.position,
      club: player.club_id, // ref id (populate if needed)
      status: player.status,
    },
    form,
    kpis,
    verdict: { label: verdict, score: verdictScore }
  };
}

export async function playerHealth({ playerId }) {
  const player = await Player.findById(playerId).lean();
  if (!player) return { found: false, message: 'Player not found.' };

  const perfAgg = await Performance.findOne({ player_id: player._id }).lean();
  const score = healthScore({ player, performance: perfAgg });
  const narrative = healthNarrative({ player, performance: perfAgg, score });

  return {
    found: true,
    player: { _id: player._id, name: player.name, position: player.position },
    health: { riskScore: score.riskScore, readiness: score.readiness, flags: score.flags, narrative }
  };
}

export async function transferRecommendations(req) {
  const {
    position,
    budget,
    ageRange = [16, 35],
    league,            // if you add a field later
    kpiWeights = {},
    style              // 'high-press' | 'possession' | 'direct' | undefined
  } = req;

  const q = {};
  if (position) q.position = position;
  if (ageRange?.length === 2) q.age = { $gte: ageRange[0], $lte: ageRange[1] };

  // budget tie-in if you store estimatedValue later
  if (budget) q.estimatedValue = { $lte: budget };

  const players = await Player.find(q).limit(300).lean();

  // map aggregate performances (one doc per player)
  const ids = players.map(p => p._id);
  const perfs = await Performance.find({ player_id: { $in: ids } }).lean();
  const perfMap = new Map(perfs.map(p => [String(p.player_id), p]));

  const enriched = players.map(p => {
    const agg = perfMap.get(String(p._id));
    const form = formFromAggregate(agg);
    const kpis = computeKPIsFromAggregate(agg);
    return { player: p, form, kpis };
  });

  const ranked = rankTransfers({ candidates: enriched, kpiWeights, style, budget });
  return { total: ranked.length, players: ranked.slice(0, 25) };
}

export async function scheduleGenerate(payload) {
  // payload: { start, end, timezone, fixtures, blackoutWindows, constraints, preferredWindows, clubId? }
  const club = payload.clubId ? await Club.findById(payload.clubId).lean() : null;
  const schedule = await buildSchedule(payload, club);
  return schedule;
}

// —— helpers ——
function scorePlayer(kpis, form) {
  const w = { attack: 0.35, creation: 0.25, possession: 0.15, defense: 0.15, fitness: 0.10 };
  const clamp = (x) => Math.max(0, Math.min(100, Math.round(x)));
  return clamp(
    w.attack * (kpis.attackScore ?? 0) +
    w.creation * (kpis.chanceCreationScore ?? 0) +
    w.possession * (kpis.possessionScore ?? 0) +
    w.defense * (kpis.defenseScore ?? 0) +
    w.fitness * (form.fitnessScore ?? 60)
  );
}

function escapeRegex(s=''){ return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
