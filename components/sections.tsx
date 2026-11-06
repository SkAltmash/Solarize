import Image from "next/image";
import Link from "next/link";
import Icon, { type IconName } from "./Icon";
import Logo from "./Logo";
import Reveal from "./Reveal";
import ContactForm from "./ContactForm";
import { site } from "@/lib/site";
import { certifications, company, guarantees, partners, serviceAreas, testimonials, type Project } from "@/lib/content";

export function Eyebrow({ children, className = "text-brand" }: { children: React.ReactNode; className?: string }) {
  return <p className={`mb-4 text-xs font-bold uppercase tracking-[0.28em] ${className}`}>{children}</p>;
}

/** Top banner for inner pages. */
export function PageHeader({ eyebrow, title, text, children }: { eyebrow: string; title: React.ReactNode; text: string; children?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-36 sm:px-6 sm:pb-24 sm:pt-44">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_60%_at_80%_0%,rgba(126,211,33,0.18),transparent_70%)]" />
      <div className="dots-bg absolute inset-0 -z-10" />
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="max-w-4xl font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted sm:text-xl">{text}</p>
          {children}
        </Reveal>
      </div>
    </section>
  );
}

export function ProjectCard({ p, priority = false }: { p: Project; priority?: boolean }) {
  return (
    <article className="group relative overflow-hidden rounded-4xl bg-brand-deep">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={p.image}
          alt={`${p.size} solar installation, ${p.title}, ${p.location}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          placeholder="blur"
          priority={priority}
          className="object-cover transition duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-brand-deep/20 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-brand-deep backdrop-blur">{p.category}</span>
        <span className="absolute right-4 top-4 rounded-full bg-brand px-3 py-1 text-xs font-bold text-white">{p.size}</span>
      </div>
      <div className="relative -mt-16 p-6 text-white">
        <p className="flex items-center gap-1.5 text-sm text-white/70">
          <Icon name="pin" className="h-4 w-4" /> {p.location} · {p.year}
        </p>
        <h3 className="mt-2 font-display text-xl font-bold">{p.title}</h3>
        <p className="mt-2 text-sm text-white/70">{p.summary}</p>
        <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold text-brand-bright">
          <Icon name="bolt" className="h-4 w-4" /> Saves {p.savings}
        </p>
      </div>
    </article>
  );
}

export function PartnersStrip() {
  const row = [...partners, ...partners, ...partners];
  return (
    <section className="py-16" aria-label="Brands we install">
      <p className="mb-8 text-center text-sm font-semibold text-muted">Tier-1 brands we install and service</p>
      <div className="marquee-pause relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <ul className="marquee flex w-max items-center gap-4 sm:gap-5" style={{ "--marquee-duration": "45s" } as React.CSSProperties}>
          {row.map((p, i) => (
            <li
              key={i}
              aria-hidden={i >= partners.length}
              className="group grid h-20 w-40 shrink-0 place-items-center rounded-2xl border border-line bg-white px-5 transition duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-lg sm:h-24 sm:w-48"
            >
              <Image
                src={p.logo}
                alt={p.name}
                className="max-h-12 w-auto object-contain transition duration-300 group-hover:scale-105 sm:max-h-14"
                sizes="192px"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <span className="flex text-brand-bright" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden>
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

export function Testimonials() {
  const rows = [testimonials.slice(0, 3), testimonials.slice(3)];
  return (
    <section className="overflow-hidden bg-surface py-24 sm:py-32">
      <div className="mx-auto mb-14 flex max-w-7xl flex-col justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-end">
        <Reveal>
          <Eyebrow>Customer stories</Eyebrow>
          <h2 className="max-w-2xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            Trusted by <span className="text-gradient">1,250+ families</span> and businesses.
          </h2>
        </Reveal>
        <Reveal delay={120} className="card flex items-center gap-5 rounded-3xl px-6 py-5">
          <span className="font-display text-5xl font-extrabold">{company.googleRating}</span>
          <div>
            <Stars className="h-5 w-5" />
            <p className="mt-1 text-sm text-muted">{company.googleReviews} Google reviews</p>
          </div>
        </Reveal>
      </div>

      <div className="marquee-pause space-y-5">
        {rows.map((row, r) => (
          <div key={r} className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
            <div
              className="marquee flex w-max gap-5"
              style={{ "--marquee-duration": r ? "60s" : "50s", animationDirection: r ? "reverse" : "normal" } as React.CSSProperties}
            >
              {[...row, ...row].map((t, i) => (
                <figure key={i} className="card flex w-[320px] shrink-0 flex-col rounded-3xl p-6 sm:w-[420px] sm:p-7">
                  <Stars />
                  <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-text/85">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                    <Image src={t.photo} alt={t.name} width={48} height={48} sizes="48px" className="h-12 w-12 rounded-full object-cover ring-2 ring-white" />
                    <span>
                      <span className="block font-semibold">{t.name}</span>
                      <span className="block text-sm text-muted">
                        {t.system} · {t.place}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const guaranteeIcons: IconName[] = ["sun", "check", "bolt", "wrench"];

export function WhyUs() {
  return (
    <section className="px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <Eyebrow>Why Solarize</Eyebrow>
            <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Guarantees in writing. <span className="text-gradient">Not just promises.</span>
            </h2>
            <p className="mt-5 max-w-md text-lg text-muted">
              Every system comes with a clear warranty card, a named project engineer and a service promise we stand behind.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-3">
              {certifications.map((c) => (
                <div key={c.title} className="rounded-2xl border border-line bg-surface p-4">
                  <Icon name="check" className="h-5 w-5 text-brand" />
                  <p className="mt-2 text-sm font-bold leading-snug">{c.title}</p>
                  <p className="mt-1 text-xs text-muted">{c.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {guarantees.map((g, i) => (
              <Reveal key={g.title} delay={i * 90}>
                <div className="card group h-full rounded-4xl p-7 transition duration-500 hover:-translate-y-1">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand text-white transition duration-500 group-hover:rotate-[-6deg]">
                    <Icon name={guaranteeIcons[i]} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-8 font-display text-xl font-bold">{g.title}</h3>
                  <p className="mt-2 text-muted">{g.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServiceAreas() {
  return (
    <section className="px-4 pb-24 sm:px-6 sm:pb-32">
      <Reveal className="mx-auto max-w-7xl">
        <div className="card grid gap-10 rounded-[2.5rem] p-8 sm:p-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Service areas</Eyebrow>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Across Nagpur and all of Vidarbha.</h2>
            <p className="mt-4 text-muted">Free site surveys anywhere within 150 km of Nagpur.</p>
          </div>
          <div className="space-y-6">
            <div>
              <p className="mb-3 text-sm font-bold">Nagpur city</p>
              <div className="flex flex-wrap gap-2">
                {serviceAreas.city.map((a) => (
                  <span key={a} className="rounded-full bg-surface-2 px-3.5 py-1.5 text-sm font-medium">
                    {a}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-bold">Districts</p>
              <div className="flex flex-wrap gap-2">
                {serviceAreas.districts.map((a) => (
                  <span key={a} className="rounded-full bg-brand-soft px-3.5 py-1.5 text-sm font-semibold text-brand-deep">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="px-4 py-24 sm:px-6">
      <Reveal className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-deep px-8 py-14 text-center text-white sm:px-16 sm:py-20">
          <div className="pointer-events-none absolute -left-20 -top-24 h-80 w-80 rounded-full bg-brand-bright/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-10 h-80 w-80 rounded-full bg-brand/40 blur-3xl" />
          <h2 className="relative mx-auto max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            Ready to stop paying for electricity?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-white/70">Book a free site survey. Our engineer will visit, measure your roof and send a detailed proposal within 48 hours.</p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/#contact" className="rounded-full bg-brand-bright px-7 py-3.5 font-bold text-brand-deep transition hover:bg-white">
              Book free survey
            </Link>
            <a href={`tel:${site.phone}`} className="rounded-full border border-white/20 px-7 py-3.5 font-semibold transition hover:bg-white/10">
              Call {company.phoneDisplay}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function ContactSection() {
  const items: { icon: IconName; label: string; value: string; href?: string }[] = [
    { icon: "phone", label: "Call or WhatsApp", value: company.phoneDisplay, href: `tel:${site.phone}` },
    { icon: "file", label: "Email", value: company.email, href: `mailto:${company.email}` },
    { icon: "pin", label: "Office", value: company.address },
    { icon: "sun", label: "Hours", value: company.hours },
  ];
  return (
    <section id="contact" className="scroll-mt-20 bg-surface px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <Eyebrow>Get started</Eyebrow>
          <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            Book a <span className="text-gradient">free site survey.</span>
          </h2>
          <p className="mt-5 text-lg text-muted">Tell us about your property. We&apos;ll get back with a custom proposal.</p>
          <ul className="mt-10 space-y-5">
            {items.map((it) => {
              const body = (
                <>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                    <Icon name={it.icon} className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-muted">{it.label}</span>
                    <span className="block font-semibold">{it.value}</span>
                  </span>
                </>
              );
              return (
                <li key={it.label}>
                  {it.href ? (
                    <a href={it.href} className="flex items-center gap-4 transition hover:text-brand">
                      {body}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="mt-10 overflow-hidden rounded-3xl border border-line">
            <iframe
              title="Solarize Energy office location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(company.mapQuery)}&output=embed`}
              className="h-64 w-full grayscale-[0.4]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

const footerLinks = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About us" },
      { href: "/projects", label: "Projects" },
      { href: "/#process", label: "How it works" },
      { href: "/#contact", label: "Contact" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { href: "/#services", label: "Residential rooftop" },
      { href: "/#services", label: "Commercial & industrial" },
      { href: "/#services", label: "Solar water pumps" },
      { href: "/#savings", label: "Savings calculator" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-brand-deep px-4 pb-28 pt-20 text-white sm:px-6 md:pb-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo tone="dark" />
            <p className="mt-5 max-w-xs text-sm text-white/60">
              {site.tagline} Rooftop solar, commercial plants and solar pumps across Vidarbha since {company.founded}.
            </p>
            <div className="mt-6 flex gap-2">
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-brand-bright hover:text-brand-deep">
                <Icon name="insta" className="h-5 w-5" />
              </a>
              <a href={`tel:${site.phone}`} aria-label="Call" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-brand-bright hover:text-brand-deep">
                <Icon name="phone" className="h-5 w-5" />
              </a>
            </div>
          </div>
          {footerLinks.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-bold">{col.title}</p>
              <ul className="mt-4 space-y-3 text-sm text-white/60">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="transition hover:text-brand-bright">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="text-sm font-bold">Visit us</p>
            <p className="mt-4 text-sm text-white/60">{company.address}</p>
            <p className="mt-3 text-sm text-white/60">{company.phoneDisplay}</p>
            <p className="text-sm text-white/60">{company.email}</p>
          </div>
        </div>
        <p className="mt-16 font-display text-[15vw] font-extrabold leading-none tracking-tighter text-white/[0.06] lg:text-[11rem]" aria-hidden>
          Solarize
        </p>
        <div className="mt-6 flex flex-col justify-between gap-3 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row">
          <p>© Solarize Energy. All rights reserved. · {site.city}</p>
          <p>
            Architected by{" "}
            <a href="https://zaref.in" target="_blank" rel="noopener" className="font-semibold text-white/80 underline-offset-4 transition hover:text-brand-bright hover:underline">
              Zaref Technology
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
