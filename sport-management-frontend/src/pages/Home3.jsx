

import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import "./Home2.css";
import "./Home2.mobile.css";

import PLAYER from "/images/homepage/player.png";
import PLAYER2 from "/images/homepage/cricketer.png";
import PLAYER3 from "/images/homepage/rugby-player.png";
import PLAYER4 from "/images/homepage/player.png";
import PLAYER5 from "/images/homepage/rugby-player.png";


// svg
import dashboardUrl from "../assets/icons/svg/dashboard.svg?url";
import marketPlaceUrl from "../assets/icons/svg/marketPlace.svg?url";
import timeLineUrl from "../assets/icons/svg/timeLine.svg?url";
import aboutUrl from "../assets/icons/svg/about.svg?url";

// orb AI
import Orb from "./orbAi";





//  search only these destinations
const SEARCH_OPTIONS = [
  { label: "Players", to: "/playerMarket2", icon: "/icons/search/players.svg" },
  { label: "Clubs", to: "/clubs", icon: "/icons/search/clubs.svg" },
  { label: "Events", to: "/events", icon: "/icons/search/events.svg" },
  { label: "Coaches", to: "/coaches", icon: "/icons/search/coaches.svg" },
  { label: "Marketplace", to: "/playerMarket2", icon: "/icons/search/market.svg" },
];



/* ----------------- Get Started / Avatar + Logout CTA ----------------- */
function GetStartedCTA({ navigate }) {
  // detect "logged in"
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("auth_token");
  const userObj = (() => {
    try { return JSON.parse(localStorage.getItem("sb_user") || "null"); }
    catch { return null; }
  })();

  const loggedIn = Boolean(role || token || userObj);

  const username =
    (userObj?.name || userObj?.username) ||
    localStorage.getItem("username") ||
    (role ? role.charAt(0).toUpperCase() + role.slice(1) : "User");

  const defaultAvatar =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128'>
         <rect width='100%' height='100%' rx='64' fill='#d1c4e9'/>
         <circle cx='64' cy='50' r='24' fill='#9575cd'/>
         <rect x='24' y='80' width='80' height='36' rx='18' fill='#9575cd'/>
       </svg>`
    );

  const avatar =
    userObj?.avatar ||
    localStorage.getItem("avatar") ||
    defaultAvatar;

  const handleLogout = () => {
    // clear common keys; add/remove as your app needs
    ["role", "auth_token", "sb_user", "username", "avatar"].forEach(k => localStorage.removeItem(k));
    navigate("/");
    window.location.reload();
  };

  /* ---------- Logged in ---------- */
  if (loggedIn) {
    return (
      <>
        {/* Avatar / username */}
        <div className="relative group z-[90]"> {/* z fixes overlap */}
          <button
            onClick={() => navigate("/user/profile2")}
            className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-white/40 shadow-[6px_6px_12px_rgba(0,0,0,0.55),-6px_-6px_12px_rgba(255,255,255,0.42)] hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.4),inset_-4px_-4px_8px_rgba(255,255,255,0.15)] transition"
            // title="Profile"
            aria-label="Open profile"
          >
            <img
              src={avatar}
              alt="Account"
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = defaultAvatar; }}
            />
          </button>

          {/* Hover username pill (always on top) */}
          <div className="pointer-events-none absolute left-16 top-1/2 -translate-y-1/2 opacity-0 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 z-[100]">
            {/* <div className="px-3 py-1 rounded-full bg-black/80 text-white text-lg shadow whitespace-nowrap"> */}
            <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-400 text-black text-lg font-semibold shadow whitespace-nowrap">
              {username}
            </div>
          </div>
        </div>

        {/* Logout icon with hover label */}
        <div className="relative group z-[90]">
          <button
            onClick={handleLogout}
            // className="w-14 h-14 rounded-full flex items-center justify-center text-black bg-white/180 backdrop-blur shadow-[6px_6px_12px_rgba(0,0,0,0.55),-6px_-6px_12px_rgba(255,255,255,0.42)] hover:scale-105 transition"
            className="w-14 h-14 rounded-full flex items-center justify-center text-white bg-white/180 backdrop-blur 
 shadow-[6px_6px_12px_rgba(0,0,0,0.55),-6px_-6px_12px_rgba(255,255,255,0.42)] 
 hover:bg-red-600 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,0,0,0.4)] transition-all duration-200"
            // title="Log out"
            aria-label="Log out"
          >
            {/* power icon */}
            <img
              src="/icons/LogoutIcon.png"
              alt="Logout"
              className="w-6 h-6 opacity-90 hover:opacity-100 transition"
            />
          </button>

          {/* Hover "Logout" pill */}
          <div className="pointer-events-none absolute left-16 top-1/2 -translate-y-1/2 opacity-0 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 z-[100]">
            <div className="px-3 py-1 rounded-full bg-black/80 text-white text-lg shadow">
              Logout
            </div>
          </div>
        </div>
      </>
    );
  }

  /* ---------- Not logged in ---------- */
  return (
    <>
      {/* Get Started + hover Login/Signup */}
      <div className="relative group z-[90]">
        <button
          onClick={() => navigate("/login3")}
          id="mobile-login"
          className="group w-14 h-14 flex flex-col items-center justify-center rounded-full text-[11px] font-semibold text-black backdrop-blur transition hover:scale-105 shadow-[6px_6px_12px_rgba(0,0,0,0.55),-6px_-6px_12px_rgba(255,255,255,0.42)] hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.4),inset_-4px_-4px_8px_rgba(255,255,255,0.15)]"
          title="Get Started"
          aria-label="Get Started"
        >
          Get<br />Started
        </button>

        {/* Hover actions */}
        <div className="absolute left-16 top-1/2 -translate-y-1/2 opacity-0 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 z-[100]">
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/login3")}
              className="px-3 py-1 rounded-full bg-white text-black text-lg shadow hover:scale-105 transition"
              aria-label="Login"
              title="Login"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/login3")}
              className="px-3 py-1 rounded-full bg-black text-white text-lg shadow hover:scale-105 transition"
              aria-label="Signup"
              title="Signup"
            >
              Signup
            </button>
          </div>
        </div>
      </div>

      {/* Keep Book Demo when NOT logged in */}
      <button
        onClick={() => navigate("/bookDemo")}
        id="mobile-bookdemo"
        className="group w-14 h-14 flex flex-col items-center justify-center rounded-full text-[11px] font-semibold text-black backdrop-blur transition hover:scale-105 shadow-[6px_6px_12px_rgba(0,0,0,0.55),-6px_-6px_12px_rgba(255,255,255,0.42)] hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.4),inset_-4px_-4px_8px_rgba(255,255,255,0.15)]"
        title="Book a Demo"
        aria-label="Book a Demo"
      >
        Book<br />Demo
      </button>
    </>
  );
}











/* ----------------- Page ----------------- */
export default function SportbitLandingExact() {
  const navigate = useNavigate();
  const root = useRef(null);
  const trails = useRef([]);
  const [theme, setTheme] = useState("light");

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selected, setSelected] = useState(null); // selected option object
  const searchRef = useRef(null);



  // ===== Hero hover-cycle (GSAP) =====
  const HERO_IMAGES = [PLAYER, PLAYER2, PLAYER3, PLAYER4, PLAYER5]; // import these at top
  const EFFECTS = ["fade", "blur", "wipe", "glow", "lift"];         // effect rotation

  const [heroIndex, setHeroIndex] = useState(0);
  const [effectIdx, setEffectIdx] = useState(0);

  // two layers for crossfade
  const heroWrapRef = useRef(null);
  const currRef = useRef(null);
  const prevRef = useRef(null);

  // keep previous src between hovers
  const prevSrcRef = useRef(HERO_IMAGES[0]);

  const handleHeroHover = () => {
    const wrap = heroWrapRef.current;
    const curr = currRef.current;
    const prev = prevRef.current;
    if (!wrap || !curr || !prev) return;

    // compute next index and effect
    const nextIdx = (heroIndex + 1) % HERO_IMAGES.length;
    const nextEffect = EFFECTS[(effectIdx + 1) % EFFECTS.length];

    // set image sources
    prev.src = prevSrcRef.current;         // outgoing
    curr.src = HERO_IMAGES[nextIdx];       // incoming

    // start states
    gsap.set(prev, { clearProps: "all", opacity: 1, filter: "none", clipPath: "inset(0 0 0 0)", x: 0, y: 0, scale: 1 });
    gsap.set(curr, { clearProps: "all", opacity: 0, filter: "none", clipPath: "inset(0 0 0 0)", x: 0, y: 0, scale: 1 });

    const tl = gsap.timeline({ defaults: { duration: 0.6, ease: "power3.out" } });

    switch (nextEffect) {
      case "fade":
        tl.to(curr, { opacity: 1 }, 0).to(prev, { opacity: 0.0 }, 0.05);
        break;

      case "blur":
        tl.fromTo(curr, { opacity: 0, filter: "blur(10px) saturate(0.9)" }, { opacity: 1, filter: "blur(0px) saturate(1)" }, 0)
          .to(prev, { opacity: 0, filter: "blur(5px)" }, 0);
        break;

      case "wipe":
        gsap.set(curr, { clipPath: "inset(0 0 0 100%)" });
        tl.to(curr, { opacity: 1, clipPath: "inset(0 0 0 0)" }, 0)
          .to(prev, { opacity: 0.0 }, 0.1);
        break;

      case "glow":
        tl.fromTo(curr, { opacity: 0, filter: "drop-shadow(0 0 0 rgba(255,215,0,0)) brightness(0.98)" },
          { opacity: 1, filter: "drop-shadow(0 0 16px rgba(255,215,0,.35)) brightness(1.02)" }, 0)
          .to(curr, { filter: "drop-shadow(0 0 0 rgba(255,215,0,0)) brightness(1)" }, "<+0.3")
          .to(prev, { opacity: 0 }, 0.05);
        break;

      case "lift":
        tl.fromTo(curr, { opacity: 0, y: 16, scale: 0.98 }, { opacity: 1, y: 0, scale: 1 }, 0)
          .to(prev, { opacity: 0, y: -10, scale: 1.01 }, 0);
        break;

      default:
        tl.to(curr, { opacity: 1 }, 0).to(prev, { opacity: 0 }, 0);
    }

    // finalize indices + cache
    prevSrcRef.current = HERO_IMAGES[nextIdx];
    setHeroIndex(nextIdx);
    setEffectIdx((i) => (i + 1) % EFFECTS.length);
  };


  //search update
  // ===== Search State =====
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);
  const searchWrapRef = useRef(null);
  const [ddOpen, setDdOpen] = useState(false);
  // mobile menu state (for hamburger)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const SEARCH_OPTIONS = [
    { label: "Buy Players", path: "/playerMarket2" },
    { label: "Login", path: "/login3" },
    { label: "Player Signup", path: "/signup/player" },
    { label: "Events", path: "/events" },
    { label: "Manager Signup", path: "/signup/manager" },
    { label: "Marketplace", path: "/marketplace" },
    { label: "Pricing", path: "/pricing" },
    { label: "Admin Panel", path: "/login/admin" },
  ];

  const [recent, setRecent] = useState(() => {
    try { return JSON.parse(localStorage.getItem("sb_recent_searches") || "[]"); }
    catch { return []; }
  });

  const SUGGESTIONS = ["Players", "Clubs", "Events", "Tournaments", "Transfers"];

  const saveRecent = (q) => {
    if (!q) return;
    const nxt = [q, ...recent.filter(r => r.toLowerCase() !== q.toLowerCase())].slice(0, 6);
    setRecent(nxt);
    localStorage.setItem("sb_recent_searches", JSON.stringify(nxt));
  };

  const submitSearch = (q) => {
    const term = (q ?? searchQuery).trim();
    if (!term) return;
    saveRecent(term);
    navigate(`/search?q=${encodeURIComponent(term)}`);
    setSearchOpen(false);

  };

  // open/close transition + hotkey
  // useEffect(() => {
  //   if (searchOpen) {
  //     gsap.fromTo(".sb-search-shell", { width: 64 }, { width: 320, duration: 0.25, ease: "power2.out" });
  //     setTimeout(() => searchInputRef.current?.focus(), 120);
  //   } else {
  //     gsap.to(".sb-search-shell", { width: 64, duration: 0.2, ease: "power2.in" });
  //     setSearchQuery("");
  //   }
  // }, [searchOpen]);

  useEffect(() => {
    const handleDown = (e) => {
      if (!searchOpen) return;
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleDown);
    document.addEventListener("touchstart", handleDown);
    return () => {
      document.removeEventListener("mousedown", handleDown);
      document.removeEventListener("touchstart", handleDown);
    };
  }, [searchOpen]);


  useEffect(() => {
    const onKey = (e) => {
      const cmd = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k";
      if (cmd) {
        e.preventDefault();
        setSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 50);
      }
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);


  //outside click 

  // useEffect(() => {
  //   const handleOutside = (e) => {
  //     if (!searchOpen) return;
  //     if (searchWrapRef.current && !searchWrapRef.current.contains(e.target)) {
  //       setSearchOpen(false);
  //     }
  //   };
  //   const handleEsc = (e) => {
  //     if (e.key === "Escape") setSearchOpen(false);
  //   };
  //   window.addEventListener("mousedown", handleOutside);
  //   window.addEventListener("touchstart", handleOutside);
  //   window.addEventListener("keydown", handleEsc);
  //   return () => {
  //     window.removeEventListener("mousedown", handleOutside);
  //     window.removeEventListener("touchstart", handleOutside);
  //     window.removeEventListener("keydown", handleEsc);
  //   };
  // }, [searchOpen]);

  useEffect(() => {
    function onDocClick(e) {
      if (!searchRef.current) return;
      if (!searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
        setSearchText("");
        setSelected(null);
        setDdOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);



  //search update



  // dashboard role switcher
  const handleDashboardClick = () => {
    const role = localStorage.getItem("role"); // 'player', 'manager', 'club', 'admin', etc.

    if (!role) {
      alert("Please login to access dashboard.");
      return navigate("/");
    }

    switch (role) {
      case "player": return navigate("/NmdDashboard");
      case "manager": return navigate("/ManagerDash");
      case "club": return navigate("/ClubDashboard");
      case "admin": return navigate("/AdminDashboard");
      case "agent": return navigate("/AgentDashboard");
      case "physio": return navigate("/PhysioDashboard");
      case "coach": return navigate("/CoachDashboard");
      case "nutritionist": return navigate("/NutriDashboard");
      case "pitch manager": return navigate("/PitchManagerDash");
      default: return navigate("/");
    }
  };

  // lock scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, []);

  // spotlight + trail
  useEffect(() => {
    const el = root.current;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    el.addEventListener("mousemove", onMove);

    let raf;
    const pts = trails.current.map((n) => ({ x: 0, y: 0, el: n }));
    const tick = () => {
      const s = getComputedStyle(el);
      const mx = parseFloat((s.getPropertyValue("--mx") || "0").replace("px", ""));
      const my = parseFloat((s.getPropertyValue("--my") || "0").replace("px", ""));
      let tx = mx, ty = my;
      pts.forEach((p, i) => {
        p.x += (tx - p.x) * 0.18;
        p.y += (ty - p.y) * 0.18;
        p.el.style.transform = `translate(${p.x - 3}px, ${p.y - 3}px)`;
        p.el.style.opacity = String(0.15 + i * 0.04);
        tx = p.x; ty = p.y;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { el.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  // gsap in
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out", duration: 0.6 } })
        .from(".sb-wrap", { opacity: 0 })
        .from(".sb-rail", { x: -30, opacity: 0 }, "-=0.3")
        .from(".sb-panel", { scale: 0.98, opacity: 0 }, "-=0.35")
        .from(".sb-hero", { x: -15, opacity: 0 }, "-=0.35")
        .from([".sb-welcome", ".sb-title", ".sb-tagline"], { y: 18, opacity: 0, stagger: 0.08 }, "-=0.35")
        .from(".sb-bottom-card", { y: 18, opacity: 0 }, "-=0.3");
    }, root);
    return () => ctx.revert();
  }, []);



  function SidebarIcon({ icon, label, onClick }) {
    return (
      <div className="relative group z-[90]">
        <button
          onClick={onClick}
          aria-label={label}
          className="p-3 rounded-full hover:bg-white/10 transition flex items-center justify-center"
        >
          <img src={icon} alt={label} className="w-7 h-7" />
        </button>

        {/* Rounded hover label */}
        <div className="pointer-events-none absolute left-16 top-1/2 -translate-y-1/2 
                      opacity-0 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 
                      transition-all duration-200 z-[100]">
          <div className="px-4 py-1.5 rounded-full bg-black/80 text-white text-lg font-medium shadow whitespace-nowrap">
            {label}
          </div>
        </div>
      </div>
    );
  }





  return (
    <div ref={root} className="sb-wrap relative h-screen w-screen overflow-hidden bg-[#EDE7F5] text-white">
      {/* mouse trail */}
      <div className="pointer-events-none absolute inset-0 z-[60]">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} ref={(r) => (trails.current[i] = r)} className="sb-dot absolute h-[6px] w-[6px] rounded-full" />
        ))}
      </div>

      {/* main layout container */}
      <div className="mx-auto flex h-full w-full max-w-[1320px] items-center justify-center px-2 md:px-4">
        {/* LEFT rail */}
        <aside className="sb-rail mr-2 hidden h[95%] md:h-[95%] w-[96px] shrink-0 md:flex md:flex-col md:items-center md:justify-center md:gap-2 relative z-[80]">

          {/* tall black pill with icons */}


          <div className="h-[90%] w-[92px] rounded-[48px] bg-[#151315] flex flex-col items-center justify-around py-6">

            {/* 🧠 Sportbit AI orb with ripple + hover label */}
            <div className="relative group ai-orb">
              <div
                id="AI"
                onClick={() => navigate('/sportbitAI')}
                className="orb-bg-layer w-20 h-20 p-0 cursor-pointer flex items-center justify-center relative z-[2]"
              >
                <Orb hue={theme === 'dark' ? 260 : 0} hoverIntensity={1} />
              </div>

              {/* ripple rings (auto-staggered via CSS) */}
              <span className="ai-ripple" aria-hidden="true" />
              <span className="ai-ripple ai-ripple-2" aria-hidden="true" />
              <span className="ai-ripple ai-ripple-3" aria-hidden="true" />

              {/* Hover label */}
              <div className="pointer-events-none absolute left-24 top-1/2 -translate-y-1/2 
                  opacity-0 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 
                  transition-all duration-200 z-[100]">
                <div className="sb-tooltip-ai">Sportbit&nbsp;AI</div>
              </div>
            </div>


            {/* Sidebar icons with hover labels */}
            <SidebarIcon icon={dashboardUrl} label="Dashboard" onClick={handleDashboardClick} />
            <SidebarIcon icon={marketPlaceUrl} label="Marketplace" onClick={() => navigate('/playerMarket2')} />
            <SidebarIcon icon={timeLineUrl} label="Timeline" onClick={() => navigate('/Timeline')} />
            <SidebarIcon icon={aboutUrl} label="About" onClick={() => navigate('/about')} />
          </div>







          {/* purple CTA pill */}


          <div className="w-[92px] h-[290px] rounded-[100px] bg-[#ce8fe3]/60 p-3 flex flex-col items-center justify-center gap-5 relative">
            <GetStartedCTA navigate={navigate} />
          </div>






        </aside>




        {/* mobile sidebar  */}
        {/* Mobile right-side nav pill (icons in grey area) */}
        <div className="sb-rail-mobile md:hidden">
          <div className="sb-rail-mobile-pill">
            {/* 🧠 Sportbit AI orb at top */}
            <div className="relative group ai-orb mb-1">
              <div
                id="AI-mobile"
                onClick={() => navigate("/sportbitAI")}
                className="orb-bg-layer w-16 h-16 cursor-pointer flex items-center justify-center relative z-[2]"
              >
                <Orb hue={theme === "dark" ? 260 : 0} hoverIntensity={1} />
              </div>

              {/* ripple rings (reuse same CSS as desktop) */}
              <span className="ai-ripple" aria-hidden="true" />
              <span className="ai-ripple ai-ripple-2" aria-hidden="true" />
              <span className="ai-ripple ai-ripple-3" aria-hidden="true" />
            </div>

            {/* Icons below orb */}
            <button
              onClick={handleDashboardClick}
              aria-label="Dashboard"
              className="sb-rail-mobile-btn"
            >
              <img src={dashboardUrl} alt="Dashboard" className="w-7 h-7" />
            </button>

            <button
              onClick={() => navigate("/playerMarket2")}
              aria-label="Marketplace"
              className="sb-rail-mobile-btn"
            >
              <img src={marketPlaceUrl} alt="Marketplace" className="w-7 h-7" />
            </button>

            <button
              onClick={() => navigate("/Timeline")}
              aria-label="Timeline"
              className="sb-rail-mobile-btn"
            >
              <img src={timeLineUrl} alt="Timeline" className="w-7 h-7" />
            </button>

            <button
              onClick={() => navigate("/about")}
              aria-label="About"
              className="sb-rail-mobile-btn"
            >
              <img src={aboutUrl} alt="About" className="w-7 h-7" />
            </button>
          </div>
        </div>


        {/* mobile sidebar  */}









        {/* ============ SPLIT PURPLE PANELS (left tall, right short) ============ */}
        <section className="sb-panel relative h-[95%] w/full flex gap-2.5">
          {/* LEFT — full-height purple card */}
          <div className="flex-1 rounded-[40px] bg-[#7b5aa6] p-6 md:rounded-[44px] flex flex-col justify-between">
            <div className="relative z-10 grid h-full grid-cols-12">


              {/* hero image */}
              {/* <div className="sb-hero col-span-12 flex items-end justify-center md:col-span-6 md:justify-start">
                <div className="relative max-w-[500px] md:ml-1">
                  <img
                    src={PLAYER}
                    alt="Sportbit Player"
                    className="select-none"
                    style={{
                      width: "100%",
                      height: "auto",
                      transform: "scale(1.3) translateY(2px) translateX(60px)",
                    }}
                  />
                </div>
              </div> */}


              {/* hero image (GSAP hover-cycle) */}
              <div className="sb-hero col-span-12 flex items-end justify-center md:col-span-6 md:justify-start">
                <div
                  ref={heroWrapRef}
                  className="hero-swap relative max-w-[500px] md:ml-1  h-[520px]"
                  onMouseEnter={handleHeroHover}
                  onClick={handleHeroHover}   // allows mobile tap-cycles too
                >
                  {/* OUTGOING layer */}
                  <img
                    ref={prevRef}
                    src={HERO_IMAGES[heroIndex]}
                    alt="Sportbit Player (prev)"
                    className="hero-img"
                    style={{
                      width: "100%",
                      height: "auto",
                      transform: "scale(1.3) translateY(2px) translateX(60px)",
                      zIndex: 1,
                      position: "absolute",
                      inset: 0
                    }}
                  />

                  {/* INCOMING layer */}
                  <img
                    ref={currRef}
                    src={HERO_IMAGES[heroIndex]}
                    alt="Sportbit Player"
                    className="hero-img"
                    style={{
                      width: "100%",
                      height: "auto",
                      transform: "scale(1.3) translateY(2px) translateX(60px)",
                      zIndex: 2,
                      position: "absolute",
                      inset: 0,
                      opacity: 0
                    }}
                  />
                </div>
              </div>





              {/* welcome + title */}
              <div className="col-span-12 md:col-start-7 md:col-span-5 flex flex-col justify-center mt-[-65%] ml-[52%]">
                <div className="sb-welcome text-white/90 text-[26px] md:text-[25px] leading-tight">welcome to</div>
                <h1 className="sb-title mt-[-10px] leading-none text-[66px] md:text-[115px] font-semibold tracking-[-0.02em] text-[#EDE7F5]">
                  Sportbit
                </h1>
              </div>

              {/* Tagline — mobile inline */}
              <div className="sb-tagline md:hidden col-span-12 mt-4 text-center">
                <div className="text-white/90 text-[18px] leading-snug">
                  AI powered Sports management system
                </div>
              </div>

              {/* Tagline — desktop absolute to right of left panel */}
              <div className="hidden md:block">
                <div className="absolute right-29 top-1/2 -translate-y-1/2 z-20 ml-[265px]">
                  <div className="text-white/90 text-[17px] leading-snug whitespace-nowrap">
                    AI powered&nbsp;<br /> Sports management&nbsp;system
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — smaller purple card (top-right) */}
          <div className="w-[430px] h-[74%] rounded-[36px] bg-[#7b5aa6] p-6 flex flex-col gap-4">
            {/* vertical dividers */}
            <div className="absolute top-0 left-2/3 w-[12px] h-[220px] bg-[#EDE7F5] mt-[22%] ml-[8.9%]" />
            <div className="absolute top-0 left-2/3 w-[12px] h-[165px] bg-[#EDE7F5] mb-[20%] ml-[11.6%]" />

            {/* Search pill aligned RIGHT inside this small card */}
            {/* <div className="sb-search w-full flex justify-end">
              <div className="flex items-center gap-2 rounded-[44px] border-2 border-black bg-black px-2 py-1">
                <div className="rounded-[34px] bg-white/10 px-5 py-2 text-[18px] text-white/90">Search</div>
                <div className="h-10 w-10 rounded-full bg-black ring-2 ring-black/60" />
              </div>
            </div> */}

            {/* //search update  */}
            <div
              ref={searchWrapRef}
              className="sb-search w-full flex justify-end relative"
            >
              <div
                className={`sb-search-pill flex items-center gap-3 rounded-[44px] border-2 border-black bg-black px-4 py-2 transition-all duration-300 ${searchOpen ? "w-[320px]" : "w-[150px]"
                  } ${ddOpen ? "overflow-visible" : "overflow-hidden"}`}
              >
                {/* Icon (local svg/png) */}
                <img
                  src="/icons/search.svg"
                  alt="Search"
                  className="w-6 h-6 opacity-90 cursor-pointer"
                  onClick={() => setSearchOpen(!searchOpen)}
                />

                {/* Collapsed label */}
                {!searchOpen && (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="text-white/90 text-[18px] font-medium tracking-wide"
                  >
                    Search
                  </button>
                )}

                {/* Dropdown mode — no text input */}
                {searchOpen && (
                  <div className="relative w-full">
                    <button
                      type="button"
                      onClick={() => setDdOpen((v) => !v)}
                      className="w-full flex items-center justify-between rounded-[24px] px-3 py-2 
             bg-white/5 text-white text-[16px] outline-none border border-white/10
             hover:bg-white/10 transition"
                    >
                      <span className="opacity-90">Select category…</span>
                      <svg
                        className={`w-4 h-4 transition ${ddOpen ? "rotate-180" : ""}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
                      </svg>
                    </button>

                    {ddOpen && (
                      <ul
                        className="glass-dropdown absolute right-0 top-11 z-[200]
               w-[260px] rounded-2xl p-2
               bg-[rgba(255,255,255,0.08)] backdrop-blur-[40px]
               border border-white/15
               shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                        role="listbox"
                      >
                        {SEARCH_OPTIONS.map((opt) => (
                          <li key={opt.path} className="p-1">
                            <button
                              onClick={() => {
                                navigate(opt.path);
                                setDdOpen(false);
                                setSearchOpen(false);
                              }}
                              className="w-full text-left px-3 py-2 rounded-xl text-[15px] text-black font-manrope font-semibold
          hover:bg-gradient-to-r hover:from-white/15 hover:to-white/5
          hover:text-white transition
          border border-transparent hover:border-white/10"
                            >
                              {opt.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>





            {/* //search update  */}

          </div>
        </section>
        {/* ================== END SPLIT ================== */}
      </div>

      {/* ===== Bottom-right black card ===== */}
      <div onClick={() => navigate("/pricing")} className="sb-bottom-card pointer-events-auto absolute bottom-4 right-10 z-[30] cursor-pointer  ">
        <div className="flex h-[150px] w-[430px] max-w-[92vw] items-center justify-between rounded-[45px] bg-[#141214] px-6 py-4">
          <div>
            <div className="text-[28px] font-semibold">Sportbit</div>
            <div className="mt-1 text-[18px] text-[#B987FF]">Events</div>
          </div>
          {/* hollow gradient ring */}
          <div className="relative h-[96px] w-[96px]">
            <div className="absolute inset-0 rounded-full bg-[#141214]" />
            <div className="absolute inset-0 rounded-full p-[14px] bg-gradient-to-br from-[#8E44CF] via-[#B987FF] to-[#E3B2FF]">
              <div className="h-full w-full rounded-full bg-[#141214]" />
            </div>
          </div>
        </div>
      </div>
      {/* ===== END bottom-right card ===== */}
    </div>
  );
}
