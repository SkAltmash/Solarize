"use client";

import { useState } from "react";
import { site, whatsappLink } from "@/lib/site";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const text = [
      `Hi Solarize Energy! I'd like a free site survey.`,
      `Name: ${f.get("name")}`,
      `Phone: ${f.get("phone")}`,
      `Area: ${f.get("area")}`,
      `Type: ${f.get("type")}`,
      `Monthly bill: ${f.get("bill")}`,
    ].join("\n");
    const wa = whatsappLink(text);
    if (wa) {
      window.open(wa, "_blank", "noopener");
    } else {
      navigator.clipboard?.writeText(text).catch(() => {});
      window.open(site.instagramDm, "_blank", "noopener");
    }
    setSent(true);
  };

  const field = "w-full rounded-2xl border border-line bg-surface-2/60 px-4 py-3.5 text-sm outline-none transition placeholder:text-muted/70 focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10";

  return (
    <form onSubmit={onSubmit} className="card grid gap-4 rounded-4xl p-6 sm:grid-cols-2 sm:p-8">
      <input name="name" required placeholder="Full name" autoComplete="name" className={field} aria-label="Full name" />
      <input name="phone" required type="tel" placeholder="Phone number" autoComplete="tel" className={field} aria-label="Phone number" />
      <input name="area" placeholder="Area / locality in Nagpur" className={field} aria-label="Area" />
      <select name="type" className={field} aria-label="Property type" defaultValue="Home">
        <option>Home</option>
        <option>Housing society</option>
        <option>Shop / office</option>
        <option>Factory</option>
        <option>Farm (solar pump)</option>
      </select>
      <select name="bill" className={`${field} sm:col-span-2`} aria-label="Monthly bill" defaultValue="₹2,000 – ₹5,000">
        <option>Under ₹2,000</option>
        <option>₹2,000 – ₹5,000</option>
        <option>₹5,000 – ₹10,000</option>
        <option>Above ₹10,000</option>
      </select>
      <button
        type="submit"
        className="rounded-full bg-brand px-6 py-4 font-bold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-deep sm:col-span-2"
      >
        Book my free site survey
      </button>
      <p className="text-center text-xs text-muted sm:col-span-2" aria-live="polite">
        {sent
          ? site.phone
            ? "Opening WhatsApp with your details…"
            : "Your details are copied. Paste them into the Instagram chat that just opened."
          : "No spam. We reply within one working day."}
      </p>
    </form>
  );
}
