import { Plus } from "lucide-react";
import { orchestration } from "../../data/portfolio";
import { Section, Eyebrow, Heading, Label, Reveal } from "../ui";
import { StyledText } from "../StyledText";

const SPECIALISTS = ["Frontend", "Backend", "DB schema", "Data"];

/* One axis rules the whole plate. The four rows are symmetric about it, so the
   coordination rail's midpoint, the fan-out origin and the schema/review boxes
   all land on the same horizontal line. */
const AXIS = 89;
const ROWS = [26, 68, 110, 152];

/**
 * The mechanism, as it actually runs: one brief fans out to four specialists,
 * who coordinate with *each other* on a shared rail to assemble the module's
 * bigger picture — then converge on a single synthesized schema, which I review.
 * The rail is the part a plain funnel would hide, and it is the whole point.
 *
 * The viewBox ratio is kept close to the 174px-tall `.project-visual` so that
 * `preserveAspectRatio` scales to width, keeping the plate filled and centred.
 */
function SquadDiagram() {
  return (
    <div className="project-visual" aria-hidden="true">
      <svg viewBox="0 0 600 178" fill="none">
        <defs>
          <pattern id="squad-dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".75" fill="currentColor" /></pattern>
          <radialGradient id="squad-wash"><stop stopColor="var(--accent)" stopOpacity=".22" /><stop offset="1" stopColor="var(--accent)" stopOpacity="0" /></radialGradient>
        </defs>
        <rect x="10" y="4" width="580" height="170" fill="url(#squad-dots)" opacity=".14" />
        <ellipse cx="300" cy={AXIS} rx="150" ry="82" fill="url(#squad-wash)" />

        <rect x="22" y={AXIS - 22} width="92" height="44" rx="10" fill="var(--plate)" stroke="currentColor" strokeOpacity=".28" />
        <text x="68" y={AXIS - 3} textAnchor="middle" fill="currentColor" opacity=".75">ONE BRIEF</text>
        <text x="68" y={AXIS + 10} textAnchor="middle" fill="currentColor" opacity=".45" style={{ fontSize: 7 }}>SPEC + SCOPE</text>

        {SPECIALISTS.map((role, index) => {
          const row = ROWS[index];
          return (
            <g key={role}>
              <path d={`M114 ${AXIS}C130 ${AXIS} 132 ${row} 148 ${row}`} stroke="currentColor" strokeOpacity=".26" className="diagram-trace" />
              <rect x="148" y={row - 14} width="124" height="28" rx="7" fill="var(--plate)" stroke="currentColor" strokeOpacity=".22" />
              <circle cx="161" cy={row} r="2.5" fill="var(--accent)" />
              <text x="172" y={row + 3.5} fill="currentColor" opacity=".72">{role}</text>
              <path d={`M272 ${row}h28`} stroke="currentColor" strokeOpacity=".28" />
            </g>
          );
        })}

        {/* The coordination rail: what the specialists share, not just where they land.
            It runs exactly first-row to last-row, so its midpoint is the shared axis. */}
        <path d={`M300 ${ROWS[0]}v${ROWS[ROWS.length - 1] - ROWS[0]}`} stroke="var(--accent)" strokeOpacity=".5" strokeDasharray="4 5" />
        {ROWS.map((row) => <circle key={row} cx="300" cy={row} r="2.5" fill="var(--accent)" />)}

        <path d={`M300 ${AXIS}h30`} stroke="currentColor" strokeOpacity=".32" />
        <rect x="330" y={AXIS - 26} width="100" height="52" rx="12" fill="var(--plate)" stroke="var(--accent)" strokeWidth="1.2" />
        <text x="380" y={AXIS - 3} textAnchor="middle" fill="var(--accent)">SCHEMA</text>
        <text x="380" y={AXIS + 11} textAnchor="middle" fill="currentColor" opacity=".5" style={{ fontSize: 7 }}>SYNTHESIZED</text>

        <path d={`M430 ${AXIS}h32`} stroke="currentColor" strokeOpacity=".32" />
        <rect x="462" y={AXIS - 18} width="116" height="36" rx="9" fill="var(--plate)" stroke="currentColor" strokeOpacity=".28" />
        <path d={`M481 ${AXIS}l4 4.5 8.5-10`} stroke="var(--accent)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <text x="506" y={AXIS + 3.5} fill="currentColor" opacity=".65">I REVIEW</text>
      </svg>
    </div>
  );
}

export function Orchestration() {
  return (
    <Section id="orchestration">
      <div className="grid gap-7 lg:grid-cols-[1fr_1.05fr] lg:items-end lg:gap-16">
        <Reveal>
          <Eyebrow>03 / Agentic engineering</Eyebrow>
          <Heading>Directing <em className="text-accent">intelligence</em>,<br />not just writing code.</Heading>
        </Reveal>
        <Reveal delay={.08}>
          <p className="max-w-lg text-[15px] leading-[1.85] text-ink-muted"><StyledText text={orchestration.lead} /></p>
          <p className="mt-4 font-serif text-xl italic text-ink">{orchestration.quote}</p>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-[1.12fr_.88fr]">
        <Reveal className="h-full">
          <div className="plate flex h-full flex-col overflow-hidden rounded-3xl">
            <div className="px-6 pt-6 sm:px-7 sm:pt-7">
              <Label onPlate>A specialist squad, coordinated</Label>
              <p className="mt-3 max-w-md text-xs leading-[1.9] text-plate-muted">{orchestration.squad}</p>
            </div>
            <div className="my-auto pt-2"><SquadDiagram /></div>
            <p className="border-t border-plate-line px-6 py-3 text-center font-mono text-[8px] uppercase tracking-[.17em] text-plate-faint">Conceptual workflow study / No production data</p>
          </div>
        </Reveal>

        <Reveal delay={.06} className="h-full">
          <div className="flex h-full flex-col rounded-3xl border border-line p-6 sm:p-7">
            <Label>The pivot</Label>
            <h3 className="mt-3 font-serif text-[1.75rem] leading-tight">{orchestration.story.title}</h3>
            <p className="mt-3 text-xs leading-[1.9] text-ink-muted">{orchestration.story.text}</p>
            <ul className="mt-5 space-y-3">
              {orchestration.story.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-xs leading-relaxed">
                  <span aria-hidden="true" className="mt-[7px] h-px w-3 shrink-0 bg-accent" />{point}
                </li>
              ))}
            </ul>
            {/* Set as a quiet line, not numerals — the hero identity plate is the
                only place on this page that gets large accent figures. */}
            <div className="mt-auto pt-7">
              <p className="border-t border-line pt-5 font-mono text-[10px] uppercase tracking-[.12em] text-ink-muted">
                {orchestration.outcomes.map((outcome) => `${outcome.value} ${outcome.label}`).join("  ·  ")}
              </p>
              <p className="mt-3 font-mono text-[8px] uppercase tracking-[.15em] text-ink-faint">Reported outcomes at ACE Money Transfer</p>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-12">
        <Label>One workflow, end to end</Label>
        <ol className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-2 font-mono text-[10px] uppercase tracking-[.12em]">
          {orchestration.pipeline.map((step, index) => {
            const isHuman = step === "Human review";
            return (
              <li key={step} className="flex items-center gap-2.5">
                <span className={isHuman ? "font-medium text-accent" : "text-ink-muted"}>{step}</span>
                {index < orchestration.pipeline.length - 1 && <span aria-hidden="true" className="h-px w-4 bg-line-strong" />}
              </li>
            );
          })}
        </ol>
        <p className="mt-5 max-w-2xl text-xs leading-[1.9] text-ink-muted">{orchestration.pipelineNote}</p>
      </Reveal>

      <details className="group mt-10 border-y border-line">
        <summary className="flex min-h-14 items-center justify-between gap-4 py-4 text-xs text-ink-muted">
          <span>The stack behind the orchestration <span className="ml-2 font-mono text-[9px] text-ink-faint">/ Models, tools, method</span></span>
          <Plus className="h-4 w-4 transition-transform group-open:rotate-45" />
        </summary>
        <div className="grid gap-7 pb-7 sm:grid-cols-3 sm:gap-10">
          <div>
            <Label>Models</Label>
            <ul className="mt-3 space-y-1.5 font-mono text-[10px] leading-relaxed text-ink-muted">
              {orchestration.models.map((model) => <li key={model}>{model}</li>)}
            </ul>
          </div>
          <div>
            <Label>Tooling</Label>
            <p className="mt-3 font-mono text-[10px] leading-[2] text-ink-muted">{orchestration.tools.join(" / ")}</p>
          </div>
          <div>
            <Label>Method</Label>
            <ul className="mt-3 space-y-2 text-[11px] leading-relaxed text-ink-muted">
              {orchestration.methods.map((method) => <li key={method}>{method}</li>)}
            </ul>
          </div>
        </div>
      </details>
    </Section>
  );
}
