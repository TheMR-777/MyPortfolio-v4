import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Copy, LockKeyhole, X } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import { personal, projects, type Project } from "../data/portfolio";
import { caseStudies } from "../data/caseStudies";
import { useClipboard } from "../hooks/useClipboard";
import { Dialog } from "./Dialog";
import { ProjectVisual, CraftVisual, hasDialogArt } from "./ProjectVisual";
import { StyledText } from "./StyledText";
import { Label } from "./ui";
import { GithubIcon } from "./Icons";
import { MoireLab } from "./experiments/MoireLab";

function CaseContent({ project }: { project: Project }) {
  const { closeProject, openProject } = usePortfolio();
  const { copy, copied, error } = useClipboard();
  const title = useRef<HTMLHeadingElement>(null);
  const study = caseStudies[project.id];
  const index = projects.findIndex((item) => item.id === project.id);
  const previous = projects[(index + projects.length - 1) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const link = new URL(window.location.href);
  link.searchParams.set("project", project.id);

  useEffect(() => {
    const panel = title.current?.closest<HTMLElement>("[data-dialog-panel]");
    if (panel) panel.scrollTop = 0;
    title.current?.focus({ preventScroll: true });
  }, [project.id]);

  return (
    <>
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-paper/95 px-5 py-2.5 backdrop-blur-lg sm:px-8">
        <span className="font-mono text-[9px] uppercase tracking-[.17em] text-ink-faint">Project {String(index + 1).padStart(2, "0")} <span className="px-1 text-accent">/</span> {String(projects.length).padStart(2, "0")}</span>
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => void copy(link.href)} disabled={!/^https?:$/.test(link.protocol)} title={!/^https?:$/.test(link.protocol) ? "Sharing is available from the published site" : undefined} className="inline-flex min-h-10 min-w-[82px] items-center justify-center gap-2 rounded-full px-3 text-[11px] text-ink-muted hover:bg-accent-soft hover:text-accent disabled:opacity-40" aria-label={copied ? "Project link copied" : "Copy a link to this project"}>
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}<span>{copied ? "Copied" : "Share"}</span>
          </button>
          <button type="button" onClick={closeProject} className="icon-button text-ink-muted" aria-label="Close project details"><X className="h-5 w-5" /></button>
        </div>
      </div>
      {error && <div className="border-b border-line px-6 py-3"><p className="mb-2 text-xs text-ink-muted" role="status">Clipboard access is unavailable. Select and copy this link instead.</p><input aria-label="Project link to copy" value={link.href} readOnly onFocus={(event) => event.currentTarget.select()} className="w-full rounded-lg border border-line bg-paper-2 p-2 font-mono text-xs" /></div>}
      <div className="plate case-cover px-6 pt-7 sm:px-9 sm:pt-9">
        <Label onPlate>{project.kind}</Label>
        <h2 ref={title} id="case-study-title" data-autofocus tabIndex={-1} className="mt-4 max-w-2xl font-serif text-[2.45rem] leading-[1.04] tracking-tight outline-none sm:text-5xl">{project.title}</h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-plate-muted">{study?.thesis ?? project.summary}</p>
        {study ? (
          <figure className="mt-4">
            <ProjectVisual id={project.id} />
            <figcaption className="pb-4 text-center font-mono text-[8px] uppercase tracking-[.17em] text-plate-faint">Conceptual architecture study / No production data</figcaption>
          </figure>
        ) : project.personal && hasDialogArt(project.id) ? <div className="mt-6 overflow-hidden rounded-t-xl"><CraftVisual id={project.id} /></div> : <div className="h-8" />}
      </div>
      <div className="grid gap-8 px-6 py-8 sm:px-9 sm:py-10 md:grid-cols-[180px_1fr] md:gap-10">
        <aside>
          <dl className="grid grid-cols-2 gap-5 md:grid-cols-1 md:gap-6">
            {study && <><div><dt><Label>My role</Label></dt><dd className="mt-2 text-xs leading-relaxed text-ink-muted">{study.role}</dd></div><div><dt><Label>Timeframe</Label></dt><dd className="mt-2 text-xs leading-relaxed text-ink-muted">{study.period}</dd></div></>}
            {study?.collaboration && <div className="col-span-2 md:col-span-1"><dt><Label>How it was built</Label></dt><dd className="mt-2 text-xs leading-[1.8] text-ink-muted">{study.collaboration}</dd></div>}
            <div><dt><Label>Built with</Label></dt><dd className="mt-2 space-y-1.5 font-mono text-[10px] leading-relaxed text-ink-muted">{project.tech.map((tech) => <span key={tech} className="block">{tech}</span>)}</dd></div>
            <div><dt><Label>Access</Label></dt><dd className="mt-2 text-xs text-ink-muted">{project.personal ? "Open source" : "Private enterprise work"}</dd></div>
          </dl>
          <div className="mt-6 flex flex-col items-start gap-3 border-t border-line pt-5">
            {project.link && <a href={project.link} target="_blank" rel="noreferrer" className="text-link text-[11px] text-accent">{project.link.includes("github.com") ? "View on GitHub" : "Visit the project"}<ArrowUpRight className="h-3.5 w-3.5" /></a>}
            {project.repo && <a href={project.repo} target="_blank" rel="noreferrer" className="text-link text-[11px]"><GithubIcon className="h-3.5 w-3.5" />Explore the source</a>}
            {!project.personal && <a href={`mailto:${personal.email}?subject=${encodeURIComponent(`Let's talk about ${project.title}`)}`} className="text-link text-[11px] text-accent">Discuss this system<ArrowUpRight className="h-3.5 w-3.5" /></a>}
          </div>
        </aside>
        <article className="min-w-0">
          <p className="text-sm leading-[1.9] text-ink-muted"><StyledText text={project.description} /></p>
          {study && <>
            <section className="case-section"><h3 className="font-serif text-2xl">The challenge.</h3><p className="mt-3 text-[13px] leading-[1.9] text-ink-muted">{study.challenge}</p></section>
            <section className="case-section"><h3 className="font-serif text-2xl">The approach.</h3><p className="mt-3 text-[13px] leading-[1.9] text-ink-muted">{study.approach}</p></section>
            <section className="case-section">
              <h3 className="font-serif text-2xl">The decisions that mattered.</h3>
              <ol className="mt-5 space-y-5">{study.decisions.map((decision, i) => <li key={decision.title} className="flex gap-3"><span className="pt-0.5 font-mono text-[9px] text-accent">0{i + 1}</span><div><h4 className="text-xs font-semibold">{decision.title}</h4><p className="mt-1.5 text-xs leading-[1.85] text-ink-muted">{decision.detail}</p></div></li>)}</ol>
            </section>
            {study.modules && (
              <section className="case-section">
                <h3 className="font-serif text-2xl">Inside the system.</h3>
                <ul className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                  {study.modules.map((module) => (
                    <li key={module.name}>
                      <h4 className="text-xs font-semibold text-accent">{module.name}</h4>
                      <p className="mt-1.5 text-xs leading-[1.85] text-ink-muted">{module.detail}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>}
          {project.id === "moire" && <MoireLab />}
          {project.impact && <section className="case-section"><h3 className="font-serif text-2xl">What changed.</h3><p className="mt-1.5 font-mono text-[8px] uppercase tracking-widest text-ink-faint">Reported project outcomes</p><ul className="mt-5 space-y-3">{project.impact.map((impact) => <li key={impact} className="flex gap-3 text-[13px] leading-relaxed"><Check className="mt-0.5 h-3.5 w-3.5 text-accent" /><span>{impact}</span></li>)}</ul></section>}
          {!project.personal && <p className="mt-8 flex items-start gap-2.5 border-t border-line pt-5 text-[10px] leading-relaxed text-ink-faint"><LockKeyhole className="mt-0.5 h-3 w-3" />Enterprise work is described at an architectural level. Source code and production data remain private.</p>}
        </article>
      </div>
      <div className="case-nav">
        <button type="button" onClick={() => openProject(previous.id)} className="flex min-h-11 max-w-[45%] items-center gap-3 text-left" aria-label={`Previous project: ${previous.title}`}><ArrowLeft className="h-4 w-4 text-accent" /><span><span className="block font-mono text-[8px] uppercase tracking-widest text-ink-faint">Previous</span><span className="mt-1 block text-[11px] leading-relaxed">{previous.title}</span></span></button>
        <button type="button" onClick={() => openProject(next.id)} className="flex min-h-11 max-w-[45%] items-center gap-3 text-right" aria-label={`Next project: ${next.title}`}><span><span className="block font-mono text-[8px] uppercase tracking-widest text-ink-faint">Keep exploring</span><span className="mt-1 block text-[11px] leading-relaxed">{next.title}</span></span><ArrowRight className="h-4 w-4 text-accent" /></button>
      </div>
      <p className="sr-only" role="status">{copied ? "Project link copied to clipboard." : ""}</p>
    </>
  );
}

export function ProjectDialog() {
  const { selectedProject, closeProject } = usePortfolio();
  if (!selectedProject) return null;
  return <Dialog labelledBy="case-study-title" onClose={closeProject} panelClassName="max-w-[900px]"><CaseContent key={selectedProject.id} project={selectedProject} /></Dialog>;
}
