// import React from "react";
// import { Instagram, Facebook, Globe, Linkedin, Mail, Phone } from "lucide-react";

// /* Reusable background card with overlay */
// const Bg = ({ src, children, className = "" }) => (
//   <div
//     className={`relative overflow-hidden rounded-2xl ${className}`}
//     style={{
//       backgroundImage: `url('${src}')`,
//       backgroundSize: "cover",
//       backgroundPosition: "center",
//     }}
//   >
//     <div className="absolute inset-0 bg-black/50" />
//     <div className="relative z-10">{children}</div>
//   </div>
// );

// export default function AboutSportbitBento() {
//   return (
//     <div className="h-screen w-screen overflow-x-hidden bg-neutral-900 text-neutral-100">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 min-h-0">
//         {/* GRID START */}
//         <div className="grid grid-cols-12 gap-4 min-h-0">
//           {/* Welcome + Hero + Copy */}
//           <div className="col-span-12 md:col-span-6 lg:col-span-5">
//             <div className="rounded-2xl bg-neutral-800/60 p-6 sm:p-8 ring-1 ring-white/10">
//               <p className="text-2xl sm:text-3xl text-purple-300 font-bold">Welcome to</p>
//               <h1 className="mt-1 text-5xl sm:text-6xl font-extrabold tracking-tight text-purple-200">
//                 SPORTBIT
//               </h1>
//               <p className="mt-4 text-neutral-300">
//                 Your team your Data, Your performance engine
//               </p>

//               <div className="mt-8 flex items-center justify-center">
//                 <img
//                   className="w-48 sm:w-56 drop-shadow-xl rounded-xl"
//                   src="https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=1200&auto=format&fit=crop"
//                   alt="Football"
//                 />
//               </div>

//               <div className="mt-8 rounded-xl bg-amber-900/30 p-4 ring-1 ring-amber-400/20">
//                 <p className="text-amber-100/90">
//                   Sportbit is not just software — it’s your digital coach, planner, and manager.
//                 </p>
//                 <p className="mt-2 text-amber-100/80 text-sm">
//                   We help you organize, optimise, and elevate everything — from training drills to
//                   match stats, from health tracking to team communication.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* System label + Player card */}
//           <div className="col-span-12 md:col-span-6 lg:col-span-4 flex flex-col gap-4 min-h-0">
//             <div className="rounded-2xl bg-amber-200 text-black px-5 py-3 font-medium shadow-inner">
//               Sports Management System
//             </div>

//             <div className="rounded-2xl bg-amber-200/90 text-black p-6 ring-1 ring-black/10">
//               <h3 className="text-3xl font-bold">Player</h3>
//               <p className="mt-1 text-lg font-medium">Services</p>
//               <p className="mt-4 leading-relaxed">
//                 Showcase skill, apply to clubs, and grow your career with{" "}
//                 <span className="font-semibold">AI technology</span>.
//               </p>

//               {/* Follow Us */}
//               <div className="mt-6 rounded-xl bg-amber-100 p-4 ring-1 ring-black/10">
//                 <p className="font-semibold">Follow us on</p>
//                 <div className="mt-3 flex items-center gap-3">
//                   <a className="inline-flex size-10 items-center justify-center rounded-full bg-black/80 text-white">
//                     <Facebook size={18} />
//                   </a>
//                   <a className="inline-flex size-10 items-center justify-center rounded-full bg-black/80 text-white">
//                     <Instagram size={18} />
//                   </a>
//                   <a className="inline-flex size-10 items-center justify-center rounded-full bg-black/80 text-white">
//                     <Globe size={18} />
//                   </a>
//                   <a className="inline-flex size-10 items-center justify-center rounded-full bg-black/80 text-white">
//                     <Linkedin size={18} />
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Manager & Club */}
//           <div className="col-span-12 lg:col-span-3 flex flex-col gap-4 min-h-0">
//             <Bg
//               className="min-h-[260px] p-6"
//               src="https://images.unsplash.com/photo-1526676037777-05a232554f38?q=80&w=1200&auto=format&fit=crop"
//             >
//               <h3 className="text-3xl font-extrabold">Manager</h3>
//               <p className="text-lg font-medium mt-1">Services</p>
//               <p className="mt-4 max-w-xs leading-relaxed text-neutral-100">
//                 Manage players, verify skills that fit your team, and handle finance & training.
//               </p>
//             </Bg>

//             <Bg
//               className="min-h-[260px] p-6"
//               src="https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=1200&auto=format&fit=crop"
//             >
//               <h3 className="text-3xl font-extrabold">Club</h3>
//               <p className="text-lg font-medium mt-1">Management Services</p>
//               <p className="mt-4 max-w-xs leading-relaxed">Manage clubs efficiently with AI tools.</p>
//               <p className="mt-2 max-w-xs leading-relaxed">AI Schedule, AI recommendation system.</p>
//             </Bg>
//           </div>

//           {/* Stats row */}
//           <div className="col-span-12 grid grid-cols-12 gap-4 min-h-0">
//             <div className="col-span-12 sm:col-span-4 rounded-2xl bg-emerald-700 p-6">
//               <p className="text-4xl font-extrabold">10k</p>
//               <p className="text-emerald-50/90">Users</p>
//             </div>
//             <div className="col-span-12 sm:col-span-4 rounded-2xl bg-green-700 p-6">
//               <p className="text-4xl font-extrabold">100</p>
//               <p className="text-green-50/90">Teams</p>
//             </div>
//             <div className="col-span-12 sm:col-span-4 rounded-2xl bg-lime-700 p-6">
//               <p className="text-4xl font-extrabold">1M</p>
//               <p className="text-lime-50/90">Transactions</p>
//             </div>
//           </div>

//           {/* Trusted + Careers */}
//           <div className="col-span-12 md:col-span-5">
//             <div className="rounded-2xl bg-neutral-800/60 p-6 ring-1 ring-white/10">
//               <p className="text-xl font-semibold">Trusted by Leading Sports Organisations</p>
//               <div className="mt-6 grid grid-cols-3 gap-4 opacity-90">
//                 <img
//                   className="h-10 object-contain"
//                   src="https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg"
//                   alt="Premier League"
//                 />
//                 <img
//                   className="h-10 object-contain"
//                   src="https://upload.wikimedia.org/wikipedia/en/0/03/Indian_Premier_League_Official_Logo.svg"
//                   alt="IPL"
//                 />
//                 <img
//                   className="h-10 object-contain"
//                   src="https://upload.wikimedia.org/wikipedia/commons/3/36/FIFA_logo_without_slogan.svg"
//                   alt="FIFA"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="col-span-12 md:col-span-7">
//             <Bg
//               className="min-h-[220px] p-6"
//               src="https://images.unsplash.com/photo-1550409174-8e55f2069c47?q=80&w=1200&auto=format&fit=crop"
//             >
//               <p className="text-3xl font-extrabold">Carreres</p>
//               <p className="mt-2 max-w-2xl text-neutral-100">
//                 Sportbit is an employee-led workplace fostering teamwork and career growth.
//               </p>
//             </Bg>
//           </div>

//           {/* Contact + Big pitch */}
//           <div className="col-span-12 lg:col-span-5">
//             <div className="rounded-2xl bg-purple-300 text-black p-6 ring-1 ring-black/10">
//               <h3 className="text-3xl font-extrabold">Contact Us</h3>
//               <div className="mt-4 space-y-3">
//                 <p className="inline-flex items-center gap-2">
//                   <Mail size={18} /> <span>sportbit@gmail.com</span>
//                 </p>
//                 <p className="inline-flex items-center gap-2">
//                   <Phone size={18} /> <span>+91 987654321</span>
//                 </p>
//                 <p>Esplanade, Kolkata</p>
//               </div>
//             </div>
//           </div>

//           <div className="col-span-12 lg:col-span-7">
//             <Bg
//               className="min-h-[260px] p-6"
//               src="https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=1600&auto=format&fit=crop"
//             >
//               <h3 className="text-3xl sm:text-4xl font-extrabold leading-tight">
//                 Simplify Sports League and Team Management with Sportbit
//               </h3>
//               <p className="mt-3 max-w-3xl text-neutral-100 leading-relaxed">
//                 Powerful software built for leagues, teams, and clubs of all sizes to manage
//                 schedules, rosters, payments, and more. Managing a league, team, or club has never
//                 been easier.
//               </p>
//             </Bg>
//           </div>
//         </div>
//         {/* GRID END */}

//         {/* Footer */}
//         <div className="mt-8 text-center text-neutral-400 text-sm">
//           © {new Date().getFullYear()} Sportbit. All rights reserved. 
//         </div>
//       </div>
//     </div>
//   );
// }






// update 
// src/pages/AboutBento.jsx
import React from "react";

const AboutBento = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#000000] text-white">
      {/* Outer padding to match the mock’s safe-areas */}
      <div className="h-full w-full p-4">
        {/* 12 x 12 Grid */}
        <div
          className="
            grid h-full w-full gap-4
            [grid-template-columns:repeat(12,1fr)]
            [grid-template-rows:repeat(12,1fr)]
          "
        >
          {/* ===================== LEFT: WELCOME / BRAND ===================== */}
          <section
            className="
              relative
              col-[1/7] row-[1/5]
              rounded-[20px]
              bg-[#00000000]
              p-4
            "
          >
            <div className="select-none">
              <p className="text-[36px] leading-tight font-semibold text-white/90">
                Welcome to
              </p>
              <h1 className="text-[56px] leading-[1.05] font-extrabold tracking-wide text-[#BFA8FF] mt-1">
                SPORTBIT
              </h1>
              <p className="mt-4 text-[18px] text-white/80">
                Your team your Data, Your performance engine
              </p>
            </div>

            {/* Ball image roughly centered under the headline, like the mock */}
            <img
              src="/src/assets/images/about-page/football.png"
              alt="Ball"
              className="
                pointer-events-none
                absolute
                left-1/2 -translate-x-1/2
                bottom-[-18px]
                w-[180px] h-[180px] object-contain
              "
            />
          </section>

          {/* ===================== TOP BAR: SYSTEM LABEL ===================== */}
          <div
            className="
              col-[6/13] row-[1/2]
              rounded-[18px]
              bg-[#d4b787]/90
              text-black
              flex items-center pl-6 font-semibold
            "
          >
            Sports Management System
          </div>

          {/* ===================== PLAYER SERVICES ===================== */}
          <div
            className="
              col-[6/9] row-[2/5]
              rounded-[18px]
              bg-[#d4b787]
              text-black
              p-6
              flex flex-col
              justify-between
            "
          >
            <div>
              <h3 className="text-[32px] font-extrabold">Player</h3>
              <p className="text-[18px] font-semibold mt-1">Services</p>
            </div>

            <p className="text-[20px] leading-6 mt-2">
              Showcase Skill, Apply
              <br /> to clubs, grow career
              <br /> with <b>AI technology</b>
            </p>
          </div>

          {/* ===================== MANAGER SERVICES (image + gradient) ===================== */}
          <div
            className="
              relative
              col-[9/11] row-[2/5]
              rounded-[18px]
              overflow-hidden
            "
          >
            <img
              src="/src/assets/images/manager.jpg"
              alt="Manager"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#7b3b28]/50 via-[#7b3b28]/60 to-[#3a160f]/80" />
            <div className="relative p-6">
              <h3 className="text-[34px] font-extrabold">Manager</h3>
              <p className="text-[18px] font-semibold mt-1">Services</p>

              <div className="mt-6 text-[20px] leading-6">
                Manage Players,
                <br />
                veryfy skills
                <br />
                which absolutely
                <br />
                fits your team,
              </div>

              <div className="mt-6 text-[20px] leading-6">
                manage finance,
                <br />
                training.
              </div>
            </div>
          </div>

          {/* ===================== CLUB SERVICES (image + gradient) ===================== */}
          <div
            className="
              relative
              col-[11/13] row-[2/5]
              rounded-[18px]
              overflow-hidden
            "
          >
            <img
              src="/src/assets/images/club.jpg"
              alt="Club"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#c5a33a]/50 via-[#a37f12]/65 to-[#3e3105]/85" />
            <div className="relative p-6">
              <h3 className="text-[38px] font-extrabold">Club</h3>
              <p className="text-[18px] font-semibold -mt-1">
                Management Services
              </p>

              <div className="mt-5 text-[20px] leading-6">
                Manage clubs
                <br />
                efficiently with AI
                <br />
                tools,
              </div>

              <div className="mt-5 text-[20px] leading-6">
                AI Schedule,
                <br />
                AI recomendation
                <br />
                System
              </div>
            </div>
          </div>

          {/* ===================== LEFT: BIG COPY CARD ===================== */}
          <div
            className="
              col-[1/6] row-[5/8]
              rounded-[18px]
              bg-[#bf9b6e]/90 text-black
              p-6
              flex flex-col justify-between
            "
          >
            <div className="text-[22px] leading-7 font-semibold">
              Sportbit is not just software -- it’s your
              <br />
              digital coach, planner, and manager.
            </div>

            <p className="text-[18px] leading-7 mt-4">
              We help you organize, optimise, and elevate
              <br />
              everything -- from training drills to match stats, from
              <br />
              health tracking to team communication.
            </p>
          </div>

          {/* ===================== FOLLOW US + TENNIS ===================== */}
          <div
            className="
              col-[6/9] row-[5/7]
              rounded-[18px]
              bg-[#d4b787]
              text-black
              p-5
            "
          >
            <div className="text-[22px] font-semibold">Follow us on</div>

            <div className="flex items-center gap-5 mt-4">
              <div className="flex flex-col gap-4 text-[22px]">
                <span>•</span>
                <span>•</span>
                <span>•</span>
              </div>
              <div className="relative h-[140px] w-full rounded-[12px] overflow-hidden">
                <img
                  src="/src/assets/images/tennis.jpg"
                  alt="Tennis court"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/15" />
              </div>
            </div>
          </div>

          {/* ===================== RUNNERS ===================== */}
          <div
            className="
              relative
              col-[6/8] row-[7/9]
              rounded-[18px]
              overflow-hidden
            "
          >
            <img
              src="/src/assets/images/runners.jpg"
              alt="Runners"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[#d4b787]/35" />
          </div>

          {/* ===================== LARGE STADIUM HERO ===================== */}
          <div
            className="
              relative
              col-[8/13] row-[7/13]
              rounded-[18px]
              overflow-hidden
              p-6
              flex flex-col justify-end
            "
          >
            <img
              src="/src/assets/images/stadium.jpg"
              alt="Stadium"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

            <div className="relative z-10">
              <h3 className="text-[32px] font-extrabold leading-tight">
                Simplify Sports League and Team
                <br />
                Management with Sportbit
              </h3>

              <p className="mt-4 text-[18px] leading-7 max-w-[860px]">
                Powerful software built for leagues,{" "}
                <u>teams</u>, and clubs
                <br />
                of all sizes to manage <u>schedules</u>, rosters, payments,
                <br />
                and more.
                <br />
                Managing a league, team, or club has never been
                <br />
                easier.
              </p>
            </div>
          </div>

          {/* ===================== METRICS (3 small cards) ===================== */}
          <div className="col-[1/3] row-[8/9] rounded-[14px] bg-[#5ea463] text-black p-4">
            <div className="text-[32px] font-extrabold">10k</div>
            <div className="text-[16px]">Users</div>
          </div>
          <div className="col-[3/5] row-[8/9] rounded-[14px] bg-[#57a164] text-black p-4">
            <div className="text-[32px] font-extrabold">100</div>
            <div className="text-[16px]">teams</div>
          </div>
          <div className="col-[5/6] row-[8/9] rounded-[14px] bg-[#3f8c57] text-black p-4">
            <div className="text-[32px] font-extrabold">1M</div>
            <div className="text-[16px]">transactions</div>
          </div>

          {/* ===================== TRUSTED BY ORGS ===================== */}
          <div
            className="
              col-[1/3] row-[9/11]
              rounded-[18px]
              bg-[#d1c7b4]
              text-black p-6
              flex flex-col justify-between
            "
          >
            <div>
              <h4 className="text-[22px] font-extrabold">Trusted by</h4>
              <p className="text-[18px] mt-2">Leading Sports Organisations</p>
            </div>
            <div className="opacity-80 text-[14px]">Premier League • IPL • FIFA</div>
          </div>

          {/* ===================== CAREERS (image) ===================== */}
          <div
            className="
              relative
              col-[3/6] row-[9/11]
              rounded-[18px] overflow-hidden
              text-white
            "
          >
            <img
              src="/src/assets/images/careers.jpg"
              alt="Careers"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative p-6">
              <h4 className="text-[28px] font-extrabold">Carreres</h4>
              <p className="text-[16px] mt-2 leading-6 max-w-[420px]">
                Sportbit is an employee-led workplace <br />
                fostering teamwork, and career growth
              </p>
            </div>
          </div>

          {/* ===================== CONTACT US ===================== */}
          <div
            className="
              col-[1/3] row-[11/13]
              rounded-[18px]
              bg-[#7e5cd6]
              p-6
              flex flex-col justify-between
            "
          >
            <div>
              <h4 className="text-[28px] font-extrabold">Contact Us</h4>
              <div className="mt-4 text-[16px] leading-7">
                sportbit@gmail.com
                <br />
                +91 987654321
                <br />
                Esplanade, Kolkata
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutBento;
