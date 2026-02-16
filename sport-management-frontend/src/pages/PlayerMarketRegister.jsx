import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function PlayerMarketRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    sport: "Football",
    preferredPositions: "",
    location: "",
    askingPrice: "",
    currency: "INR",
    visibility: "public",
    bio: "",
    highlightsVideoUrl: "",
    achievements: "",
    footOrHand: "Right",
  });
  const [loading, setLoading] = useState(false);

  // delete listing 
  const deleteListing = async () => {
    const token = localStorage.getItem("playerToken");
    if (!token) return alert("Please log in first.");

    if (!confirm("Are you sure you want to delete your listing?")) return;

    try {
      await axios.delete("/player/market/self-register", {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Your listing has been deleted from the marketplace.");
      window.location.reload(); // or navigate("/marketplace");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to delete listing");
    }
  };

  // Escape hatch: if some layout/modal left the document locked
  useEffect(() => {
    document.documentElement.style.overflowY = "auto";
    document.body.style.overflowY = "auto";
    document.body.classList.remove("overflow-hidden", "no-scroll");
  }, []);

  // const token = localStorage.getItem("playerToken");
  const getToken = () => (localStorage.getItem("playerToken") || "").trim();



  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = getToken();
      if (!token) {
        alert("Please log in as a player first.");
        return navigate("/login3"); // or your actual player login route
      }
      console.log("Auth header preview:", `Bearer ${token.slice(0, 10)}...`);


      const payload = {
        ...form,
        preferredPositions: form.preferredPositions
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        achievements: form.achievements
          .split("|")
          .map((s) => s.trim())
          .filter(Boolean),
      };
      await axios.post("/player/market/self-register", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Listing created! You’re now visible in the Marketplace.");
      navigate("/playerMarket2");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to create listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        h-[100svh] w-[100svw]
        bg-gray-100 dark:bg-gray-900
        overflow-y-auto        
        p-6
      "
    >
      <div
        className="
          max-w-2xl mx-auto rounded-2xl p-6 pb-28  /* ← extra bottom padding so the end is visible */
          bg-[#EEE8FA] dark:bg-[#1b1630]
          shadow-[10px_10px_20px_rgba(163,131,207,0.35),_-10px_-10px_20px_rgba(255,255,255,0.9)]
          dark:shadow-[10px_10px_22px_rgba(0,0,0,0.65),_-10px_-10px_20px_rgba(77,44,120,0.25)]
        "
      >
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-4">
          Register as a Player (Marketplace)
        </h1>

        <form onSubmit={submit} className="grid grid-cols-1 gap-4">
          <label className="grid gap-1">
            <span className="text-sm">Sport</span>
            <select
              className="rounded-xl px-3 py-2 bg-white/70 dark:bg-black/20"
              value={form.sport}
              onChange={(e) => setForm((f) => ({ ...f, sport: e.target.value }))}
            >
              {["Football", "Cricket", "Hockey", "Rugby", "Other"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>

          <label className="grid gap-1">
            <span className="text-sm">Preferred Positions (comma separated)</span>
            <input
              className="rounded-xl px-3 py-2 bg-white/70 dark:bg-black/20"
              value={form.preferredPositions}
              onChange={(e) =>
                setForm((f) => ({ ...f, preferredPositions: e.target.value }))
              }
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="grid gap-1">
              <span className="text-sm">Location</span>
              <input
                className="rounded-xl px-3 py-2 bg-white/70 dark:bg-black/20"
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              />
            </label>
            <label className="grid gap-1">
              <span className="text-sm">Foot/Hand</span>
              <select
                className="rounded-xl px-3 py-2 bg-white/70 dark:bg-black/20"
                value={form.footOrHand}
                onChange={(e) => setForm((f) => ({ ...f, footOrHand: e.target.value }))}
              >
                {["Right", "Left", "Both"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="grid gap-1">
              <span className="text-sm">Asking Price</span>
              <input
                type="number"
                className="rounded-xl px-3 py-2 bg-white/70 dark:bg-black/20"
                value={form.askingPrice}
                onChange={(e) => setForm((f) => ({ ...f, askingPrice: e.target.value }))}
              />
            </label>
            <label className="grid gap-1">
              <span className="text-sm">Currency</span>
              <input
                className="rounded-xl px-3 py-2 bg-white/70 dark:bg-black/20"
                value={form.currency}
                onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value }))}
              />
            </label>
          </div>

          <label className="grid gap-1">
            <span className="text-sm">Highlights Video URL</span>
            <input
              className="rounded-xl px-3 py-2 bg-white/70 dark:bg-black/20"
              value={form.highlightsVideoUrl}
              onChange={(e) =>
                setForm((f) => ({ ...f, highlightsVideoUrl: e.target.value }))
              }
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm">Bio</span>
            <textarea
              className="rounded-xl px-3 py-2 bg-white/70 dark:bg-black/20"
              rows={3}
              value={form.bio}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm">Achievements (use | as separator)</span>
            <input
              className="rounded-xl px-3 py-2 bg-white/70 dark:bg-black/20" /* ← fixed 21 -> 20 */
              value={form.achievements}
              onChange={(e) =>
                setForm((f) => ({ ...f, achievements: e.target.value }))
              }
            />
          </label>

          <div className="flex items-center justify-between mt-2">
            <label className="flex items-center gap-2 text-sm">
              <span>Visibility</span>
              <select
                className="rounded-full px-3 py-2 bg-white/70 dark:bg-black/20"
                value={form.visibility}
                onChange={(e) => setForm((f) => ({ ...f, visibility: e.target.value }))}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </label>
            <button
              type="submit"
              disabled={loading}
              className="rounded-full px-5 py-2 font-semibold
              bg-purple-200 text-purple-900
              shadow-[6px_6px_12px_rgba(163,131,207,0.35),_-6px_-6px_12px_rgba(255,255,255,0.85)]
              hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Create Listing"}
            </button>
          </div>

          {/* DELETE LISTING BUTTON */}
          <button
            type="button"
            onClick={deleteListing}
            className="mt-6 rounded-full px-5 py-2 font-semibold
  bg-red-400 text-white hover:bg-red-500 transition"
          >
            Delete My Listing
          </button>



        </form>
      </div>
    </div>
  );
}
