import Navbar from "@/components/Navbar";
import ScrollStory from "@/components/ScrollStory";
import HorizontalServices from "@/components/HorizontalServices";
import ScrollMarquee from "@/components/ScrollMarquee";
import ProcessTimeline from "@/components/ProcessTimeline";
import Calculator from "@/components/Calculator";
import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import MobileCTA from "@/components/MobileCTA";
import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import { ContactSection, Eyebrow, Footer, PartnersStrip, ProjectCard, ServiceAreas, Testimonials, WhyUs } from "@/components/sections";
import { companyStats, projects } from "@/lib/content";
import { site } from "@/lib/site";

const faqs = [
  {
    q: "How much subsidy can I get on a home solar system?",
    a: "Under PM Surya Ghar: Muft Bijli Yojana, residential on-grid systems get ₹30,000 per kW for the first 2 kW and ₹18,000 for the 3rd kW, up to ₹78,000 in total. We handle the portal registration and paperwork.",
  },
  {
    q: "How much roof space do I need?",
    a: "Roughly 80–100 sq ft of shadow-free roof per kW. A typical 3 kW home system needs about 300 sq ft.",
  },
  {
    q: "Will it work during monsoon or cloudy days?",
    a: "Yes, at reduced output. Net metering banks your surplus from sunny months, so your yearly savings stay strong. Nagpur gets abundant sunshine for most of the year.",
  },
  {
    q: "What happens during a power cut?",
    a: "Standard on-grid systems shut off for safety when the grid is down. If you want backup, we install a hybrid inverter with batteries.",
  },
  {
    q: "How long do the panels last?",
    a: "Quality panels carry a 25-year performance warranty and keep producing well beyond that with basic cleaning and maintenance.",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <ScrollStory />

        {/* STATS */}
        <section className="relative z-10 px-4 sm:px-6">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-4xl border border-line bg-line lg:grid-cols-4">
            {companyStats.map((s, i) => (
              <Reveal key={s.label} delay={i * 90} className="bg-surface p-6 sm:p-10">
                <p className="font-display text-3xl font-extrabold tracking-tight text-brand sm:text-5xl">
                  <CountUp to={s.to} suffix={s.suffix} decimals={s.decimals} />
                </p>
                <p className="mt-2 text-sm text-muted sm:text-base">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <PartnersStrip />

        <HorizontalServices />

        <ScrollMarquee />

        {/* PROJECTS */}
        <section className="px-4 pb-24 sm:px-6 sm:pb-32">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <Reveal>
                <Eyebrow>Recent projects</Eyebrow>
                <h2 className="max-w-2xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
                  Powering homes, hospitals <span className="text-gradient">and farms.</span>
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3.5 font-semibold transition hover:border-brand hover:text-brand"
                >
                  View all projects <Icon name="arrow" className="h-5 w-5 transition group-hover:translate-x-1" />
                </Link>
              </Reveal>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects.slice(0, 6).map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 90}>
                  <ProjectCard p={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SAVINGS */}
        <section id="savings" className="scroll-mt-20 px-4 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <Eyebrow>Savings calculator</Eyebrow>
              <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
                See what the sun <span className="text-gradient">pays you back.</span>
              </h2>
              <p className="mt-5 text-lg text-muted">
                Slide to your monthly bill. We&apos;ll size a system, apply the government subsidy and show your payback.
              </p>
              <ul className="mt-8 space-y-3">
                {["Subsidy credited directly to your bank account", "Net metering credits surplus units every month", "Easy EMI options available"].map((t) => (
                  <li key={t} className="flex items-center gap-3 font-medium">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-soft text-brand">
                      <Icon name="check" className="h-4 w-4" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <Calculator />
            </Reveal>
          </div>
        </section>

        <Testimonials />

        {/* PROCESS */}
        <section id="process" className="scroll-mt-20 bg-surface px-4 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Reveal>
                <Eyebrow>How it works</Eyebrow>
                <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
                  Survey to switch-on in <span className="text-gradient">weeks, not months.</span>
                </h2>
                <p className="mt-5 max-w-md text-lg text-muted">One local team from the first roof visit to the day your meter starts running backwards.</p>
                <a
                  href="#contact"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 font-bold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-deep"
                >
                  Book free survey <Icon name="arrow" className="h-5 w-5" />
                </a>
              </Reveal>
            </div>
            <ProcessTimeline />
          </div>
        </section>

        <WhyUs />

        {/* INSTAGRAM */}
        <section className="px-4 py-24 sm:px-6 sm:py-32">
          <Reveal className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-deep p-8 text-white sm:p-16">
              <div className="pointer-events-none absolute -right-20 -top-28 h-96 w-96 rounded-full bg-brand-bright/25 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-32 left-10 h-80 w-80 rounded-full bg-brand/40 blur-3xl" />
              <div className="relative grid items-center gap-12 md:grid-cols-[1fr_auto]">
                <div>
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-brand-bright">{site.tagline}</p>
                  <h2 className="max-w-xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
                    Real installations. Real happy customers.
                  </h2>
                  <p className="mt-4 max-w-md text-white/70">Follow our site visits, new rooftops and customer stories from across Nagpur on Instagram.</p>
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-bold text-brand-deep transition hover:bg-brand-bright"
                  >
                    <Icon name="insta" className="h-5 w-5" /> @solarize_energy_
                  </a>
                </div>
                <div className="relative mx-auto grid h-56 w-56 rotate-3 place-items-center rounded-[2.5rem] bg-white/[0.06] shadow-2xl ring-1 ring-white/15 transition duration-500 hover:rotate-0 sm:h-72 sm:w-72">
                  <LogoMark tone="dark" className="h-36 w-36 sm:h-48 sm:w-48" />
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <ServiceAreas />

        {/* FAQ */}
        <section id="faq" className="scroll-mt-20 px-4 pb-24 sm:px-6 sm:pb-32">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">Questions we hear a lot.</h2>
              <p className="mt-4 text-muted">Can&apos;t find your answer? Message us on Instagram.</p>
            </Reveal>
            <div className="divide-y divide-line border-y border-line">
              {faqs.map((f, i) => (
                <Reveal key={f.q} delay={i * 60}>
                  <details className="group py-6">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-lg font-semibold">
                      {f.q}
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-xl text-brand transition duration-300 group-open:rotate-45 group-open:bg-brand group-open:text-white">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 max-w-2xl text-muted">{f.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <ContactSection />
      </main>

      <Footer />
      <MobileCTA />
    </>
  );
}
