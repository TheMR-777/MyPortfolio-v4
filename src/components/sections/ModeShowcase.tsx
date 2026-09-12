import { Check, Plus } from "lucide-react";
import { Section, Eyebrow, Heading, Reveal } from "../ui";
import { clickOrigin, MODES, MODE_META, useTheme, type Mode } from "../../theme/ThemeProvider";
import { ModeIcon } from "../ThemeDock";

const descriptions: Record<Mode, string> = {
  light: "An open, familiar canvas. Light surfaces keep the whole experience airy and continuous.",
  mixed: "Warm paper for the story. Deep ink for the details. Two materials, each in its element.",
  dark: "A quieter glow. Layered, low-light surfaces keep the focus on what is in front of you.",
};

function MiniPage({ mode }: { mode: Mode }) {
  return (
    <div className="preview-page bg-paper text-ink" data-preview-mode={mode} aria-hidden="true">
      <div className="plate flex items-center justify-between rounded-full px-3 py-2">
        <span className="font-serif text-xs italic">a.</span>
        <span className="preview-label flex gap-3 text-plate-muted"><span>Work</span><span>About</span><span className="text-accent">Hello</span></span>
      </div>
      <div className="flex items-center justify-between px-2 py-4">
        <div className="preview-quote">A little clarity.<br /><em className="text-accent">A lot of possibility.</em></div>
      </div>
      <div className="grid grid-cols-[1.2fr_1fr] gap-2">
        <div className="plate relative overflow-hidden rounded-xl p-3">
          <p className="preview-label text-plate-faint">01 / ARCHITECTURE</p>
          <svg viewBox="0 0 150 32" className="my-2 h-8 w-full text-accent" fill="none">
            <path d="M0 27H18L25 19L34 24L46 8L60 18L70 13L81 16L93 3L108 12L125 5L150 7" stroke="currentColor" strokeWidth="1.2" />
            <path d="M0 31H150" stroke="currentColor" opacity=".15" />
          </svg>
          <span className="text-[9px] text-plate-muted">Complexity, considered.</span>
        </div>
        <div className="plate flex flex-col justify-between rounded-xl p-3">
          <p className="preview-label text-plate-faint">02 / CRAFT</p>
          <span className="py-1 font-serif text-[22px] italic leading-[1.05] text-accent">Made<br />to matter.</span>
          <span className="text-[9px] text-plate-muted">Every detail has a reason.</span>
        </div>
      </div>
    </div>
  );
}

export function ModeShowcase() {
  const { mode, accent, setMode } = useTheme();
  const surfaces = {
    light: { paper: "#f7f5f0", plate: "#ffffff" },
    mixed: { paper: "#f3efe6", plate: "#101217" },
    dark: { paper: "#0b0d11", plate: "#15171f" },
  };

  return (
    <Section id="mode">
      <div className="grid gap-7 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-20">
        <Reveal>
          <Eyebrow>01 / A small departure from the ordinary</Eyebrow>
          <Heading>Light. Dark.<br /><em className="text-accent">And the one in between.</em></Heading>
        </Reveal>
        <Reveal delay={.08}>
          <p className="max-w-lg text-[15px] leading-[1.85] text-ink-muted">
            Not a compromise between two modes. A conversation between two materials. <span className="font-semibold text-ink">Mixed mode</span> pairs the openness of paper with the depth of ink. The contrast itself becomes the hierarchy.
          </p>
          <p className="mt-4 font-serif text-xl italic text-ink">Same work. A different feeling.</p>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-16" role="group" aria-label="Compare and choose a theme">
        {MODES.map((item, index) => (
          <Reveal key={item} delay={index * .07}>
            <button
              type="button" className="mode-preview h-full w-full"
              data-active={mode === item} data-featured={item === "mixed"}
              aria-pressed={mode === item} aria-label={`Use ${MODE_META[item].label} mode. ${descriptions[item]}`}
              onClick={(event) => setMode(item, clickOrigin(event))}
            >
              <MiniPage mode={item} />
              <div className="px-3 pb-3 pt-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2.5 text-sm font-semibold"><ModeIcon mode={item} />{MODE_META[item].label}<span className="font-serif text-base font-normal italic text-ink-faint">{item === "mixed" ? "a third perspective" : ""}</span></span>
                  {mode === item ? <Check className="h-4 w-4 text-accent" aria-hidden="true" /> : <span className="font-mono text-[9px] uppercase tracking-widest text-ink-faint">Try it</span>}
                </div>
                <p className="mt-3 text-[12px] leading-[1.85] text-ink-muted">{descriptions[item]}</p>
                <div className="mt-4 flex items-center gap-2 border-t border-line pt-3">
                  <span className="h-2.5 w-2.5 rounded-full border border-line-strong" style={{ background: surfaces[item].paper }} />
                  <span className="-ml-3 h-2.5 w-2.5 translate-x-2 rounded-full border border-line-strong" style={{ background: surfaces[item].plate }} />
                  <span className="ml-2 font-mono text-[9px] uppercase tracking-[.1em] text-ink-faint">{MODE_META[item].material}</span>
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 grid gap-8 border-t border-line pt-8 md:grid-cols-3 md:gap-10">
        {[
          { title: "Contrast, with a purpose.", detail: "A distinct material marks a change in focus. Surfaces do more of the work, so decoration can do less." },
          { title: "Room for the eye to rest.", detail: "Generous space and a warm reading canvas balance the concentrated depth of interactive surfaces." },
          { title: "One hue. Two expressions.", detail: "A deeper accent on paper; a softer, brighter one on ink. The same color, tuned to its surroundings." },
        ].map((principle, index) => (
          <Reveal key={principle.title} delay={index * .06}>
            <span className="font-serif text-2xl italic text-accent">0{index + 1}</span>
            <h3 className="mt-3 text-[13px] font-semibold">{principle.title}</h3>
            <p className="mt-2 text-xs leading-[1.9] text-ink-muted">{principle.detail}</p>
          </Reveal>
        ))}
      </div>
      <details className="group mt-10 border-y border-line">
        <summary className="flex min-h-14 items-center justify-between gap-4 py-4 text-xs text-ink-muted">
          <span>Under the surface <span className="ml-2 font-mono text-[9px] text-ink-faint">/ A little design engineering</span></span>
          <Plus className="h-4 w-4 transition-transform group-open:rotate-45" />
        </summary>
        <div className="grid gap-5 pb-6 sm:grid-cols-2 sm:gap-12">
          <p className="max-w-md text-xs leading-[1.9] text-ink-muted">Two surface roles, not three separate websites. Every component inherits its material and its accent contrast. Your preference is remembered locally; no account or tracking is needed.</p>
          <pre className="overflow-x-auto font-mono text-[11px] leading-[1.9] text-ink-muted"><code><span className="text-accent">{MODE_META[mode].label.toLowerCase()}</span>{` {\n  paper: ${surfaces[mode].paper};\n  plate: ${surfaces[mode].plate};\n  accent: ${accent.name.toLowerCase()};\n}`}</code></pre>
        </div>
      </details>
      <p className="material-note mt-8 text-center font-mono text-[9px] uppercase tracking-[.15em] text-ink-faint">Made to be tried. Not just looked at.</p>
    </Section>
  );
}