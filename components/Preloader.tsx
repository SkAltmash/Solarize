"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "./Logo";

/** Full-screen brand loader shown until the 3D hero reports it is ready. */
export default function Preloader({ ready }: { ready: boolean }) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (!ready) {
      root.style.overflow = "hidden";
      return;
    }
    root.style.overflow = "";
    const t = window.setTimeout(() => setGone(true), 900);
    return () => window.clearTimeout(t);
  }, [ready]);

  if (gone) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy={!ready}
      className={`fixed inset-0 z-[100] grid place-items-center bg-bg transition-opacity duration-700 ease-out ${ready ? "pointer-events-none opacity-0" : "opacity-100"}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_50%_45%,rgba(126,211,33,0.18),transparent_70%)]" />
      <div className={`relative flex flex-col items-center transition duration-700 ${ready ? "scale-95" : ""}`}>
        <div className="relative">
          <span className="absolute inset-0 animate-ping rounded-full bg-brand-bright/25 [animation-duration:2s]" />
          <LogoMark className="relative h-20 w-20 animate-[float_2.4s_ease-in-out_infinite]" />
        </div>
        <p className="mt-8 font-display text-2xl font-extrabold tracking-tight">
          Solarize<span className="text-brand-bright">.</span>
        </p>
        <p className="mt-1 text-sm text-muted">Preparing your solar experience…</p>
        <div className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand to-brand-bright transition-[width] ease-out"
            style={{ width: ready ? "100%" : "88%", transitionDuration: ready ? "400ms" : "4000ms" }}
          />
        </div>
        <span className="sr-only">{ready ? "Loaded" : "Loading"}</span>
      </div>
    </div>
  );
}
