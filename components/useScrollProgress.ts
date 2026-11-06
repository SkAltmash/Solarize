"use client";

import { useEffect, useRef } from "react";

/**
 * Calls `onProgress` (rAF-throttled) with 0→1 as the element scrolls.
 * mode "pin": 0 when the top hits the viewport top, 1 when the bottom hits the viewport bottom.
 * mode "pass": 0 when the top enters at the bottom, 1 when the bottom leaves at the top.
 */
export function useScrollProgress<T extends HTMLElement>(onProgress: (p: number, el: T) => void, mode: "pin" | "pass" = "pin") {
  const ref = useRef<T>(null);
  const cb = useRef(onProgress);

  useEffect(() => {
    cb.current = onProgress;
  });

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = mode === "pin" ? -r.top / Math.max(1, r.height - vh) : (vh - r.top) / (r.height + vh);
      cb.current(Math.min(1, Math.max(0, p)), el);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [mode]);

  return ref;
}
