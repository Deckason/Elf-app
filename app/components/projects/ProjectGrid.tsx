"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
// import { ProjectCard, ProjectStatus } from "@/types/project";
import {
  statusLabel,
  statusColor,
  progressPercent,
  formatNaira,
  formatDate,
  fullName,
  initials,
  excerpt,
} from "@/lib/project-utils";
import { ProjectCard, ProjectStatus } from "@/lib/types/Project";

const STATUSES: ("All" | ProjectStatus)[] = ["All", "ACTIVE", "COMPLETED", "PAUSED"];

interface ProjectGridProps {
  projects: ProjectCard[];
}

/* Pick a gradient based on the project's position / id — since there's no
   category field in the schema, we rotate through the brand palette */
const GRADIENTS = [
  "linear-gradient(140deg,#064E38,#0D6E4F)",
  "linear-gradient(140deg,#0D6E4F,#10B981)",
  "linear-gradient(140deg,#10B981,#C9A84C)",
  "linear-gradient(140deg,#064E38,#34D399)",
  "linear-gradient(140deg,#148a80,#064E38)",
];

function gradientForId(id: string): string {
  const sum = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return GRADIENTS[sum % GRADIENTS.length];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const [status, setStatus] = useState<"All" | ProjectStatus>("All");

  const filtered = useMemo(
    () =>
      status === "All"
        ? projects
        : projects.filter((p) => p.status === status),
    [status, projects]
  );

  return (
    <>
      {/* Filter pills */}
      <div className="flex flex-wrap items-center gap-[8px] mb-10">
        {STATUSES.map((s) => {
          const isAll  = s === "All";
          const label  = isAll ? "All Projects" : statusLabel(s as ProjectStatus);
          const color  = isAll ? "var(--grey)"  : statusColor(s as ProjectStatus);
          return (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className="px-[18px] py-[7px] rounded-full text-[0.62rem] tracking-[0.2em] uppercase transition-all duration-200"
              style={
                status === s
                  ? { background: isAll ? "var(--deep)" : color, color: "#fff", border: `1px solid ${isAll ? "var(--deep)" : color}` }
                  : { background: "transparent", color, border: `1px solid ${color}`, opacity: 0.65 }
              }
            >
              {label}
            </button>
          );
        })}
        <span
          className="ml-auto self-center"
          style={{ fontSize: "0.72rem", color: "var(--mgrey)" }}
        >
          {filtered.length} project{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-24 rounded-[16px] text-center"
          style={{ background: "var(--warm)", border: "1px dashed var(--border)" }}
        >
          <div className="text-4xl mb-4">🌱</div>
          <p style={{ color: "var(--mgrey)", fontSize: "0.9rem" }}>
            No projects match this filter yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => {
            const grad  = gradientForId(project.id);
            const pct   = progressPercent(project.currentAmount, project.goalAmount);
            const init  = initials(project.createdBy);
            const name  = fullName(project.createdBy);
            const blurb = excerpt(project.description);

            return (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group block rounded-[16px] overflow-hidden transition-all duration-300 hover:-translate-y-[5px] hover:shadow-xl"
                style={{
                  background: "#fff",
                  border: "1px solid var(--border)",
                  animationDelay: `${i * 60}ms`,
                }}
              >
                {/* Cover */}
                <div
                  className="h-[162px] flex flex-col items-start justify-between p-5 relative overflow-hidden"
                  style={{ background: grad }}
                >
                  {/* Watermark logo */}
                  <svg
                    className="absolute -bottom-4 -right-4 opacity-[0.09]"
                    width="100" height="110" viewBox="0 0 60 68" fill="white"
                  >
                    <circle cx="38" cy="10" r="9" />
                    <path d="M29 18C38 22 47 32 48 44C50 59 42 72 31 74C22 76 14 71 11 63C18 67 28 66 33 59C40 50 40 36 34 24C29 14 20 10 14 9C20 6 25 12 29 18Z" />
                    <circle cx="16" cy="24" r="7.5" />
                    <path d="M9 31C3 38 1 49 4 59C7 67 14 73 22 73C25 64 26 52 27 42C26 32 19 27 9 31Z" />
                  </svg>

                  {/* Status badge */}
                  <span
                    className="relative z-10 text-[0.52rem] tracking-[0.22em] uppercase px-[10px] py-[4px] rounded-full"
                    style={{
                      background: "rgba(0,0,0,0.28)",
                      color: statusColor(project.status),
                      border: `1px solid ${statusColor(project.status)}55`,
                    }}
                  >
                    {statusLabel(project.status)}
                  </span>

                  {/* Created date */}
                  <span
                    className="relative z-10 text-[0.56rem]"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    Started {formatDate(project.createdAt)}
                  </span>
                </div>

                {/* Body */}
                <div className="p-5 pb-6">
                  <h3
                    className="mb-2 group-hover:text-[var(--emerald)] transition-colors duration-200"
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "1.18rem",
                      fontWeight: 700,
                      color: "var(--deep)",
                      lineHeight: 1.22,
                    }}
                  >
                    {project.title}
                  </h3>

                  <p
                    className="mb-4 line-clamp-2"
                    style={{
                      fontFamily: "var(--font-lora), Georgia, serif",
                      fontSize: "0.8rem",
                      lineHeight: 1.72,
                      color: "var(--grey)",
                    }}
                  >
                    {blurb}
                  </p>

                  {/* Funding bar */}
                  <div className="mb-4">
                    <div className="flex justify-between mb-[6px]">
                      <span style={{ fontSize: "0.66rem", color: "var(--grey)" }}>
                        {formatNaira(project.currentAmount)} raised
                      </span>
                      <span style={{ fontSize: "0.66rem", color: "var(--mid)", fontWeight: 600 }}>
                        {pct}%
                      </span>
                    </div>
                    <div className="w-full rounded-full h-[5px]" style={{ background: "var(--warm2)" }}>
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${pct}%`,
                          background: "linear-gradient(90deg, var(--emerald), var(--glow))",
                        }}
                      />
                    </div>
                    <div className="mt-[5px]" style={{ fontSize: "0.6rem", color: "var(--mgrey)" }}>
                      of {formatNaira(project.goalAmount)} goal
                    </div>
                  </div>

                  {/* Creator row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[9px]">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{
                          background: "linear-gradient(135deg, var(--deep), var(--emerald))",
                          fontFamily: "var(--font-cormorant), Georgia, serif",
                          fontSize: "0.7rem",
                        }}
                      >
                        {init}
                      </div>
                      <span style={{ fontSize: "0.74rem", color: "var(--deep)", fontWeight: 500 }}>
                        {project.createdBy.firstName}
                      </span>
                    </div>
                    <span className="pcard-link text-[0.62rem]">View →</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}