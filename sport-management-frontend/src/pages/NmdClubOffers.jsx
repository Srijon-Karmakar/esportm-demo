// src/pages/ClubOffers.jsx
import React, { useEffect, useState } from "react";             // 🔧 CHANGED (added useEffect)
import NmdSidebar2 from "../components/NmdSidebar2";
import "./NmdClubOffers.css";
import NmdHeader from "../components/NmdHeader";
import axios from "../api/axios";                                // 🆕 NEW

// (optional) placeholder for missing logos
const FALLBACK_LOGO = "https://via.placeholder.com/60x60?text=CLUB"; // 🆕 NEW

const ClubOffers = () => {
  /* ------------------------------ State ------------------------------ */
  const [offers, setOffers] = useState([]);                      // 🔧 CHANGED (replaces dummyOffers)
  const [loading, setLoading] = useState(true);                  // 🆕 NEW
  const [error, setError] = useState("");                        // 🆕 NEW
  const [actingId, setActingId] = useState(null);                // 🆕 NEW (disable buttons while acting)

  /* ------------------------- Fetch Offers (API) ---------------------- */
  useEffect(() => {                                              // 🆕 NEW
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("playerToken");       // 🆕 NEW
        if (!token) {
          setError("Please login as a player to view offers.");
          setLoading(false);
          return;
        }
        const { data } = await axios.get("/offers/player/received", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!mounted) return;
        // ensure it's an array
        setOffers(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!mounted) return;
        setError(err?.response?.data?.message || "Failed to load offers");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  /* ----------------------------- Actions ----------------------------- */
  const updateOfferStatusLocal = (id, newStatus) => {            // 🆕 NEW
    setOffers((prev) =>
      prev.map((o) =>
        (o.id || o._id) === id ? { ...o, status: newStatus } : o
      )
    );
  };

  const actOnOffer = async (offerId, action) => {                // 🆕 NEW
    try {
      setActingId(offerId);
      const token = localStorage.getItem("playerToken");
      await axios.post(
        `/offers/${offerId}/action`,
        { action }, // "accept" | "reject"
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Normalize API -> UI wording (matches your CSS .status.accepted/.declined if you use lowercase)
      const display =
        action === "accept" ? "Accepted" : action === "reject" ? "Declined" : "Pending";
      updateOfferStatusLocal(offerId, display);
    } catch (err) {
      alert(err?.response?.data?.message || `Failed to ${action} offer`);
    } finally {
      setActingId(null);
    }
  };

  const acceptOffer = (id) => actOnOffer(id, "accept");          // 🆕 NEW
  const declineOffer = (id) => actOnOffer(id, "reject");         // 🆕 NEW

  /* --------------------------- UI Helpers ---------------------------- */
  const clsStatus = (status) => {                                // 🆕 NEW
    const s = (status || "").toString().toLowerCase();
    return `status ${s}`; // you already style .status.pending/.accepted/.declined in CSS
  };

  /* ------------------------------- UI -------------------------------- */
  return (
    <div className="club-offers-wrapper">
      <NmdSidebar2 />
      <div className="club-offers-main">
        <NmdHeader title="Club Offers" />

        {/* List / States */}
        <div className="offers-container">
          {loading && <div className="info-row">Loading offers…</div> /* 🆕 NEW */}
          {error && !loading && <div className="error-row">{error}</div> /* 🆕 NEW */}

          {!loading && !error && offers.length === 0 && (
            <div className="info-row">No offers yet. Clubs’ offers will appear here.</div> /* 🆕 NEW */
          )}

          {!loading &&
            !error &&
            offers.map((offer) => {
              // Be flexible with API fields (clubName/logo/position/salary/status/location/description)
              const id = offer.id || offer._id;                  // 🆕 NEW
              const clubName = offer.clubName || offer?.club?.name || "Unknown Club";
              const logo = offer.logo || offer?.club?.logo || FALLBACK_LOGO;
              const position = offer.position || offer.role || offer?.playerPosition || "—";
              const salary =
                offer.salary ||
                offer.offeredSalary ||
                (offer.currency && offer.price ? `${offer.currency} ${offer.price}` : "—");
              const location = offer.location || offer?.club?.location || "—";
              const description =
                offer.description || offer.message || "Club has not added a description.";
              const status = offer.status || offer.state || "Pending";

              const isPending = status.toLowerCase() === "pending";
              const disabled = actingId === id;

              return (
                <div key={id} className="offer-card neumorphic">
                  <div className="club-info">
                    <img src={logo} alt={`${clubName} logo`} className="club-logo" />
                    <div>
                      <h3>{clubName}</h3>
                      <p>{location}</p>
                    </div>
                  </div>

                  <p>
                    <strong>Position:</strong> {position}
                  </p>
                  <p>
                    <strong>Salary:</strong> {salary}
                  </p>
                  <p className="description">{description}</p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span className={clsStatus(status)}>{status}</span>
                  </p>

                  <div className="actions">
                    {isPending && (
                      <>
                        <button
                          className="action-btn neumorphic accept"
                          disabled={disabled}
                          onClick={() => acceptOffer(id)}
                        >
                          {disabled ? "Processing…" : "Accept"}
                        </button>
                        <button
                          className="action-btn neumorphic decline"
                          disabled={disabled}
                          onClick={() => declineOffer(id)}
                        >
                          {disabled ? "Processing…" : "Decline"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ClubOffers;
