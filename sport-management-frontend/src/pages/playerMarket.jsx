// MarketPlace.jsx
import React from "react";

export default function MarketPlace() {
  return (
    <div className="min-h-screen w-full bg-[#F1E9F8] text-slate-900">
      {/* Page container */}
      <div className="mx-auto max-w-[1200px] px-4 py-6 md:py-8">

        {/* Top bar: logo pill + categories */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Logo pill */}
          <div className="inline-flex items-center gap-3 rounded-[16px] bg-gradient-to-r from-[#CDA7F0] to-[#9F7CC6] px-5 py-4 shadow-sm">
            <div>
              <div className="text-[24px] font-extrabold tracking-tight text-white leading-6">
                SPORTBIT
              </div>
              <div className="text-[13px] text-white/90 -mt-0.5">
                Player Market
              </div>
            </div>
          </div>

          {/* Category tabs */}
          <nav className="flex flex-wrap items-center gap-6 rounded-[14px] bg-white/70 px-4 py-3 backdrop-blur">
            {[
              { label: "Football", active: true },
              { label: "Cricket" },
              { label: "Hockey" },
              { label: "Rugby" },
              { label: "Olympics" },
              { label: "Others" },
            ].map((t) => (
              <button
                key={t.label}
                className={`relative text-sm font-medium ${
                  t.active ? "text-[#4B2E83]" : "text-slate-600 hover:text-slate-800"
                }`}
              >
                {t.label}
                <span
                  className={`absolute -bottom-2 left-0 h-[3px] rounded-full ${
                    t.active ? "w-14 bg-[#A88CEB]" : "w-10 bg-slate-300"
                  }`}
                />
              </button>
            ))}
            <div className="ml-auto hidden md:block">
              <button className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white shadow ring-1 ring-black/5">
                <span className="block h-2 w-2 rounded-full bg-[#A88CEB]" />
              </button>
            </div>
          </nav>
        </div>

        {/* Hero grid */}
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Cricketers",
              img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1600&auto=format&fit=crop",
              tint: "from-[#7E4EB8]/60 to-[#7E4EB8]/20",
            },
            {
              title: "Footballers",
              img: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=1600&auto=format&fit=crop",
              tint: "from-[#B4493A]/60 to-[#B4493A]/20",
            },
            {
              title: "Hockey Players",
              img: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?q=80&w=1600&auto=format&fit=crop",
              tint: "from-[#53B04A]/60 to-[#53B04A]/20",
            },
            {
              title: "Rugby Players",
              img: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1600&auto=format&fit=crop",
              tint: "from-[#2C7BE5]/60 to-[#2C7BE5]/20",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="group relative h-[190px] overflow-hidden rounded-[16px] ring-1 ring-black/10"
            >
              <img
                src={card.img}
                alt={card.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-b ${card.tint}`}
              />
              <div className="absolute bottom-4 left-4">
                <div className="text-2xl font-extrabold text-white drop-shadow">
                  {card.title}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trending players */}
        <section className="relative mt-8 rounded-[18px] bg-white/70 p-4 md:p-5">
          <h3 className="mb-4 text-lg font-semibold text-slate-800">
            Trending players
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="relative flex h-[180px] flex-col justify-end overflow-hidden rounded-[16px] bg-slate-300/80 ring-1 ring-black/10"
              >
                <div className="p-3">
                  <div className="text-white drop-shadow text-[18px] font-semibold">{`Player ${i}`}</div>
                  <div className="text-[13px] text-white/90 drop-shadow">
                    information
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* right-edge gradient fade (like the reference) */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 rounded-r-[18px] bg-gradient-to-l from-black/15 to-transparent" />
        </section>

        {/* Top rated players */}
        <section className="relative mt-6 rounded-[18px] bg-white/70 p-4 md:p-5">
          <h3 className="mb-4 text-lg font-semibold text-slate-800">
            Top rated players
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="relative flex h-[180px] flex-col justify-end overflow-hidden rounded-[16px] bg-slate-300/80 ring-1 ring-black/10"
              >
                <div className="p-3">
                  <div className="text-white drop-shadow text-[18px] font-semibold">{`Player ${i}`}</div>
                  <div className="text-[13px] text-white/90 drop-shadow">
                    information
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* right-edge gradient fade */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 rounded-r-[18px] bg-gradient-to-l from-black/15 to-transparent" />
        </section>
      </div>
    </div>
  );
}
