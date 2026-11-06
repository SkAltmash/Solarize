"use client";

import { useState } from "react";
import { ProjectCard } from "./sections";
import type { Project, ProjectCategory } from "@/lib/content";

const FILTERS: ("All" | ProjectCategory)[] = ["All", "Residential", "Commercial", "Industrial", "Agriculture"];

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <div
        className="sticky top-[4.25rem] z-30 -mx-4 mb-8 flex gap-2 overflow-x-auto bg-bg/85 px-4 py-3 backdrop-blur-xl [scrollbar-width:none] sm:top-[4.5rem] sm:mx-0 sm:flex-wrap sm:rounded-full sm:px-2"
        role="tablist"
        aria-label="Filter projects"
      >
        {FILTERS.map((f) => {
          const count = f === "All" ? projects.length : projects.filter((p) => p.category === f).length;
          const active = f === filter;
          return (
            <button
              key={f}
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                active ? "bg-brand text-white shadow-lg shadow-brand/25" : "border border-line bg-surface text-muted hover:border-brand hover:text-brand"
              }`}
            >
              {f} <span className={active ? "text-white/70" : "text-muted/60"}>{count}</span>
            </button>
          );
        })}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, i) => (
          <ProjectCard key={p.slug} p={p} priority={i < 3} />
        ))}
      </div>
    </>
  );
}
