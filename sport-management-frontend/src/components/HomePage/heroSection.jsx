// src/components/Hero.jsx
import { useEffect, useRef, useState, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function AuraBackground() {
  return (
    <>
      {/* soft animated blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-20 h-[40rem] w-[40rem] rounded-full blur-3xl opacity-40 dark:opacity-30 bg-gradient-to-tr from-fuchsia-500 via-indigo-500 to-cyan-500 animate-aura-slow" />
        <div className="absolute -bottom-24 -right-20 h-[38rem] w-[38rem] rounded-full blur-3xl opacity-30 dark:opacity-20 bg-gradient-to-tr from-emerald-400 via-teal-500 to-sky-500 animate-aura-fast" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[32rem] w-[32rem] rounded-full mix-blend-overlay blur-3xl opacity-25 dark:opacity-20 bg-gradient-to-tr from-purple-400 via-pink-500 to-amber-400 animate-aura-pulse" />
      </div>

      {/* subtle noise for texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] dark:opacity-[0.07] mix-blend-soft-light [background-image:url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'160\\' height=\\'160\\'><filter id=\\'n\\'><feTurbulence baseFrequency=\\'0.8\\' numOctaves=\\'2\\'/></filter><rect width=\\'100%\\' height=\\'100%\\' filter=\\'url(%23n)\\'/></svg>')]" />
    </>
  );
}

function TorusThing({ mouse }) {
  const ref = useRef();
  // damped mouse response
  useFrame((state, delta) => {
    const x = mouse.current.x;
    const y = mouse.current.y;
    ref.current.rotation.x += (y * 0.8 - ref.current.rotation.x) * 2.5 * delta;
    ref.current.rotation.y += (x * 1.2 - ref.current.rotation.y) * 2.5 * delta;
    ref.current.position.z = -0.6 + Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
  });

  const material = useMemo(
    () => (
      <meshStandardMaterial metalness={0.7} roughness={0.15} envMapIntensity={1.2} />
    ),
    []
  );

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <torusKnotGeometry args={[1.2, 0.38, 220, 18]} />
      {material}
    </mesh>
  );
}

function ThreeScene({ mouse }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4.8], fov: 42 }}
      className="h-full w-full"
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 5, 3]} intensity={1.2} castShadow />
      <pointLight position={[-5, -2, -3]} intensity={0.6} />
      <Suspense fallback={null}>
        <TorusThing mouse={mouse} />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Cursor spotlight interaction
  const onMouseMove = (e) => {
    const bounds = ref.current.getBoundingClientRect();
    const x = (e.clientX - bounds.left) / bounds.width;
    const y = (e.clientY - bounds.top) / bounds.height;
    // store for 3D
    mouse.current.x = (x - 0.5) * 2; // -1..1
    mouse.current.y = (y - 0.5) * 2;
    // CSS variables for spotlight
    ref.current.style.setProperty("--mx", `${e.clientX - bounds.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - bounds.top}px`);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      className="relative overflow-hidden min-h-[92vh] sm:min-h-screen isolate bg-white dark:bg-[#0b0b0f] transition-colors"
    >
      {/* Spotlight that follows cursor */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(180px 180px at var(--mx) var(--my), rgba(99,102,241,0.18), rgba(56,189,248,0.12) 40%, transparent 60%)",
          mixBlendMode: "screen",
        }}
      />
      {/* Dark mode spotlight */}
      <div
        className="pointer-events-none absolute inset-0 hidden dark:block"
        style={{
          background:
            "radial-gradient(220px 220px at var(--mx) var(--my), rgba(56,189,248,0.07), rgba(168,85,247,0.08) 40%, transparent 60%)",
          mixBlendMode: "lighten",
        }}
      />

      <AuraBackground />

      <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-16 sm:pt-36 lg:pt-40 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: text + CTAs */}
        <div className="lg:col-span-6 flex flex-col items-start justify-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
            <span className="bg-gradient-to-br from-indigo-600 via-fuchsia-600 to-rose-500 dark:from-indigo-300 dark:via-fuchsia-300 dark:to-rose-300 bg-clip-text text-transparent hover:opacity-90 transition">
              SportBit
            </span>
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 dark:from-emerald-300 dark:via-teal-300 dark:to-sky-300 bg-clip-text text-transparent">
                Manage. Analyze. Win.
              </span>
              {/* underline glow */}
              <span className="absolute left-0 right-0 -bottom-2 h-[10px] blur-lg bg-gradient-to-r from-emerald-400/40 via-teal-400/40 to-cyan-400/40 rounded-full" />
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base sm:text-lg leading-7 text-gray-700 dark:text-gray-300">
            All‑in‑one platform for clubs, managers, coaches, and players—team ops, performance
            analytics, and training workflows in one sleek dashboard.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#get-started"
              className="group relative inline-flex items-center gap-2 rounded-xl px-6 py-3 text-white 
                         bg-gradient-to-r from-indigo-600 to-fuchsia-600 
                         dark:from-indigo-500 dark:to-fuchsia-500
                         shadow-lg shadow-fuchsia-500/20 hover:shadow-fuchsia-500/40
                         transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span className="absolute inset-0 rounded-xl ring-1 ring-white/20 opacity-0 group-hover:opacity-100 transition" />
              <svg
                className="h-5 w-5 opacity-90 group-hover:rotate-6 transition"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M13 5l7 7-7 7M5 12h14" />
              </svg>
              Get Started
            </a>

            <a
              href="#live-demo"
              className="group relative inline-flex items-center gap-2 rounded-xl px-6 py-3 
                         text-indigo-700 dark:text-indigo-200
                         border border-indigo-300/60 dark:border-indigo-400/30 
                         bg-white/60 dark:bg-white/5 backdrop-blur
                         hover:bg-white/80 dark:hover:bg-white/10
                         transition-colors"
            >
              <span className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
              <svg
                className="h-5 w-5 opacity-80 group-hover:scale-110 transition"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 7v10m5-5H7" />
              </svg>
              Live Demo
            </a>
          </div>
        </div>

        {/* Right: 3D Canvas */}
        <div className="lg:col-span-6 h-[38vh] sm:h-[48vh] lg:h-[62vh] rounded-2xl overflow-hidden relative border border-black/5 dark:border-white/10 bg-gradient-to-b from-white/40 to-white/10 dark:from-white/[0.04] dark:to-white/[0.02] backdrop-blur">
          {/* subtle label */}
          <div className="absolute z-10 top-3 left-3 text-xs px-2 py-1 rounded-md bg-white/60 dark:bg-white/10 text-gray-700 dark:text-gray-200 border border-black/5 dark:border-white/10">
            Interactive Model
          </div>
          {mounted && <ThreeScene mouse={mouse} />}
        </div>
      </div>

      {/* local styles for animations */}
      <style>{`
        @keyframes aura-slow {
          0%, 100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(20px,-30px,0) scale(1.05); }
        }
        @keyframes aura-fast {
          0%, 100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(-30px,20px,0) scale(1.08); }
        }
        @keyframes aura-pulse {
          0%, 100% { opacity: .25; }
          50% { opacity: .4; }
        }
        .animate-aura-slow { animation: aura-slow 14s ease-in-out infinite; }
        .animate-aura-fast { animation: aura-fast 11s ease-in-out infinite; }
        .animate-aura-pulse { animation: aura-pulse 6s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
