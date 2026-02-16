import React, { useState } from 'react';
import axios from '../api/axios'; // your axios base is http://localhost:5000  
import './AiAgent.css';

export default function AIAgent() {
  const [tab, setTab] = useState('recommend');
  return (
    <div className="aiagent">
      <div className="tabs">
        {['recommend','health','transfers','schedule'].map(t => (
          <button key={t} className={tab===t?'active':''} onClick={()=>setTab(t)}>{t.toUpperCase()}</button>
        ))}
      </div>
      {tab==='recommend' && <TabRecommend />}
      {tab==='health' && <TabHealth />}
      {tab==='transfers' && <TabTransfers />}
      {tab==='schedule' && <TabSchedule />}
    </div>
  );
}

function TabRecommend() {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [res, setRes] = useState(null);

  const submit = async () => {
    const fd = new FormData();
    if (name) fd.append('name', name);
    if (image) fd.append('image', image);
    const { data } = await axios.post('/ai/players/recommend', fd);
    setRes(data);
  };

  return (
    <div className="panel">
      <div className="row">
        <input placeholder="Player name" value={name} onChange={e=>setName(e.target.value)} />
        <input type="file" accept="image/*" onChange={e=>setImage(e.target.files?.[0] || null)} />
        <button onClick={submit}>Analyze</button>
      </div>
      {res && (
        <div className="card">
          {!res.found ? <p>{res.message}</p> :
            <>
              <h3>{res.player.name} — {res.player.position || '—'}</h3>
              <p>Form: GA/Match {res.form?.gA_perMatch} | Fitness {res.form?.fitnessScore}</p>
              <p>KPI: Attack {res.kpis?.attackScore} | Creation {res.kpis?.chanceCreationScore} | Possession {res.kpis?.possessionScore} | Defense {res.kpis?.defenseScore}</p>
              <h4>Verdict: {res.verdict?.label} ({res.verdict?.score}/100)</h4>
            </>
          }
        </div>
      )}
    </div>
  );
}

function TabHealth() {
  const [playerId, setPlayerId] = useState('');
  const [res, setRes] = useState(null);
  const token = localStorage.getItem('clubToken'); // matches your existing pattern  

  const submit = async () => {
    const { data } = await axios.post('/ai/players/health', { playerId }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setRes(data);
  };

  return (
    <div className="panel">
      <div className="row">
        <input placeholder="Player Mongo _id" value={playerId} onChange={e=>setPlayerId(e.target.value)} />
        <button onClick={submit}>Check</button>
      </div>
      {res && (res.found ? (
        <div className="card">
          <h3>{res.player.name} — {res.player.position || '—'}</h3>
          <p>Readiness: {res.health.readiness}/100 | Risk: {res.health.riskScore}/100</p>
          {res.health.flags?.length ? <p>Flags: {res.health.flags.join(', ')}</p> : null}
          <p>{res.health.narrative}</p>
        </div>
      ) : <p className="no-results">{res.message}</p>)}
    </div>
  );
}

function TabTransfers() {
  const [payload, setPayload] = useState({ position: '', budget: '', ageMin: 16, ageMax: 35, style: 'default' });
  const [res, setRes] = useState(null);
  const token = localStorage.getItem('clubToken');

  const submit = async () => {
    const body = {
      position: payload.position || undefined,
      budget: payload.budget ? Number(payload.budget) : undefined,
      ageRange: [Number(payload.ageMin), Number(payload.ageMax)],
      style: payload.style
    };
    const { data } = await axios.post('/ai/transfers/recommend', body, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setRes(data);
  };

  return (
    <div className="panel">
      <div className="row">
        <input placeholder="Position (e.g., ST, CB, CM)" value={payload.position} onChange={e=>setPayload({...payload, position:e.target.value})} />
        <input placeholder="Budget" value={payload.budget} onChange={e=>setPayload({...payload, budget:e.target.value})} />
        <input placeholder="Age min" value={payload.ageMin} onChange={e=>setPayload({...payload, ageMin:e.target.value})} />
        <input placeholder="Age max" value={payload.ageMax} onChange={e=>setPayload({...payload, ageMax:e.target.value})} />
        <select value={payload.style} onChange={e=>setPayload({...payload, style:e.target.value})}>
          <option value="default">Default</option>
          <option value="high-press">High Press</option>
          <option value="possession">Possession</option>
          <option value="direct">Direct</option>
        </select>
        <button onClick={submit}>Recommend</button>
      </div>
      {res && (
        <div className="list">
          {res.players?.map((p) => (
            <div className="card" key={p.player._id}>
              <h3>{p.player.name} — {p.player.position || '—'} {p.player.age ? `(${p.player.age})` : ''}</h3>
              <p>ClubId: {p.player.club || 'N/A'} | Est. Value: {p.player.estimatedValue ?? 'N/A'}</p>
              <p>Score: {p.score}/100 | Fitness: {p.form?.fitnessScore}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TabSchedule() {
  const [payload, setPayload] = useState({
    start: '',
    end: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    toPlaceJSON: '[{"type":"TRAINING","title":"Team Training","durationMinutes":90,"stepMinutes":30}]'
  });
  const [res, setRes] = useState(null);
  const token = localStorage.getItem('clubToken');

  const submit = async () => {
    let toPlace = [];
    try { toPlace = JSON.parse(payload.toPlaceJSON); } catch { toPlace = []; }
    const body = {
      start: payload.start,
      end: payload.end,
      timezone: payload.timezone,
      constraints: { toPlace },
      fixtures: [], blackoutWindows: [], preferredWindows: []
    };
    const { data } = await axios.post('/ai/schedule/generate', body, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setRes(data);
  };

  return (
    <div className="panel">
      <div className="row">
        <input type="datetime-local" value={payload.start} onChange={e=>setPayload({...payload, start:e.target.value})}/>
        <input type="datetime-local" value={payload.end} onChange={e=>setPayload({...payload, end:e.target.value})}/>
        <input value={payload.timezone} onChange={e=>setPayload({...payload, timezone:e.target.value})}/>
      </div>
      <textarea rows={6} value={payload.toPlaceJSON} onChange={e=>setPayload({...payload, toPlaceJSON:e.target.value})}/>
      <div className="row"><button onClick={submit}>Generate</button></div>
      {res && (
        <div className="list">
          <h4>{res.summary}</h4>
          {res.events?.map(ev => (
            <div className="card" key={ev.id}>
              <strong>{ev.title}</strong>
              <div>{new Date(ev.start).toLocaleString()} → {new Date(ev.end).toLocaleString()}</div>
              <div>Type: {ev.type}</div>
            </div>
          ))}
          {res.conflicts?.length ? <p>Unplaced: {res.conflicts.length}</p> : null}
        </div>
      )}
    </div>
  );
}
