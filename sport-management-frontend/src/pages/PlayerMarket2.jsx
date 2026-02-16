// import React from "react";

// export default function SportbitMarket() {
//   return (
//     <div className="h-screen w-screen bg-[#ffffff] overflow-y-auto overflow-x-hidden">
//       {/* Top bar */}
//       <header className="sticky top-0 z-30 bg-[#B48EDB]/90 backdrop-blur-md">
//         <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
//           <div className="flex items-center gap-3">
//             <div className="rounded-2xl bg-white/30 px-5 py-3">
//               <div className="text-xl font-extrabold tracking-wide">SPORTBIT</div>
//               <div className="text-xs text-black/80 -mt-1">Player Market</div>
//             </div>
//             <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-white/90">
//               {["Football", "Cricket", "Hockey", "Rugby", "Olympics", "Others"].map((t, i) => (
//                 <button key={t} className="group relative">
//                   <span>{t}</span>
//                   <span className="absolute -bottom-1 left-0 h-[3px] w-0 rounded-full bg-white/80 transition-all duration-200 group-hover:w-full" />
//                 </button>
//               ))}
//             </nav>
//           </div>

//           <button className="grid place-items-center h-10 w-10 rounded-full bg-white/25 ring-2 ring-white/30 hover:bg-white/35">
//             <span className="i-[home]" />
//           </button>
//         </div>
//       </header>

//       <main className="mx-auto max-w-7xl px-4 pb-24 pt-6">
//         {/* Category tiles */}
//         <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
//           {[
//             { title: "Cricketers", color: "from-pink-300/60 to-purple-500/60", img: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1440&auto=format&fit=crop" },
//             { title: "Footballers", color: "from-orange-400/60 to-red-500/60", img: "https://images.unsplash.com/photo-1543322748-33df6d3db806?q=80&w=1440&auto=format&fit=crop" },
//             { title: "Hockey Players", color: "from-green-300/60 to-emerald-500/60", img: "https://images.unsplash.com/photo-1521417531039-94a2f6b4c84f?q=80&w=1440&auto=format&fit=crop" },
//             { title: "Rugby Players", color: "from-sky-400/60 to-blue-700/60", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1440&auto=format&fit=crop" },
//           ].map((c) => (
//             <article
//               key={c.title}
//               className="relative overflow-hidden rounded-3xl shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
//             >
//               <img src={c.img} alt={c.title} className="h-44 w-full object-cover" />
//               <div className={`absolute inset-0 bg-gradient-to-tr ${c.color}`} />
//               <h3 className="absolute bottom-4 left-5 text-2xl font-extrabold tracking-wide text-white drop-shadow">
//                 {c.title}
//               </h3>
//             </article>
//           ))}
//         </section>

//         {/* Trending players */}
//         <section className="mt-8">
//           <h2 className="mb-4 text-xl font-semibold text-[#251B2F]">Trending players</h2>
//           <div className="relative overflow-x-auto">
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
//               {Array.from({ length: 5 }).map((_, i) => (
//                 <div
//                   key={i}
//                   className="rounded-2xl bg-gray-400/70 p-4 text-white shadow-inner"
//                   style={{ minHeight: 180 }}
//                 >
//                   <div className="mt-24">
//                     <div className="text-lg font-semibold">Player {i + 1}</div>
//                     <div className="text-sm opacity-90">information</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Top rated players */}
//         <section className="mt-10">
//           <h2 className="mb-4 text-xl font-semibold text-[#251B2F]">Top rated players</h2>
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
//             {Array.from({ length: 5 }).map((_, i) => (
//               <div
//                 key={i}
//                 className="rounded-2xl bg-white p-4 shadow-[0_6px_18px_rgba(0,0,0,0.08)]"
//                 style={{ minHeight: 180 }}
//               >
//                 <div className="h-28 w-full rounded-xl bg-gray-200/80" />
//                 <div className="mt-3 font-semibold text-[#251B2F]">Player {i + 1}</div>
//                 <div className="text-sm text-[#6c5a7b]">information</div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* More rows … (add as needed, vertical space keeps growing and page scrolls) */}
//       </main>
//     </div>
//   );
// }



// update 
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { FaHome, FaMoon, FaSun, FaTags } from "react-icons/fa";

// Import category images
import cricketImg from "../assets/images/marketplace/cricketer-banner.jpg";
import footballImg from "../assets/images/marketplace/footaballer-banner.jpg";
import hockeyImg from "../assets/images/marketplace/hockey-banner.jpg";
import rugbyImg from "../assets/images/marketplace/rugby-banner.jpg";

const Marketplace = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const role = localStorage.getItem('role');

  const tokenKey = role === 'manager' ? 'managerToken' : 'coachToken';
  const token = localStorage.getItem(tokenKey);
  const endpoint = role === 'manager' ? '/offers/manager' : '/offers/coach';


  /* ---------- Offer Modal State ---------- */
  const [showOffer, setShowOffer] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [offerForm, setOfferForm] = useState({
    price: "",
    currency: "INR",
    message: "",
    expiresAt: "",
  });
  const openOfferModal = (player) => {
    setSelectedPlayer(player);
    setOfferForm((f) => ({
      ...f,
      currency: player?.market?.currency || "INR",
    }));
    setShowOffer(true);
  };
  const closeOfferModal = () => {
    setShowOffer(false);
    setSelectedPlayer(null);
    setOfferForm({ price: "", currency: "INR", message: "", expiresAt: "" });
  };

  const submitOffer = async (e) => {
    e.preventDefault();
    if (!selectedPlayer) return;
    if (!(role === "manager" || role === "coach") || !token) {
      alert("Please login as Manager/Coach to make an offer.");
      return;
    }
    try {
      await axios.post(
        endpoint,
        {
          playerId: selectedPlayer._id,
          price: Number(offerForm.price),
          currency: offerForm.currency || "INR",
          message: offerForm.message || "",
          expiresAt: offerForm.expiresAt || null,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Offer sent!");
      closeOfferModal();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to send offer");
    }
  };



  const navigate = useNavigate();




  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  // Fetch marketplace players
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await axios.get("/player/marketplace");
        if (mounted) setPlayers(Array.isArray(data) ? data : []);
      } catch (e) {
        if (mounted) setError(e?.response?.data?.message || "Failed to load players");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const neuSurface =
    "bg-[#EEE8FA] dark:bg-[#1b1630] shadow-[8px_8px_16px_rgba(163,131,207,0.35),_-8px_-8px_16px_rgba(255,255,255,0.9)] dark:shadow-[8px_8px_18px_rgba(0,0,0,0.65),_-8px_-8px_16px_rgba(77,44,120,0.25)]";
  const neuPill =
    "rounded-full bg-[#EEE8FA] dark:bg-[#1b1630] shadow-[6px_6px_12px_rgba(163,131,207,0.35),_-6px_-6px_12px_rgba(255,255,255,0.9)] dark:shadow-[6px_6px_12px_rgba(0,0,0,0.6),_-6px_-6px_12px_rgba(77,44,120,0.25)] transition-all duration-200 hover:shadow-[inset_6px_6px_12px_rgba(163,131,207,0.35),inset_-6px_-6px_12px_rgba(255,255,255,0.85)] dark:hover:shadow-[inset_6px_6px_12px_rgba(0,0,0,0.55),inset_-6px_-6px_12px_rgba(77,44,120,0.25)]";
  const neuCard =
    "rounded-xl bg-[#EEE8FA] dark:bg-[#1b1630] shadow-[10px_10px_20px_rgba(163,131,207,0.35),_-10px_-10px_20px_rgba(255,255,255,0.9)] dark:shadow-[10px_10px_22px_rgba(0,0,0,0.65),_-10px_-10px_20px_rgba(77,44,120,0.25)] transition-transform duration-200 hover:-translate-y-[2px]";

  return (
    <div className="h-screen w-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 overflow-y-auto overflow-x-hidden">
      {/* HEADER */}
      <header
        className={`mx-4 mt-4 rounded-2xl px-6 py-4 ${neuSurface}
                    bg-[linear-gradient(145deg,#F4EDFF_0%,#E7DDF9_100%)]
                    dark:bg-[linear-gradient(145deg,#231a3a_0%,#17122a_100%)]`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-left">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              SPORTBIT
            </h1>
            <p className="text-sm font-medium text-slate-700/80 dark:text-gray-300">
              Player Market
            </p>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-3">
            {["Football", "Cricket", "Hockey", "Rugby", "Olympics", "Others"].map(
              (item) => (
                <button
                  key={item}
                  className={`${neuPill} px-4 py-2 text-sm font-medium text-slate-800 dark:text-gray-200`}
                >
                  {item}
                </button>
              )
            )}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className={`${neuPill} px-3 py-2 text-sm font-semibold text-slate-700 dark:text-purple-300 flex items-center gap-2`}
            >
              <FaHome color="black" /> Home
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`${neuPill} px-3 py-2 text-sm font-semibold text-slate-800 dark:text-purple-200 flex items-center gap-2`}
            >
              {darkMode ? (
                <>
                  <FaSun color="black" className="text-yellow-400" /> Light
                </>
              ) : (
                <>
                  <FaMoon color="black" className="text-purple-600" /> Dark
                </>
              )}
            </button>
            <button
              onClick={() => navigate("/market/register")}
              // className={`${neuPill} px-3 py-2 text-sm font-semibold  text-slate-700 dark:text-purple-300 flex items-center gap-2`}
              className={`rounded-full px-3 py-2 text-sm font-semibold flex items-center gap-2
  bg-gradient-to-r from-[#E7DDF9] to-[#B48EDB] dark:from-[#231a3a] dark:to-[#B48EDB]
  text-[#6c5a7b] dark:text-[#E7DDF9]
  shadow-[6px_6px_12px_rgba(163,131,207,0.25),_-6px_-6px_12px_rgba(255,255,255,0.7)]
  dark:shadow-[6px_6px_12px_rgba(77,44,120,0.35),_-6px_-6px_12px_rgba(180,142,219,0.15)]
  transition-all duration-200
  hover:shadow-[inset_6px_6px_12px_rgba(163,131,207,0.25),inset_-6px_-6px_12px_rgba(255,255,255,0.7)]
  dark:hover:shadow-[inset_6px_6px_12px_rgba(77,44,120,0.35),inset_-6px_-6px_12px_rgba(180,142,219,0.15)]
  hover:scale-[1.04]
`}
            >
              <FaTags color="black" /> Register As Player
            </button>
          </div>
        </div>
      </header>

      {/* CATEGORY CARDS */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
        {[
          {
            label: "Cricketers",
            grad: "from-purple-200/10 to-purple-800",
            img: cricketImg,
          },
          {
            label: "Footballers",
            grad: "from-rose-200/10 to-rose-800",
            img: footballImg,
          },
          {
            label: "Hockey Players",
            grad: "from-emerald-200/10 to-emerald-800",
            img: hockeyImg,
          },
          {
            label: "Rugby Players",
            grad: "from-yellow-200/10 to-yellow-800",
            img: rugbyImg,
          },
        ].map((item, i) => (
          <div
            key={i}
            className={`${neuCard} h-36 relative overflow-hidden group`}
          >
            {/* Background image */}
            <img
              src={item.img}
              alt={item.label}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-b ${item.grad} opacity-70`}
            />
            {/* Label */}
            <div className="relative h-full flex items-end p-4">
              <span className="text-lg font-bold text-white drop-shadow-md">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </section>


      {/* TRENDING PLAYERS (neumorphic tiles)
      <section className="p-6">
        <h2 className="text-lg font-semibold mb-3 text-slate-900 dark:text-white">
          Trending players
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`${neuCard} h-32 flex items-end p-3`}>
              <div className="text-slate-800 dark:text-gray-200 font-medium leading-4">
                <div>Player {i + 1}</div>
                <div className="text-xs opacity-80">information</div>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      <section className="p-6">
        <h2 className="text-lg font-semibold mb-3 text-slate-900 dark:text-white">Players on the market</h2>
        {loading && <div className="text-sm text-slate-500">Loading…</div>}
        {error && <div className="text-sm text-red-500">{error}</div>}
        {!loading && !error && (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {players.length === 0 ? (
              <div className="col-span-full text-sm text-slate-500">
                No players available yet. Try registering a player or check back later.
              </div>
            ) : (
              players.map((p) => (
                <div key={p._id} className={`${neuCard} h-40 p-3 flex flex-col justify-between`}>
                  <div className="text-slate-900 dark:text-gray-100 font-semibold truncate">{p.name}</div>
                  <div className="text-xs text-slate-600 dark:text-gray-300">
                    <div>Position: {p.position || "—"}</div>
                    <div>Sport: {p?.market?.sport || "—"}</div>
                    <div>Location: {p?.market?.location || "—"}</div>
                    <div>Price: {p?.market?.askingPrice ? `${p.market.currency || "INR"} ${p.market.askingPrice}` : "Open to offers"}</div>




                  </div>
                  {(role === 'manager' || role === 'coach') && (
                    <button
                      onClick={() => openOfferModal(p)} // set selectedPlayer in state
                      className="mt-2 rounded-full px-3 py-1 text-sm bg-emerald-500 text-white hover:bg-emerald-600"
                    >
                      Make Offer
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </section>



      {/* TOP RATED PLAYERS (neumorphic tiles) */}
      <section className="p-6">
        <h2 className="text-lg font-semibold mb-3 text-slate-900 dark:text-white">
          Top rated players
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`${neuCard} h-32 flex items-end p-3`}>
              <div className="text-slate-800 dark:text-gray-200 font-medium leading-4">
                <div>Player {i + 1}</div>
                <div className="text-xs opacity-80">information</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {showOffer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          onMouseDown={closeOfferModal}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className={`relative z-10 w-[92%] max-w-md rounded-2xl p-5 ${neuSurface}`}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Make Offer {selectedPlayer ? `• ${selectedPlayer.name}` : ""}
              </h3>
              <button onClick={closeOfferModal} className="text-sm opacity-80 hover:opacity-100">
                ✕
              </button>
            </div>

            <form onSubmit={submitOffer} className="grid gap-3">
              <label className="grid gap-1">
                <span className="text-sm">Price</span>
                <input
                  type="number"
                  min="0"
                  className="rounded-xl px-3 py-2 bg-white/70 dark:bg-black/20"
                  value={offerForm.price}
                  onChange={(e) => setOfferForm((f) => ({ ...f, price: e.target.value }))}
                  required
                />
              </label>

              <label className="grid gap-1">
                <span className="text-sm">Currency</span>
                <input
                  className="rounded-xl px-3 py-2 bg-white/70 dark:bg-black/20"
                  value={offerForm.currency}
                  onChange={(e) => setOfferForm((f) => ({ ...f, currency: e.target.value }))}
                />
              </label>

              <label className="grid gap-1">
                <span className="text-sm">Message (optional)</span>
                <textarea
                  className="rounded-xl px-3 py-2 bg-white/70 dark:bg-black/20"
                  rows={3}
                  value={offerForm.message}
                  onChange={(e) => setOfferForm((f) => ({ ...f, message: e.target.value }))}
                />
              </label>

              <label className="grid gap-1">
                <span className="text-sm">Expires At (optional)</span>
                <input
                  type="datetime-local"
                  className="rounded-xl px-3 py-2 bg-white/70 dark:bg-black/20"
                  value={offerForm.expiresAt}
                  onChange={(e) => setOfferForm((f) => ({ ...f, expiresAt: e.target.value }))}
                />
              </label>

              <div className="flex items-center justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={closeOfferModal}
                  className="px-4 py-2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-emerald-500 text-white hover:bg-emerald-600"
                >
                  Send Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


    </div >
  );
};

export default Marketplace;
