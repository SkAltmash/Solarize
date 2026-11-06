"use client";

import { useRef } from "react";
import { useScrollProgress } from "./useScrollProgress";

const steps = [
  { title: "Free site survey", text: "We visit, check roof shading and structure, and study your last 12 months of bills." },
  { title: "Custom design & quote", text: "A clear proposal: system size, panel layout, cost, subsidy amount and payback period." },
  { title: "Installation", text: "Our certified team installs panels, inverter, earthing and safety gear in a few days." },
  { title: "Net metering & handover", text: "We file MSEDCL approvals, get the net meter live and walk you through the app." },
  { title: "Lifetime support", text: "Cleaning, health checks and service whenever you need us. We are local." },
];

export default function ProcessTimeline() {
  const fill = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLLIElement | null)[]>([]);
  const ref = useScrollProgress<HTMLOListElement>((_, el) => {
    // Progress is measured against the middle of the viewport.
    const r = el.getBoundingClientRect();
    const mid = window.innerHeight * 0.55;
    const local = Math.min(1, Math.max(0, (mid - r.top) / r.height));
    if (fill.current) fill.current.style.transform = `scaleY(${local})`;
    items.current.forEach((li) => {
      if (!li) return;
      const on = li.getBoundingClientRect().top < mid;
      li.dataset.on = on ? "true" : "false";
    });
  }, "pass");

  return (
    <ol ref={ref} className="relative ml-4 space-y-12 border-l-2 border-line pl-10 sm:ml-6 sm:pl-14">
      <div ref={fill} className="absolute -left-[2px] top-0 h-full w-[2px] origin-top scale-y-0 bg-brand" aria-hidden />
      {steps.map((s, i) => (
        <li key={s.title} ref={(li) => void (items.current[i] = li)} data-on="false" className="group relative">
          <span className="absolute -left-[3.6rem] top-0 grid h-9 w-9 place-items-center rounded-full border-2 border-line bg-bg font-display text-sm font-bold text-muted transition-all duration-500 group-data-[on=true]:border-brand group-data-[on=true]:bg-brand group-data-[on=true]:text-white sm:-left-[4.6rem]">
            {i + 1}
          </span>
          <h3 className="font-display text-xl font-bold opacity-40 transition-opacity duration-500 group-data-[on=true]:opacity-100 sm:text-2xl">{s.title}</h3>
          <p className="mt-2 max-w-md text-muted opacity-40 transition-opacity duration-500 group-data-[on=true]:opacity-100">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
