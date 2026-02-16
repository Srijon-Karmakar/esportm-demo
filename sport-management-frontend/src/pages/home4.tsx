// EsportMHome.tsx
import React from "react";
import {
  Sparkles,
  MessageSquare,
  ShoppingBag,
  Briefcase,
  Info,
  Search as SearchIcon,
  User,
  MousePointerClick,
} from "lucide-react";

/**
 * ✅ Mobile-first, pixel-precise layout based on your screenshot.
 * ✅ TailwindCSS required.
 * ✅ Replace IMAGE paths with your real assets:
 *    - /assets/esportm-player.png  (cutout football player PNG)
 */
const cn = (...a: Array<string | false | null | undefined>) => a.filter(Boolean).join(" ");

export default function EsportMHome() {
  return (
    <div className="min-h-dvh w-full bg-[#E7E7FF]">
      {/* Page padding */}
      <div className="mx-auto w-full max-w-[1400px] px-4 py-4 sm:px-6 sm:py-6 lg:px-10 lg:py-8">
        {/* Desktop: 3 columns (left rail, hero, right stack) */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[92px_1fr_420px] lg:gap-6">
          {/* ============== LEFT RAIL ============== */}
          <aside className="order-2 lg:order-1">
            <div className="flex gap-4 lg:flex-col lg:items-center lg:gap-6">
              {/* Black vertical nav */}
              <div
                className={cn(
                  "w-full rounded-[44px] bg-black text-white shadow-[0_18px_40px_rgba(0,0,0,0.25)]",
                  "lg:w-[86px]"
                )}
              >
                <div className="flex items-center justify-between px-6 py-4 lg:flex-col lg:justify-start lg:px-0 lg:py-5">
                  {/* top icon */}
                  <IconPill icon={<Sparkles className="h-6 w-6" />} />
                  {/* middle icons */}
                  <div className="flex items-center gap-6 lg:mt-10 lg:flex-col lg:gap-8">
                    <IconPill icon={<MessageSquare className="h-6 w-6" />} />
                    <IconPill icon={<ShoppingBag className="h-6 w-6" />} />
                    <IconPill icon={<Briefcase className="h-6 w-6" />} />
                  </div>
                  {/* bottom icon */}
                  <div className="lg:mt-12">
                    <IconPill icon={<Info className="h-6 w-6" />} />
                  </div>
                </div>
              </div>

              {/* User bubble + demo bubble (bottom-left in screenshot) */}
              <div className="flex w-full items-center justify-start gap-4 lg:w-auto lg:flex-col lg:justify-center">
                <div
                  className={cn(
                    "relative rounded-[34px] bg-[#B8B7FF] p-4",
                    "shadow-[0_16px_34px_rgba(91,90,166,0.28)]",
                    "w-full max-w-[190px] lg:w-[86px] lg:max-w-none lg:rounded-[40px]"
                  )}
                >
                  <div className="flex items-center justify-between lg:flex-col lg:gap-4">
                    <div className="grid h-14 w-14 place-items-center rounded-full bg-[#E7E7FF] text-black shadow-[inset_0_0_0_2px_rgba(0,0,0,0.08)]">
                      <User className="h-6 w-6" />
                    </div>

                    <div className="grid h-14 w-14 place-items-center rounded-full bg-[#E7E7FF] text-black shadow-[inset_0_0_0_2px_rgba(0,0,0,0.08)]">
                      <div className="flex flex-col items-center leading-none">
                        <span className="text-[10px] font-extrabold tracking-wider">DEMO</span>
                        <MousePointerClick className="mt-1 h-4 w-4" />
                      </div>
                    </div>
                  </div>

                  {/* soft highlight */}
                  <div className="pointer-events-none absolute inset-0 rounded-[34px] bg-gradient-to-b from-white/25 to-transparent lg:rounded-[40px]" />
                </div>
              </div>
            </div>
          </aside>

          {/* ============== HERO CARD ============== */}
          <main className="order-1 lg:order-2">
            <div
              className={cn(
                "relative overflow-hidden rounded-[42px] bg-[#5B5AA6]",
                "shadow-[0_28px_60px_rgba(25,25,60,0.22)]",
                "min-h-[360px] sm:min-h-[420px] lg:min-h-[560px]"
              )}
            >
              {/* Title block */}
              <div className="relative z-10 px-6 pt-8 sm:px-10 sm:pt-12 lg:px-16 lg:pt-16">
                <h1
                  className={cn(
                    "text-white/90 font-[800] tracking-tight",
                    "text-[56px] leading-[0.92]",
                    "sm:text-[76px]",
                    "lg:text-[112px]"
                  )}
                >
                  EsportM
                </h1>

                <p className="mt-4 max-w-[560px] text-white/85 text-[16px] sm:text-[18px] lg:text-[20px]">
                  Electronic Sports Management <br className="hidden sm:block" />
                  system
                </p>
              </div>

              {/* Player image (left-bottom) */}
              <div className="pointer-events-none absolute left-2 bottom-0 z-10 sm:left-6 lg:left-10">
                <img
                  src="/player.png"
                  alt="Football player"
                  className={cn(
                    "h-[260px] w-auto object-contain",
                    "sm:h-[330px]",
                    "lg:h-[430px]"
                  )}
                  draggable={false}
                />
              </div>

              {/* gentle depth highlight */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-white/10" />

              {/* soft rounded border feel */}
              <div className="pointer-events-none absolute inset-0 rounded-[42px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]" />
            </div>
          </main>

          {/* ============== RIGHT STACK ============== */}
          <section className="order-3">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-6">
              {/* Top right card */}
              <div
                className={cn(
                  "relative overflow-hidden rounded-[42px] bg-[#5B5AA6]",
                  "shadow-[0_28px_60px_rgba(25,25,60,0.22)]",
                  "min-h-[240px] sm:min-h-[260px] lg:min-h-[360px]"
                )}
              >
                {/* Search pill */}
                <div className="absolute right-5 top-5 z-10">
                  <button
                    type="button"
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full bg-black/95 px-5 py-3",
                      "text-white text-sm font-semibold",
                      "shadow-[0_14px_30px_rgba(0,0,0,0.25)]",
                      "active:scale-[0.99]"
                    )}
                  >
                    <SearchIcon className="h-4 w-4" />
                    Search
                  </button>
                </div>

                {/* AI powered label bottom-left */}
                <div className="absolute bottom-6 left-7 text-white/75 text-sm font-medium">
                  AI powered
                </div>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-white/10" />
                <div className="pointer-events-none absolute inset-0 rounded-[42px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]" />
              </div>

              {/* Bottom events card */}
              <div
                className={cn(
                  "relative overflow-hidden rounded-[42px] bg-[#6A6B76]",
                  "shadow-[0_28px_60px_rgba(25,25,60,0.22)]",
                  "min-h-[180px] sm:min-h-[200px] lg:min-h-[220px]"
                )}
              >
                <div className="flex h-full items-stretch justify-between px-7 py-7">
                  <div>
                    <div className="text-white/90 text-[28px] font-extrabold leading-tight">
                      EsportM
                    </div>
                    <div className="mt-1 text-white/70 text-sm font-medium">Events</div>
                  </div>

                  {/* Ring / donut */}
                  <div className="relative grid place-items-center">
                    <div className="h-[110px] w-[110px] rounded-full bg-[#5A5A67]" />
                    <div className="absolute h-[110px] w-[110px] rounded-full ring-8 ring-[#8F86FF]/70" />
                    <div className="absolute h-[62px] w-[62px] rounded-full bg-[#6A6B76]" />
                    <div className="pointer-events-none absolute inset-0 rounded-[42px]" />
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/8 via-transparent to-black/10" />
                <div className="pointer-events-none absolute inset-0 rounded-[42px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]" />
              </div>
            </div>
          </section>
        </div>

        {/* Mobile spacing refinement */}
        <div className="h-3 sm:h-4 lg:hidden" />
      </div>
    </div>
  );
}

/* ---------- Small reusable icon style (matches screenshot vibe) ---------- */
function IconPill({ icon }: { icon: React.ReactNode }) {
  return (
    <button
      type="button"
      className={cn(
        "grid place-items-center rounded-full",
        "h-12 w-12 lg:h-12 lg:w-12",
        "text-white/95",
        "transition active:scale-[0.98]"
      )}
      aria-label="nav-item"
    >
      {icon}
    </button>
  );
}
