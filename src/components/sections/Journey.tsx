import { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { ArrowUp, ArrowUpRight, Check, Copy, Plus } from "lucide-react";
import { experiences, journey, recognition, personal } from "../../data/portfolio";
import { reading } from "../../data/caseStudies";
import { Section, Eyebrow, Heading, Reveal, TechLine } from "../ui";
import { StyledText } from "../StyledText";
import { GithubIcon, LinkedinIcon } from "../Icons";
import { MixedGlyph } from "../ThemeDock";
import { usePortfolio } from "../../context/PortfolioContext";
import { MODE_META, useTheme } from "../../theme/ThemeProvider";
import { useClipboard } from "../../hooks/useClipboard";

const associatedProjects = [
  [{ id: "ems", label: "Employee Monitoring Suite" }, { id: "erp-core", label: "ERP Platform Core" }, { id: "reporting", label: "Reporting Engine" }],
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
            <Eyebrow className="text-plate-faint">A good conversation is a good beginning</Eyebrow>
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
            <div><p className="footer-signature">Ammar Khan<span className="text-accent">.</span></p><p className="mt-1 font-mono text-[8px] uppercase tracking-[.14em] text-plate-faint">&copy; {new Date().getFullYear()} / Made with intention</p></div>
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

export function Journey() {
  const { openProject } = usePortfolio();
  const { reduceMotion } = useTheme();
  const timeline = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timeline, offset: ["start 80%", "end 45%"] });

  return (
    <>
      <Section id="journey" className="pt-8 sm:pt-14">
        <Reveal><Eyebrow>05 / Experience</Eyebrow><Heading>Where the skills<br />were <em className="text-accent">tested.</em></Heading></Reveal>
        <div className="mt-10 space-y-4">
          {experiences.map((experience, index) => (
            <Reveal key={experience.company} delay={index * .05}>
              <details className="plate overflow-hidden rounded-3xl" open={index === 0}>
                <summary className="experience-toggle flex items-center justify-between gap-5 p-6 sm:p-8">
                  <div><p className="eyebrow text-plate-faint">{experience.period}</p><h3 className="mt-3 font-serif text-[1.85rem] leading-tight sm:text-3xl">{experience.company}</h3><p className="mt-2 text-[11px] leading-relaxed text-accent">{experience.role}</p></div>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-plate-line"><Plus className="h-4 w-4 text-plate-muted" /></span>
                </summary>
                <div className="experience-body grid gap-7 px-6 pb-6 sm:px-8 sm:pb-8 md:grid-cols-[.8fr_1.5fr] md:gap-12">
                  <div className="border-t border-plate-line pt-5"><p className="eyebrow text-plate-faint">The toolkit</p><TechLine items={experience.tech} className="mt-3 text-plate-muted" />{associatedProjects[index].length > 0 && <div className="mt-6 space-y-1"><p className="eyebrow mb-2 text-plate-faint">Follow the work</p>{associatedProjects[index].map((project) => <button key={project.id} type="button" onClick={() => openProject(project.id)} className="flex min-h-9 items-center gap-2 text-left text-[10px] text-plate-muted transition-colors hover:text-accent">{project.label}<ArrowUpRight className="h-3 w-3" /></button>)}</div>}</div>
                  <div className="border-t border-plate-line pt-5"><p className="text-[13px] leading-[1.9] text-plate-muted"><StyledText text={experience.summary} /></p><ul className="mt-5 space-y-3">{experience.highlights.map((highlight) => <li key={highlight} className="flex items-start gap-3 text-xs leading-relaxed"><span className="mt-[7px] h-px w-3 shrink-0 bg-accent" />{highlight}</li>)}</ul></div>
                </div>
              </details>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 grid gap-12 sm:mt-28 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <Eyebrow>The longer story</Eyebrow>
            <Heading>From age <em className="text-accent">three</em><br />to architect.</Heading>
            <p className="mt-6 max-w-sm text-[13px] leading-[1.9] text-ink-muted">A computer, an impossible question, and the habit of looking a little deeper. The tools changed. The impulse didn't.</p>
            <div className="mt-7 space-y-3">
              {recognition.map((item) => (
                <div key={item.label} className="flex items-start gap-3 border-t border-line pt-3"><span className="w-[76px] shrink-0 pt-0.5 font-mono text-[9px] uppercase tracking-[.1em] text-ink-faint">{item.label}</span><span className="text-[11px] leading-relaxed text-ink-muted">{item.label === "Research" ? <a href="#writing" className="hover:text-accent">{item.text} <ArrowUpRight className="inline h-3 w-3" /></a> : item.text}</span></div>
              ))}
            </div>
            <div className="mt-6 border-t border-line pt-5"><p className="eyebrow text-ink-faint">The academic foundation / 2019 - 2023</p><h3 className="mt-3 text-sm font-semibold">BS (Honors) Computer Science</h3><p className="mt-1.5 text-xs leading-relaxed text-ink-muted">University of the Punjab, Jhelum Campus<br /><span className="text-accent">3.73 / 4.0 CGPA</span></p></div>
          </Reveal>
          <div ref={timeline} className="relative min-w-0 pt-1">
            <div className="absolute bottom-5 left-[7px] top-3 w-px bg-line-strong" aria-hidden="true" />
            <motion.div className="absolute bottom-5 left-[7px] top-3 w-px origin-top bg-accent" style={{ scaleY: reduceMotion ? 1 : scrollYProgress }} aria-hidden="true" />
            <ol className="space-y-9">
              {journey.map((entry, index) => (
                <li key={entry.title}>
                  <Reveal delay={index * .04}>
                    <div className="relative pl-10"><span className="absolute left-0 top-1 h-[15px] w-[15px] rounded-full border-4 border-paper bg-accent ring-1 ring-line" aria-hidden="true" /><p className="eyebrow text-ink-faint">{entry.period}</p><h3 className="mt-2 font-serif text-[1.75rem]">{entry.title}</h3><p className="mt-2 text-[13px] leading-[1.9] text-ink-muted"><StyledText text={entry.text} /></p></div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <Reveal className="mt-16 sm:mt-20">
          <details id="writing" className="group border-y border-line">
            <summary className="flex items-center justify-between gap-5 py-7"><div><p className="eyebrow text-ink-faint">Beyond the code</p><h3 className="mt-3 font-serif text-2xl sm:text-3xl">Notes, research &amp; shared discoveries.</h3></div><Plus className="h-5 w-5 text-ink-faint transition-transform group-open:rotate-45" /></summary>
            <div className="pb-5">{reading.map((entry) => <a key={entry.title} href={entry.href} target="_blank" rel="noreferrer" className="flex items-start justify-between gap-5 border-t border-line py-6 transition-colors hover:text-accent"><div><p className="font-mono text-[9px] uppercase tracking-widest text-ink-faint">{entry.category}</p><h4 className="mt-2 text-sm font-medium">{entry.title}</h4><p className="mt-2 text-[11px] leading-relaxed text-ink-muted">{entry.publication}</p></div><ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-accent" /></a>)}</div>
          </details>
        </Reveal>
      </Section>
    </>
  );
}