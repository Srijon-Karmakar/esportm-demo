// src/lib/PageTransition.jsx
import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";

/**
 * Wraps your <Routes/> output. On every pathname change, we:
 * 1) Animate an overlay in (cover)
 * 2) Swap page
 * 3) Animate overlay out (reveal)
 */
export default function PageTransition({ children }) {
  const overlayTop = useRef(null);
  const overlayBottom = useRef(null);
  const location = useLocation();

  // create DOM overlays once
  useLayoutEffect(() => {
    const top = document.createElement("div");
    const bottom = document.createElement("div");
    top.className = "pgx-overlay pgx-overlay--top";
    bottom.className = "pgx-overlay pgx-overlay--bottom";
    document.body.appendChild(top);
    document.body.appendChild(bottom);
    overlayTop.current = top;
    overlayBottom.current = bottom;

    return () => {
      top.remove();
      bottom.remove();
    };
  }, []);

  // run animation on route change
  useLayoutEffect(() => {
    if (!overlayTop.current || !overlayBottom.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.inOut", duration: 0.6 } });

    // cover in
    tl.set([overlayTop.current, overlayBottom.current], { yPercent: 0 });
    tl.fromTo(overlayTop.current, { yPercent: -100 }, { yPercent: 0 }, 0);
    tl.fromTo(overlayBottom.current, { yPercent: 100 }, { yPercent: 0 }, 0);

    // small pause while React swaps the page content under the cover
    tl.to({}, { duration: 0.1 });

    // reveal out
    tl.to(overlayTop.current, { yPercent: -100 }, 0.1);
    tl.to(overlayBottom.current, { yPercent: 100 }, 0.1);

    return () => tl.kill();
  }, [location.pathname]);

  return children;
}
