// services/healthEngine.js
// Heuristic wellness (informational only; not medical advice).
export function healthScore({ player, performance }) {
    const matches = Math.max(0, performance?.matches ?? 0);
    const rating = performance?.rating ?? 6.0;
  
    // naive ACWR proxy using matches played recently (if you later store weekly loads, swap here)
    const acwr = matches >= 8 ? (3 / ( (matches-3) / 5 )) : 1; // pretend last 3 vs prev 5 matches
    let risk = 0;
    if (acwr > 1.5) risk += 25;
    if (acwr < 0.6) risk += 10;
  
    if (rating < 5.8) risk += 10;
    if (player?.status === 'Injured') risk += 40;
  
    risk = clamp(risk, 0, 100);
    const readiness = clamp(100 - Math.round(risk * 0.8), 0, 100);
  
    const flags = [];
    if (acwr > 1.5) flags.push('Acute load spike');
    if (acwr < 0.6) flags.push('Low recent load');
    if (player?.status === 'Injured') flags.push('Injury status');
    if (rating < 5.8) flags.push('Low recent rating');
  
    return { riskScore: risk, readiness, flags };
  }
  
  export function healthNarrative({ player, performance, score }) {
    const bits = [];
    bits.push(score.flags.length ? `Flags: ${score.flags.join(', ')}.` : 'No red flags detected.');
    bits.push(`Readiness ${score.readiness}/100; risk ${score.riskScore}/100.`);
    bits.push('Recommendation: maintain sleep & hydration; if risk > 60, reduce training load 20–30% for 3–5 days.');
    return bits.join(' ');
  }
  
  function clamp(x,a,b){ return Math.max(a, Math.min(b, x)); }
  