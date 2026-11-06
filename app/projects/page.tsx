import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import MobileCTA from "@/components/MobileCTA";
import ProjectsGrid from "@/components/ProjectsGrid";
import CountUp from "@/components/CountUp";
import { CtaBand, Footer, PageHeader, Testimonials } from "@/components/sections";
import { companyStats, projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects | Solarize Energy",
  description: "Rooftop, commercial, industrial and agricultural solar projects delivered by Solarize Energy across Nagpur and Vidarbha.",
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Our work"
          title={
            <>
              Real roofs. <span className="text-gradient">Real savings.</span>
            </>
          }
          text="A selection of homes, hospitals, campuses, factories and farms we have powered across Vidarbha."
        >
          <dl className="mt-12 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
            {companyStats.map((s) => (
              <div key={s.label}>
                <dd className="font-display text-3xl font-extrabold text-brand">
                  <CountUp to={s.to} suffix={s.suffix} decimals={s.decimals} />
                </dd>
                <dt className="mt-1 text-sm text-muted">{s.label}</dt>
              </div>
            ))}
          </dl>
        </PageHeader>

        <section className="px-4 pb-24 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <ProjectsGrid projects={projects} />
          </div>
        </section>

        <Testimonials />
        <CtaBand />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
