import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Plus, Search } from "lucide-react";
import { projects, type Project } from "../../data/portfolio";
import { caseStudies, type StudyCategory } from "../../data/caseStudies";
import { usePortfolio } from "../../context/PortfolioContext";
import { useTheme } from "../../theme/ThemeProvider";
import { Section, Eyebrow, Heading, Label, Reveal, TechLine } from "../ui";
import { cn } from "../../utils/cn";
import { ProjectVisual } from "../ProjectVisual";
import { HandStrata, HandUnderline } from "../HandDrawn";

const flagship = projects.filter((project) => project.flagship);
const supporting = projects.filter((project) => !project.flagship && !project.personal);
const filters: ("All work" | StudyCategory)[] = ["All work", "Platforms", "Infrastructure", "Security", "Simulation"];
/** With seven flagship cards, widening the first and last fills the three-column grid exactly. */
const WIDE = [0, flagship.length - 1];

/**
 * A single hand-drawn touch per row — the margin underline — not two.
 * ("If everything is accented, nothing is" applies to ink as much as color.)
 * The underline redraws on every hover, so no two visits — or even two
 * hovers in the same visit — trace quite the same line.
 */
function InfraRow({ project, index }: { project: Project; index: number }) {
  const { openProject } = usePortfolio();
  const [seed, setSeed] = useState(() => Math.random());
  return (
    <button
      type="button"
      onClick={() => openProject(project.id)}
      onPointerEnter={() => setSeed(Math.random())}
      onFocus={() => setSeed(Math.random())}
      className="infra-row group"
      aria-label={`Read about ${project.title}`}
    >
      <span className="infra-index font-mono text-[9px] text-ink-faint transition-colors group-hover:text-accent">{String(index + 1).padStart(2, "0")}</span>
      <div>
        <h3 className="relative inline-block text-sm font-semibold transition-colors group-hover:text-accent">
          {project.title}
          <HandUnderline seed={seed} />
        </h3>
        <p className="mt-2.5 max-w-md text-xs leading-relaxed text-ink-muted">{project.summary}</p>
      </div>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-faint transition-colors group-hover:text-accent" />
    </button>
  );
}

function ProjectPlate({ project, wide, index }: { project: Project; wide: boolean; index: number }) {
  const { openProject } = usePortfolio();
  return (
    <button
      type="button" onClick={() => openProject(project.id)}
      aria-label={`Explore ${project.title}, ${caseStudies[project.id]?.category ?? "project"} case study`}
      className={cn("plate project-card group min-h-[416px]", wide && "project-card-wide")}
    >
      <div className="relative px-6 pt-6 sm:px-7 sm:pt-7">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[9px] uppercase tracking-[.17em] text-plate-faint">{String(index + 1).padStart(2, "0")} <span className="px-1 text-accent">/</span> {caseStudies[project.id]?.category}</span>
          <span className="project-open grid h-7 w-7 place-items-center rounded-full border border-plate-line text-plate-muted"><Plus className="h-3.5 w-3.5" /></span>
        </div>
        <h3 className={cn("mt-5 max-w-xl font-serif leading-[1.08] tracking-tight", wide ? "text-[2.15rem] sm:text-[2.65rem]" : "text-[1.95rem]")}>{project.title}</h3>
        <p className="mt-3 max-w-[31rem] text-xs leading-[1.85] text-plate-muted">{project.summary}</p>
      </div>
      <div className="my-auto pt-4"><ProjectVisual id={project.id} /></div>
      <div className="mx-6 border-t border-plate-line pb-6 pt-4 sm:mx-7 sm:pb-7">
        <TechLine items={project.tech.slice(0, wide ? 5 : 3)} className="text-plate-faint" />
        <div className="mt-3 flex items-end justify-between gap-3">
          <span className="font-serif text-lg italic text-accent">{project.impact?.[0]}</span>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-plate-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>
    </button>
  );
}

export function Work() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All work");
  const { openSearch } = usePortfolio();
  const { reduceMotion } = useTheme();
  const visible = filter === "All work" ? flagship : flagship.filter((project) => caseStudies[project.id]?.category === filter);

  return (
    <Section id="work" className="pt-10 sm:pt-16">
      <Reveal>
        <Eyebrow>02 / Selected work</Eyebrow>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Heading>Systems that <em className="text-accent">changed</em><br />how a company works.</Heading>
          <p className="max-w-[19rem] text-[13px] leading-[1.85] text-ink-muted">From a year-long solo build to the foundations other teams build on. A few problems worth solving well.</p>
        </div>
      </Reveal>
      <div className="mt-9 flex items-center justify-between gap-5 border-b border-line">
        <div className="filter-rail" role="group" aria-label="Filter selected projects">
          {filters.map((item) => {
            const count = item === "All work" ? flagship.length : flagship.filter((project) => caseStudies[project.id]?.category === item).length;
            return <button key={item} type="button" aria-pressed={filter === item} className="filter-button" onClick={() => setFilter(item)}>{item}<span className="ml-1.5 font-mono text-[8px] text-ink-faint">{String(count).padStart(2, "0")}</span></button>;
          })}
        </div>
        <button type="button" className="icon-button hidden shrink-0 text-ink-faint sm:inline-grid" onClick={() => openSearch()} aria-label="Search all projects"><Search className="h-4 w-4" /></button>
      </div>

      <div className={cn("relative mt-7 grid gap-5", filter === "All work" ? "md:grid-cols-3" : "md:grid-cols-2")}>
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((project, index) => {
            const originalIndex = flagship.findIndex((entry) => entry.id === project.id);
            const wide = filter === "All work" ? WIDE.includes(originalIndex) : visible.length === 1;
            return (
              <motion.div
                key={project.id} layout={reduceMotion ? false : "position"}
                className={cn("min-w-0", wide && "md:col-span-2")}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : .25, layout: { duration: .45, ease: [.22, 1, .36, 1] } }}
              >
                <Reveal className="h-full" delay={Math.min(index % 3 * .04, .08)}><ProjectPlate project={project} wide={wide} index={originalIndex} /></Reveal>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      <p className="sr-only" role="status">Showing {visible.length} selected {filter === "All work" ? "projects" : `${filter.toLowerCase()} projects`}.</p>

      <div className="mt-14 grid gap-5 lg:grid-cols-[.72fr_1.5fr] lg:gap-14">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <Label>The quieter work</Label>
          <h3 className="mt-5 font-serif text-[2rem] leading-tight">The work beneath<br /><em>the work.</em></h3>
          <p className="mt-4 max-w-xs text-xs leading-[1.9] text-ink-muted">Foundations, integrations and earlier systems. Some were borrowed by other teams; all of them quietly do their job.</p>
          {/* Hand-sketched strata — the one place in the technical work where
              the pen shows. Widest layer at the bottom, ground hatching under it. */}
          <HandStrata className="mt-7 h-[68px] w-44 text-ink-faint" />
          <p className="mt-3 font-mono text-[9px] uppercase tracking-[.14em] text-ink-faint">{String(supporting.length).padStart(2, "0")} systems <span className="px-1.5 text-accent">/</span> still running</p>
        </Reveal>
        <Reveal>
          <div className="border-t border-line">
            {supporting.map((project, index) => (
              <InfraRow key={project.id} project={project} index={index} />
            ))}
          </div>
        </Reveal>
      </div>
      <div className="mt-9 flex flex-wrap items-center justify-between gap-4">
        <span className="font-mono text-[9px] uppercase tracking-[.14em] text-ink-faint">Architecture studies, not production screenshots</span>
        <button type="button" onClick={() => openSearch()} className="text-link min-h-11">Find something specific <Search className="h-3.5 w-3.5" /></button>
      </div>
    </Section>
  );
}
