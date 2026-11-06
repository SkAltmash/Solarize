"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import Preloader from "./Preloader";
import SceneBoundary from "./SceneBoundary";
import Icon from "./Icon";
import { useInView } from "./useInView";
import { useScrollProgress } from "./useScrollProgress";
import { pointer, story } from "./scroll-store";

const StoryScene = dynamic(() => import("./three/StoryScene"), { ssr: false });

const STEPS = 4;
const smooth = (e0: number, e1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-brand">{children}</p>;
}

export default function ScrollStory() {
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const overlay = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const [viewRef, inView] = useInView<HTMLDivElement>("0px");

  const sectionRef = useScrollProgress<HTMLElement>((p) => {
    story.p = p;
    const s = p * (STEPS - 1);
    overlay.current?.querySelectorAll<HTMLElement>("[data-step]").forEach((el, i) => {
      const o = 1 - smooth(0.22, 0.42, Math.abs(s - i));
      el.style.opacity = String(o);
      el.style.transform = `translate3d(0, ${(i - s) * 40}px, 0)`;
      el.style.pointerEvents = o > 0.5 ? "auto" : "none";
      el.setAttribute("aria-hidden", o > 0.5 ? "false" : "true");
    });
    rail.current?.querySelectorAll<HTMLElement>("span").forEach((d, i) => {
      d.style.transform = `scaleY(${Math.abs(s - i) < 0.5 ? 1 : 0.35})`;
    });
  });

  // Never trap the visitor behind the loader (slow GPU, WebGL disabled, etc.).
  useEffect(() => {
    const t = window.setTimeout(onReady, 9000);
    return () => window.clearTimeout(t);
  }, [onReady]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const step = (i: number) => ({
    "data-step": i,
    style: { opacity: i === 0 ? 1 : 0, pointerEvents: i === 0 ? "auto" : "none" } as React.CSSProperties,
  });

  // Desktop: text alternates sides while the panel moves opposite. Phone: text docks at the bottom.
  const base =
    "absolute inset-x-0 bottom-0 px-5 pb-10 pt-24 bg-gradient-to-t from-bg via-bg/95 to-transparent will-change-transform lg:inset-x-auto lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:bg-none lg:p-0 lg:pt-0";

  return (
    <section ref={sectionRef} id="top" className="relative h-[400vh]">
      <Preloader ready={ready} />
      <div ref={viewRef} className="sticky top-0 h-dvh overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_70%_45%,rgba(126,211,33,0.16),transparent_70%),radial-gradient(ellipse_50%_40%_at_15%_85%,rgba(43,133,12,0.08),transparent_70%)]" />
        <div className="dots-bg absolute inset-0" />

        <div className="absolute inset-0">
          <SceneBoundary onError={onReady}>
            <StoryScene active={inView} onReady={onReady} />
          </SceneBoundary>
        </div>

        <div ref={overlay} className="pointer-events-none absolute inset-0 mx-auto max-w-7xl">
          {/* 0 — hero */}
          <div {...step(0)} className={`${base} lg:left-6 lg:w-[min(38rem,46vw)]`}>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-3 py-1.5 text-xs font-semibold text-muted backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-bright opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              Since 2016 · 1,250+ rooftops across Vidarbha
            </p>
            <h1 className="font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl xl:text-7xl">
              Clean power for <span className="text-gradient">every Nagpur roof.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base text-muted sm:text-lg">
              Premium rooftop solar for homes, businesses and farms. Design, installation, subsidy and net metering, handled end to end.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#savings"
                className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 font-bold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-deep"
              >
                Calculate savings
                <Icon name="arrow" className="h-5 w-5 transition group-hover:translate-x-1" />
              </a>
              <a href="#contact" className="inline-flex items-center rounded-full border border-line bg-white px-6 py-3.5 font-semibold transition hover:border-brand hover:text-brand">
                Free site survey
              </a>
            </div>
            <p className="mt-10 hidden items-center gap-3 text-sm text-muted lg:flex">
              <span className="relative h-9 w-5 rounded-full border-2 border-muted/40">
                <span className="absolute left-1/2 top-1.5 h-2 w-1 -translate-x-1/2 animate-bounce rounded-full bg-brand" />
              </span>
              Scroll to look inside a panel
            </p>
          </div>

          {/* 1 — frame */}
          <div {...step(1)} className={`${base} lg:right-6 lg:w-[min(32rem,40vw)]`}>
            <Eyebrow>Engineered for Vidarbha heat</Eyebrow>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">Built to survive 47°C summers.</h2>
            <p className="mt-4 text-muted sm:text-lg">
              Anodised aluminium frames, 3.2 mm tempered glass and low temperature-coefficient cells keep output high through May.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Tier-1 modules", "5400 Pa snow/wind load", "IP68 junction box"].map((t) => (
                <span key={t} className="rounded-full bg-brand-soft px-3 py-1.5 text-sm font-semibold text-brand-deep">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* 2 — layers */}
          <div {...step(2)} className={`${base} lg:left-6 lg:w-[min(30rem,38vw)]`}>
            <Eyebrow>Inside the module</Eyebrow>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              Seven layers. <span className="text-gradient">25 years</span> of output.
            </h2>
            <p className="mt-4 text-muted sm:text-lg">
              Every layer is laminated under heat and vacuum, so moisture, dust and UV stay out and your panels keep performing for decades.
            </p>
          </div>

          {/* 3 — array */}
          <div
            {...step(3)}
            className="absolute inset-x-0 bottom-0 px-5 pb-10 pt-24 text-center bg-gradient-to-t from-bg via-bg/95 to-transparent lg:bottom-auto lg:top-28 lg:bg-none lg:p-0"
          >
            <Eyebrow>Designed for your roof</Eyebrow>
            <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              From one panel to <span className="text-gradient">a bill-free home.</span>
            </h2>
            <a
              href="#savings"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-bold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-deep"
            >
              See what you&apos;ll save <Icon name="arrow" className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div ref={rail} className="absolute right-5 top-1/2 hidden -translate-y-1/2 flex-col gap-2 lg:flex" aria-hidden>
          {Array.from({ length: STEPS }, (_, i) => (
            <span
              key={i}
              className="h-8 w-1 origin-center rounded-full bg-brand transition-transform duration-300"
              style={{ transform: `scaleY(${i === 0 ? 1 : 0.35})` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
