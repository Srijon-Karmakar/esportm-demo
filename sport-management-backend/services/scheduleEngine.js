// services/scheduleEngine.js
import { DateTime, Interval } from 'luxon';

function overlaps(a, b) { return !(a.end <= b.start || b.end <= a.start); }
function intersects(a=[], b=[]) { const s = new Set(a.map(String)); return b.some(x => s.has(String(x))); }

function hasConflict(ev, existing) {
  return existing.some(e =>
    overlaps(ev, e) &&
    (e.locationId === ev.locationId || e.teamId === ev.teamId || intersects(e.playerIds, ev.playerIds))
  );
}

export async function buildSchedule(payload, club) {
  const tz = payload.timezone || 'Asia/Kolkata';
  const start = DateTime.fromISO(payload.start, { zone: tz });
  const end = DateTime.fromISO(payload.end, { zone: tz });

  const fixed = (payload.fixtures || []).map(normalizeEvent(tz));
  const blocks = (payload.blackoutWindows || []).map(normalizeEvent(tz));
  const preferred = (payload.preferredWindows || []).map(normalizeEvent(tz));
  const toPlace = (payload.constraints?.toPlace || []).map(x => ({ ...x }));

  const placed = [...fixed];
  const conflicts = [];

  const allowed = computeAllowed(start, end, blocks);

  for (const req of toPlace) {
    const candidates = enumerateCandidates(req, allowed, preferred, tz);
    let ok = false;

    for (const slot of candidates) {
      const ev = {
        id: `gen_${req.type}_${slot.start.toISO()}`,
        type: req.type,
        title: req.title || req.type,
        start: slot.start.toISO(),
        end: slot.end.toISO(),
        locationId: req.locationId || null,
        teamId: req.teamId || club?._id || null,
        playerIds: req.playerIds || []
      };
      const evCheck = { ...ev, start: DateTime.fromISO(ev.start).toMillis(), end: DateTime.fromISO(ev.end).toMillis() };
      const existingCheck = placed.map(p => ({ ...p, start: DateTime.fromISO(p.start).toMillis(), end: DateTime.fromISO(p.end).toMillis() }));
      if (!hasConflict(evCheck, existingCheck)) {
        placed.push(ev);
        ok = true;
        break;
      }
    }
    if (!ok) conflicts.push({ request: req, reason: 'No available slot without conflicts' });
  }

  return {
    timezone: tz,
    events: placed.sort((a, b) => a.start.localeCompare(b.start)),
    conflicts,
    summary: `Placed ${placed.length - fixed.length}/${toPlace.length} requested sessions.`
  };
}

function normalizeEvent(tz) {
  return (e) => ({
    ...e,
    start: DateTime.fromISO(e.start, { zone: tz }).toISO(),
    end: DateTime.fromISO(e.end, { zone: tz }).toISO()
  });
}

function computeAllowed(start, end, blackout) {
  let allowed = [Interval.fromDateTimes(start, end)];
  for (const b of blackout) {
    const bi = Interval.fromDateTimes(DateTime.fromISO(b.start), DateTime.fromISO(b.end));
    allowed = allowed.flatMap(ai => ai.difference(bi));
  }
  return allowed;
}

function enumerateCandidates(req, allowedIntervals, preferred, tz) {
  const dur = req.durationMinutes || 90;
  const step = req.stepMinutes || 30;

  const preferredIntervals = preferred.filter(p => p.type === req.type)
    .map(p => Interval.fromDateTimes(DateTime.fromISO(p.start), DateTime.fromISO(p.end)));

  const windows = preferredIntervals.length ? preferredIntervals : allowedIntervals;

  const out = [];
  for (const win of windows) {
    let cur = win.start;
    while (cur.plus({ minutes: dur }) <= win.end) {
      const s = cur, e = cur.plus({ minutes: dur });
      out.push({ start: s, end: e });
      cur = cur.plus({ minutes: step });
    }
  }
  return out;
}
