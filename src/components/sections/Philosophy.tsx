import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { interests, philosophy, projects, skills } from "../../data/portfolio";
import { usePortfolio } from "../../context/PortfolioContext";
import { Section, Eyebrow, Heading, Label, Reveal } from "../ui";
import { StyledText } from "../StyledText";
import { HornerLab } from "../experiments/HornerLab";
import { cn } from "../../utils/cn";

const competencyProjects = ["erp-core", "vault", "ems", "uwb", "reporting", "overwatch"];

export function Philosophy() {
  const { openSearch, openProject } = usePortfolio();
  return (
    <Section id="philosophy">
      <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
        <div className="min-w-0">
          <Reveal>
            <Eyebrow>05 / The driving force</Eyebrow>
            <Heading>The joy of<br /><em className="text-accent">discovery.</em></Heading>
          </Reveal>
          <Reveal delay={.08}>
            <blockquote className="mt-7 max-w-lg font-serif text-[1.65rem] leading-[1.35] text-ink-muted sm:text-3xl">
              &ldquo;<StyledText text={philosophy.quote} />&rdquo;
            </blockquote>
          </Reveal>
          <Reveal delay={.12}>
            <div className="plate mt-8 rounded-3xl p-6 sm:p-7">
              <Label onPlate>A small discovery, made tangible</Label>
              <h3 className="mt-3 font-serif text-[1.7rem] leading-tight">{philosophy.discovery.title}</h3>
              <p className="mt-3 text-xs leading-[1.9] text-plate-muted">{philosophy.discovery.text}</p>
              <HornerLab />
              <details className="group mt-5 border-t border-plate-line pt-4">
                <summary className="flex min-h-10 items-center justify-between gap-4 text-[11px] text-plate-muted">
                  <span>Another one: {philosophy.fibonacci.title}</span>
                  <Plus className="h-3.5 w-3.5 shrink-0 transition-transform group-open:rotate-45" />
                </summary>
                <p className="mt-3 text-[11px] leading-[1.9] text-plate-muted">{philosophy.fibonacci.text}</p>
                <ol className="mt-3 space-y-2">
                  {philosophy.fibonacci.points.map((point, index) => (
                    <li key={point} className="flex gap-3 text-[11px] leading-relaxed">
                      <span className="font-mono text-[9px] text-accent">0{index + 1}</span>{point}
                    </li>
                  ))}
                </ol>
              </details>
            </div>
          </Reveal>
        </div>
        <div className="min-w-0 lg:pt-1">
          <Reveal>
            <div className="border-t border-line pt-6">
              <Label>The discipline of restraint</Label>
              <p className="mt-4 text-[15px] leading-[1.95] text-ink-muted"><StyledText text={philosophy.restraint} /></p>
            </div>
          </Reveal>
          <Reveal delay={.05}>
            <div className="mt-9 border-t border-line pt-6">
              <Label>Tools that transform</Label>
              <p className="mt-4 text-[15px] leading-[1.95] text-ink-muted"><StyledText text={philosophy.transform} /></p>
              <div className="my-7 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[.14em] text-ink-faint" aria-label="Input becomes transformation, which creates value">
                <span>Input</span><span aria-hidden="true" className="h-px flex-1 bg-line-strong" /><span className="text-accent">Transformation</span><ArrowRight className="h-3 w-3 text-accent" aria-hidden="true" /><span className="text-ink">Value</span>
              </div>
              <p className="font-serif text-xl italic text-ink-muted">Software worth building leaves the world a little different.</p>
            </div>
          </Reveal>
          <Reveal delay={.05}>
            <div className="mt-9 border-t border-line pt-6">
              <Label>Learning how to learn</Label>
              <p className="mt-4 text-[15px] leading-[1.95] text-ink-muted"><StyledText text={philosophy.learning} /></p>
              <p className="mt-4 font-serif text-xl italic text-ink">{philosophy.learningQuote}</p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-x-7 gap-y-6 border-t border-line pt-7 sm:grid-cols-2">
            {philosophy.principles.map((principle, index) => (
              <Reveal key={principle.title} delay={index * .04}>
                <div className="flex gap-3">
                  <span className="pt-0.5 font-mono text-[9px] text-accent">0{index + 1}</span>
                  <div><h3 className="text-xs font-semibold">{principle.title}</h3><p className="mt-2 text-xs leading-[1.85] text-ink-muted">{principle.text}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20 grid gap-8 border-t border-line pt-8 lg:grid-cols-[.72fr_1.5fr] lg:gap-14 lg:pt-10">
        <Reveal>
          <Label>An old Persian proverb</Label>
          <h3 className="mt-4 font-serif text-[2rem] leading-tight">The four levels<br />of <em className="text-accent">knowing.</em></h3>
          <p className="mt-4 max-w-xs text-xs leading-[1.9] text-ink-muted">{philosophy.levelsNote}</p>
        </Reveal>
        <Reveal delay={.06}>
          {/* Levels 2 and 4 lead; 1 and 3 stay for completeness but recede.
              The line sits in its own column so it can wrap without ever
              colliding with the pinned state label and marker. */}
          <ol>
            {philosophy.levels.map((level) => (
              <li
                key={level.level}
                className={cn(
                  "grid grid-cols-[1.6rem_1fr] items-baseline gap-x-4 border-t border-line py-4 first:border-0 first:pt-0 sm:grid-cols-[1.6rem_1fr_auto] sm:gap-x-6",
                  !level.marker && "opacity-55",
                )}
              >
                <span className={cn("font-mono text-[10px]", level.marker ? "text-accent" : "text-ink-faint")}>{level.level}</span>
                <p className={cn("min-w-0 font-serif text-[1.15rem] leading-snug sm:text-[1.3rem]", level.marker ? "text-ink" : "text-ink-muted")}>{level.line}</p>
                <div className="col-start-2 mt-2.5 flex flex-wrap items-center gap-2.5 sm:col-start-3 sm:mt-0 sm:flex-col sm:items-end sm:gap-1.5">
                  <span className="font-mono text-[9px] uppercase tracking-[.12em] text-ink-faint sm:whitespace-nowrap">{level.state}</span>
                  {level.marker && <span className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[9px] uppercase tracking-[.1em] text-accent sm:whitespace-nowrap">{level.marker}</span>}
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>

      {/* Interests are reading, not inventory — so they are set as marginalia
          rather than cards. No columns, no accent, no calls to action. */}
      <div className="mt-24 border-t border-line pt-10 sm:mt-28">
        <Reveal>
          <Label>Beyond computer science</Label>
          <p className="mt-5 max-w-xl font-serif text-[1.9rem] leading-[1.25] tracking-tight sm:text-[2.15rem]">
            Every domain is a fractal. There is <em className="text-accent">no bottom.</em>
          </p>
        </Reveal>
        <div className="mt-10 max-w-3xl">
          {interests.map((interest, index) => (
            <Reveal key={interest.name} delay={index * .05}>
              <div className="grid gap-2 border-t border-line py-6 sm:grid-cols-[9.5rem_1fr] sm:gap-8">
                <div>
                  <h3 className="font-serif text-xl leading-none">{interest.name}</h3>
                  <p className="mt-2 text-[10px] leading-relaxed text-ink-faint">{interest.weight}</p>
                </div>
                <div className="min-w-0 space-y-2.5 text-[13px] leading-[1.95] text-ink-muted">
                  <p><StyledText text={interest.text} /></p>
                  <p className="text-ink-faint">
                    {interest.reaches}
                    {interest.linkTo && (
                      <>
                        {" "}
                        <button
                          type="button"
                          onClick={() => openProject(interest.linkTo!)}
                          className="text-ink underline decoration-line-strong decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                        >
                          {projects.find((entry) => entry.id === interest.linkTo)?.title}
                        </button>
                      </>
                    )}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div id="skills" tabIndex={-1} className="mt-24 grid gap-10 outline-none sm:mt-32 lg:grid-cols-[.85fr_1.3fr] lg:gap-14">
        <Reveal>
          <Eyebrow>Depth, grounded in practice</Eyebrow>
            <Heading>Forged in<br /><em className="text-accent">real</em> systems.</Heading>
          <p className="mt-6 max-w-sm text-[13px] leading-[1.9] text-ink-muted">Skills get interesting when they meet real constraints. Follow a language into the work that put it to the test.</p>
          <div className="mt-8 max-w-sm border-t border-line pt-5">
            <Label>A year ahead of the coursework</Label>
            <p className="mt-3 text-xs leading-[1.9] text-ink-muted">{skills.dsa}</p>
          </div>
          <div className="mt-6 max-w-sm border-t border-line pt-5">
            <Label>Part of the everyday toolkit</Label>
            <p className="mt-3 font-mono text-[10px] leading-[2.2] text-ink-muted">{skills.tools.join(" / ")}</p>
          </div>
        </Reveal>
        <div className="grid min-w-0 gap-4 sm:grid-cols-2">
          <Reveal className="h-full">
            <div className="plate h-full rounded-3xl p-6">
              <Label onPlate>Language fluency</Label>
              <p className="mt-2 text-[10px] text-plate-muted">Select a language to see its work.</p>
              <div className="mt-3">
                {skills.languages.map((language) => (
                  <button
                    key={language.name} type="button" className="language-row group"
                    onClick={() => openSearch(language.name === "C# / .NET" ? ".NET" : language.name)}
                    aria-label={`Explore ${language.name} projects. ${language.level}, ${language.years} years.`}
                  >
                    <span className="flex items-center justify-between gap-3"><span className="language-name text-[13px] font-semibold transition-colors">{language.name}</span><ArrowUpRight className="h-3 w-3 text-plate-faint transition-colors group-hover:text-accent" /></span>
                    <span className="mt-1.5 flex items-center justify-between gap-2 font-mono text-[8px]"><span className="text-accent">{language.level}</span><span className="text-plate-faint">{language.years} years</span></span>
                    <span className="mt-2 block text-[9px] leading-relaxed text-plate-muted">{language.note}</span>
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={.07} className="h-full">
            <div className="plate flex h-full flex-col rounded-3xl p-6">
              <Label onPlate>Engineering foundations</Label>
              <p className="mt-2 text-[10px] text-plate-muted">The thinking beneath the tools.</p>
              <div className="mt-4">
                {skills.core.map((competency, index) => (
                  <details key={competency.name} name="engineering-foundations" open={index === 0} className="group border-b border-plate-line last:border-0">
                    <summary className="flex min-h-14 items-center justify-between gap-3 py-3 text-xs font-medium"><span>{competency.name}</span><Plus className="h-3 w-3 text-plate-faint transition-transform group-open:rotate-45" /></summary>
                    <div className="pb-4"><p className="text-[10px] leading-[1.9] text-plate-muted">{competency.note}</p><button type="button" onClick={() => openProject(competencyProjects[index])} className="text-link mt-3 min-h-8 text-[10px] text-accent">See related work <ArrowUpRight className="h-3 w-3" /></button></div>
                  </details>
                ))}
              </div>
              <p className="mt-auto border-t border-plate-line pt-5 font-serif text-lg italic leading-relaxed text-plate-muted">Patterns are the surface.<br />Understanding is beneath.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
