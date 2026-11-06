"use client";

import { useEffect, useRef } from "react";
import { useInView } from "./useInView";

const format = (n: number, decimals: number) =>
  n.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

export default function CountUp({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1600,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const [ref, inView] = useInView<HTMLSpanElement>("0px", true);
  const text = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!inView || !text.current) return;
    const el = text.current;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      el.textContent = format(to * eased, decimals);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, decimals]);

  return (
    <span ref={ref}>
      {prefix}
      <span ref={text}>{format(to, decimals)}</span>
      {suffix}
    </span>
  );
}
