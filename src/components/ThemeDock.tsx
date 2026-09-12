import { AnimatePresence, motion } from "framer-motion";
import { Check, Moon, Palette, RotateCcw, Sun, X } from "lucide-react";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { ACCENTS, clickOrigin, MODES, MODE_META, useTheme, type Mode } from "../theme/ThemeProvider";
import { cn } from "../utils/cn";

export function MixedGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ModeIcon({ mode, className = "h-4 w-4" }: { mode: Mode; className?: string }) {
  return mode === "light" ? <Sun className={className} aria-hidden="true" />
    : mode === "dark" ? <Moon className={className} aria-hidden="true" />
    : <MixedGlyph className={className} />;
}

export function ThemeDock() {
  const { mode, accent, setMode, setAccent, reduceMotion, motionEnabled, setMotionEnabled, systemReducedMotion, persistenceAvailable, resetTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const popoverId = useId();

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  function handleArrows(event: KeyboardEvent<HTMLDivElement>) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>("[data-theme]");
    if (!button) return;
    event.preventDefault();
    const index = MODES.indexOf(button.dataset.theme as Mode);
    const next = event.key === "Home" ? 0 : event.key === "End" ? 2 : (index + (event.key === "ArrowRight" ? 1 : 2)) % 3;
    const target = root.current?.querySelector<HTMLButtonElement>(`[data-theme="${MODES[next]}"]`);
    target?.focus();
    const rect = target?.getBoundingClientRect();
    setMode(MODES[next], rect ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : undefined);
  }

  return (
    <div ref={root} className="theme-dock" onBlurCapture={(event) => {
      if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false);
    }}>
      <AnimatePresence>
        {open && (
          <motion.section
            id={popoverId}
            aria-label="Appearance preferences"
            className="plate theme-popover"
            initial={reduceMotion ? false : { opacity: 0, y: 10, x: "-50%", scale: .97 }}
            animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : 8, scale: reduceMotion ? 1 : .98 }}
            transition={{ duration: reduceMotion ? 0 : .22 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="eyebrow text-plate-faint">Make it yours</p>
                <p className="mt-1 font-serif text-2xl">A touch of <span className="text-accent">{accent.name.toLowerCase()}.</span></p>
              </div>
              <button type="button" className="icon-button -mr-2 text-plate-muted" aria-label="Close appearance preferences" onClick={() => { setOpen(false); trigger.current?.focus(); }}>
                <X className="h-4 w-4" />
              </button>
            </div>
            <fieldset className="mt-4 flex justify-between">
              <legend className="sr-only">Accent color</legend>
              {ACCENTS.map((color) => (
                <label key={color.id} className="swatch-label" title={color.name}>
                  <input type="radio" className="sr-only" name={`${popoverId}-accent`} value={color.id} checked={accent.id === color.id} onChange={() => setAccent(color)} aria-label={color.name} />
                  <span style={{ background: `hsl(${color.h} ${color.s}% ${mode === "light" ? color.light : color.dark}%)` }}>
                    {accent.id === color.id && <Check className="h-3 w-3 text-on-accent" strokeWidth={2.5} aria-hidden="true" />}
                  </span>
                </label>
              ))}
            </fieldset>
            <div className="mt-4 flex items-center justify-between border-t border-plate-line pt-4">
              <div>
                <p id={`${popoverId}-motion-label`} className="text-xs font-medium">Gentle motion</p>
                <p id={`${popoverId}-motion-note`} className="mt-1 text-[10px] text-plate-faint">{systemReducedMotion ? "Reduced by your system preference" : "Small movements, never distractions"}</p>
              </div>
              <button
                type="button" role="switch" aria-checked={!reduceMotion}
                aria-labelledby={`${popoverId}-motion-label`} aria-describedby={`${popoverId}-motion-note`}
                disabled={systemReducedMotion}
                onClick={() => setMotionEnabled(!motionEnabled)}
                className="grid h-11 w-11 place-items-center disabled:opacity-50"
              >
                <span className={cn("relative h-5 w-8 rounded-full border transition-colors", reduceMotion ? "border-plate-line bg-plate-2" : "border-accent bg-accent")}>
                  <span className={cn("absolute top-[3px] h-3 w-3 rounded-full transition-transform", reduceMotion ? "left-[3px] bg-plate-muted" : "left-[3px] translate-x-3 bg-on-accent")} />
                </span>
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-plate-line pt-3">
              <span className="text-[10px] text-plate-faint">{persistenceAvailable ? "Remembered on this device" : "Applied for this visit"}</span>
              <button type="button" className="inline-flex min-h-8 items-center gap-1.5 text-[10px] text-plate-muted hover:text-accent" onClick={resetTheme}>
                <RotateCcw className="h-3 w-3" /> Reset
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <div className="plate theme-dock-shell flex items-center gap-1 p-1.5">
        <div className="flex items-center rounded-full bg-plate-fg/5" role="group" aria-label="Theme mode" onKeyDown={handleArrows}>
          {MODES.map((item) => (
            <button
              key={item} type="button" data-theme={item} aria-pressed={mode === item}
              aria-label={`${MODE_META[item].label} mode`} title={MODE_META[item].blurb}
              onClick={(event) => setMode(item, clickOrigin(event))}
              className={cn("theme-button", mode === item ? "text-plate" : "text-plate-muted hover:text-plate-fg")}
            >
              {mode === item && <motion.span layoutId="active-theme" className="absolute inset-0 rounded-full bg-plate-fg" transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }} />}
              <span className="relative"><ModeIcon mode={item} className="h-3.5 w-3.5" /></span>
              <span className="relative">{MODE_META[item].label}</span>
            </button>
          ))}
        </div>
        <span aria-hidden="true" className="mx-1 h-4 w-px bg-plate-line" />
        <button
          ref={trigger} type="button" aria-label="Customize appearance" aria-expanded={open} aria-controls={popoverId}
          onClick={() => setOpen((value) => !value)}
          className={cn("icon-button text-plate-muted", open && "bg-accent-soft text-accent")}
        >
          <span className="relative">
            <Palette className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-accent ring-2 ring-plate" />
          </span>
        </button>
      </div>
      <p className="sr-only" role="status">{MODE_META[mode].label} mode, {accent.name} accent.</p>
    </div>
  );
}