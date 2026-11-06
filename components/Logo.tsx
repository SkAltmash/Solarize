import { useId } from "react";

const LEAF = "M32 3C49 17 49 47 32 61C15 47 15 17 32 3Z";
const RAYS =
  "M10.29 22.55L7.18 24.73M8.70 17.50L4.90 17.50M10.29 12.45L7.18 10.27M14.49 9.23L13.19 5.66M19.78 9.00L20.76 5.33";

/** Solarize mark: a leaf made of solar cells, with a sun rising behind it. */
export function LogoMark({ className = "h-10 w-10", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const id = useId().replace(/:/g, "");
  const onDark = tone === "dark";
  const sun = onDark ? "#c8f08f" : "#7ed321";
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id={`g${id}`} x1="32" y1="61" x2="32" y2="3" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1f6e08" />
          <stop offset="0.6" stopColor="#2b850c" />
          <stop offset="1" stopColor="#6cc51c" />
        </linearGradient>
        <clipPath id={`l${id}`}>
          <path d={LEAF} />
        </clipPath>
      </defs>
      <circle cx="17.5" cy="17.5" r="5.6" fill={sun} />
      <path d={RAYS} stroke={sun} strokeWidth="2.8" strokeLinecap="round" />
      <g transform="translate(4.5 4.5) rotate(45 32 32) scale(0.98) translate(0.65 0.65)">
        <path d={LEAF} fill={onDark ? "#7ed321" : `url(#g${id})`} />
        <g clipPath={`url(#l${id})`} stroke={onDark ? "#0f2e0a" : "#fff"} fill="none">
          <path d="M32 3V61" strokeWidth="2.6" />
          <path d="M23 0V64M41 0V64M0 17H64M0 32H64M0 47H64" strokeWidth="1.8" strokeOpacity="0.75" />
        </g>
      </g>
    </svg>
  );
}

/** Mark + wordmark lockup. */
export default function Logo({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  const onDark = tone === "dark";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark tone={tone} className="h-10 w-10 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.35rem] font-extrabold tracking-tight ${onDark ? "text-white" : "text-text"}`}>
          Solarize<span className="text-brand-bright">.</span>
        </span>
        <span className={`mt-1 text-[0.6rem] font-bold tracking-[0.42em] ${onDark ? "text-brand-bright" : "text-brand"}`}>ENERGY</span>
      </span>
    </span>
  );
}
