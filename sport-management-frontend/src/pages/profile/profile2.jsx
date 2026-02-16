// // src/pages/Profile.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import axios from "../api/axios";
// import axios from "../../api/axios"

// const tokenFromRole = (role) => {
//   // tolerate older keys so nothing breaks
//   if (role === "club") {
//     return (
//       localStorage.getItem("clubToken") ||
//       localStorage.getItem("auth_token") ||
//       localStorage.getItem("token")
//     );
//   }
//   if (role === "player") {
//     return (
//       localStorage.getItem("playerToken") ||
//       localStorage.getItem("auth_token") ||
//       localStorage.getItem("token")
//     );
//   }
//   if (role === "manager") {
//     return (
//       localStorage.getItem("managerToken") ||
//       localStorage.getItem("auth_token") ||
//       localStorage.getItem("token")
//     );
//   }
//   return localStorage.getItem("auth_token") || localStorage.getItem("token");
// };

// const endpointForRole = (role) => {
//   if (role === "club") return "/club/me";
//   if (role === "player") return "/player/me";
//   if (role === "manager") return "/manager/me";
//   return null;
// };

// export default function ProfilePage() {
//   const navigate = useNavigate();
//   const role = (localStorage.getItem("role") || "").toLowerCase();
//   const endpoint = useMemo(() => endpointForRole(role), [role]);
//   const token = useMemo(() => tokenFromRole(role), [role]);

//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");
//   const [ok, setOk] = useState("");

//   // generic shape that covers club / player / manager
//   const [form, setForm] = useState({
//     // Player fields
//     name: "",
//     email: "",
//     phone_number: "",
//     position: "",
//     height: "",
//     weight: "",
//     // Club fields
//     club_name: "",
//     location: "",
//     establish_date: "",
//     description: "",
//     // Manager fields
//     phone: "",
//   });

//   // not logged in? block with modal
//   useEffect(() => {
//     if (!role || !endpoint || !token) {
//       setShowLoginModal(true);
//       setLoading(false);
//     }
//   }, [role, endpoint, token]);

//   // fetch current profile
//   useEffect(() => {
//     if (!endpoint || !token) return;
//     const run = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(endpoint, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         // server returns role-specific object; merge to our form defensively
//         setForm((prev) => ({ ...prev, ...res.data }));
//       } catch (e) {
//         setError(e?.response?.data?.message || "Failed to load profile");
//       } finally {
//         setLoading(false);
//       }
//     };
//     run();
//   }, [endpoint, token]);

//   const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

//   const onSave = async () => {
//     if (!endpoint || !token) return;
//     setError("");
//     setOk("");
//     setSaving(true);
//     try {
//       // send only relevant keys per role
//       let payload = {};
//       if (role === "player") {
//         const { name, email, phone_number, position, height, weight } = form;
//         payload = { name, email, phone_number, position, height, weight };
//       } else if (role === "club") {
//         const { club_name, contact_email, location, establish_date, phone_number, description } = {
//           ...form,
//           contact_email: form.email || form.contact_email,
//         };
//         payload = {
//           club_name,
//           contact_email,
//           location,
//           establish_date,
//           phone_number,
//           description,
//         };
//       } else if (role === "manager") {
//         const { name, email, phone } = form;
//         payload = { name, email, phone };
//       }
//       const res = await axios.put(endpoint, payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setOk(res?.data?.message || "Profile updated");
//     } catch (e) {
//       setError(e?.response?.data?.message || "Save failed");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // simple neat UI (Tailwind optional)
//   if (loading) {
//     return (
//       <div className="min-h-[60vh] grid place-items-center">
//         <div>Loading profile…</div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-4 md:p-6">
//       <div className="flex items-center justify-between mb-4">
//         <h1 className="text-2xl font-semibold">My Profile {role ? `(${role})` : ""}</h1>
//         <button
//           onClick={() => navigate(-1)}
//           className="px-3 py-1.5 rounded-md border"
//         >
//           Back
//         </button>
//       </div>

//       {error && (
//         <div className="mb-3 rounded-md bg-red-50 border border-red-200 text-red-700 p-3">
//           {error}
//         </div>
//       )}
//       {ok && (
//         <div className="mb-3 rounded-md bg-green-50 border border-green-200 text-green-700 p-3">
//           {ok}
//         </div>
//       )}

//       {/* Role-specific fields */}
//       {role === "player" && (
//         <div className="space-y-3">
//           <Field label="Name" value={form.name} onChange={(v) => update("name", v)} />
//           <Field label="Email" value={form.email} onChange={(v) => update("email", v)} />
//           <Field label="Phone" value={form.phone_number} onChange={(v) => update("phone_number", v)} />
//           <Field label="Position" value={form.position} onChange={(v) => update("position", v)} />
//           <Field label="Height (cm)" value={form.height} onChange={(v) => update("height", v)} type="number" />
//           <Field label="Weight (kg)" value={form.weight} onChange={(v) => update("weight", v)} type="number" />
//         </div>
//       )}

//       {role === "club" && (
//         <div className="space-y-3">
//           <Field label="Club Name" value={form.club_name} onChange={(v) => update("club_name", v)} />
//           <Field label="Email" value={form.email || form.contact_email || ""} onChange={(v) => update("email", v)} />
//           <Field label="Phone" value={form.phone_number} onChange={(v) => update("phone_number", v)} />
//           <Field label="Location" value={form.location} onChange={(v) => update("location", v)} />
//           <Field label="Established (YYYY-MM-DD)" value={form.establish_date?.slice?.(0,10) || ""} onChange={(v) => update("establish_date", v)} />
//           <Textarea label="Description" value={form.description} onChange={(v) => update("description", v)} />
//         </div>
//       )}

//       {role === "manager" && (
//         <div className="space-y-3">
//           <Field label="Name" value={form.name} onChange={(v) => update("name", v)} />
//           <Field label="Email" value={form.email} onChange={(v) => update("email", v)} />
//           <Field label="Phone" value={form.phone} onChange={(v) => update("phone", v)} />
//         </div>
//       )}

//       <div className="mt-6 flex gap-3">
//         <button
//           onClick={onSave}
//           disabled={saving}
//           className="px-4 py-2 rounded-md bg-black text-white disabled:opacity-60"
//         >
//           {saving ? "Saving…" : "Save changes"}
//         </button>
//         <button
//           onClick={() => window.location.reload()}
//           className="px-4 py-2 rounded-md border"
//         >
//           Reset
//         </button>
//       </div>

//       {/* login modal */}
//       {showLoginModal && (
//         <div className="fixed inset-0 bg-black/40 grid place-items-center z-[999]">
//           <div className="bg-white text-black rounded-2xl p-6 w-[90%] max-w-md shadow-xl">
//             <h3 className="text-xl font-semibold mb-2">plz log in</h3>
//             <p className="mb-4 text-gray-600">You need to be logged in to view or edit your profile.</p>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => navigate("/login3")}
//                 className="px-4 py-2 rounded-md bg-black text-white"
//               >
//                 Go to Login
//               </button>
//               <button
//                 onClick={() => navigate("/")}
//                 className="px-4 py-2 rounded-md border"
//               >
//                 Home
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function Field({ label, value, onChange, type = "text" }) {
//   return (
//     <label className="block">
//       <span className="block text-sm text-gray-700 mb-1">{label}</span>
//       <input
//         value={value || ""}
//         onChange={(e) => onChange(e.target.value)}
//         type={type}
//         className="w-full px-3 py-2 rounded-md border outline-none focus:ring-2 focus:ring-purple-400"
//       />
//     </label>
//   );
// }
// function Textarea({ label, value, onChange }) {
//   return (
//     <label className="block">
//       <span className="block text-sm text-gray-700 mb-1">{label}</span>
//       <textarea
//         value={value || ""}
//         onChange={(e) => onChange(e.target.value)}
//         rows={4}
//         className="w-full px-3 py-2 rounded-md border outline-none focus:ring-2 focus:ring-purple-400"
//       />
//     </label>
//   );
// }


























// import React, { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../../api/axios"; // <-- your configured axios

// /* ---------- helpers ---------- */
// const getRole = () => (localStorage.getItem("role") || "player").toLowerCase();
// const getToken = () =>
//   localStorage.getItem("playerToken") ||
//   localStorage.getItem("auth_token") ||
//   localStorage.getItem("token");

// const endpointForRole = (role) => {
//   if (role === "club") return "/club/me";
//   if (role === "manager") return "/manager/me";
//   return "/player/me"; // default to player
// };

// export default function PlayerProfile() {
//   const navigate = useNavigate();
//   const role = useMemo(getRole, []);
//   const token = useMemo(getToken, []);
//   const endpoint = useMemo(() => endpointForRole(role), [role]);

//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [edit, setEdit] = useState(false);
//   const [msg, setMsg] = useState({ ok: "", err: "" });

//   // core profile (player-first but works for club/manager too)
//   const [profile, setProfile] = useState({
//     // common
//     name: "",
//     email: "",
//     phone_number: "",
//     // player-ish
//     club_name: "",
//     roleLabel: "Player",
//     about: "Hello, I am a professional footballer",
//     location: "Kolkata",
//     website: "www.xyz.com",
//     pincode: "700001",
//     // extras for the cards
//     club_history: [
//       "Hello, 2011 - Mohunbagan",
//       "2002-2010 - Eastbengal",
//       "2010-Present - Kolkata United",
//     ],
//     stats: {
//       goals: 209,
//       matches: 1098,
//       red: 20,
//       yellow: 135,
//     },
//   });

//   /* ---------- auth gate ---------- */
//   useEffect(() => {
//     if (!token) {
//       setShowLoginModal(true);
//       setLoading(false);
//     }
//   }, [token]);

//   /* ---------- fetch profile ---------- */
//   useEffect(() => {
//     if (!token) return;
//     (async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(endpoint, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         // Defensive merge so UI never breaks if backend misses fields
//         const p = res?.data || {};
//         setProfile((prev) => ({
//           ...prev,
//           name: p.name ?? prev.name,
//           email: p.email ?? p.contact_email ?? prev.email,
//           phone_number: p.phone_number ?? p.phone ?? prev.phone_number,
//           club_name:
//             p.club_name ?? p.club ?? prev.club_name ?? "Kolkata United FC",
//           roleLabel:
//             role === "club" ? "Club" : role === "manager" ? "Manager" : "Player",
//           // keep cards if backend doesn't have them yet
//         }));
//       } catch (e) {
//         setMsg({ ok: "", err: e?.response?.data?.message || "Failed to load profile" });
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [endpoint, role, token]);

//   /* ---------- save profile ---------- */
//   const onSave = async () => {
//     setSaving(true);
//     setMsg({ ok: "", err: "" });
//     try {
//       let payload = {};
//       if (role === "club") {
//         payload = {
//           club_name: profile.club_name,
//           contact_email: profile.email,
//           phone_number: profile.phone_number,
//           // optional extras you might persist later:
//           // description/about/location/establish_date…
//         };
//       } else if (role === "manager") {
//         payload = {
//           name: profile.name,
//           email: profile.email,
//           phone: profile.phone_number,
//         };
//       } else {
//         // player
//         payload = {
//           name: profile.name,
//           email: profile.email,
//           phone_number: profile.phone_number,
//           // add position/height/weight when you’re ready
//         };
//       }

//       const res = await axios.put(endpoint, payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMsg({ ok: res?.data?.message || "Profile updated", err: "" });
//       setEdit(false);
//     } catch (e) {
//       setMsg({ ok: "", err: e?.response?.data?.message || "Save failed" });
//     } finally {
//       setSaving(false);
//     }
//   };

//   const update = (k, v) => setProfile((p) => ({ ...p, [k]: v }));

//   /* ---------- UI ---------- */
//   if (loading) {
//     return (
//       <div className="min-h-[60vh] grid place-items-center text-gray-600">
//         Loading profile…
//       </div>
//     );
//   }

//   return (
//     <div className="w-screen bg-white text-gray-900">
//       <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-16">
//         {/* Banner */}
//         <div className="relative mt-4">
//           <div className="h-48 sm:h-56 w-full rounded-2xl bg-[#9B74BE]"></div>

//           {/* Avatar */}
//           <div className="absolute left-1/2 -bottom-16 -translate-x-1/2">
//             <div className="h-40 w-40 rounded-full bg-gray-300 ring-8 ring-white" />
//           </div>
//         </div>

//         {/* Name + Follow + Edit */}
//         <div className="mt-20 flex items-center justify-center gap-3 flex-wrap">
//           <h1 className="text-xl sm:text-2xl font-medium">
//             {profile.name || "Unnamed"}
//           </h1>

//           {/* Follow is just a placeholder for now */}
//           <button
//             className="rounded-full bg-[#9B74BE] px-5 py-1.5 text-white text-sm font-semibold shadow-[0_8px_18px_rgba(155,116,190,0.45)] hover:brightness-[1.05] active:translate-y-[1px]"
//             type="button"
//           >
//             Follow+
//           </button>

//           <button
//             onClick={() => setEdit((e) => !e)}
//             className="rounded-full border px-4 py-1.5 text-sm font-semibold hover:bg-gray-50"
//             type="button"
//           >
//             {edit ? "Cancel" : "Edit"}
//           </button>
//           {edit && (
//             <button
//               onClick={onSave}
//               disabled={saving}
//               className="rounded-full bg-black text-white px-4 py-1.5 text-sm font-semibold disabled:opacity-60"
//               type="button"
//             >
//               {saving ? "Saving…" : "Save"}
//             </button>
//           )}
//         </div>

//         {/* Counts (static demo numbers for now) */}
//         <div className="mt-3 flex items-center justify-center gap-8 text-center text-[13px]">
//           <div>
//             <div className="font-semibold">15</div>
//             <div className="text-gray-500">Posts</div>
//           </div>
//           <div>
//             <div className="font-semibold">350</div>
//             <div className="text-gray-500">Followers</div>
//           </div>
//           <div>
//             <div className="font-semibold">10</div>
//             <div className="text-gray-500">Following</div>
//           </div>
//         </div>

//         {/* Role + Club */}
//         <div className="mt-4 text-center text-[12px]">
//           <div className="text-gray-500">{profile.roleLabel}</div>
//           <div className="mt-1">
//             <span className="text-gray-600">Club: </span>
//             {edit ? (
//               <input
//                 className="border rounded-md px-2 py-1 text-sm"
//                 value={profile.club_name || ""}
//                 onChange={(e) => update("club_name", e.target.value)}
//               />
//             ) : (
//               <a href="#" className="text-[#7a56a3] hover:underline">
//                 {profile.club_name || "—"}
//               </a>
//             )}
//           </div>
//         </div>

//         {/* flash messages */}
//         {!!msg.err && (
//           <div className="mt-6 mx-auto max-w-xl rounded-md border border-red-200 bg-red-50 p-3 text-red-700 text-sm">
//             {msg.err}
//           </div>
//         )}
//         {!!msg.ok && (
//           <div className="mt-6 mx-auto max-w-xl rounded-md border border-green-200 bg-green-50 p-3 text-green-700 text-sm">
//             {msg.ok}
//           </div>
//         )}

//         {/* Cards */}
//         <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
//           {/* About */}
//           <section className="rounded-2xl bg-gray-100 p-6">
//             <h2 className="mb-4 text-xl font-semibold">About</h2>

//             {/* about text */}
//             <div className="space-y-1 text-[15px] leading-6">
//               {edit ? (
//                 <textarea
//                   rows={3}
//                   className="w-full border rounded-md px-3 py-2"
//                   value={profile.about || ""}
//                   onChange={(e) => update("about", e.target.value)}
//                 />
//               ) : (
//                 <>
//                   {(profile.about || "Hello, I am a professional footballer")
//                     .split("\n")
//                     .map((line, i) => (
//                       <p key={i}>{line}</p>
//                     ))}
//                 </>
//               )}

//               {/* location */}
//               <LabeledRow
//                 label="📍"
//                 value={profile.location}
//                 editing={edit}
//                 onChange={(v) => update("location", v)}
//               />
//               {/* website */}
//               <LabeledRow
//                 label="🔗"
//                 value={profile.website}
//                 editing={edit}
//                 onChange={(v) => update("website", v)}
//               />
//               {/* email */}
//               <LabeledRow
//                 label="✉️"
//                 value={profile.email}
//                 editing={edit}
//                 onChange={(v) => update("email", v)}
//               />
//               {/* pincode */}
//               <LabeledRow
//                 label="🏷️"
//                 value={profile.pincode}
//                 editing={edit}
//                 onChange={(v) => update("pincode", v)}
//               />
//             </div>
//           </section>

//           {/* Club History */}
//           <section className="rounded-2xl bg-gray-100 p-6">
//             <h2 className="mb-4 text-xl font-semibold">Club History</h2>
//             <div className="space-y-3 text-[15px] leading-6">
//               {(profile.club_history || []).map((line, idx) =>
//                 edit ? (
//                   <input
//                     key={idx}
//                     className="w-full border rounded-md px-3 py-2"
//                     value={line}
//                     onChange={(e) =>
//                       setProfile((p) => {
//                         const next = [...(p.club_history || [])];
//                         next[idx] = e.target.value;
//                         return { ...p, club_history: next };
//                       })
//                     }
//                   />
//                 ) : (
//                   <p key={idx}>{line}</p>
//                 )
//               )}
//               {edit && (
//                 <button
//                   onClick={() =>
//                     setProfile((p) => ({
//                       ...p,
//                       club_history: [...(p.club_history || []), ""],
//                     }))
//                   }
//                   className="mt-2 text-sm rounded-md border px-3 py-1 hover:bg-white"
//                   type="button"
//                 >
//                   + Add line
//                 </button>
//               )}
//             </div>
//           </section>

//           {/* Stats */}
//           <section className="rounded-2xl bg-gray-100 p-6">
//             <h2 className="mb-4 text-xl font-semibold">Stats</h2>
//             <ul className="space-y-3 text-[15px] leading-6">
//               <StatRow
//                 label="Goals"
//                 value={profile.stats?.goals}
//                 editing={edit}
//                 onChange={(v) =>
//                   setProfile((p) => ({
//                     ...p,
//                     stats: { ...(p.stats || {}), goals: Number(v) || 0 },
//                   }))
//                 }
//               />
//               <StatRow
//                 label="Matches"
//                 value={profile.stats?.matches}
//                 editing={edit}
//                 onChange={(v) =>
//                   setProfile((p) => ({
//                     ...p,
//                     stats: { ...(p.stats || {}), matches: Number(v) || 0 },
//                   }))
//                 }
//               />
//               <StatRow
//                 label="Red card"
//                 value={profile.stats?.red}
//                 editing={edit}
//                 onChange={(v) =>
//                   setProfile((p) => ({
//                     ...p,
//                     stats: { ...(p.stats || {}), red: Number(v) || 0 },
//                   }))
//                 }
//               />
//               <StatRow
//                 label="Yellow card"
//                 value={profile.stats?.yellow}
//                 editing={edit}
//                 onChange={(v) =>
//                   setProfile((p) => ({
//                     ...p,
//                     stats: { ...(p.stats || {}), yellow: Number(v) || 0 },
//                   }))
//                 }
//               />
//             </ul>
//           </section>
//         </div>
//       </div>

//       {/* Login modal */}
//       {showLoginModal && (
//         <div className="fixed inset-0 z-[999] bg-black/40 grid place-items-center">
//           <div className="bg-white text-black rounded-2xl p-6 w-[90%] max-w-md shadow-xl">
//             <h3 className="text-xl font-semibold mb-2">plz log in</h3>
//             <p className="mb-4 text-gray-600">
//               You need to be logged in to view or edit your profile.
//             </p>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => navigate("/login3")}
//                 className="px-4 py-2 rounded-md bg-black text-white"
//               >
//                 Go to Login
//               </button>
//               <button
//                 onClick={() => navigate("/")}
//                 className="px-4 py-2 rounded-md border"
//               >
//                 Home
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* ---------- small pieces ---------- */
// function LabeledRow({ label, value, editing, onChange }) {
//   return (
//     <p className="flex items-center gap-2">
//       <span className="text-red-500">{label}</span>
//       {editing ? (
//         <input
//           className="border rounded-md px-2 py-1 text-sm w-full"
//           value={value || ""}
//           onChange={(e) => onChange(e.target.value)}
//         />
//       ) : (
//         <span>{value || "—"}</span>
//       )}
//     </p>
//   );
// }

// function StatRow({ label, value, editing, onChange }) {
//   return (
//     <li className="flex items-center justify-between gap-3">
//       <span>{label}-</span>
//       {editing ? (
//         <input
//           type="number"
//           className="border rounded-md px-2 py-1 text-sm w-28 text-right"
//           value={value ?? 0}
//           onChange={(e) => onChange(e.target.value)}
//         />
//       ) : (
//         <span className="font-medium">{value ?? 0}</span>
//       )}
//     </li>
//   );
// }























import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios"; // your pre-configured axios instance

/* ================= helpers ================= */
const getRole = () => (localStorage.getItem("role") || "player").toLowerCase();
// const getToken = () =>
//   localStorage.getItem("playerToken") ||
//   localStorage.getItem("clubToken") ||
//   localStorage.getItem("managerToken") ||
//   localStorage.getItem("auth_token") ||
//   localStorage.getItem("token");

 const getToken = () => {
   // try common keys
   const keys = [
     "playerToken",
     "clubToken",
     "managerToken",
     "auth_token",
     "token",
   ];
   for (const k of keys) {
     const v = localStorage.getItem(k);
     if (v) return v;
   }
   return null;
 };

const endpointForRole = (role) => {
  if (role === "club") return "/club/me";
  if (role === "manager") return "/manager/me";
  return "/player/me";
};

const fileToDataURL = (file) =>
  new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = rej;
    r.readAsDataURL(file);
  });

/* ================= page ================= */
export default function PlayerProfile() {
  const navigate = useNavigate();

  const role = useMemo(getRole, []);
  const token = useMemo(getToken, []);
  const endpoint = useMemo(() => endpointForRole(role), [role]);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [edit, setEdit] = useState(false);
  const [msg, setMsg] = useState({ ok: "", err: "" });

  // profile state (keeps your visual structure)
  const [profile, setProfile] = useState({
    // common
    name: "",
    email: "",
    phone_number: "",
    roleLabel: "Player",

    // header
    club_name: "Kolkata United FC",
    avatarUrl: "",
    bannerUrl: "",

    // About card
    about: "Hello, I am a professional footballer",
    location: "Kolkata",
    website: "www.xyz.com",
    pincode: "700001",

    // Club history card
    club_history: [
      "Hello, 2011 - Mohunbagan",
      "2002-2010 - Eastbengal",
      "2010-Present - Kolkata United",
    ],

    // Stats card
    stats: { goals: 209, matches: 1098, red: 20, yellow: 135 },
  });

  // selected files + refs (for previews)
  const [avatarFile, setAvatarFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const avatarInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  /* -------- auth gate -------- */
  useEffect(() => {
    if (!token) {
      setShowLoginModal(true);
      setLoading(false);
    }
  }, [token]);

  /* -------- fetch /me -------- */
  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const p = res?.data || {};
        setProfile((prev) => ({
          ...prev,
          name: p.name ?? prev.name,
          email: p.email ?? p.contact_email ?? prev.email,
          phone_number: p.phone_number ?? p.phone ?? prev.phone_number,
          club_name: p.club_name ?? p.club ?? prev.club_name,
          about: p.about ?? prev.about,
          location: p.location ?? prev.location,
          website: p.website ?? prev.website,
          pincode: p.pincode ?? prev.pincode,
          club_history: Array.isArray(p.club_history) ? p.club_history : prev.club_history,
          stats: p.stats ?? prev.stats,


          avatarUrl: p.avatarUrl ?? prev.avatarUrl,
          bannerUrl: p.bannerUrl ?? prev.bannerUrl,
          roleLabel: role === "club" ? "Club" : role === "manager" ? "Manager" : "Player",
        }));
      } catch (e) {
        setMsg({ ok: "", err: e?.response?.data?.message || "Failed to load profile" });
      } finally {
        setLoading(false);
      }
    })();
  }, [endpoint, role, token]);

  /* -------- save -------- */
  const onSave = async () => {
    setSaving(true);
    setMsg({ ok: "", err: "" });

    try {
      // 1) upload new media if chosen
      let uploaded = {};
      if (avatarFile || bannerFile) {
        const fd = new FormData();
        if (avatarFile) fd.append("avatar", avatarFile);
        if (bannerFile) fd.append("banner", bannerFile);
        // const media = await axios.post("/media/profile", fd, {
        const media = await axios.post("/api/media/profile", fd, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        uploaded = media?.data || {};
      }

      // 2) build role-specific payload for /me
      let payload = {};
      if (role === "club") {
        payload = {
          club_name: profile.club_name,
          contact_email: profile.email,
          phone_number: profile.phone_number,
        };
      } else if (role === "manager") {
        payload = {
          name: profile.name,
          email: profile.email,
          phone: profile.phone_number,
        };
      } else {
        payload = {
          name: profile.name,
          email: profile.email,
          phone_number: profile.phone_number,

          about: profile.about,
          location: profile.location,
          website: profile.website,
          pincode: profile.pincode,
          club_history: profile.club_history, // array of strings
          stats: profile.stats,               // {goals, matches, red, yellow}
          club_name: profile.club_name,


        };
      }

      if (uploaded.avatarUrl) payload.avatarUrl = uploaded.avatarUrl;
      if (uploaded.bannerUrl) payload.bannerUrl = uploaded.bannerUrl;

      const res = await axios.put(endpoint, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMsg({ ok: res?.data?.message || "Profile updated", err: "" });
      setEdit(false);
    } catch (e) {
      setMsg({ ok: "", err: e?.response?.data?.message || "Save failed" });
    } finally {
      setSaving(false);
    }
  };

  const update = (k, v) => setProfile((p) => ({ ...p, [k]: v }));

  /* -------- UI -------- */
  if (loading) {
    return (
      <div className="min-h-[60vh] grid place-items-center text-gray-600">
        Loading profile…
      </div>
    );
  }

  return (
    <div className="w-screen bg-white text-gray-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-16">
        {/* Banner */}
        <div className="relative mt-4">
          <div
            className="h-48 sm:h-56 w-full rounded-2xl bg-[#9B74BE] overflow-hidden"
            style={
              profile.bannerUrl
                ? {
                  backgroundImage: `url(${profile.bannerUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
                : {}
            }
          />

          {edit && (
            <button
              type="button"
              onClick={() => bannerInputRef.current?.click()}
              className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-sm font-medium shadow hover:bg-white"
            >
              Change banner
            </button>
          )}

          {/* Avatar */}
          <div className="absolute left-1/2 -bottom-16 -translate-x-1/2">
            <div className="h-40 w-40 rounded-full ring-8 ring-white overflow-hidden bg-gray-200 grid place-items-center">
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt="avatar" className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full bg-gray-300" />
              )}
            </div>

            {edit && (
              <button
                type="button"
                onClick={() => avatarInputRef.current?.click()}
                className="absolute -right-4 bottom-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium shadow hover:bg-white"
              >
                Change
              </button>
            )}
          </div>

          {/* hidden inputs */}
          <input
            ref={bannerInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              setBannerFile(f);
              const url = await fileToDataURL(f);
              setProfile((p) => ({ ...p, bannerUrl: url }));
            }}
          />
          <input
            ref={avatarInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              setAvatarFile(f);
              const url = await fileToDataURL(f);
              setProfile((p) => ({ ...p, avatarUrl: url }));
            }}
          />
        </div>

        {/* Name + Follow + Edit */}
        <div className="mt-20 flex items-center justify-center gap-3 flex-wrap">
          <h1 className="text-xl sm:text-2xl font-medium">{profile.name || "Unnamed"}</h1>

          <button
            className="rounded-full bg-[#9B74BE] px-5 py-1.5 text-white text-sm font-semibold shadow-[0_8px_18px_rgba(155,116,190,0.45)] hover:brightness-[1.05] active:translate-y-[1px]"
            type="button"
          >
            Follow+
          </button>

          <button
            onClick={() => setEdit((e) => !e)}
            className="rounded-full border px-4 py-1.5 text-sm font-semibold hover:bg-gray-50"
            type="button"
          >
            {edit ? "Cancel" : "Edit"}
          </button>
          {edit && (
            <button
              onClick={onSave}
              disabled={saving}
              className="rounded-full bg-black text-white px-4 py-1.5 text-sm font-semibold disabled:opacity-60"
              type="button"
            >
              {saving ? "Saving…" : "Save"}
            </button>
          )}
        </div>

        {/* Counts (demo) */}
        <div className="mt-3 flex items-center justify-center gap-8 text-center text-[13px]">
          <div>
            <div className="font-semibold">15</div>
            <div className="text-gray-500">Posts</div>
          </div>
          <div>
            <div className="font-semibold">350</div>
            <div className="text-gray-500">Followers</div>
          </div>
          <div>
            <div className="font-semibold">10</div>
            <div className="text-gray-500">Following</div>
          </div>
        </div>

        {/* Role + Club */}
        <div className="mt-4 text-center text-[12px]">
          <div className="text-gray-500">{profile.roleLabel}</div>
          <div className="mt-1">
            <span className="text-gray-600">Club: </span>
            {edit ? (
              <input
                className="border rounded-md px-2 py-1 text-sm"
                value={profile.club_name || ""}
                onChange={(e) => update("club_name", e.target.value)}
              />
            ) : (
              <a href="#" className="text-[#7a56a3] hover:underline">
                {profile.club_name || "—"}
              </a>
            )}
          </div>
        </div>

        {/* messages */}
        {!!msg.err && (
          <div className="mt-6 mx-auto max-w-xl rounded-md border border-red-200 bg-red-50 p-3 text-red-700 text-sm">
            {msg.err}
          </div>
        )}
        {!!msg.ok && (
          <div className="mt-6 mx-auto max-w-xl rounded-md border border-green-200 bg-green-50 p-3 text-green-700 text-sm">
            {msg.ok}
          </div>
        )}

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* About */}
          <section className="rounded-2xl bg-gray-100 p-6">
            <h2 className="mb-4 text-xl font-semibold">About</h2>
            <div className="space-y-1 text-[15px] leading-6">
              {edit ? (
                <textarea
                  rows={3}
                  className="w-full border rounded-md px-3 py-2"
                  value={profile.about || ""}
                  onChange={(e) => update("about", e.target.value)}
                />
              ) : (
                (profile.about || "").split("\n").map((line, i) => <p key={i}>{line}</p>)
              )}

              <LabeledRow
                label="📍"
                value={profile.location}
                editing={edit}
                onChange={(v) => update("location", v)}
              />
              <LabeledRow
                label="🔗"
                value={profile.website}
                editing={edit}
                onChange={(v) => update("website", v)}
              />
              <LabeledRow
                label="✉️"
                value={profile.email}
                editing={edit}
                onChange={(v) => update("email", v)}
              />
              <LabeledRow
                label="🏷️"
                value={profile.pincode}
                editing={edit}
                onChange={(v) => update("pincode", v)}
              />
            </div>
          </section>

          {/* Club History */}
          <section className="rounded-2xl bg-gray-100 p-6">
            <h2 className="mb-4 text-xl font-semibold">Club History</h2>
            <div className="space-y-3 text-[15px] leading-6">
              {(profile.club_history || []).map((line, idx) =>
                edit ? (
                  <input
                    key={idx}
                    className="w-full border rounded-md px-3 py-2"
                    value={line}
                    onChange={(e) =>
                      setProfile((p) => {
                        const next = [...(p.club_history || [])];
                        next[idx] = e.target.value;
                        return { ...p, club_history: next };
                      })
                    }
                  />
                ) : (
                  <p key={idx}>{line}</p>
                )
              )}
              {edit && (
                <button
                  onClick={() =>
                    setProfile((p) => ({
                      ...p,
                      club_history: [...(p.club_history || []), ""],
                    }))
                  }
                  className="mt-2 text-sm rounded-md border px-3 py-1 hover:bg-white"
                  type="button"
                >
                  + Add line
                </button>
              )}
            </div>
          </section>

          {/* Stats */}
          <section className="rounded-2xl bg-gray-100 p-6">
            <h2 className="mb-4 text-xl font-semibold">Stats</h2>
            <ul className="space-y-3 text-[15px] leading-6">
              <StatRow
                label="Goals"
                value={profile.stats?.goals}
                editing={edit}
                onChange={(v) =>
                  setProfile((p) => ({
                    ...p,
                    stats: { ...(p.stats || {}), goals: Number(v) || 0 },
                  }))
                }
              />
              <StatRow
                label="Matches"
                value={profile.stats?.matches}
                editing={edit}
                onChange={(v) =>
                  setProfile((p) => ({
                    ...p,
                    stats: { ...(p.stats || {}), matches: Number(v) || 0 },
                  }))
                }
              />
              <StatRow
                label="Red card"
                value={profile.stats?.red}
                editing={edit}
                onChange={(v) =>
                  setProfile((p) => ({
                    ...p,
                    stats: { ...(p.stats || {}), red: Number(v) || 0 },
                  }))
                }
              />
              <StatRow
                label="Yellow card"
                value={profile.stats?.yellow}
                editing={edit}
                onChange={(v) =>
                  setProfile((p) => ({
                    ...p,
                    stats: { ...(p.stats || {}), yellow: Number(v) || 0 },
                  }))
                }
              />
            </ul>
          </section>
        </div>
      </div>

      {/* Login modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[999] bg-black/40 grid place-items-center">
          <div className="bg-white text-black rounded-2xl p-6 w-[90%] max-w-md shadow-xl">
            <h3 className="text-xl font-semibold mb-2">plz log in</h3>
            <p className="mb-4 text-gray-600">You need to be logged in to view or edit your profile.</p>
            <div className="flex gap-3">
              <button onClick={() => navigate("/login3")} className="px-4 py-2 rounded-md bg-black text-white">
                Go to Login
              </button>
              <button onClick={() => navigate("/")} className="px-4 py-2 rounded-md border">
                Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================ small bits ================ */
function LabeledRow({ label, value, editing, onChange }) {
  return (
    <p className="flex items-center gap-2">
      <span className="text-red-500">{label}</span>
      {editing ? (
        <input
          className="border rounded-md px-2 py-1 text-sm w-full"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <span>{value || "—"}</span>
      )}
    </p>
  );
}

function StatRow({ label, value, editing, onChange }) {
  return (
    <li className="flex items-center justify-between gap-3">
      <span>{label}-</span>
      {editing ? (
        <input
          type="number"
          className="border rounded-md px-2 py-1 text-sm w-28 text-right"
          value={value ?? 0}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <span className="font-medium">{value ?? 0}</span>
      )}
    </li>
  );
}

