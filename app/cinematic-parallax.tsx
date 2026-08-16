"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function CinematicParallax({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let mouseX = 0;
    let mouseY = 0;
    let scrollProgress = 0;

    const render = () => {
      frame = 0;
      if (reduceMotion.matches) {
        root.style.setProperty("--far-x", "0px");
        root.style.setProperty("--far-y", "0px");
        root.style.setProperty("--mid-x", "0px");
        root.style.setProperty("--mid-y", "0px");
        root.style.setProperty("--near-x", "0px");
        root.style.setProperty("--near-y", "0px");
        root.style.setProperty("--content-x", "0px");
        root.style.setProperty("--content-y", "0px");
        root.style.setProperty("--scroll-far", "0px");
        root.style.setProperty("--scroll-mid", "0px");
        root.style.setProperty("--scroll-near", "0px");
        return;
      }

      root.style.setProperty("--far-x", `${mouseX * 7}px`);
      root.style.setProperty("--far-y", `${mouseY * 5}px`);
      root.style.setProperty("--mid-x", `${mouseX * 15}px`);
      root.style.setProperty("--mid-y", `${mouseY * 10}px`);
      root.style.setProperty("--near-x", `${mouseX * 26}px`);
      root.style.setProperty("--near-y", `${mouseY * 15}px`);
      root.style.setProperty("--content-x", `${mouseX * -5}px`);
      root.style.setProperty("--content-y", `${mouseY * -3}px`);
      root.style.setProperty("--scroll-far", `${scrollProgress * 16}px`);
      root.style.setProperty("--scroll-mid", `${scrollProgress * 38}px`);
      root.style.setProperty("--scroll-near", `${scrollProgress * 70}px`);
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
      schedule();
    };

    const onPointerLeave = () => {
      mouseX = 0;
      mouseY = 0;
      schedule();
    };

    const onScroll = () => {
      const heroHeight = Math.max(root.offsetHeight, 1);
      scrollProgress = Math.min(Math.max(window.scrollY / heroHeight, 0), 1);
      schedule();
    };

    const onMotionPreference = () => schedule();

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    reduceMotion.addEventListener("change", onMotionPreference);
    onScroll();
    schedule();

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      reduceMotion.removeEventListener("change", onMotionPreference);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={rootRef} className="cinematic-hero-wrap cinematic-parallax">
      {children}
    </div>
  );
}
