"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Icon from "./Icon";
import { site, whatsappLink } from "@/lib/site";

/** Phone-only action bar: appears after the hero, hides while the contact form is on screen. */
export default function MobileCTA() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = bar.current;
      const contact = document.getElementById("contact");
      if (!el) return;
      // On the home page wait until the 3D scroll story is finished; elsewhere, after the header.
      const story = document.getElementById("top");
      const past = story ? story.getBoundingClientRect().bottom < window.innerHeight * 0.15 : window.scrollY > window.innerHeight * 0.6;
      const r = contact?.getBoundingClientRect();
      const atContact = !!r && r.top < window.innerHeight && r.bottom > 0;
      const show = past && !atContact;
      el.style.transform = show ? "translateY(0)" : "translateY(140%)";
      el.inert = !show;
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

  const chat = whatsappLink("Hi Solarize Energy! I'd like a free solar site survey.") ?? site.instagramDm;

  return (
    <div
      ref={bar}
      className="fixed inset-x-3 bottom-3 z-40 flex items-center gap-2 rounded-full border border-line bg-white/90 p-1.5 shadow-2xl shadow-black/15 backdrop-blur-xl transition-transform duration-500 ease-out md:hidden"
      style={{ transform: "translateY(140%)", marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <Link href="/#savings" className="flex-1 rounded-full px-4 py-3 text-center text-sm font-bold text-brand-deep">
        Savings
      </Link>
      <a href={chat} target="_blank" rel="noopener noreferrer" aria-label="Chat with us" className="grid h-11 w-11 place-items-center rounded-full bg-brand-soft text-brand">
        <Icon name={site.phone ? "phone" : "insta"} className="h-5 w-5" />
      </a>
      <Link href="/#contact" className="flex-[1.4] rounded-full bg-brand px-4 py-3 text-center text-sm font-bold text-white shadow-lg shadow-brand/25">
        Free survey
      </Link>
    </div>
  );
}
