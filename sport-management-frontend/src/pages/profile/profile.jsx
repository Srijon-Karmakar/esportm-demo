

import React from "react";

export default function PlayerProfile() {
  return (
    // <div className="min-h-screen w-full bg-white text-gray-900">
    <div className=" w-screen bg-white text-gray-900">


      <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-16">
        {/* Banner */}
        <div className="relative mt-4">
          <div className="h-48 sm:h-56 w-full rounded-2xl bg-[#9B74BE]"></div>

          {/* Avatar */}
          <div className="absolute left-1/2 -bottom-16 -translate-x-1/2">
            <div className="h-40 w-40 rounded-full bg-gray-300 ring-8 ring-white" />
          </div>
        </div>

        {/* Name + Follow */}
        <div className="mt-20 flex items-center justify-center gap-4">
          <h1 className="text-xl sm:text-2xl font-medium">Srijon Karmakar</h1>
          <button
            className="ml-2 rounded-full bg-[#9B74BE] px-5 py-1.5 text-white text-sm font-semibold shadow-[0_8px_18px_rgba(155,116,190,0.45)] hover:brightness-[1.05] active:translate-y-[1px]"
            type="button"
          >
            Follow+
          </button>
        </div>

        {/* Counts */}
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
          <div className="text-gray-500">Player</div>
          <div className="mt-1">
            <span className="text-gray-600">Club: </span>
            <a
              href="#"
              className="text-[#7a56a3] hover:underline"
            >
              Kolkata United FC
            </a>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* About */}
          <section className="rounded-2xl bg-gray-100 p-6">
            <h2 className="mb-4 text-xl font-semibold">About</h2>
            <div className="space-y-1 text-[15px] leading-6">
              <p>Hello, I am srijon karmakar. a professional</p>
              <p>footballer</p>
              <p className="flex items-center gap-2">
                <span className="text-red-500">📍</span> Kolkata
              </p>
              <p className="flex items-center gap-2">
                <span className="text-red-500">📍</span> www.xyz.com
              </p>
              <p className="flex items-center gap-2">
                <span className="text-red-500">📍</span> srijon@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <span className="text-red-500">📍</span> wb- 700001
              </p>
            </div>
          </section>

          {/* Club History */}
          <section className="rounded-2xl bg-gray-100 p-6">
            <h2 className="mb-4 text-xl font-semibold">Club History</h2>
            <div className="space-y-3 text-[15px] leading-6">
              <p>Hello, 2011 - mohunbagan</p>
              <p>2002-2010 - Eastbengal</p>
              <p>2010-Present - Kolkata United</p>
            </div>
          </section>

          {/* Stats */}
          <section className="rounded-2xl bg-gray-100 p-6">
            <h2 className="mb-4 text-xl font-semibold">Stats</h2>
            <ul className="space-y-3 text-[15px] leading-6">
              <li>Goals- 209</li>
              <li>Matches- 1098</li>
              <li>Red card- 20</li>
              <li>Yellow card- 135</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}


















