import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import MobileCTA from "@/components/MobileCTA";
import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import { CtaBand, Eyebrow, Footer, PageHeader, PartnersStrip, WhyUs } from "@/components/sections";
import { company, companyStats, images, team, timeline, values } from "@/lib/content";

export const metadata: Metadata = {
  title: "About us | Solarize Energy",
  description: `Solarize Energy has been installing rooftop solar across Nagpur and Vidarbha since ${company.founded}.`,
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("");

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="About Solarize"
          title={
            <>
              A decade of <span className="text-gradient">cleaner power</span> for Vidarbha.
            </>
          }
          text={`What began in ${company.founded} as a two-person team in Dharampeth is now one of Nagpur's most trusted solar installers, with 35 engineers, technicians and advisors.`}
        />

        {/* Image collage */}
        <section className="px-4 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-[1.4fr_1fr]">
            <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] sm:aspect-auto sm:h-[520px]">
              <Image src={images.installerRoof} alt="Solarize technician installing a panel" fill sizes="(min-width: 640px) 58vw, 100vw" placeholder="blur" priority className="object-cover" />
            </Reveal>
            <div className="grid gap-4">
              <Reveal delay={100} className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] sm:aspect-auto">
                <Image src={images.installerHands} alt="Wiring a solar module" fill sizes="(min-width: 640px) 40vw, 100vw" placeholder="blur" className="object-cover" />
              </Reveal>
              <Reveal delay={200} className="flex flex-col justify-end rounded-[2.5rem] bg-brand-deep p-8 text-white">
                <p className="font-display text-6xl font-extrabold text-brand-bright">
                  <CountUp to={1250} suffix="+" />
                </p>
                <p className="mt-2 text-white/70">rooftops powered across 7 districts</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Story + values */}
        <section className="px-4 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
            <Reveal>
              <Eyebrow>Our story</Eyebrow>
              <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">Built on referrals, one roof at a time.</h2>
              <div className="mt-6 space-y-4 text-lg text-muted">
                <p>
                  Our founder installed his first system on his parents&apos; home in {company.founded}. Neighbours saw the bills drop and asked for the same.
                  That is still how most of our customers find us.
                </p>
                <p>
                  Today we design and build everything from 1 kW homes to 500 kW industrial plants, but the promise is the same: honest numbers, quality
                  hardware and a local team that picks up the phone.
                </p>
              </div>
            </Reveal>
            <div className="space-y-4">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 100}>
                  <div className="card flex gap-5 rounded-3xl p-6">
                    <span className="font-display text-3xl font-extrabold text-brand-bright">0{i + 1}</span>
                    <div>
                      <h3 className="font-display text-xl font-bold">{v.title}</h3>
                      <p className="mt-1 text-muted">{v.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="px-4 sm:px-6">
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

        {/* Timeline */}
        <section className="px-4 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mb-14 max-w-2xl">
              <Eyebrow>Milestones</Eyebrow>
              <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">Ten years, one direction.</h2>
            </Reveal>
            <ol className="grid gap-px overflow-hidden rounded-4xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {timeline.map((t, i) => (
                <Reveal as="li" key={t.year} delay={(i % 3) * 90} className="group bg-surface p-8 transition hover:bg-brand-soft">
                  <p className="font-display text-4xl font-extrabold text-brand-bright transition group-hover:text-brand">{t.year}</p>
                  <h3 className="mt-4 font-display text-xl font-bold">{t.title}</h3>
                  <p className="mt-2 text-muted">{t.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Team */}
        <section className="bg-surface px-4 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mb-14 max-w-2xl">
              <Eyebrow>Leadership</Eyebrow>
              <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">The people behind your power.</h2>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((m, i) => (
                <Reveal key={m.name} delay={i * 90}>
                  <div className="group rounded-4xl border border-line bg-bg p-6 transition duration-500 hover:-translate-y-1 hover:border-brand/30">
                    <div className="grid aspect-square place-items-center rounded-3xl bg-gradient-to-br from-brand-soft to-surface-2">
                      <span className="font-display text-6xl font-extrabold text-brand transition duration-500 group-hover:scale-110">{initials(m.name)}</span>
                    </div>
                    <h3 className="mt-6 font-display text-lg font-bold">{m.name}</h3>
                    <p className="text-sm font-semibold text-brand">{m.role}</p>
                    <p className="mt-2 text-sm text-muted">{m.bio}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <WhyUs />
        <PartnersStrip />
        <CtaBand />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
