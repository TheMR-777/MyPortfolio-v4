import { useMemo, useState, type PointerEvent } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { personal } from "../../data/portfolio";
import { clickOrigin, MODES, MODE_META, useTheme } from "../../theme/ThemeProvider";
import { MixedGlyph, ModeIcon } from "../ThemeDock";
import { Eyebrow, Label } from "../ui";

const ease = [.22, 1, .36, 1] as const;
/**
 * A discipline isn't just a language or a framework — it's something you'd
 * spend a year understanding. "Mixed mode" is listed here because the two-
 * material system IS the thesis, and a thesis earns its place among the skills
 * that built the site. If you notice it and smile, that's the portfolio being
 * itself.
 */
const disciplines = [
  "Modern C++", "System architecture", "Cryptography", ".NET",
  "Mixed mode", "Agentic orchestration",
  "Scientific computing", "Thoughtful interfaces", "Open source",
];

/** Fisher–Yates, non-mutating. */
function shuffle<T>(items: readonly T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * The resting tilt of the identity plate drifts by a hair per visit — as if
 * the card were set down by hand rather than placed by a machine.
 *
 * Deliberately tiny: ±0.35° per axis, against a ±1.5° pointer range. That
 * is below the threshold where anyone would consciously read the card as
 * "crooked", but enough that two visits are not bit-for-bit identical. The
 * pointer tilt is added on top, so interaction still feels centred. Zero
 * under reduced motion, where the plate must sit perfectly flat.
 */
function restingTilt() {
  return { x: (Math.random() * 2 - 1) * 0.35, y: (Math.random() * 2 - 1) * 0.35 };
}

function IdentityPlate() {
  const { mode, accent, setMode, reduceMotion } = useTheme();
  const [imageFailed, setImageFailed] = useState(false);
  const rest = useMemo(restingTilt, []);
  const tiltX = useMotionValue(reduceMotion ? 0 : rest.x);
  const tiltY = useMotionValue(reduceMotion ? 0 : rest.y);
  const rotateX = useSpring(tiltX, { stiffness: 110, damping: 22 });
  const rotateY = useSpring(tiltY, { stiffness: 110, damping: 22 });
  const next = MODES[(MODES.indexOf(mode) + 1) % MODES.length];

  function move(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    tiltX.set(rest.x + ((event.clientY - rect.top) / rect.height - .5) * -3);
    tiltY.set(rest.y + ((event.clientX - rect.left) / rect.width - .5) * 3);
  }

  return (
    <motion.div
      className="plate identity-plate p-6 sm:p-7"
      style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1200 }}
      onPointerMove={move}
      onPointerLeave={() => { tiltX.set(reduceMotion ? 0 : rest.x); tiltY.set(reduceMotion ? 0 : rest.y); }}
    >
      <svg viewBox="0 0 310 310" className="identity-orbit" aria-hidden="true">
        {Array.from({ length: 14 }, (_, index) => <circle key={index} cx="155" cy="155" r={28 + index * 9} />)}
      </svg>
      <div className="flex items-start justify-between gap-5">
        <div className="min-w-0 pt-1">
          <Label onPlate>The person behind the systems</Label>
          <p className="identity-title mt-4 font-serif text-[2rem] leading-[1.04] tracking-tight">An engineer.<br />Always <em className="text-accent">curious.</em></p>
          <p className="mt-3 text-[11px] leading-relaxed text-plate-muted">{personal.currentTitle}<br /><span className="font-medium text-plate-fg">{personal.company}</span></p>
        </div>
        <div className="portrait-frame mt-1">
          {imageFailed ? (
            <span className="grid h-full place-items-center font-serif text-6xl italic text-accent" aria-label="Ammar Khan monogram">A</span>
          ) : (
            <img src={personal.profileImage} alt="Muhammad Ammar Khan" width="104" height="120" fetchPriority="high" decoding="async" onError={() => setImageFailed(true)} />
          )}
        </div>
      </div>
      <dl className="identity-grid mt-6 border-t border-plate-line">
        {personal.stats.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse gap-1">
            <dt className="text-[10px] leading-relaxed text-plate-muted">{stat.label}</dt>
            <dd className="font-serif text-[2.7rem] leading-none tracking-tight">{stat.value}<span className="text-accent" aria-hidden="true">.</span></dd>
          </div>
        ))}
      </dl>
      <button
        type="button"
        className="group flex w-full items-center gap-3 border-t border-plate-line pt-6 text-left"
        onClick={(event) => setMode(next, clickOrigin(event))}
        aria-label={`Currently ${MODE_META[mode].label} mode. Try ${MODE_META[next].label} mode.`}
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-plate-line text-accent"><ModeIcon mode={mode} className="h-5 w-5" /></span>
        <span className="flex-1">
          <span className="block text-xs font-medium">{MODE_META[mode].material}</span>
          <span className="mt-1 block text-[10px] text-plate-faint">{MODE_META[mode].label} mode &middot; {accent.name} accent</span>
        </span>
        <ArrowRight className="h-4 w-4 text-plate-muted transition-transform group-hover:translate-x-1" />
      </button>
    </motion.div>
  );
}

export function Hero() {
  const { reduceMotion } = useTheme();
  const { scrollY } = useScroll();
  // Shuffled once per page load and shared by both marquee copies, so the
  // seamless loop never shows a seam where copy one meets copy two.
  const marquee = useMemo(() => shuffle(disciplines), []);
  // The glows drift upward as you scroll — giving the hero a sense of
  // physical depth: you're not scrolling past flat color, you're moving
  // through a space. Hooks must always run; the values are constant under
  // reduced motion.
  const rawGlowY = useTransform(scrollY, [0, 600], [0, -80]);
  const rawGlowFade = useTransform(scrollY, [0, 500], [1, 0.15]);
  const glowY = reduceMotion ? 0 : rawGlowY;
  const glowFade = reduceMotion ? 1 : rawGlowFade;

  return (
    <section id="top" tabIndex={-1} className="relative overflow-hidden pt-32 outline-none sm:pt-40 lg:pt-44">
      <motion.div className="glow pointer-events-none absolute -left-52 -top-8 h-[42rem] w-[42rem]" style={{ y: glowY, opacity: glowFade }} aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_.88fr] lg:items-end lg:gap-16">
          <div className="min-w-0">
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, ease }}>
              <Eyebrow>Software architect &amp; security engineer</Eyebrow>
            </motion.div>
            <h1 className="hero-name mt-8" aria-label={personal.name}>
              {["Muhammad", "Ammar", "Khan"].map((word, index) => (
                <span key={word} className="hero-word block" aria-hidden="true">
                  <motion.span className="block" initial={reduceMotion ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ duration: .95, delay: reduceMotion ? 0 : .08 + index * .09, ease }}>
                    {index === 1 ? <em className="text-accent">{word}</em> : word}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              className="mt-7 max-w-[29rem] text-[15px] leading-[1.85] text-ink-muted sm:text-base"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: reduceMotion ? 0 : .35, ease }}
            >
              I turn complex problems into clear, resilient software.<br className="hidden sm:block" /> Built with a security mindset, shaped by curiosity.
            </motion.p>
            <motion.div className="mt-7 flex flex-wrap items-center gap-5 sm:gap-7" initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: reduceMotion ? 0 : .5, ease }}>
              <a href="#work" className="primary-button group">Explore the work <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
              <a href="#mode" className="text-link min-h-12"><MixedGlyph className="h-4 w-4 text-accent" /> Meet Mixed mode</a>
            </motion.div>
          </div>
          <motion.div className="mx-auto w-full max-w-[30rem] lg:mb-1" initial={reduceMotion ? false : { opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: reduceMotion ? 0 : .25, ease }}>
            <IdentityPlate />
          </motion.div>
        </div>
        <div className="mt-12 flex items-center justify-between gap-6 border-t border-line py-5 lg:mt-16">
          <p className="font-mono text-[9px] uppercase tracking-[.18em] text-ink-faint sm:text-[10px]">Jhelum, Pakistan <span className="px-1.5 text-accent">/</span> Building beyond borders</p>
          <a href="#mode" className="hero-scroll hidden items-center gap-3 font-mono text-[9px] uppercase tracking-[.18em] text-ink-muted sm:inline-flex">A little further down <ArrowDown className="h-3.5 w-3.5" /></a>
        </div>
      </div>
      <div className="mask-fade-x overflow-hidden border-y border-line py-4" aria-hidden="true">
        <div className="marquee font-mono text-[10px] uppercase tracking-[.24em] text-ink-faint">
          {[0, 1].map((copy) => <div key={copy}>{marquee.map((discipline) => <span key={discipline} className="inline-flex items-center gap-10">{discipline}<span className="h-1 w-1 rounded-full bg-accent" /></span>)}</div>)}
        </div>
      </div>
    </section>
  );
}