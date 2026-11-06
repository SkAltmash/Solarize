"use client";

import { useEffect, useRef } from "react";
import Icon, { type IconName } from "./Icon";

const services: { icon: IconName; title: string; text: string; tags: string[] }[] = [
  {
    icon: "home",
    title: "Residential rooftop",
    text: "On-grid systems for homes and bungalows, sized to wipe out your electricity bill.",
    tags: ["From 1 kW", "On-grid", "Subsidy eligible"],
  },
  {
    icon: "factory",
    title: "Commercial & industrial",
    text: "Rooftop and ground-mount plants for shops, schools, offices and factories.",
    tags: ["Rooftop & ground", "Fast ROI", "Tax benefits"],
  },
  {
    icon: "drop",
    title: "Solar water pumps",
    text: "Diesel-free irrigation for farms across Vidarbha, with PM-KUSUM guidance.",
    tags: ["Surface & submersible", "Zero diesel", "PM-KUSUM"],
  },
  {
    icon: "battery",
    title: "Hybrid & battery backup",
    text: "Keep fans, lights and Wi-Fi running through power cuts with smart hybrid inverters.",
    tags: ["Battery backup", "Auto switchover", "App monitoring"],
  },
  {
    icon: "file",
    title: "Subsidy & net metering",
    text: "PM Surya Ghar registration, MSEDCL approvals and net-meter installation, all handled.",
    tags: ["PM Surya Ghar", "MSEDCL", "Net meter"],
  },
  {
    icon: "wrench",
    title: "Care & maintenance",
    text: "Cleaning, health checks and performance monitoring so output stays high for decades.",
    tags: ["Panel cleaning", "Health checks", "AMC plans"],
  },
];

function Heading({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-brand">What we do</p>
      <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
        Solar for <span className="text-gradient">every roof</span> in Vidarbha.
      </h2>
      <p className="mt-5 text-lg text-muted">From a 2 kW home system to a factory rooftop plant, engineered for maximum output.</p>
    </div>
  );
}

/** Desktop: vertical scroll drives a horizontal track. Mobile: swipeable snap carousel. */
export default function HorizontalServices() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    let raf = 0;
    const setProgress = (p: number) => {
      if (bar.current) bar.current.style.transform = `scaleX(${Math.max(0.06, p)})`;
      if (counter.current) counter.current.textContent = String(Math.min(services.length, Math.floor(p * services.length) + 1)).padStart(2, "0");
    };
    const update = () => {
      const s = section.current;
      const t = track.current;
      if (!s || !t) return;
      if (mq.matches) {
        const r = s.getBoundingClientRect();
        const max = t.scrollWidth - window.innerWidth;
        const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
        t.style.transform = `translate3d(${-p * max}px, 0, 0)`;
        setProgress(p);
      } else {
        setProgress(t.scrollLeft / Math.max(1, t.scrollWidth - t.clientWidth));
      }
    };
    const layout = () => {
      const s = section.current;
      const t = track.current;
      if (!s || !t) return;
      if (mq.matches) {
        s.style.height = `${t.scrollWidth - window.innerWidth + window.innerHeight}px`;
      } else {
        s.style.height = "";
        t.style.transform = "";
      }
      update();
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    const t = track.current;
    layout();
    window.addEventListener("scroll", onScroll, { passive: true });
    t?.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", layout);
    mq.addEventListener("change", layout);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      t?.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", layout);
      mq.removeEventListener("change", layout);
    };
  }, []);

  return (
    <section ref={section} id="services" className="relative">
      <div className="flex flex-col justify-center py-24 lg:sticky lg:top-0 lg:h-dvh lg:overflow-hidden lg:py-0">
        <Heading className="mb-10 px-5 sm:px-6 lg:hidden" />

        <div
          ref={track}
          className="flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-6 pt-2 [scrollbar-width:none] will-change-transform sm:gap-5 lg:w-max lg:snap-none lg:overflow-visible lg:pb-0 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pr-24 [&::-webkit-scrollbar]:hidden"
        >
          <div className="hidden w-[460px] shrink-0 flex-col justify-center pr-10 lg:flex">
            <Heading />
            <p className="mt-8 flex items-center gap-2 text-sm font-semibold text-brand">
              Keep scrolling <Icon name="arrow" className="h-4 w-4" />
            </p>
          </div>

          {services.map((s, i) => (
            <article
              key={s.title}
              className="card group relative flex w-[84vw] max-w-[360px] shrink-0 snap-start flex-col overflow-hidden rounded-4xl p-7 transition duration-500 ease-out sm:w-[380px] sm:max-w-none lg:h-[440px] lg:w-[400px] lg:p-8 lg:hover:-translate-y-2 lg:hover:border-brand/30 lg:hover:shadow-[0_30px_60px_-20px_rgb(43_133_12_/_0.35)]"
            >
              {/* green accent that sweeps in on hover */}
              <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand to-brand-bright transition-transform duration-500 group-hover:scale-x-100" />
              <span className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-brand-bright/0 blur-3xl transition-colors duration-700 group-hover:bg-brand-bright/20" />

              <div className="relative flex items-start justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-soft text-brand transition duration-500 group-hover:rotate-[-6deg] group-hover:bg-brand group-hover:text-white">
                  <Icon name={s.icon} className="h-7 w-7" />
                </span>
                <span className="font-display text-5xl font-extrabold text-surface-2 transition-colors duration-500 group-hover:text-brand-soft lg:text-6xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="relative mt-10 font-display text-2xl font-bold lg:mt-auto">{s.title}</h3>
              <p className="relative mt-3 text-muted">{s.text}</p>

              <ul className="relative mt-5 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <li key={t} className="rounded-full border border-line bg-surface-2/60 px-3 py-1 text-xs font-semibold text-text/80 transition-colors duration-500 group-hover:border-brand/20 group-hover:bg-brand-soft group-hover:text-brand-deep">
                    {t}
                  </li>
                ))}
              </ul>

              <a href="#contact" className="relative mt-6 inline-flex items-center gap-2 border-t border-line pt-5 text-sm font-bold text-brand">
                Enquire now
                <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-soft transition duration-300 group-hover:translate-x-1 group-hover:bg-brand group-hover:text-white">
                  <Icon name="arrow" className="h-3.5 w-3.5" />
                </span>
              </a>
            </article>
          ))}
          {/* keeps the last card off the edge on mobile */}
          <div className="w-1 shrink-0 lg:hidden" aria-hidden />
        </div>

        <div className="mx-5 mt-4 flex items-center gap-4 sm:mx-6 lg:mx-auto lg:mt-10 lg:w-[min(24rem,60vw)]" aria-hidden>
          <span ref={counter} className="font-display text-sm font-bold text-brand">
            01
          </span>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-line">
            <div ref={bar} className="h-full origin-left scale-x-[0.06] rounded-full bg-brand transition-transform duration-150" />
          </div>
          <span className="font-display text-sm font-bold text-muted">{String(services.length).padStart(2, "0")}</span>
          <span className="text-xs font-semibold text-muted lg:hidden">Swipe →</span>
        </div>
      </div>
    </section>
  );
}
