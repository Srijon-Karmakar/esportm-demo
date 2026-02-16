

import React, { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Html,
  OrbitControls,
  ScrollControls,
  useGLTF,
  useAnimations,
  Environment,
  ContactShadows,
  Float,
  PresentationControls,
  useScroll,
  Sky,
  Text as DreiText,
} from "@react-three/drei";
import * as THREE from "three";

const SETTINGS = {
  toneMappingExposure: 1.0, // Scene brightness
  shadowOpacity: 0.4,
  shadowBlur: 2.2,
  enableEnv: true,
  envPreset: "sunset", // 'sunset' | 'dawn' | 'night' | 'forest' | 'apartment' | 'studio' | 'city' | 'park' | 'lobby'
  camera: { fov: 45, near: 0.1, far: 200, position: [4, 2.2, 8] },
};

// ------------------------------------------------------
// 🧩 1) Reusable Model component (local GLB with action)
// ------------------------------------------------------
function Model({ url, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0], onClick, onHover, onOut, playAnimationName }) {
  const group = useRef();
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, group);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (playAnimationName && actions && actions[playAnimationName]) {
      actions[playAnimationName].reset().fadeIn(0.4).play();
    }
    return () => {
      if (playAnimationName && actions && actions[playAnimationName]) actions[playAnimationName].fadeOut(0.2);
    };
  }, [actions, playAnimationName]);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => (document.body.style.cursor = "auto");
  }, [hovered]);

  // Slight idle float when hovered
  useFrame((state, delta) => {
    if (group.current && hovered) {
      group.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <group
      ref={group}
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={onClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        onHover && onHover();
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        onOut && onOut();
      }}
      dispose={null}
    >
      <primitive object={scene} />
    </group>
  );
}

// ------------------------------------------------------
// 🎞️ 2) Scroll-driven camera/story controller
// ------------------------------------------------------
function Chapters() {
  const scroll = useScroll();
  const rig = useRef();

  // Camera rig move through chapters based on scroll.offset (0 → 1)
  useFrame((state) => {
    const t = scroll.offset; // 0..1
    const cam = state.camera;

    // Smooth LERP across pre-defined waypoints
    const p1 = new THREE.Vector3(4, 2.2, 8);
    const p2 = new THREE.Vector3(1.8, 1.6, 3.8);
    const p3 = new THREE.Vector3(-2.2, 1.4, 3.4);

    const look1 = new THREE.Vector3(0, 1.2, 0);
    const look2 = new THREE.Vector3(0.8, 1.0, -0.2);
    const look3 = new THREE.Vector3(-0.6, 1.0, 0);

    let pos = new THREE.Vector3();
    let look = new THREE.Vector3();

    if (t < 0.45) {
      const k = THREE.MathUtils.smoothstep(t / 0.45, 0, 1);
      pos.lerpVectors(p1, p2, k);
      look.lerpVectors(look1, look2, k);
    } else {
      const k = THREE.MathUtils.smoothstep((t - 0.45) / 0.55, 0, 1);
      pos.lerpVectors(p2, p3, k);
      look.lerpVectors(look2, look3, k);
    }

    cam.position.lerp(pos, 0.08);
    cam.lookAt(look);
  });

  return (
    <group ref={rig}>
      {/* Chapter 1: Hero model */}
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        <Model url={new URL("/models/orb.glb", import.meta.url).href} scale={1.3} position={[0, 0, 0]}
          onClick={() => console.log("Hero clicked")}
          playAnimationName={"Idle"}
        />
      </Float>

      {/* Chapter 2: City/World */}
      {/* <group position={[0.2, -0.1, -1.2]}>
        <Model url={new URL("/models/football.glb", import.meta.url).href} scale={0.8}
          onHover={() => console.log("City hovered")}
        />
      </group> */}

      {/* Chapter 3: Device/Product */}
      <group position={[-0.6, -0.1, 0.4]} rotation={[0, Math.PI / 8, 0]}>
        <PresentationControls global polar={[ -0.2, 0.3 ]} azimuth={[ -0.6, 0.6 ]} config={{ mass: 1, tension: 280 }} snap={true}>
          <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
            {/* <Model url={new URL("/models/cricket_ball.glb", import.meta.url).href} scale={1.1}
              onClick={() => alert("📱 Feature unlocked!")}
              playAnimationName={"Action"}
            /> */}
          </Float>
        </PresentationControls>
      </group>

      {/* Ground & soft contact shadows */}
      <ContactShadows position={[0, -0.001, 0]} opacity={SETTINGS.shadowOpacity} blur={SETTINGS.shadowBlur} far={5} resolution={1024} />

      {/* In-scene labels (always face camera) */}
      <DreiText color="#9787F3" position={[0, 1.9, 0]} fontSize={0.24} anchorX="center" anchorY="middle">Intuitive</DreiText>
      <DreiText color="#9787F3" position={[0.6, 1.4, -1.2]} fontSize={0.22} anchorX="center" anchorY="middle">Modern</DreiText>
      <DreiText color="#9787F3" position={[-0.6, 1.2, 0.4]} fontSize={0.22} anchorX="center" anchorY="middle">Faster</DreiText>
    </group>
  );
}

// ------------------------------------------------------
// 🖥️ 3) Scene wrapper with lights & environment
// ------------------------------------------------------
function Scene() {
  // A touch of time-of-day lighting
  const dirLight = useRef();
  useFrame(({ clock }) => {
    if (dirLight.current) {
      const t = clock.elapsedTime;
      dirLight.current.position.set(Math.sin(t * 0.2) * 4, 3, Math.cos(t * 0.2) * 4);
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        ref={dirLight}
        position={[3, 3, 2]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {SETTINGS.enableEnv ? <Environment preset={SETTINGS.envPreset} background={false} /> : <Sky sunPosition={[100, 20, 100]} />}

      <Chapters />
    </>
  );
}

// ------------------------------------------------------
// 📜 4) Page chrome & scroll sections (HTML overlay)
// ------------------------------------------------------
function ChaptersOverlay() {
  // Basic overlay copy; style with Tailwind or your CSS
  return (
    <div className="pointer-events-none absolute inset-0 text-#9787F3 bg-transperent">
      <section className="pointer-events-none sticky top-24 mx-auto max-w-3xl px-6">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow text-violet-700">A Journey Through Our Product</h1>
        <p className="mt-4 max-w-xl text-black/90 drop-shadow font-semibold">Scroll to explore the story. Click, hover, and drag the orb to interact.</p>
      </section> 

      <section className="pointer-events-none h-[200vh]" />   

      <section id="blur" className="pointer-events-none sticky top-24 mx-auto max-w-3xl px-6
      bg-white/605 backdrop-blur-[5px] border-[15px] border-none">
        <h2 className="text-3xl md:text-5xl font-semibold drop-shadow">Our Vision</h2>
        <p className="mt-4 max-w-xl text-black/90 drop-shadow font-semibold">SportBit is a next-generation AI-powered sports management system built to revolutionize how players, clubs, and managers collaborate. We aim to simplify sports administration by combining intelligent automation, real-time insights, and modern design to make every interaction seamless and efficient..</p>
      </section>

      <section className="pointer-events-none h-[200vh]" />

      <section className="pointer-events-none sticky top-24 mx-auto max-w-3xl px-6
      bg-white/605 backdrop-blur-[5px] border-[15px] border-none">
        <h2 className="text-3xl md:text-5xl font-semibold drop-shadow">Intelligent & Role-Based</h2>
        <p className="mt-4 max-w-xl text-black/90 drop-shadow font-semibold">With a role-based architecture, SportBit provides tailored dashboards for players, managers, and administrators — ensuring everyone gets exactly what they need. AI-driven analytics track performance, generate insights, and assist decision-making, helping teams focus on what matters most: growth and excellence.</p>
      </section>
      <section className="h-[60vh]" />


      <section className="pointer-events-none sticky top-24 mx-auto max-w-3xl px-6
      bg-white/605 backdrop-blur-[5px] border-[15px] border-none">
        <h2 className="text-3xl md:text-5xl font-semibold drop-shadow">Modern, Intuitive & Future-Ready</h2>
        <p className="mt-4 max-w-xl text-black/90 drop-shadow font-semibold">Designed with a modern and intuitive interface, SportBit offers a smooth digital experience that feels natural to use. Its clean visuals, responsive design, and smart features make managing sports data not just efficient, but enjoyable — setting a new standard for how sports organizations operate in the digital era.</p>
      </section>
      <section className="h-[60vh]" />



      <section className="pointer-events-none sticky top-24 mx-auto max-w-3xl px-6
      bg-white/605 backdrop-blur-[5px] border-[15px] border-none">
        <h2 className="text-3xl md:text-5xl font-semibold drop-shadow">Our Mission</h2>
        <p className="mt-4 max-w-xl text-black/90 drop-shadow font-semibold">At SportBit, we’re reimagining sports management with the power of AI and modern design. Our mission is to make sports data smarter, accessible, and useful for everyone — from players to coaches to club owners.</p>
      </section>
      <section className="h-[60vh]" />



       <section className="pointer-events-none sticky top-24 mx-auto max-w-3xl px-6
      bg-white/605 backdrop-blur-[5px] border-[15px] border-none">
        <h2 className="text-3xl md:text-5xl font-semibold drop-shadow">Designed for the Future</h2>
        <p className="mt-4 max-w-xl text-black/90 drop-shadow font-semibold">With an intuitive interface and cutting-edge features, SportBit delivers a sleek, responsive, and engaging experience. It’s not just management software — it’s the future of smart, data-driven sports excellence.</p>
      </section>
      <section className="h-[60vh]" />


      <section className="pointer-events-none sticky top-24 mx-auto max-w-3xl px-6
      bg-white/605 backdrop-blur-[5px] border-[15px] border-none">
        <h2 className="text-3xl md:text-5xl font-semibold drop-shadow">A New Era of Management</h2>
        <p className="mt-4 max-w-xl text-black/90 drop-shadow font-semibold">SportBit transforms how the game is managed. With AI at its core, it connects players, coaches, and organizations through smart insights, automated workflows, and real-time analytics.</p>
      </section>
      <section className="h-[60vh]" />


      <section className="pointer-events-none sticky top-24 mx-auto max-w-3xl px-6
      bg-white/605 backdrop-blur-[5px] border-[15px] border-none">
        <h2 className="text-3xl md:text-5xl font-semibold drop-shadow">Meet Our developers</h2>
        <p className="mt-4 max-w-xl text-black/90 drop-shadow font-semibold">Developer names....</p>
      </section>
      <section className="h-[60vh]" />

      <section className="pointer-events-none sticky top-24 mx-auto max-w-3xl px-6
      bg-white/605 backdrop-blur-[5px] border-[15px] border-none">
        <h2 className="text-3xl md:text-5xl font-semibold drop-shadow">Contact Us</h2>
        <p className="mt-4 max-w-xl text-black/90 drop-shadow font-semibold">
        <span>Email</span> Sportbit@gmail.combining<br/>
        <span>Phone</span> +123 456 7890<br/>
        <span>Address</span> 123 Sports St, City, Countryq
        </p>
      </section>
      <section className="h-[60vh]" />



    </div>
  );
}

// ------------------------------------------------------
// 🧭 5) The exported page component
// ------------------------------------------------------
export default function StoryPage3D() {
  // Expose a quick way to adjust tone mapping exposure per-page without digging in Canvas
  const onCreated = (state) => {
  const renderer = state.gl;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(new THREE.Color("#EAEFFE"), 1); // ← changed
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMappingExposure = SETTINGS.toneMappingExposure;
  state.scene.background = null;
};



  return (
    // <div className="relative min-h-screen w-full 
    // bg-gradient-to-b from-[#0b1020] via-[#0c1a2f] to-[#0f1f38]
    // ">
  //   <div className="relative min-h-screen w-full"
  // style={{ backgroundColor: "#EAEFFE", color: "#9787F3"}}>
  <div
  className="fixed inset-0 m-0 p-0"
  style={{
    backgroundColor: "#EAEFFE",
    color: "#9787F3",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
  }}
>
      {/* Page header */}
      <div className="pointer-events-auto absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-6 py-4 text-white/95"
      style={{ color: "#9787F3" }}>
        <div className="text-lg font-semibold tracking-wide">About Us</div>
        <a href="/" className="rounded-xl bg-white/10 px-4 py-2 backdrop-blur hover:bg-white/20 transition">Home</a>
      </div>

      {/* Canvas */}
      <Canvas shadows camera={SETTINGS.camera} onCreated={onCreated}>
        <Suspense fallback={<Html center className="text-white">Loading…</Html>}>
          <ScrollControls pages={6} damping={0.25}>
            <Scene />
            <Html fullscreen>
              <ChaptersOverlay />
            </Html>
          </ScrollControls>
          <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI * 0.56} />
        </Suspense>
      </Canvas>

      {/* Footer CTA */}
      <div className="pointer-events-auto relative z-10 mx-auto max-w-4xl px-6 py-10 text-center text-white/90">
        <h3 className="text-2xl font-semibold">Ready to make this your own?</h3>
        <p className="mt-2">Swap the GLB paths with your local models and edit the overlay copy. You can also bind model clicks to open routes or modals.</p>
      </div>
    </div>
  );
}

// ------------------------------
// 🔌 Asset Preload (optional)
// ------------------------------
useGLTF.preload(new URL("/models/orb.glb", import.meta.url).href);
useGLTF.preload(new URL("/models/football.glb", import.meta.url).href);
useGLTF.preload(new URL("/models/cricket_ball.glb", import.meta.url).href);

















