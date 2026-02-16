// services/kpi.js
// Works with your current Performance aggregate schema: { rating, goals, assists, matches }  

function nz(v, d=0) { return (v ?? d); }

export function formFromAggregate(p = null) {
  if (!p) return { sampleMatches: 0, gA_perMatch: 0, fitnessScore: 40, minutes: 0, goals: 0, assists: 0 };

  const matches = Math.max(1, nz(p.matches, 1));
  const goals = nz(p.goals, 0);
  const assists = nz(p.assists, 0);
  const gApm = (goals + assists) / matches;

  // Simple readiness heuristic using rating & matches
  const rating = nz(p.rating, 6.0); // 6.0 baseline
  const fitnessScore = Math.max(0, Math.min(100, Math.round(
    50 * Math.tanh(matches / 8) + 50 * Math.tanh((rating - 5.5) / 2)
  )));

  return {
    sampleMatches: matches,
    goals, assists,
    gA_perMatch: round2(gApm),
    minutes: matches * 90, // approximation
    fitnessScore
  };
}

export function computeKPIsFromAggregate(p = null) {
  if (!p) return emptyKPIs();

  const matches = Math.max(1, nz(p.matches, 1));
  const goals = nz(p.goals, 0);
  const assists = nz(p.assists, 0);
  const rating = nz(p.rating, 6.0);

  // Normalize pillars 0..100 (tuned for football)
  const attackScore = squash( 1.8 * goals / matches + 0.7 * assists / matches );     // goals+assists bias
  const chanceCreationScore = squash( 1.2 * assists / matches + 0.15 * rating );     // proxy: assists + rating
  const possessionScore = squash( 0.12 * rating );                                    // proxy: rating
  const defenseScore = squash( 0.10 * rating );                                       // proxy: rating

  return {
    sampleMatches: matches,
    minutes: matches * 90,
    perMatch: { goalsPM: round2(goals / matches), assistsPM: round2(assists / matches) },
    attackScore, chanceCreationScore, possessionScore, defenseScore
  };
}

function squash(x) {
  // Sigmoid-ish mapping into 0..100
  if (x == null || isNaN(x)) return 0;
  return Math.max(0, Math.min(100, Math.round(100 * (1 / (1 + Math.exp(-x))))));
}
function round2(x){ return Math.round(x*100)/100; }
function emptyKPIs(){ return { sampleMatches: 0, minutes: 0, perMatch: {}, attackScore: 0, chanceCreationScore: 0, possessionScore: 0, defenseScore: 0 }; }
