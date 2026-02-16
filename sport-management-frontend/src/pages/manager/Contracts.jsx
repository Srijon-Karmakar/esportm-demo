// import React, { useState } from 'react';
// import ManagerSidebar from '../../components/ManagerSidebar';
// import NmdHeader from '../../components/NmdHeader';
// import './Contracts.css';
// import { motion } from 'framer-motion';

// const sampleApplications = [
//   {
//     id: 1,
//     name: 'John Doe',
//     position: 'Forward',
//     status: 'Pending',
//     message: 'Looking to join the club. Experienced in national-level matches.',
//   },
//   {
//     id: 2,
//     name: 'Alex Smith',
//     position: 'Goalkeeper',
//     status: 'Pending',
//     message: 'Strong background in club tournaments. Ready to relocate.',
//   },
// ];

// export default function OffersAndContracts() {
//   const [applications, setApplications] = useState(sampleApplications);

//   const handleAccept = (id) => {
//     setApplications((prev) =>
//       prev.map((app) =>
//         app.id === id ? { ...app, status: 'Accepted' } : app
//       )
//     );
//   };

//   const handleReject = (id) => {
//     setApplications((prev) =>
//       prev.map((app) =>
//         app.id === id ? { ...app, status: 'Rejected' } : app
//       )
//     );
//   };

//   return (
//     <div className="offers-page">
//       <ManagerSidebar />
//       <div className="main-content">
//         <NmdHeader />

//         <div className="content-wrapper">
//           <motion.h1
//             className="gradient-title"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             Player Applications & Contract Management
//           </motion.h1>

//           <section className="applications-section">
//             <h2>Pending Applications</h2>
//             <div className="applications-list">
//               {applications.map((app) => (
//                 <motion.div
//                   key={app.id}
//                   className="application-card neumorphic"
//                   whileHover={{ scale: 1.02 }}
//                 >
//                   <h3>{app.name}</h3>
//                   <p><strong>Position:</strong> {app.position}</p>
//                   <p><strong>Message:</strong> {app.message}</p>
//                   <p className={`status ${app.status.toLowerCase()}`}>
//                     {app.status}
//                   </p>
//                   {app.status === 'Pending' && (
//                     <div className="actions">
//                       <button className="accept-btn neumorphic" onClick={() => handleAccept(app.id)}>Accept</button>
//                       <button className="reject-btn neumorphic" onClick={() => handleReject(app.id)}>Reject</button>
//                     </div>
//                   )}
//                 </motion.div>
//               ))}
//             </div>
//           </section>

//           <section className="offer-form-section neumorphic">
//             <h2>Send Offer to Player</h2>
//             <form className="offer-form">
//               <input type="text" placeholder="Player Name" required />
//               <input type="text" placeholder="Position" required />
//               <input type="number" placeholder="Salary Offer (₹)" required />
//               <textarea placeholder="Additional Contract Terms" rows={4}></textarea>
//               <motion.button whileHover={{ scale: 1.05 }} className="send-offer-btn">Send Offer</motion.button>
//             </form>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// }




// src/pages/Contracts/OffersAndContracts.jsx
import React, { useState, useEffect } from 'react';                  // 🔧 CHANGED (useEffect added)
import ManagerSidebar from '../../components/ManagerSidebar';
import NmdHeader from '../../components/NmdHeader';
import './Contracts.css';
import { motion } from 'framer-motion';
import axios from '../../api/axios';                                  // 🆕 NEW

const sampleApplications = [
  {
    id: 1,
    name: 'John Doe',
    position: 'Forward',
    status: 'Pending',
    message: 'Looking to join the club. Experienced in national-level matches.',
  },
  {
    id: 2,
    name: 'Alex Smith',
    position: 'Goalkeeper',
    status: 'Pending',
    message: 'Strong background in club tournaments. Ready to relocate.',
  },
];

export default function OffersAndContracts() {
  const [applications, setApplications] = useState(sampleApplications);
  const [sentOffers, setSentOffers] = useState([]);                  // 🆕 NEW
  const [loadingSent, setLoadingSent] = useState(true);              // 🆕 NEW
  const [errorSent, setErrorSent] = useState('');                    // 🆕 NEW

  // 🆕 NEW – Offer form state (wired to /offers/manager)
  const [offerForm, setOfferForm] = useState({
    playerId: '',            // ← REQUIRED by API
    position: '',
    price: '',
    currency: 'INR',
    terms: '',
    message: '',
    expiresAt: '',           // optional (datetime-local)
  });
  const [submittingOffer, setSubmittingOffer] = useState(false);     // 🆕 NEW

  // 🆕 NEW – Fetch manager’s sent offers
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoadingSent(true);
        setErrorSent('');
        const token = localStorage.getItem('managerToken');
        if (!token) {
          setErrorSent('Please login as Manager to view sent offers.');
          setLoadingSent(false);
          return;
        }
        const { data: sent } = await axios.get('/offers/manager/sent', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!mounted) return;
        setSentOffers(Array.isArray(sent) ? sent : []);
      } catch (err) {
        if (!mounted) return;
        setErrorSent(err?.response?.data?.message || 'Failed to load sent offers');
      } finally {
        if (mounted) setLoadingSent(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const handleAccept = (id) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: 'Accepted' } : app))
    );
  };

  const handleReject = (id) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: 'Rejected' } : app))
    );
  };

  // 🆕 NEW – Submit a new offer to a player
  const submitOffer = async (e) => {
    e.preventDefault();
    if (!offerForm.playerId || !offerForm.price) {
      alert('Player ID and Salary Offer are required.');
      return;
    }
    try {
      setSubmittingOffer(true);
      const token = localStorage.getItem('managerToken');
      if (!token) {
        alert('Please login as Manager.');
        return;
      }
      // Minimal payload required by your offer API
      const payload = {
        playerId: offerForm.playerId,
        price: Number(offerForm.price),
        currency: offerForm.currency || 'INR',
        message: offerForm.message || offerForm.terms || '', // include terms in message if needed
        expiresAt: offerForm.expiresAt || null,
        // If your API supports extra fields, you can pass them:
        position: offerForm.position || undefined,
      };
      await axios.post('/offers/manager', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Offer sent!');
      // Optimistically prepend to list
      setSentOffers((prev) => [
        {
          _id: `local-${Date.now()}`,
          playerName: offerForm.playerId,       // if you want to resolve name, fetch player by ID
          position: offerForm.position,
          currency: offerForm.currency,
          price: payload.price,
          message: payload.message,
          expiresAt: payload.expiresAt,
          status: 'Pending',
        },
        ...prev,
      ]);
      setOfferForm({
        playerId: '',
        position: '',
        price: '',
        currency: 'INR',
        terms: '',
        message: '',
        expiresAt: '',
      });
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Failed to send offer');
    } finally {
      setSubmittingOffer(false);
    }
  };

  return (
    <div className="offers-page">
      <ManagerSidebar />
      <div className="main-content">
        <NmdHeader />

        <div className="content-wrapper">
          <motion.h1
            className="gradient-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Player Applications & Contract Management
          </motion.h1>

          {/* Pending Applications (sample) */}
         

          {/* 🆕 NEW – Manager’s Sent Offers */}
          <section className="applications-section">
            <h2>Sent Offers</h2>
            {loadingSent && <div className="info-row">Loading sent offers…</div>}
            {errorSent && !loadingSent && <div className="error-row">{errorSent}</div>}
            {!loadingSent && !errorSent && sentOffers.length === 0 && (
              <div className="info-row">No offers sent yet.</div>
            )}

            {!loadingSent && !errorSent && sentOffers.length > 0 && (
              <div className="applications-list">
                {sentOffers.map((offer) => {
                  const id = offer._id || offer.id;
                  const playerName =
                    offer.playerName || offer?.player?.name || offer.playerId || 'Player';
                  const position =
                    offer.position || offer?.player?.position || '—';
                  const salary =
                    offer.salary ||
                    (offer.currency && offer.price
                      ? `${offer.currency} ${offer.price}`
                      : '—');
                  const status = (offer.status || 'Pending').toString();
                  const expiresAt = offer.expiresAt
                    ? new Date(offer.expiresAt).toLocaleString()
                    : '—';

                  return (
                    <motion.div
                      key={id}
                      className="application-card neumorphic"
                      whileHover={{ scale: 1.02 }}
                    >
                      <h3>{playerName}</h3>
                      <p>
                        <strong>Position:</strong> {position}
                      </p>
                      <p>
                        <strong>Salary:</strong> {salary}
                      </p>
                      <p>
                        <strong>Expires:</strong> {expiresAt}
                      </p>
                      <p className={`status ${status.toLowerCase()}`}>{status}</p>
                      {/* If you later add "withdraw" API, place a button here */}
                    </motion.div>
                  );
                })}
              </div>
            )}
          </section>

          {/* 🔧 CHANGED – Offer form wired to API (/offers/manager) */}
          {/* <section className="offer-form-section neumorphic">
            <h2>Send Offer to Player</h2>
            <form className="offer-form" onSubmit={submitOffer}>
              
              <input
                type="text"
                placeholder="Player ID (required)"
                value={offerForm.playerId}
                onChange={(e) =>
                  setOfferForm((f) => ({ ...f, playerId: e.target.value }))
                }
                required
              />
              <input
                type="text"
                placeholder="Position"
                value={offerForm.position}
                onChange={(e) =>
                  setOfferForm((f) => ({ ...f, position: e.target.value }))
                }
              />
              <input
                type="number"
                placeholder="Salary Offer (₹)"
                value={offerForm.price}
                onChange={(e) =>
                  setOfferForm((f) => ({ ...f, price: e.target.value }))
                }
                required
              />
              <input
                type="text"
                placeholder="Currency"
                value={offerForm.currency}
                onChange={(e) =>
                  setOfferForm((f) => ({ ...f, currency: e.target.value }))
                }
              />
              <textarea
                placeholder="Additional Contract Terms"
                rows={4}
                value={offerForm.terms}
                onChange={(e) =>
                  setOfferForm((f) => ({ ...f, terms: e.target.value }))
                }
              />
              <textarea
                placeholder="Message to Player (optional)"
                rows={3}
                value={offerForm.message}
                onChange={(e) =>
                  setOfferForm((f) => ({ ...f, message: e.target.value }))
                }
              />
              <input
                type="datetime-local"
                placeholder="Expires At (optional)"
                value={offerForm.expiresAt}
                onChange={(e) =>
                  setOfferForm((f) => ({ ...f, expiresAt: e.target.value }))
                }
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="send-offer-btn"
                disabled={submittingOffer}
              >
                {submittingOffer ? 'Sending…' : 'Send Offer'}
              </motion.button>
            </form>
          </section> */}
        </div>
      </div>
    </div>
  );
}
