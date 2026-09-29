import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { ArrowUp, ArrowUpRight, Check, Copy, Plus } from "lucide-react";
import { cn } from "../../utils/cn";
import { certifications, community, disclosures, education, experiences, globalRecognition, journey, milestones, personal, vision } from "../../data/portfolio";
import { reading } from "../../data/caseStudies";
import { Section, Eyebrow, Heading, Label, Reveal, TechLine } from "../ui";
import { StyledText } from "../StyledText";
import { GithubIcon, LinkedinIcon } from "../Icons";
import { MixedGlyph } from "../ThemeDock";
import { usePortfolio } from "../../context/PortfolioContext";
import { MODE_META, useTheme } from "../../theme/ThemeProvider";
import { useClipboard } from "../../hooks/useClipboard";

const associatedProjects = [
  [{ id: "ems", label: "Employee Monitoring Suite" }, { id: "reporting", label: "Unified Reporting Engine" }, { id: "apple-mdm", label: "Apple MDM Platform" }],
  [{ id: "uwb", label: "UWB Positioning Simulation" }],
  [],
];

export function Contact() {
  const { mode, accent } = useTheme();
  const { jumpTo } = usePortfolio();
  const { copy, copied, error } = useClipboard();
  const [localTime, setLocalTime] = useState("");
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Karachi", hour: "2-digit", minute: "2-digit", hour12: false });
    const update = () => setLocalTime(formatter.format(new Date()));
    update();
    const timer = setInterval(update, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer id="contact" tabIndex={-1} className="mx-3 mb-28 outline-none sm:mx-6">
      <div className="plate relative overflow-hidden rounded-[2rem] border-0 px-6 py-14 sm:rounded-[2.5rem] sm:px-12 sm:py-20">
        <div className="glow pointer-events-none absolute -right-24 top-0 h-[32rem] w-[32rem]" aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl">
          <Reveal>
            <Label onPlate>A good conversation is a good beginning</Label>
            <h2 className="mt-6 max-w-4xl font-serif text-[2.9rem] leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.65rem]">Creating what hasn't<br className="hidden sm:block" /> been built before.<br /><em className="text-accent">Let's make it happen.</em></h2>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a href={`mailto:${personal.email}?subject=${encodeURIComponent("Let's build something thoughtful")}`} className="primary-button">Start a conversation <ArrowUpRight className="h-4 w-4" /></a>
              <div className="flex min-w-0 items-center gap-1">
                <a href={`mailto:${personal.email}`} className="footer-email text-xs text-plate-muted transition-colors hover:text-accent">{personal.email}</a>
                <button type="button" onClick={() => void copy(personal.email)} className="icon-button shrink-0 text-plate-muted" aria-label={copied ? "Email copied" : "Copy email address"} title={copied ? "Copied" : "Copy email"}>{copied ? <Check className="h-3.5 w-3.5 text-accent" /> : <Copy className="h-3.5 w-3.5" />}</button>
              </div>
            </div>
            <p className="mt-2 min-h-4 text-[10px] text-accent" role="status">{copied ? "Email copied. An interesting conversation is one paste away." : error ? "Select the email address above to copy it manually." : ""}</p>
          </Reveal>
          <div className="mt-9 flex flex-wrap items-center justify-between gap-6 border-t border-plate-line pt-6 sm:mt-12">
            <div className="flex flex-wrap items-center gap-6">
              <a href={personal.social.github} target="_blank" rel="noreferrer" className="text-link min-h-11 text-xs text-plate-muted"><GithubIcon className="h-3.5 w-3.5" /> GitHub <ArrowUpRight className="h-3 w-3" /></a>
              <a href={personal.social.linkedin} target="_blank" rel="noreferrer" className="text-link min-h-11 text-xs text-plate-muted"><LinkedinIcon className="h-3.5 w-3.5" /> LinkedIn <ArrowUpRight className="h-3 w-3" /></a>
              <a href={personal.social.nullbyte} target="_blank" rel="noreferrer" className="text-link min-h-11 text-xs text-plate-muted">Null Byte <ArrowUpRight className="h-3 w-3" /></a>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[.12em] text-plate-faint">Jhelum, Pakistan <span className="px-2 text-accent">/</span> {localTime || "--:--"} PKT</span>
          </div>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="footer-signature">
                Ammar Khan<span className="text-accent">.</span>
              </p>
              <p className="mt-3 font-mono text-[8px] uppercase tracking-[.14em] text-plate-faint">&copy; {new Date().getFullYear()} / Made with intention</p>
            </div>
            <div className="flex items-center gap-6">
              <span className="inline-flex items-center gap-2 font-mono text-[8px] uppercase tracking-[.12em] text-plate-faint"><MixedGlyph className="h-3.5 w-3.5 text-accent" />Ink &amp; Paper <span className="hidden sm:inline">/ {MODE_META[mode].label} &middot; {accent.name}</span></span>
              <a href="#top" onClick={(event) => { event.preventDefault(); jumpTo("top"); }} className="icon-button border border-plate-line text-plate-muted" aria-label="Back to top"><ArrowUp className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * A gentle accordion: native <details> snaps open instantly, which reads as
 * harsh next to the editorial reveals. This animates height + fade on the
 * shared ease, and resolves instantly under reduced motion.
 */
function ExperienceItem({ experience, index }: { experience: (typeof experiences)[number]; index: number }) {
  const { openProject } = usePortfolio();
  const { reduceMotion } = useTheme();
  const [open, setOpen] = useState(index === 0);
  const panelId = `experience-panel-${index}`;

  return (
    <div className="plate overflow-hidden rounded-3xl">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-5 p-6 text-left sm:p-8"
      >
        <span className="min-w-0">
          <Label onPlate>{experience.period}</Label>
          <span className="mt-3 block font-serif text-[1.85rem] leading-tight sm:text-3xl">{experience.company}</span>
          <span className="mt-2 block text-[11px] leading-relaxed text-accent">{experience.role}</span>
        </span>
        <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-full border border-plate-line transition-transform duration-500", open && "rotate-45")}>
          <Plus className="h-4 w-4 text-plate-muted" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            id={panelId}
            initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : .55, ease: [.22, 1, .36, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-7 px-6 pb-6 sm:px-8 sm:pb-8 md:grid-cols-[.8fr_1.5fr] md:gap-12">
              <div className="border-t border-plate-line pt-5">
                <Label onPlate>The toolkit</Label>
                <TechLine items={experience.tech} className="mt-3 text-plate-muted" />
                {associatedProjects[index].length > 0 && (
                  <div className="mt-6 space-y-1">
                    <Label onPlate className="mb-2">Follow the work</Label>
                    {associatedProjects[index].map((project) => (
                      <button key={project.id} type="button" onClick={() => openProject(project.id)} className="flex min-h-9 items-center gap-2 text-left text-[10px] text-plate-muted transition-colors hover:text-accent">{project.label}<ArrowUpRight className="h-3 w-3" /></button>
                    ))}
                  </div>
                )}
              </div>
              <div className="border-t border-plate-line pt-5">
                <p className="text-[13px] leading-[1.9] text-plate-muted"><StyledText text={experience.summary} /></p>
                <ul className="mt-5 space-y-3">{experience.highlights.map((highlight) => <li key={highlight} className="flex items-start gap-3 text-xs leading-relaxed"><span aria-hidden="true" className="mt-[7px] h-px w-3 shrink-0 bg-accent" />{highlight}</li>)}</ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Journey() {
  const { reduceMotion } = useTheme();
  const timeline = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timeline, offset: ["start 80%", "end 45%"] });

  return (
    <Section id="journey" className="pt-8 sm:pt-14">
      <Reveal><Eyebrow>06 / Experience</Eyebrow><Heading>Where the skills<br />were <em className="text-accent">tested.</em></Heading></Reveal>

      <div className="mt-10 space-y-4">
        {experiences.map((experience, index) => (
          <Reveal key={experience.company} delay={index * .05}>
            <ExperienceItem experience={experience} index={index} />
          </Reveal>
        ))}
      </div>

      <div className="mt-24 grid gap-12 sm:mt-28 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <Eyebrow>The longer story</Eyebrow>
          <Heading>From age <em className="text-accent">three</em><br />to architect.</Heading>
          <p className="mt-6 max-w-sm text-[13px] leading-[1.9] text-ink-muted">A computer, an impossible question, and the habit of looking a little deeper. The tools changed. The impulse didn't.</p>

          <div className="mt-8 border-t border-line pt-5">
            <Label>International recognition / 2025</Label>
            <ul className="mt-4 space-y-4">
              {globalRecognition.map((entry) => (
                <li key={entry.institution} className="flex items-start gap-3">
                  <span aria-hidden="true" className={entry.emphasis ? "mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" : "mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full border border-line-strong"} />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold">{entry.institution} <span className="font-normal text-ink-faint">&middot; {entry.place}</span></p>
                    <p className="mt-1 text-[11px] text-ink">{entry.outcome}</p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-ink-muted">{entry.programme}</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-ink-muted">{entry.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[11px] leading-[1.9] text-ink-muted">Every application returned an offer. None was taken up, and the reason was always the same &mdash; not ability, but what it cost. The clearest case is the last barrier standing: a fully funded place I still could not reach.</p>
          </div>

          <div className="mt-6 border-t border-line pt-5">
            <Label>Academic foundation / {education.period}</Label>
            <h3 className="mt-3 text-sm font-semibold">{education.degree}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">{education.institution}<br />{education.result}</p>
            <ul className="mt-3 space-y-1.5">{education.achievements.map((item) => <li key={item} className="text-[11px] leading-relaxed text-ink-muted">{item}</li>)}</ul>
          </div>
        </Reveal>

        <div ref={timeline} className="relative min-w-0 pt-1">
          <div className="absolute bottom-5 left-[7px] top-3 w-px bg-line-strong" aria-hidden="true" />
          <motion.div className="absolute bottom-5 left-[7px] top-3 w-px origin-top bg-accent" style={{ scaleY: reduceMotion ? 1 : scrollYProgress }} aria-hidden="true" />
          <ol className="space-y-9">
            {journey.map((entry, index) => (
              <li key={entry.title}>
                <Reveal delay={index * .04}>
                  <div className="relative pl-10">
                    <span className="absolute left-0 top-1 h-[15px] w-[15px] rounded-full border-4 border-paper bg-accent ring-1 ring-line" aria-hidden="true" />
                    <Label>{entry.period}</Label>
                    <h3 className="mt-2 font-serif text-[1.75rem]">{entry.title}</h3>
                    <p className="mt-2 text-[13px] leading-[1.9] text-ink-muted"><StyledText text={entry.text} /></p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Two stories that sit outside the timeline. Told as narrative, so there is
          no tech stack and no labelled "significance" callout — the note just follows. */}
      <div className="mt-20 border-t border-line pt-10 lg:pt-12">
        <Reveal>
          <Label>Off the timeline</Label>
          <p className="mt-5 max-w-xl font-serif text-[1.9rem] leading-[1.25] tracking-tight sm:text-[2.15rem]">Two that never made it onto a <em className="text-accent">résumé.</em></p>
        </Reveal>
        <div className="mt-9 grid max-w-4xl gap-10 md:grid-cols-2 md:gap-14">
          {milestones.map((milestone, index) => (
            <Reveal key={milestone.title} delay={index * .07}>
              <div>
                <Label>{milestone.period}</Label>
                <h3 className="mt-2.5 font-serif text-[1.45rem] leading-tight">{milestone.title}</h3>
                <p className="mt-4 text-xs leading-[1.9] text-ink-muted"><StyledText text={milestone.text} /></p>
                <p className="mt-4 border-t border-line pt-4 text-[11px] leading-[1.85] text-ink-faint">{milestone.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-20 grid gap-8 border-t border-line pt-10 md:grid-cols-2 md:gap-14">
        <Reveal>
          <Label>Community &amp; mentorship</Label>
          <h3 className="mt-3 font-serif text-2xl">Teaching is how understanding compounds.</h3>
          <p className="mt-4 max-w-md text-xs leading-[1.9] text-ink-muted">{community.description}</p>
          <p className="mt-5 font-mono text-[10px] uppercase tracking-[.12em] text-ink-muted">
            {community.stats.map((stat) => `${stat.value} ${stat.label}`).join("  ·  ")}
          </p>
          <p className="mt-3 font-mono text-[9px] uppercase tracking-[.12em] text-ink-faint">{community.countries.join(" / ")}</p>
        </Reveal>
        <Reveal delay={.06}>
          <Label>Responsible disclosure</Label>
          <h3 className="mt-3 font-serif text-2xl">Found, reported, patched.</h3>
          <ul className="mt-5">
            {disclosures.map((item) => (
              <li key={item.target} className="flex items-center justify-between gap-4 border-t border-line py-3">
                <div className="min-w-0"><p className="text-xs font-medium">{item.target}</p><p className="mt-1 text-[11px] text-ink-muted">{item.type}</p></div>
                <span className="shrink-0 font-mono text-[9px] uppercase tracking-[.12em] text-ink-faint">{item.severity}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[10px] leading-relaxed text-ink-faint">Details withheld by design. Each issue was disclosed privately and patched.</p>
        </Reveal>
      </div>

      {/* A conviction, on paper. It deliberately does not get its own ink plate —
          the footer is the page's single closing gesture, and two stacked slabs
          would deaden it. */}
      <div id="vision" tabIndex={-1} className="mt-24 scroll-mt-28 outline-none sm:mt-28">
        <Reveal>
          <div className="max-w-3xl">
            <Label>A personal conviction — not a forecast</Label>
            <p className="mt-6 font-serif text-[1.7rem] leading-[1.35] tracking-tight sm:text-[2.05rem]">
              <StyledText text={vision.lead} />
            </p>
            <div className="mt-9 space-y-4">
              {vision.pillars.map((pillar) => (
                <p key={pillar.title} className="max-w-2xl text-[13px] leading-[1.95] text-ink-muted">
                  <span className="font-semibold text-ink">{pillar.title}</span> — {pillar.text}
                </p>
              ))}
            </div>
            <blockquote className="mt-9 border-t border-line pt-7 font-serif text-xl italic leading-relaxed text-ink-muted">
              <StyledText text={vision.origin} />
            </blockquote>
            <p className="mt-5 max-w-xl text-[13px] leading-[1.95] text-ink-muted">{vision.originClose}</p>
            <p className="mt-8 max-w-xl border-t border-line pt-6 text-xs leading-[1.9] text-ink-faint">{vision.next}</p>
          </div>
        </Reveal>
      </div>

      {/* One reference shelf, not two stacked disclosures. */}
      <Reveal className="mt-20">
        <details id="writing" className="group border-t border-line">
          <summary className="flex items-center justify-between gap-5 py-7">
            <div>
              <Label>Reference shelf</Label>
              <h3 className="mt-3 font-serif text-2xl sm:text-3xl">Notes, research &amp; study.</h3>
            </div>
            <Plus className="h-5 w-5 shrink-0 text-ink-faint transition-transform group-open:rotate-45" />
          </summary>
          <div className="pb-5">
            {reading.map((entry) => {
              const content = (
                <>
                  <div className="min-w-0">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-ink-faint">{entry.category}</p>
                    <h4 className="mt-2 text-sm font-medium">{entry.title}</h4>
                    <p className="mt-2 max-w-2xl text-[11px] leading-relaxed text-ink-muted">{entry.publication}</p>
                  </div>
                  {entry.href && <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-accent" />}
                </>
              );
              return entry.href ? (
                <a key={entry.title} href={entry.href} target="_blank" rel="noreferrer" className="flex items-start justify-between gap-5 border-t border-line py-6 transition-colors hover:text-accent">{content}</a>
              ) : (
                <div key={entry.title} className="flex items-start justify-between gap-5 border-t border-line py-6">{content}</div>
              );
            })}
            <div className="mt-4 border-t border-line pt-5">
              <Label>Certification</Label>
              <ul>
                {certifications.map((entry) => (
                  <li key={entry.name} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-line/60 py-3.5 first:border-0 first:pt-4">
                    <div className="min-w-0"><p className="text-xs font-medium">{entry.name}</p><p className="mt-1 text-[11px] leading-relaxed text-ink-muted">{entry.note}</p></div>
                    <span className="shrink-0 font-mono text-[9px] uppercase tracking-[.12em] text-ink-faint">{entry.issuer}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </details>
      </Reveal>
    </Section>
  );
}
