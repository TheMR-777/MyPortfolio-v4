import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { philosophy, skills } from "../../data/portfolio";
import { usePortfolio } from "../../context/PortfolioContext";
import { Section, Eyebrow, Heading, Reveal } from "../ui";
import { StyledText } from "../StyledText";
import { HornerLab } from "../experiments/HornerLab";

const competencyProjects = ["erp-core", "vault", "ems", "reporting", "vault", "schemaflow"];

export function Philosophy() {
  const { openSearch, openProject } = usePortfolio();
  return (
    <Section id="philosophy">
      <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
        <div className="min-w-0">
          <Reveal>
            <Eyebrow>04 / The driving force</Eyebrow>
            <Heading>The joy of<br /><em className="text-accent">discovery.</em></Heading>
          </Reveal>
          <Reveal delay={.08}>
            <blockquote className="mt-7 max-w-lg font-serif text-[1.65rem] leading-[1.35] text-ink-muted sm:text-3xl">
              &ldquo;<StyledText text={philosophy.quote} />&rdquo;
            </blockquote>
          </Reveal>
          <Reveal delay={.12}>
            <div className="plate mt-8 rounded-3xl p-6 sm:p-7">
              <p className="eyebrow text-plate-faint">A small discovery, made tangible</p>
              <h3 className="mt-3 font-serif text-[1.7rem] leading-tight">{philosophy.discovery.title}</h3>
              <p className="mt-3 text-xs leading-[1.9] text-plate-muted">{philosophy.discovery.text}</p>
              <HornerLab />
            </div>
          </Reveal>
        </div>
        <div className="min-w-0 lg:pt-1">
          <Reveal>
            <div className="border-t border-line pt-6">
              <h3 className="eyebrow text-ink-faint">The discipline of restraint</h3>
              <p className="mt-4 text-[15px] leading-[1.95] text-ink-muted"><StyledText text={philosophy.restraint} /></p>
            </div>
          </Reveal>
          <Reveal delay={.05}>
            <div className="mt-9 border-t border-line pt-6">
              <h3 className="eyebrow text-ink-faint">Tools that transform</h3>
              <p className="mt-4 text-[15px] leading-[1.95] text-ink-muted"><StyledText text={philosophy.transform} /></p>
              <div className="my-7 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[.14em] text-ink-faint" aria-label="Input becomes transformation, which creates value">
                <span>Input</span><span className="h-px flex-1 bg-line-strong" /><span className="text-accent">Transformation</span><ArrowRight className="h-3 w-3 text-accent" /><span className="text-ink">Value</span>
              </div>
              <p className="font-serif text-xl italic text-ink-muted">Software worth building leaves the world a little different.</p>
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

      <div id="skills" tabIndex={-1} className="mt-24 grid gap-10 outline-none sm:mt-32 lg:grid-cols-[.85fr_1.3fr] lg:gap-14">
        <Reveal>
          <Eyebrow>Depth, grounded in practice</Eyebrow>
          <Heading>Forged in<br />real <em className="text-accent">systems.</em></Heading>
          <p className="mt-6 max-w-sm text-[13px] leading-[1.9] text-ink-muted">Skills get interesting when they meet real constraints. Follow a language into the work that put it to the test.</p>
          <div className="mt-8 max-w-sm border-t border-line pt-5">
            <p className="eyebrow text-ink-faint">Part of the everyday toolkit</p>
            <p className="mt-3 font-mono text-[10px] leading-[2.2] text-ink-muted">{skills.tools.join(" / ")}</p>
          </div>
        </Reveal>
        <div className="grid min-w-0 gap-4 sm:grid-cols-2">
          <Reveal className="h-full">
            <div className="plate h-full rounded-3xl p-6">
              <p className="eyebrow text-plate-faint">Language fluency</p>
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
              <p className="eyebrow text-plate-faint">Engineering foundations</p>
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