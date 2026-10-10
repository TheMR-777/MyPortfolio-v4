import { ArrowRight, ArrowUpRight } from "lucide-react";
import { contributions, projects } from "../../data/portfolio";
import { usePortfolio } from "../../context/PortfolioContext";
import { Section, Eyebrow, Heading, Label, Reveal, TechLine } from "../ui";
import { GithubIcon } from "../Icons";
import { CraftVisual, hasCraftArt } from "../ProjectVisual";

const personal = projects.filter((project) => project.personal);
const cards = personal.filter((project) => hasCraftArt(project.id));
const extras = personal.filter((project) => !hasCraftArt(project.id));

export function Craft() {
  const { openProject } = usePortfolio();
  return (
    <div className="plate mx-3 rounded-[2rem] border-0 sm:mx-6 sm:rounded-[2.5rem]">
      <Section id="craft" className="py-16 sm:py-24">
        <Reveal>
          <Eyebrow className="text-plate-faint">03 / Personal craft &amp; open source</Eyebrow>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Heading>Built because<br />I <em className="text-accent">wanted</em> it to exist.</Heading>
            <p className="max-w-[18rem] text-[13px] leading-[1.85] text-plate-muted">None of these were commissioned. Each one takes something in and gives something genuinely new back — which is the test.</p>
          </div>
        </Reveal>

        <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((project, index) => (
            <Reveal key={project.id} delay={(index % 3) * .055} className="h-full">
              <article className="craft-item h-full">
                <button type="button" className="flex flex-1 flex-col text-left" onClick={() => openProject(project.id)} aria-label={`Explore ${project.title}${project.id === "moire" ? " and try the interactive experiment" : ""}`}>
                  <div className="w-full"><CraftVisual id={project.id} /></div>
                  <div className="p-5 sm:p-6">
                    <p className="font-mono text-[8px] uppercase tracking-[.16em] text-plate-faint">{project.kind}</p>
                    <h3 className="mt-3 font-serif text-[1.85rem] leading-none tracking-tight">{project.title}</h3>
                    <p className="mt-3 text-xs leading-[1.9] text-plate-muted">{project.summary}</p>
                    {project.id === "moire" && <span className="mt-3 inline-flex items-center gap-2 text-[10px] text-accent">A little experiment inside <ArrowRight className="h-3 w-3" /></span>}
                  </div>
                </button>
                <div className="flex items-center justify-between gap-2 border-t border-plate-line px-5 py-2 sm:px-6">
                  <TechLine items={project.tech.slice(0, 2)} className="text-[9px] text-plate-faint" />
                  <div className="flex shrink-0">
                    {project.repo && <a href={project.repo} target="_blank" rel="noreferrer" className="icon-button text-plate-muted" aria-label={`${project.title} source on GitHub, opens in a new tab`}><GithubIcon className="h-3.5 w-3.5" /></a>}
                    {project.link && <a href={project.link} target="_blank" rel="noreferrer" className="icon-button text-plate-muted" aria-label={`Visit ${project.title}, opens in a new tab`}><ArrowUpRight className="h-4 w-4" /></a>}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-8 border-t border-plate-line pt-8 md:grid-cols-2 md:gap-14">
          <Reveal>
            <Label onPlate>Also kept alive</Label>
            <div className="mt-4">
              {extras.map((project) => (
                <button key={project.id} type="button" onClick={() => openProject(project.id)} className="group flex w-full items-center gap-4 border-b border-plate-line py-3.5 text-left last:border-0" aria-label={`Explore ${project.title}`}>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-medium transition-colors group-hover:text-accent">{project.title}</span>
                    <span className="mt-1 block text-[11px] leading-relaxed text-plate-muted">{project.summary}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-plate-faint transition-colors group-hover:text-accent" />
                </button>
              ))}
            </div>
          </Reveal>
          <Reveal delay={.06}>
            <Label onPlate>Contributed to</Label>
            <div className="mt-4">
              {contributions.map((entry) => (
                <a key={entry.name} href={entry.href} target="_blank" rel="noreferrer" className="group flex items-center gap-4 border-b border-plate-line py-3.5 last:border-0">
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-medium transition-colors group-hover:text-accent">{entry.name} <span className="ml-1 font-mono text-[9px] uppercase tracking-widest text-plate-faint">{entry.role}</span></span>
                    <span className="mt-1 block text-[11px] leading-relaxed text-plate-muted">{entry.note}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-plate-faint transition-colors group-hover:text-accent" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-plate-line pt-6">
          <p className="font-serif text-xl italic text-plate-muted">Useful things deserve to be shared.</p>
          <a href="https://github.com/TheMR-777" target="_blank" rel="noreferrer" className="text-link min-h-11 text-xs">More on GitHub <ArrowUpRight className="h-4 w-4" /></a>
        </Reveal>
      </Section>
    </div>
  );
}
