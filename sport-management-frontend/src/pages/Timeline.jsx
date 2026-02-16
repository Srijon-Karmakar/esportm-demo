// // TimelinePage.jsx
// import React from "react";
// import {
//   FiHome,
//   FiClock,
//   FiUsers,
//   FiSearch,
//   FiSettings,
//   FiUser,
//   FiHeart,
//   FiMessageCircle,
//   FiMoreHorizontal,
// } from "react-icons/fi";

// const POSTS = Array.from({ length: 8 }).map((_, i) => ({
//   id: i + 1,
//   author: ["Alex Morgan", "Chris Taylor", "Sam Rivera", "Jordan Li"][i % 4],
//   handle: ["@alex", "@chris", "@sam", "@jordan"][i % 4],
//   title: ["Training day", "Match highlights", "Gym grind", "Recovery"][i % 4],
//   body:
//     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, obcaecati. Real post copy goes here as a placeholder.",
//   media: `https://picsum.photos/seed/sportbit-${i + 7}/1200/640`,
//   avatar: `https://i.pravatar.cc/96?img=${(i + 12) % 70}`,
//   time: `${(i % 12) + 1}h`,
//   likes: 20 + i * 3,
//   comments: 4 + (i % 5),
// }));

// export default function TimelinePage() {
//   return (
//     <div className="h-screen w-screen bg-gradient-to-b from-purple-200/70 via-white to-white overflow-y-auto overflow-x-hidden">
//       {/* top glow strip */}
//       <div className="pointer-events-none h-10 w-full bg-gradient-to-b from-purple-300/70 to-transparent" />

//       {/* floating home button */}
//       <button
//         aria-label="Home"
//         className="fixed right-6 top-6 z-50 grid h-11 w-11 place-items-center rounded-full bg-white/90 shadow-lg ring-1 ring-black/5 backdrop-blur hover:bg-white"
//       >
//         <FiHome className="text-purple-600" />
//       </button>

//       <div className="mx-auto flex max-w-[1320px] gap-6 px-4 pb-10">
//         {/* LEFT: Sidebar */}
//         <aside className="sticky top-4 hidden h-[calc(100vh-2rem)] w-[240px] shrink-0 rounded-2xl bg-gradient-to-b from-violet-200 via-violet-500 to-violet-900 p-4 text-white shadow-xl md:block">
//           <div className="px-1 pt-1">
//             <div className="text-2xl font-extrabold leading-none">Sportbit</div>
//             <div className="text-sm opacity-90">Timeline</div>
//           </div>

//           <nav className="mt-6 space-y-1">
//             <NavItem active icon={<FiClock />} label="Timeline" />
//             <NavItem icon={<FiUsers />} label="Followers" />
//             <NavItem icon={<FiSearch />} label="Find Skills" />
//             <NavItem icon={<FiSettings />} label="Settings" />
//           </nav>

//           <div className="mt-auto">
//             <div className="h-px w-full bg-white/20 my-4" />
//             <NavItem icon={<FiUser />} label="Profile" />
//           </div>
//         </aside>

//         {/* RIGHT: Main column */}
//         <main className="w-full">
//           {/* big rounded feed canvas */}
//           <div className="rounded-3xl bg-neutral-200/60 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] md:p-6">
//             {/* feed */}
//             <div className="mx-auto max-w-3xl space-y-8">
//               {POSTS.map((p) => (
//                 <article
//                   key={p.id}
//                   className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5"
//                 >
//                   {/* author row */}
//                   <div className="flex items-center gap-3 px-4 py-3 sm:px-5">
//                     <img
//                       src={p.avatar}
//                       alt={p.author}
//                       className="h-11 w-11 rounded-full object-cover"
//                     />
//                     <div className="min-w-0">
//                       <div className="flex items-center gap-2">
//                         <span className="truncate font-semibold text-slate-900">
//                           {p.author}
//                         </span>
//                         <span className="text-sm text-slate-500">{p.time}</span>
//                       </div>
//                       <div className="truncate text-sm text-slate-500">
//                         {p.handle}
//                       </div>
//                     </div>
//                     <button className="ml-auto rounded-full p-2 text-slate-500 hover:bg-slate-100">
//                       <FiMoreHorizontal />
//                     </button>
//                   </div>

//                   {/* media */}
//                   <div className="relative">
//                     <img
//                       src={p.media}
//                       alt={p.title}
//                       className="h-[240px] w-full select-none object-cover sm:h-[320px] md:h-[360px]"
//                       draggable={false}
//                     />
//                     {/* small white pill like the mock */}
//                     <div className="absolute bottom-3 right-3 rounded-full bg-white/95 px-4 py-2 text-sm font-medium text-slate-800 shadow-md">
//                       View
//                     </div>
//                   </div>

//                   {/* content */}
//                   <div className="space-y-2 px-4 py-4 sm:px-5">
//                     <h3 className="text-lg font-semibold text-slate-900">
//                       {p.title}
//                     </h3>
//                     <p className="text-sm leading-relaxed text-slate-600">
//                       {p.body}
//                     </p>

//                     {/* actions */}
//                     <div className="mt-3 flex items-center gap-4">
//                       <Action icon={<FiHeart />} label={p.likes} />
//                       <Action icon={<FiMessageCircle />} label={p.comments} />
//                     </div>
//                   </div>
//                 </article>
//               ))}
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// /* ---------------------------------- UI bits --------------------------------- */

// function NavItem({ icon, label, active = false }) {
//   return (
//     <button
//       className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
//         active
//           ? "bg-white/15 font-semibold ring-1 ring-white/30"
//           : "hover:bg-white/10"
//       }`}
//     >
//       <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/15">
//         <span className="text-white">{icon}</span>
//       </span>
//       <span className="select-none">{label}</span>
//     </button>
//   );
// }

// function Action({ icon, label }) {
//   return (
//     <button className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-slate-600 hover:bg-slate-100">
//       <span className="text-slate-700">{icon}</span>
//       <span className="text-sm">{label}</span>
//     </button>
//   );
// }



// update 
import React from "react";
import TimelineSidebar from "../components/Timeline/sidebar";
import "./Timeline.css";

export default function Timeline() {
  return (
    <div className="tl-page">
      <TimelineSidebar />

      <main className="tl-main">
        <header className="tl-topbar">
          <div className="tl-home-btn" title="Home">
            <span className="tl-home-dot" />
          </div>
        </header>

        <section className="tl-feed">
          {/* Card 1 */}
          <article className="tl-card">
            <div className="tl-card-badge" />
            <div className="tl-media" />
            <div className="tl-cta" />
            <div className="tl-card-title">Photo/Video title</div>
            <div className="tl-card-sub">Post information</div>
          </article>

          {/* Card 2 */}
          <article className="tl-card">
            <div className="tl-card-badge" />
            <div className="tl-media" />
            <div className="tl-cta" />
            <div className="tl-card-title">Photo/Video title</div>
            <div className="tl-card-sub">Post information</div>
          </article>

          {/* Duplicate as many posts as needed */}
        </section>
      </main>
    </div>
  );
}
