"use client";

import { useRef } from "react";
import { useScrollProgress } from "./useScrollProgress";

const words = ["Clean energy", "Brighter future", "Made in Nagpur", "Zero bills"];

/** Two oversized text rows that slide in opposite directions as you scroll past. */
export default function ScrollMarquee() {
  const a = useRef<HTMLDivElement>(null);
  const b = useRef<HTMLDivElement>(null);
  const ref = useScrollProgress<HTMLDivElement>((p) => {
    if (a.current) a.current.style.transform = `translate3d(${-10 - p * 30}%, 0, 0)`;
    if (b.current) b.current.style.transform = `translate3d(${-40 + p * 30}%, 0, 0)`;
  }, "pass");

  const row = (outline: boolean) =>
    Array.from({ length: 3 }).flatMap((_, k) =>
      words.map((w) => (
        <span key={w + k} className="flex items-center gap-8">
          <span className={outline ? "text-outline" : "text-brand"}>{w}</span>
          <span className="text-brand-bright">✦</span>
        </span>
      )),
    );

  return (
    <div ref={ref} className="overflow-hidden py-16 sm:py-24" aria-hidden>
      <div ref={a} className="flex w-max gap-8 whitespace-nowrap font-display text-6xl font-extrabold tracking-tight will-change-transform sm:text-8xl" style={{ transform: "translate3d(-10%,0,0)" }}>
        {row(false)}
      </div>
      <div ref={b} className="mt-2 flex w-max gap-8 whitespace-nowrap font-display text-6xl font-extrabold tracking-tight will-change-transform sm:text-8xl" style={{ transform: "translate3d(-40%,0,0)" }}>
        {row(true)}
      </div>
    </div>
  );
}
