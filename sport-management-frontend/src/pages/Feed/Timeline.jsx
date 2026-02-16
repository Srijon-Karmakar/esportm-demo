


import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import axios from "../../api/axios";
import {
  FiSearch, FiMessageCircle, FiBell, FiMoreHorizontal, FiSend, FiLoader, FiEdit2, FiTrash2, FiX
} from "react-icons/fi";
import {
  FaHome, FaUserFriends, FaBriefcase, FaHeart, FaRegCommentDots, FaShare
} from "react-icons/fa";
import { LuImagePlus, LuVideo, LuCalendarClock, LuFileText } from "react-icons/lu";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";




// --- derive "current user" from localStorage/sessionStorage ---
function getMeFromStorage() {
  const role =
    localStorage.getItem("role") ||
    sessionStorage.getItem("role") ||
    "";

  // Try several name keys you already store in login3
  const name =
    localStorage.getItem("username") ||
    localStorage.getItem("manager_name") ||
    localStorage.getItem("coach_name") ||
    localStorage.getItem("nutritionist_name") ||
    localStorage.getItem("physio_name") ||
    localStorage.getItem("agent_name") ||
    localStorage.getItem("pitchmanager_name") ||
    localStorage.getItem("club_name") ||
    // fallback to email prefix if present
    (localStorage.getItem("email") || "").split("@")[0] ||
    "You";

  const id =
    localStorage.getItem("user_id") ||
    localStorage.getItem("player_id") ||
    localStorage.getItem("manager_id") ||
    localStorage.getItem("club_id") ||
    null;

  const avatar =
    localStorage.getItem("avatar") || // if you ever store it
    "/avatar.png";

  return { id, name, role, avatar };
}

// safer display name for comments even if backend sends only an ID
function displayNameFor(userRef, me) {
  if (!userRef) return "User";
  if (typeof userRef === "string") {
    // If it's my own id, show my name
    if (me?.id && userRef === me.id) return me.name || "You";
    return "User";
  }
  return (
    userRef.name ||
    userRef.username ||
    (userRef.email ? userRef.email.split("@")[0] : "") ||
    "User"
  );
}


/* ---------- Neumorphism helpers ---------- */
const neo = "bg-gray-100 shadow-[6px_6px_14px_#cfcfcf,-6px_-6px_14px_#ffffff]";
const neoInset = "bg-gray-100 shadow-[inset_6px_6px_14px_#cfcfcf,inset_-6px_-6px_14px_#ffffff]";


// --- comment/reaction display helpers ---
function nameOfUserRef(userRef, me) {
  if (!userRef) return "User";
  if (typeof userRef === "string") {
    // If it's my own ID, show my name
    if (me?.id && userRef === me.id) return me.name || "You";
    return "User";
  }
  // common backend shapes
  return (
    userRef.name ||
    userRef.username ||
    (userRef.email ? userRef.email.split("@")[0] : "") ||
    "User"
  );
}

function avatarOfUserRef(userRef, me) {
  if (!userRef) return me?.avatar || "/avatar.png";
  if (typeof userRef === "string") {
    if (me?.id && userRef === me.id) return me.avatar || "/avatar.png";
    return "/avatar.png";
  }
  return userRef.avatar || userRef.avatarUrl || "/avatar.png";
}


/* ---------- tiny utils ---------- */
function getValidToken() {
  const keys = ["token", "playerToken", "managerToken", "accessToken", "jwt", "adminToken", "superadminToken"];
  for (const k of keys) {
    const raw = localStorage.getItem(k) ?? sessionStorage.getItem(k);
    if (!raw || raw === "null" || raw === "undefined") continue;
    try {
      const parsed = JSON.parse(raw);
      if (typeof parsed === "string" && parsed.length > 10) return parsed;
      if (parsed?.token && parsed.token.length > 10) return parsed.token;
    } catch {
      if (typeof raw === "string" && raw.length > 10) return raw;
    }
  }
  return null;
}


// --- Avatar helpers ---
function getInitials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "SB";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// deterministic color from string
function stringToHslColor(str = "", s = 60, l = 48) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  const h = Math.abs(hash) % 360;
  return `hsl(${h} ${s}% ${l}%)`;
}

function getStoredUser() {
  // pull the best available display name/role from storage
  const username =
    localStorage.getItem("username") ||
    localStorage.getItem("manager_name") ||
    localStorage.getItem("coach_name") ||
    localStorage.getItem("agent_name") ||
    localStorage.getItem("physio_name") ||
    localStorage.getItem("nutritionist_name") ||
    localStorage.getItem("pitchmanager_name") ||
    localStorage.getItem("club_name") ||
    "SportBit Member";
  const role = localStorage.getItem("role") || "";
  return { username, role };
}


// Derive the currently logged-in user's display info from localStorage.
// Your login3 stores: role, username, and several role-specific names.
// If you later add /api/auth/me, this will be overwritten with the real data.
function resolveCurrentUserFromStorage() {
  const role = localStorage.getItem("role") || "";
  const username =
    localStorage.getItem("username") ||
    localStorage.getItem("manager_name") ||
    localStorage.getItem("physio_name") ||
    localStorage.getItem("agent_name") ||
    localStorage.getItem("coach_name") ||
    localStorage.getItem("nutritionist_name") ||
    localStorage.getItem("pitchmanager_name") ||
    localStorage.getItem("club_name") ||
    ""; // last fallback

  // Optional: if you ever save an avatar url after profile edit:
  const storedAvatar =
    localStorage.getItem("avatarUrl") ||
    sessionStorage.getItem("avatarUrl") ||
    "";

  // Nice fallback avatar (deterministic by name) using DiceBear:
  const safeName = encodeURIComponent(username || "SportBit User");
  const fallbackAvatar = `https://api.dicebear.com/8.x/initials/svg?seed=${safeName}`;

  return {
    id: "local",
    name: username || "SportBit Member",
    role: role ? role[0].toUpperCase() + role.slice(1) : "Member",
    avatar: storedAvatar || fallbackAvatar,
  };
}

const mimeToType = (file) => (file?.type?.startsWith("video/") ? "video" : "image");

/* ---------- static right/left cards ---------- */
const people = [
  { id: 1, name: "Michael Alexander", role: "UI/UX Designer" },
  { id: 2, name: "Evan Steward", role: "Illustrator | UI Designer" },
  { id: 3, name: "Jack Wilson", role: "Freelancer UI Design" },
  { id: 4, name: "Anton Robert", role: "3D Designer" },
];
const trends = ["Case Study: UX for MedTech", "How to make animation in Figma", "Make Illustration in Blender", "How to make icon in Figma"];

function LoginGuardModal({ onLogin }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <h2 className="text-xl font-semibold text-slate-800">Please log in</h2>
        <p className="mt-2 text-slate-600">
          You need to be logged in to explore the timeline.
        </p>
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={() => window.history.back()}
            className="rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100"
          >
            Go back
          </button>
          <button
            onClick={onLogin}
            className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}


/* ============================================================
   MAIN PAGE
   ============================================================ */
export default function SportBitTimeline() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = getValidToken();
  const authHeader = useMemo(
    () => (token ? { Authorization: `Bearer ${token}` } : {}),
    [token]
  );

  // State
  const [posts, setPosts] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Only hydrate "me" when token exists
  const [me, setMe] = useState(() =>
    token ? resolveCurrentUserFromStorage() : null
  );

  // Rebuild "me" whenever token changes
  // useEffect(() => {
  //   if (token) setMe(getMeFromStorage());
  //   else setMe(null);
  // }, [token]);

    const [, setBump] = useState(0);
  useEffect(() => {
    const onStorage = () => setBump((x) => x + 1);
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Compute display info only when me/token exist
  const { username: storedName, role: storedRole } = getStoredUser();
  const myName = me?.name || storedName;
  const myRole = me?.role || storedRole;
  const myAvatarUrl = me?.avatar || localStorage.getItem("avatarUrl") || "";

  // If no token, show blocking modal (don’t render feed)
  if (!token) {
    return (
      <LoginGuardModal
        onLogin={() =>
          navigate("/login3", { replace: true, state: { from: location } })
        }
      />
    );
  }

    const fetchPage = useCallback(async (p = 1) => {
    setError("");
    try {
      const { data } = await axios.get(`/api/feed?page=${p}&limit=6`, {
        headers: authHeader,
      });
      const arr = Array.isArray(data?.items || data) ? (data.items || data) : [];
      setPosts((old) => (p === 1 ? arr : [...old, ...arr]));
      setHasMore(data?.hasMore ?? arr.length > 0);
    } catch (e) {
      console.error(e);
      setError("Failed to load posts.");
    } finally {
      setInitialLoading(false);
    }
  }, [authHeader]);


  useEffect(() => { fetchPage(1); }, [fetchPage]);

  /* ---------- infinite scroll (intersection observer) ---------- */
  const sentinelRef = useRef(null);
  useEffect(() => {
    if (!hasMore) return;
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const next = page + 1;
        setPage(next);
        fetchPage(next);
      }
    }, { root: document.querySelector("#feed-scroll-root"), rootMargin: "600px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, [page, hasMore, fetchPage]);

  /* ---------- API helpers ---------- */
  async function createPost({ text, file }) {
    const form = new FormData();
    if (text) form.append("caption", text);
    if (file) { form.append("media", file); form.append("mediaType", mimeToType(file)); }
    else form.append("mediaType", "image");
    const { data } = await axios.post("/api/feed/create", form, {
      headers: { ...authHeader, "Content-Type": "multipart/form-data" },
    });
    return data?.post;
  }
  async function reactTo(postId, reaction) {
    const { data } = await axios.put(`/api/feed/react/${postId}`, { reaction }, { headers: authHeader });
    return data?.post;
  }
  async function commentOn(postId, text) {
    const { data } = await axios.post(`/api/feed/comment/${postId}`, { text }, { headers: authHeader });
    return data?.post;
  }
  async function updatePost(postId, payload) {
    const { data } = await axios.put(`/api/feed/${postId}`, payload, { headers: authHeader });
    return data?.post;
  }
  async function deletePost(postId) {
    await axios.delete(`/api/feed/${postId}`, { headers: authHeader });
  }

  const mergePost = (u) => setPosts((lst) => lst.map((p) => (p._id === u._id ? u : p)));
  const removePost = (id) => setPosts((lst) => lst.filter((p) => p._id !== id));




  return (
    <div className="min-h-screen w-screen bg-gray-100 text-slate-800">
      {/* ===== Header ===== */}
      <header className={`sticky top-0 z-40 ${neo}`}>
        <div className="mx-auto max-w-7xl px-3 sm:px-6">
          <div className="flex items-center gap-4 h-16">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl flex items-center justify-center bg-indigo-600 text-white font-bold">SB</div>
              <span className="hidden sm:block font-semibold">SportBit</span>
            </div>

            <div className="flex-1 hidden md:block">
              <div className={`flex items-center gap-3 rounded-2xl px-4 py-2 ${neoInset}`}>
                <FiSearch className="text-slate-500" />
                <input className="w-full bg-transparent outline-none placeholder:text-slate-400" placeholder="Search players, clubs, posts..." />
              </div>
            </div>

            <nav className="ml-auto flex items-center gap-3 sm:gap-5">

              <Link to="/">
              <NavPill icon={<FaHome />} label="Home" active />
              </Link>

              <NavPill icon={<FaUserFriends />} label="Network" />
              <NavPill icon={<FaBriefcase />} label="Market" />
              <IconButton icon={<FiMessageCircle />} to="/chat" ariaLabel="messages" />
              <IconButton icon={<FiBell />} />
              {/* Dynamic avatar & small chip showing name/role */}
              <div className="flex items-center gap-2">
                {/* <Avatar src={me.avatar} /> */}
                <Avatar name={myName} />

                <div className="hidden sm:flex flex-col leading-tight">
                  <span className="text-sm font-medium">{me.name}</span>
                  <span className="text-[11px] text-slate-500">{me.role}</span>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* ===== Grid ===== */}
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[calc(100vh-64px)] overflow-hidden">
          <aside className="md:col-span-3 space-y-6 sticky top-[88px] self-start">
            {/* <ProfileCard me={me} /> */}
            <ProfileCard name={myName} role={myRole} />

            <QuickStats />
            <GroupsCard />
          </aside>

          <main id="feed-scroll-root" className="md:col-span-6 h-full overflow-y-auto pr-1 no-scrollbar">
            <Composer

              // currentUserName={myName} 
              myName={myName}
              myAvatarUrl={myAvatarUrl}
              onCreate={async ({ text, file }, reset) => {
                try {
                  const optimistic = {
                    _id: `tmp_${Date.now()}`,
                    user: { name: me?.name || "You", _id: me?.id, avatar: me?.avatar },
                    userType: me?.role,
                    caption: text,
                    mediaUrl: file ? URL.createObjectURL(file) : "",
                    mediaType: mimeToType(file),
                    reactions: [],
                    comments: [],
                    createdAt: new Date().toISOString(),
                    __owner: true,
                  };
                  setPosts((p) => [optimistic, ...p]);
                  const saved = await createPost({ text, file });
                  if (saved) mergePost({ ...saved, __owner: true });
                  reset();
                } catch (e) {
                  console.error(e); alert("Failed to create post."); fetchPage(1); setPage(1);
                }
              }}
            />

            {initialLoading && (
              <div className="flex items-center justify-center py-10 text-slate-500">
                <FiLoader className="mr-2 animate-spin" /> Loading posts…
              </div>
            )}
            {error && <div className="text-center text-rose-600 py-3">{error}</div>}

            <div className="space-y-6 pb-24">
              {posts.map((p, idx) => (
                <PostCard
                  key={p._id || idx}
                  post={{
                    ...p, __owner: p.__owner ?? (me && (p.user?._id === me.id)),
                    meFallback: me,
                  }}
                  currentUserName={myName}
                  onReact={async (type) => {
                    const next = { ...p };
                    next.reactions = Array.isArray(p.reactions) ? [...p.reactions] : [];
                    const existingIdx = next.reactions.findIndex((r) => (r.user?._id || r.user) === me?.id);
                    if (existingIdx >= 0) next.reactions[existingIdx].type = type;
                    else next.reactions.push({ user: { _id: me?.id }, type });
                    mergePost(next);
                    try { const updated = await reactTo(p._id, type); if (updated) mergePost({ ...updated, __owner: next.__owner }); }
                    catch (e) { console.error(e); fetchPage(1); setPage(1); }
                  }}
                  onComment={async (text) => {
                    if (!text?.trim()) return;
                    const next = { ...p };
                    next.comments = Array.isArray(p.comments) ? [...p.comments] : [];
                    next.comments.push({ user: { name: me?.name || "You", avatar: me?.avatar }, text, createdAt: new Date().toISOString() });
                    mergePost(next);
                    try { const updated = await commentOn(p._id, text); if (updated) mergePost({ ...updated, __owner: next.__owner }); }
                    catch (e) { console.error(e); fetchPage(1); setPage(1); }
                  }}
                  onEdit={async ({ caption, file, close }) => {
                    try {
                      if (file) {
                        const form = new FormData();
                        if (caption !== undefined) form.append("caption", caption);
                        form.append("media", file);
                        form.append("mediaType", mimeToType(file));
                        const { data } = await axios.put(`/api/feed/${p._id}`, form, { headers: { ...authHeader, "Content-Type": "multipart/form-data" } });
                        mergePost({ ...data.post, __owner: true });
                      } else {
                        const updated = await updatePost(p._id, { caption });
                        if (updated) mergePost({ ...updated, __owner: true });
                      }
                      close?.();
                    } catch (e) {
                      console.error(e); alert("Failed to update post.");
                    }
                  }}
                  onDelete={async () => {
                    if (!confirm("Delete this post permanently?")) return;
                    const id = p._id;
                    removePost(id);
                    try { await deletePost(id); }
                    catch (e) { console.error(e); alert("Delete failed."); fetchPage(1); setPage(1); }
                  }}
                />
              ))}
              {hasMore && (
                <div ref={sentinelRef} className="py-8 text-center text-slate-500">
                  <FiLoader className="inline mr-2 animate-spin" /> Loading more…
                </div>
              )}
              {!hasMore && posts.length > 0 && (
                <div className="py-6 text-center text-slate-400 text-sm">You’re all caught up.</div>
              )}
            </div>
          </main>

          <aside className="md:col-span-3 space-y-6 sticky top-[88px] self-start">
            <AddToFeed />
            <Trends />
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ====================== UI bits ====================== */
function NavPill({ icon, label, active = false }) {
  return (
    <button className={`hidden sm:flex items-center gap-2 rounded-xl px-3 py-2 transition ${active ? "bg-indigo-600 text-white shadow-md" : neo}`}>
      <span className="text-base">{icon}</span><span className="text-sm font-medium">{label}</span>
    </button>
  );
}
function IconButton({ icon, to, onClick, ariaLabel = "action" }) {
  const navigate = useNavigate();
  const handle = (e) => {
    if (onClick) onClick(e);
    if (to) {
      e.preventDefault();
      navigate(to);
    }
  };
  return (
    <button onClick={handle} className={`h-10 w-10 rounded-xl grid place-items-center ${neo} transition active:scale-95`} aria-label={ariaLabel}>
      <span className="text-lg">{icon}</span>
    </button>
  );
}
// function Avatar({ size = "10", src }) {
//   return (
//     <img
//       src={src || "/avatar.png"}
//       alt="user"
//       className={`h-${size} w-${size} rounded-full ring-2 ring-white/60 object-cover`}
//       onError={(e) => (e.currentTarget.src = "/avatar.png")}
//     />
//   );
// }

function Avatar({ name = "SportBit Member", size = 10 }) {
  // Tailwind note: ensure the sizes you use exist in your safelist or are fixed values (10, 12, etc.)
  const initials = getInitials(name);
  const bg = stringToHslColor(name);
  const sizeClass = `h-${size} w-${size}`;
  const textClass = size >= 12 ? "text-lg" : "text-sm";
  return (
    <div
      className={`${sizeClass} rounded-full flex items-center justify-center font-semibold text-white ring-2 ring-white/60`}
      style={{ backgroundColor: bg, lineHeight: 1 }}
      aria-label={name}
      title={name}
    >
      <span className={textClass}>{initials}</span>
    </div>
  );
}


function Card({ children, className = "" }) {
  return <div className={`rounded-2xl p-4 ${neo} ${className}`}>{children}</div>;
}

/* Left */
// function ProfileCard({ me }) {
//   return (
//     <Card className="overflow-hidden p-0">
//       <div className="h-20 w-full bg-gradient-to-r from-indigo-500 to-fuchsia-500" />
//       <div className="px-4 pb-4 -mt-8">
//         <div className="flex items-center gap-3">
//           <Avatar src={me?.avatar} />
//           <div>
//             <h3 className="font-semibold">{me?.name || "SportBit Member"}</h3>
//             <p className="text-xs text-slate-500">
//               {me?.role ? me.role.charAt(0).toUpperCase() + me.role.slice(1) : "Member"}
//             </p>
//           </div>
//         </div>
//         <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
//           {["Connections", "Profile Views", "My Items"].map((t, i) => (
//             <div key={i} className={`${neoInset} rounded-xl py-2`}>
//               <p className="text-xs text-slate-500">{t}</p>
//               <p className="font-semibold">{[500, 654, 32][i]}{i === 0 ? "+" : ""}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </Card>
//   );
// }


// function ProfileCard({ name, role }) {
//   return (
//     <Card className="overflow-hidden p-0">
//       <div className="h-20 w-full bg-gradient-to-r from-indigo-500 to-fuchsia-500" />
//       <div className="px-4 pb-4 -mt-8">
//         <div className="flex items-center gap-3">
//           {/* <Avatar name={name} /> */}
//           <Avatar size="12" name={myName} />

//           <div>
//             <h3 className="font-semibold">{name}</h3>
//             <p className="text-xs text-slate-500">{role || "Member"}</p>
//           </div>
//         </div>
//         {/* ...rest unchanged */}
//       </div>
//     </Card>
//   );
// }


function ProfileCard({ name = "SportBit Member", role = "Member" }) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="h-20 w-full bg-gradient-to-r from-indigo-500 to-fuchsia-500" />
      <div className="px-4 pb-4 -mt-8">
        <div className="flex items-center gap-3">
          <Avatar name={name} />
          <div>
            <h3 className="font-semibold">{name}</h3>
            <p className="text-xs text-black -500">{role}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
          {["Connections", "Profile Views", "My Items"].map((t, i) => (
            <div key={i} className={`${neoInset} rounded-xl py-2`}>
              <p className="text-xs text-slate-500">{t}</p>
              <p className="font-semibold">{[500, 654, 32][i]}{i === 0 ? "+" : ""}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}





function QuickStats() {
  return (
    <Card>
      <h4 className="font-semibold mb-3">Quick Links</h4>
      <ul className="space-y-2 text-sm">
        <li className="flex items-center justify-between"><span>Saved posts</span><span className="text-slate-500">12</span></li>
        <li className="flex items-center justify-between"><span>Club pages</span><span className="text-slate-500">5</span></li>
        <li className="flex items-center justify-between"><span>SportBit Events</span><span className="text-slate-500">3</span></li>
      </ul>
    </Card>
  );
}
function GroupsCard() {
  return (
    <Card>
      <h4 className="font-semibold mb-3">Groups</h4>
      <div className="space-y-3">
        {["UI/UX Design Inspiration", "Pro Designer", "Sport Analytics"].map((g) => (
          <div key={g} className="flex items-center justify-between">
            <span className="text-sm">{g}</span><button className="text-indigo-600 text-sm font-medium">Join</button>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* Center: Composer + Post */
// function Composer({ onCreate, me }) {
//   const [text, setText] = useState(""); const [file, setFile] = useState(null); const [busy, setBusy] = useState(false);
function Composer({ onCreate, myName = "You", myAvatarUrl = "" }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  return (
    <Card>
      <form
        onSubmit={async (e) => { e.preventDefault(); if (busy) return; setBusy(true); await onCreate({ text, file }, () => { setText(""); setFile(null); setBusy(false); }); setBusy(false); }}
        className="space-y-3"
      >
        {/* <div className="flex items-start gap-3">
          
          <Avatar name={post.user?.name || "User"} />

          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={`What's on your mind, ${me?.name?.split(" ")[0] || "friend"}?`} rows={2} className={`flex-1 rounded-2xl px-4 py-3 outline-none ${neoInset}`} />
        </div> */}

        <div className="flex items-start gap-3">
          <Avatar name={myName || "You"} size={12} />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`What's on your mind, ${(myName || "friend").split(" ")[0]}?`}
            rows={2}
            className={`flex-1 rounded-2xl px-4 py-3 outline-none ${neoInset}`}
          />
        </div>



        {file && (
          <div className="rounded-xl overflow-hidden">{mimeToType(file) === "image"
            ? <img src={URL.createObjectURL(file)} alt="" className="max-h-80 w-full object-cover" />
            : <video src={URL.createObjectURL(file)} className="w-full max-h-80" controls />}
          </div>
        )}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <Attach label="Photo" icon={<LuImagePlus />} accept="image/*" onFile={setFile} />
            <Attach label="Video" icon={<LuVideo />} accept="video/*" onFile={setFile} />
            <Chip icon={<LuCalendarClock />} label="Event" /><Chip icon={<LuFileText />} label="Article" />
          </div>
          <button type="submit" disabled={busy} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 font-medium shadow-md active:scale-95 ${busy ? "bg-indigo-400 text-white" : "bg-indigo-600 text-white"}`}>
            {busy ? <FiLoader className="animate-spin" /> : <FiSend />} Post
          </button>
        </div>
      </form>
    </Card>
  );
}
function Attach({ label, icon, accept, onFile }) {
  const id = `file-${label}-${Math.random().toString(36).slice(2, 7)}`;
  return (
    <label htmlFor={id} className={`cursor-pointer inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${neo}`}>
      <span className="text-base">{icon}</span><span>{label}</span>
      <input id={id} type="file" accept={accept} className="hidden" onChange={(e) => onFile?.(e.target.files?.[0])} />
    </label>
  );
}
function Chip({ icon, label }) {
  return <div className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${neo}`}><span className="text-base">{icon}</span><span>{label}</span></div>;
}

/* Post with Reaction Palette + Edit/Delete */
function PostCard({ post, onReact, onComment, onEdit, onDelete }) {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editCaption, setEditCaption] = useState(post.caption || "");
  const [editFile, setEditFile] = useState(null);
  const [reactOpen, setReactOpen] = useState(false);
  const me = post.meFallback || {};
  const authorName = displayNameFor(post.user, me);



  const likeCount = post?.reactions?.length || 0;
  const commentCount = post?.comments?.length || 0;

  return (
    <Card className="p-0 relative">
      {/* kebab menu */}
      <button className="absolute right-3 top-3 text-slate-500" onClick={() => setMenuOpen((s) => !s)}><FiMoreHorizontal /></button>
      {menuOpen && post.__owner && (
        <div className={`absolute right-3 top-10 z-20 rounded-xl p-2 text-sm ${neo}`}>
          <button onClick={() => { setEditOpen(true); setMenuOpen(false); }} className="flex items-center gap-2 px-3 py-2 w-full text-left hover:text-indigo-600"><FiEdit2 /> Edit</button>
          <button onClick={() => { setMenuOpen(false); onDelete?.(); }} className="flex items-center gap-2 px-3 py-2 w-full text-left text-rose-600"><FiTrash2 /> Delete</button>
        </div>
      )}

      {/* header */}
      <div className="p-4 flex items-start gap-3">
        {/* <Avatar src={post.user?.avatar} /> */}
        {/* <Avatar src={me?.avatar} /> */}
        <Avatar name={authorName} />

        <div className="flex-1">
          <div className="flex items-center gap-2">
            {/* <h4 className="font-semibold">{post.user?.name || "User"}</h4> */}
            <h4 className="font-semibold">{authorName}</h4>
            <span className="text-slate-400">•</span>
            <span className="text-sm text-slate-500">{post.userType || ""}</span>
            <span className="ml-auto text-xs text-slate-500">{new Date(post.createdAt).toLocaleString()}</span>
          </div>
          {post.caption ? <p className="mt-1 text-sm whitespace-pre-wrap">{post.caption}</p> : null}
        </div>
      </div>

      {/* media */}
      {post.mediaUrl && (
        <div className="w-full">
          {post.mediaType === "video"
            ? <video src={post.mediaUrl} controls className="w-full max-h-[70vh] object-contain" />
            : <img src={post.mediaUrl} alt="" className="w-full h-auto object-cover" />}
        </div>
      )}

      {/* actions */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-5 text-slate-600">
          <div className="relative">
            <Action icon={<FaHeart />} label={likeCount} onClick={() => setReactOpen((s) => !s)} />
            {reactOpen && (
              <div className={`absolute z-10 mt-2 rounded-xl p-2 ${neo}`} onMouseLeave={() => setReactOpen(false)}>
                <div className="flex gap-2">
                  {["like", "love", "clap", "fire"].map((r) => (
                    <button key={r} onClick={() => { setReactOpen(false); onReact?.(r); }} className="rounded-lg px-2 py-1 hover:bg-white/60">
                      {r === "like" ? "👍" : r === "love" ? "❤️" : r === "clap" ? "👏" : "🔥"}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Action icon={<FaRegCommentDots />} label={commentCount} onClick={() => setShowComments((s) => !s)} />
          <Action icon={<FaShare />} label="Share" onClick={() => navigator.clipboard?.writeText(window.location.href)} />
        </div>
      </div>

      {/* comments */}
      {showComments && (
        <div className="px-4 pb-4 space-y-3">
          <div className="space-y-2">
            {(post.comments || []).map((c, idx) => (
              <div key={idx} className={`${neoInset} rounded-xl px-3 py-2`}>
                <p className="text-sm">
                  {/* <span className="font-medium">{c.user?.name || "User"}</span>{" "} */}
                  {/* <span className="font-medium">{nameOfUserRef(c.user, post.meFallback)}</span>{" "} */}
                  <span className="font-medium">
                    {displayNameFor(c.user, post.meFallback)}
                  </span>


                  <span className="text-slate-500 text-xs">{c.createdAt ? "• " + new Date(c.createdAt).toLocaleString() : ""}</span>
                </p>
                <p className="text-sm">{c.text}</p>
              </div>
            ))}
            {(post.comments?.length ?? 0) === 0 && (
              <p className="text-sm text-slate-500">Be the first to comment.</p>
            )}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); const txt = comment.trim(); if (!txt) return; onComment?.(txt); setComment(""); }} className="flex items-center gap-2">
            <input value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write a comment…" className={`flex-1 rounded-xl px-3 py-2 outline-none ${neoInset}`} />
            <button type="submit" className="rounded-xl bg-indigo-600 text-white px-3 py-2 text-sm font-medium">Comment</button>
          </form>
        </div>
      )}

      {/* Edit Modal */}
      {editOpen && (
        <div className="fixed inset-0 z-30 bg-black/30 flex items-center justify-center p-4">
          <div className={`relative w-full max-w-xl rounded-2xl p-4 ${neo}`}>
            <button className="absolute top-3 right-3" onClick={() => setEditOpen(false)}><FiX /></button>
            <h3 className="font-semibold mb-3">Edit post</h3>
            <textarea value={editCaption} onChange={(e) => setEditCaption(e.target.value)} className={`w-full rounded-xl px-3 py-2 mb-3 outline-none ${neoInset}`} rows={3} />
            {editFile && (
              <div className="rounded-xl overflow-hidden mb-3">
                {mimeToType(editFile) === "image"
                  ? <img src={URL.createObjectURL(editFile)} alt="" className="max-h-80 w-full object-cover" />
                  : <video src={URL.createObjectURL(editFile)} className="w-full max-h-80" controls />}
              </div>
            )}
            <div className="flex items-center justify-between">
              <label className={`cursor-pointer inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${neo}`}>
                <LuImagePlus /><span>Replace media</span>
                <input type="file" className="hidden" accept="image/*,video/*" onChange={(e) => setEditFile(e.target.files?.[0] || null)} />
              </label>
              <div className="flex gap-2">
                <button onClick={() => setEditOpen(false)} className="rounded-xl px-4 py-2">Cancel</button>
                <button onClick={() => onEdit?.({ caption: editCaption, file: editFile, close: () => setEditOpen(false) })} className="rounded-xl bg-indigo-600 text-white px-4 py-2">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
function Action({ icon, label, onClick }) {
  return (
    <button onClick={onClick} className="group inline-flex items-center gap-2 text-sm">
      <span className={`grid h-9 w-9 place-items-center rounded-xl ${neo} group-active:scale-95`}>{icon}</span>
      <span className="text-slate-700">{label}</span>
    </button>
  );
}

/* Right */
function AddToFeed() {
  return (
    <Card>
      <h4 className="font-semibold mb-4">Add to your feed</h4>
      <div className="space-y-4">
        {people.map((p) => (
          <div key={p.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3"><Avatar /><div><p className="text-sm font-semibold">{p.name}</p><p className="text-xs text-slate-500">{p.role}</p></div></div>
            <button className="rounded-xl px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50">Follow</button>
          </div>
        ))}
      </div>
    </Card>
  );
}
function Trends() {
  return (
    <Card>
      <h4 className="font-semibold mb-3">Today’s top courses</h4>
      <ul className="space-y-2">
        {trends.map((t, i) => (<li key={i} className="text-sm flex gap-2"><span className="text-slate-400">{i + 1}.</span><span>{t}</span></li>))}
      </ul>
    </Card>
  );
}

/* ===== Utilities for style =====
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
*/

