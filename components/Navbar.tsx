"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/#savings", label: "Savings" },
  { href: "/#faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      setScrolled(window.scrollY > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div ref={bar} className="h-[3px] origin-left scale-x-0 bg-brand" aria-hidden />
      <div className="px-4 pt-2 sm:px-6">
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full py-2 pl-2 pr-2 transition-all duration-300 ${
            scrolled || open ? "border border-line bg-white/80 shadow-lg shadow-black/5 backdrop-blur-xl" : "border border-transparent"
          }`}
        >
          <Link href="/" className="pl-2" aria-label="Solarize Energy home" onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="rounded-full px-4 py-2 text-sm font-semibold text-muted transition hover:bg-brand-soft hover:text-brand-deep">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link href="/#contact" className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-deep sm:block">
              Get a quote
            </Link>
            <button
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white md:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3 w-5">
                <span className={`absolute left-0 h-0.5 w-5 bg-text transition ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-1.5 h-0.5 w-5 bg-text transition ${open ? "opacity-0" : ""}`} />
                <span className={`absolute left-0 h-0.5 w-5 bg-text transition ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </nav>

        {open && (
          <div className="mx-auto mt-2 max-w-7xl rounded-3xl border border-line bg-white/95 p-2 shadow-xl backdrop-blur-xl md:hidden">
            {[...links, { href: "/#contact", label: "Contact" }].map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 font-semibold hover:bg-brand-soft">
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
