// services/transferEngine.js
export function rankTransfers({ candidates, kpiWeights = {}, style, budget }) {
    const w = {
      attack: kpiWeights.attack ?? 1.0,
      creation: kpiWeights.creation ?? 1.0,
      possession: kpiWeights.possession ?? 0.8,
      defense: kpiWeights.defense ?? 0.8
    };
  
    const styleBias = {
      'high-press': (k) => 0.6*k.defenseScore + 0.4*k.attackScore,
      'possession': (k) => 0.6*k.possessionScore + 0.4*k.chanceCreationScore,
      'direct':     (k) => 0.7*k.attackScore + 0.3*k.chanceCreationScore,
      default:      (k) => 0.3*k.attackScore + 0.3*k.chanceCreationScore + 0.2*k.possessionScore + 0.2*k.defenseScore
    };
    const biasFn = styleBias[style] || styleBias.default;
  
    const scored = candidates.map(({ player, form, kpis }) => {
      const k = kpis || {};
      const raw = w.attack*(k.attackScore||0) + w.creation*(k.chanceCreationScore||0) +
                  w.possession*(k.possessionScore||0) + w.defense*(k.defenseScore||0);
      const styleAdj = biasFn(k);
      const valueAdj = budget && player.estimatedValue ? Math.min(1, budget / player.estimatedValue) : 1;
      const score = Math.round(0.6*raw + 0.3*styleAdj + 0.1*(form?.fitnessScore ?? 60)) * valueAdj;
  
      return {
        player: {
          _id: player._id, name: player.name, position: player.position, age: player.age,
          club: player.club_id, estimatedValue: player.estimatedValue
        },
        form, kpis: k, score: Math.round(score)
      };
    });
  
    return scored.sort((a, b) => b.score - a.score);
  }
  