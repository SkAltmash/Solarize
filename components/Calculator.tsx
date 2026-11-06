"use client";

import { useState } from "react";

// Planning assumptions — edit to match current quotes.
const TARIFF = 8; // ₹ per unit, blended residential (MSEDCL)
const UNITS_PER_KW_MONTH = 120; // Nagpur averages ~4 units/kW/day
const COST_PER_KW = 55000; // ₹, installed on-grid rooftop
const CO2_PER_UNIT = 0.82; // kg, Indian grid emission factor

// PM Surya Ghar: ₹30k/kW for first 2 kW, ₹18k for the 3rd kW, capped at ₹78k.
function subsidyFor(kw: number) {
  if (kw <= 2) return 30000 * kw;
  if (kw <= 3) return 60000 + 18000 * (kw - 2);
  return 78000;
}

const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

export default function Calculator() {
  const [bill, setBill] = useState(3000);

  const units = bill / TARIFF;
  const kw = Math.min(10, Math.max(1, Math.ceil((units / UNITS_PER_KW_MONTH) * 2) / 2));
  const monthly = Math.min(units, kw * UNITS_PER_KW_MONTH) * TARIFF;
  const cost = kw * COST_PER_KW;
  const subsidy = subsidyFor(kw);
  const payback = (cost - subsidy) / (monthly * 12);
  const co2 = (kw * UNITS_PER_KW_MONTH * 12 * CO2_PER_UNIT) / 1000;

  const stats = [
    { label: "Recommended system", value: `${kw} kW` },
    { label: "Monthly savings", value: inr(monthly) },
    { label: "Govt. subsidy (est.)", value: inr(subsidy) },
    { label: "Payback period", value: `${payback.toFixed(1)} yrs` },
  ];

  return (
    <div className="card relative overflow-hidden rounded-4xl p-6 sm:p-10">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-bright/20 blur-3xl" />
      <label htmlFor="bill" className="relative text-sm font-semibold text-muted">
        Your average monthly electricity bill
      </label>
      <div className="relative mt-2 flex items-end justify-between gap-4">
        <output htmlFor="bill" className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
          {inr(bill)}
        </output>
        <span className="pb-2 text-sm text-muted">≈ {Math.round(units)} units/mo</span>
      </div>
      <input
        id="bill"
        type="range"
        min={500}
        max={20000}
        step={100}
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
        className="relative mt-6 w-full"
      />
      <div className="mt-1 flex justify-between text-xs text-muted">
        <span>₹500</span>
        <span>₹20,000</span>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.label} className={`rounded-2xl p-4 ${i === 1 ? "bg-brand text-white" : "bg-surface-2"}`}>
            <p className={`text-xs ${i === 1 ? "text-white/80" : "text-muted"}`}>{s.label}</p>
            <p className="mt-1 font-display text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-brand-soft p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-brand-deep">
          <span className="font-bold">{co2.toFixed(1)} tonnes</span> of CO₂ avoided every year. That&apos;s like planting{" "}
          <span className="font-bold">{Math.round(co2 * 45)}</span> trees.
        </p>
        <a href="#contact" className="shrink-0 rounded-full bg-brand-deep px-5 py-2.5 text-center text-sm font-bold text-white transition hover:bg-brand">
          Get exact quote
        </a>
      </div>
      <p className="mt-4 text-xs text-muted">
        Estimates assume ₹{TARIFF}/unit, {UNITS_PER_KW_MONTH} units/kW/month and PM Surya Ghar residential subsidy slabs.
        Final numbers depend on your roof, sanctioned load and DISCOM approval.
      </p>
    </div>
  );
}
