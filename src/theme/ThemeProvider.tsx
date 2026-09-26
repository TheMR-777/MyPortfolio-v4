import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { MotionConfig, useReducedMotion } from "framer-motion";

export type Mode = "light" | "dark" | "mixed";
export type Accent = { id: string; name: string; h: number; s: number; light: number; dark: number };
export const MODES: Mode[] = ["light", "mixed", "dark"];
export const ACCENTS: Accent[] = [
  { id: "iris", name: "Iris", h: 262, s: 84, light: 49, dark: 76 },
  { id: "ember", name: "Ember", h: 24, s: 88, light: 35, dark: 73 },
  { id: "moss", name: "Moss", h: 152, s: 62, light: 27, dark: 70 },
  { id: "rose", name: "Rose", h: 345, s: 78, light: 42, dark: 77 },
  { id: "tide", name: "Tide", h: 198, s: 86, light: 31, dark: 73 },
  { id: "gold", name: "Gold", h: 44, s: 90, light: 28, dark: 74 },
];

export const MODE_META: Record<Mode, { label: string; blurb: string; material: string }> = {
  light: { label: "Light", blurb: "Airy surfaces. An uninterrupted canvas.", material: "Paper on paper" },
  dark: { label: "Dark", blurb: "Quiet depth. A little less light.", material: "Ink on ink" },
  mixed: { label: "Mixed", blurb: "A little light. A little dark. In balance.", material: "Ink on paper" },
};

type Context = {
  mode: Mode;
  accent: Accent;
  setMode: (mode: Mode, origin?: { x: number; y: number }) => void;
  setAccent: (accent: Accent) => void;
  motionEnabled: boolean;
  setMotionEnabled: (enabled: boolean) => void;
  reduceMotion: boolean;
  systemReducedMotion: boolean;
  persistenceAvailable: boolean;
  resetTheme: () => void;
};
const ThemeContext = createContext<Context | null>(null);

function stored(key: string) {
  try { return localStorage.getItem(key); } catch { return null; }
}

export function clickOrigin(event: MouseEvent<HTMLElement>) {
  const bounds = event.currentTarget.getBoundingClientRect();
  return event.detail === 0
    ? { x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2 }
    : { x: event.clientX, y: event.clientY };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>(() => {
    const saved = stored("mode");
    return MODES.includes(saved as Mode) ? saved as Mode : "mixed";
  });
  /**
   * Accent, and whether the visitor *chose* it.
   *
   * On a first-ever visit — nothing saved — the starting accent is picked at
   * random, so every visitor's first look is a slightly different portfolio.
   * But a random first impression is not a preference: it lives in memory only
   * and is never written to storage. The moment the visitor explicitly picks a
   * swatch (dock, palette, or reset), `accentChosen` flips and from then on
   * their choice is persisted and honoured on every return. Respecting a
   * deliberate choice always beats surprising someone twice.
   */
  const [accentState, setAccentInternal] = useState<{ accent: Accent; chosen: boolean }>(() => {
    try {
      const saved = ACCENTS.find((a) => a.id === JSON.parse(stored("accent") ?? "null")?.id);
      if (saved) return { accent: saved, chosen: true };
    } catch { /* fall through to a fresh first impression */ }
    // The pre-paint bootstrap in index.html already picked a random accent to
    // avoid a flash; adopt the same one so React and the first paint agree.
    const first = ACCENTS.find((a) => a.id === document.documentElement.dataset.firstAccent);
    return { accent: first ?? ACCENTS[Math.floor(Math.random() * ACCENTS.length)], chosen: false };
  });
  const accent = accentState.accent;
  const setAccentState = useCallback((next: Accent) => setAccentInternal({ accent: next, chosen: true }), []);
  const [motionEnabled, setMotionEnabled] = useState(() => stored("motion") !== "off");
  const [persistenceAvailable, setPersistenceAvailable] = useState(true);
  const systemReducedMotion = useReducedMotion() ?? false;
  const reduceMotion = !motionEnabled || systemReducedMotion;
  const activeTransition = useRef<ViewTransition | null>(null);
  const currentMode = useRef(mode);
  const transitionSequence = useRef(0);

  useLayoutEffect(() => {
    document.documentElement.dataset.mode = mode;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", mode === "dark" ? "#0b0d11" : mode === "mixed" ? "#f3efe6" : "#f7f5f0");
    try { localStorage.setItem("mode", mode); } catch { setPersistenceAvailable(false); }
  }, [mode]);

  useLayoutEffect(() => {
    const style = document.documentElement.style;
    style.setProperty("--ah", String(accent.h));
    style.setProperty("--as", `${accent.s}%`);
    style.setProperty("--accent-light", `${accent.light}%`);
    style.setProperty("--accent-dark", `${accent.dark}%`);
    // Only a deliberate choice is remembered. A random first impression stays
    // in memory, so the next visit is free to make a different one.
    if (!accentState.chosen) return;
    try { localStorage.setItem("accent", JSON.stringify(accent)); } catch { setPersistenceAvailable(false); }
  }, [accent, accentState.chosen]);

  useLayoutEffect(() => {
    document.documentElement.dataset.motion = reduceMotion ? "off" : "on";
    try { localStorage.setItem("motion", motionEnabled ? "on" : "off"); } catch { setPersistenceAvailable(false); }
  }, [motionEnabled, reduceMotion]);

  useEffect(() => () => {
    activeTransition.current?.skipTransition();
    delete document.documentElement.dataset.themeTransition;
  }, []);

  const setMode = useCallback((next: Mode, origin?: { x: number; y: number }) => {
    if (next === currentMode.current) return;
    currentMode.current = next;
    const sequence = ++transitionSequence.current;
    activeTransition.current?.skipTransition();
    const commit = () => {
      if (sequence !== transitionSequence.current) return;
      document.documentElement.dataset.mode = next;
      flushSync(() => setModeState(next));
    };

    if (!document.startViewTransition || reduceMotion || document.querySelector("dialog[open]")) {
      delete document.documentElement.dataset.themeTransition;
      commit();
      return;
    }

    const x = origin?.x ?? innerWidth / 2;
    const y = origin?.y ?? innerHeight / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.documentElement.dataset.themeTransition = "true";
    let transition: ViewTransition;
    try {
      transition = document.startViewTransition(commit);
    } catch {
      delete document.documentElement.dataset.themeTransition;
      commit();
      return;
    }
    activeTransition.current = transition;
    void transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(.22, 1, .36, 1)", pseudoElement: "::view-transition-new(root)", fill: "both" },
      );
    }).catch(() => { /* A superseded transition still commits its latest valid state. */ });
    void transition.finished.finally(() => {
      if (activeTransition.current === transition) {
        activeTransition.current = null;
        delete document.documentElement.dataset.themeTransition;
      }
    }).catch(() => { /* The non-animated page remains usable if a snapshot fails. */ });
  }, [reduceMotion]);

  const resetTheme = useCallback(() => {
    setAccentState(ACCENTS[0]);
    setMode("mixed");
    setMotionEnabled(true);
  }, [setMode]);

  const value = useMemo(() => ({
    mode, accent, setMode, setAccent: setAccentState, motionEnabled,
    setMotionEnabled, reduceMotion, systemReducedMotion, persistenceAvailable, resetTheme,
  }), [mode, accent, setMode, motionEnabled, reduceMotion, systemReducedMotion, persistenceAvailable, resetTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <MotionConfig reducedMotion={reduceMotion ? "always" : "never"}>
        {children}
      </MotionConfig>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme requires ThemeProvider");
  return context;
}