import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { ACCENTS, MODES, clickOrigin } from "../src/theme/ThemeProvider.tsx";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
  .filter(([, attributes]) => !/\bsrc\s*=|\btype\s*=\s*["']module["']/i.test(attributes))
  .map(([, , body]) => body);

// Execute the actual pre-paint scripts, not a second implementation of them.
// The only substitutes are DOM, storage, random input and system preferences.
function bootstrap({ saved = {}, random = 0, systemReduced = false, storageBlocked = false } = {}) {
  const properties = new Map();
  const writes = [];
  const root = {
    dataset: { mode: html.match(/<html\b[^>]*\bdata-mode\s*=\s*["']([^"']+)["']/i)?.[1] },
    style: { setProperty: (name, value) => properties.set(name, String(value)) },
  };
  const math = Object.create(Math);
  math.random = () => random;
  const sandbox = {
    document: { documentElement: root },
    localStorage: {
      getItem(key) {
        if (storageBlocked) throw new Error("Storage unavailable");
        return saved[key] ?? null;
      },
      setItem: (key, value) => writes.push([key, value]),
    },
    matchMedia: (query) => ({ matches: systemReduced && query === "(prefers-reduced-motion: reduce)" }),
    Math: math,
  };
  expect(scripts.length).toBeGreaterThan(0);
  for (const script of scripts) runInNewContext(script, sandbox, { timeout: 1000 });
  return { root, properties, writes };
}

function expectAccent(properties, accent) {
  expect(properties.get("--ah")).toBe(String(accent.h));
  expect(properties.get("--as")).toBe(`${accent.s}%`);
  expect(properties.get("--accent-light")).toBe(`${accent.light}%`);
  expect(properties.get("--accent-dark")).toBe(`${accent.dark}%`);
}

describe("first paint and saved appearance", () => {
  test("a first visit defaults to Mixed, adopts a valid random accent, and saves no preference", () => {
    const chosen = new Set();
    for (let i = 0; i < ACCENTS.length; i++) {
      const result = bootstrap({ random: (i + 0.5) / ACCENTS.length });
      const accent = ACCENTS.find((candidate) => candidate.id === result.root.dataset.firstAccent);
      expect(accent).toBeDefined();
      chosen.add(accent.id);
      expectAccent(result.properties, accent);
      expect(result.root.dataset.mode).toBe("mixed");
      expect(result.writes).toEqual([]);
    }
    expect(chosen.size).toBe(ACCENTS.length);
  });

  test("all saved modes are honored before React loads", () => {
    for (const mode of MODES) {
      expect(bootstrap({ saved: { mode } }).root.dataset.mode).toBe(mode);
    }
  });

  test("a deliberate saved accent wins and its tokens match the React catalog", () => {
    for (const accent of ACCENTS) {
      const result = bootstrap({ saved: { accent: JSON.stringify({ id: accent.id }) }, random: 0.999 });
      expectAccent(result.properties, accent);
      expect(result.root.dataset.firstAccent).toBeUndefined();
      expect(result.writes).toEqual([]);
    }
  });

  test("unsupported saved choices fall back to Mixed and a valid first impression", () => {
    const result = bootstrap({ saved: { mode: "sepia", accent: '{"id":"unknown-accent"}' } });
    expect(result.root.dataset.mode).toBe("mixed");
    expect(ACCENTS.some((accent) => accent.id === result.root.dataset.firstAccent)).toBe(true);
    expect(result.writes).toEqual([]);
  });

  test("malformed storage and denied storage cannot abort the document bootstrap", () => {
    for (const options of [{ saved: { accent: "not-json" } }, { storageBlocked: true }]) {
      // CSS/React supply the fallback. This does not claim a flash-free first paint.
      const result = bootstrap(options);
      expect(result.root.dataset.mode).toBe("mixed");
      expect(result.writes).toEqual([]);
    }
  });

  test("either system reduction or the visitor's motion switch disables pre-paint motion", () => {
    expect(bootstrap().root.dataset.motion).toBe("on");
    expect(bootstrap({ systemReduced: true }).root.dataset.motion).toBe("off");
    expect(bootstrap({ saved: { motion: "off" } }).root.dataset.motion).toBe("off");
    expect(bootstrap({ saved: { motion: "on" }, systemReduced: true }).root.dataset.motion).toBe("off");
  });
});

describe("theme transition activation point", () => {
  const currentTarget = { getBoundingClientRect: () => ({ left: 20, top: 40, width: 80, height: 42 }) };

  test("pointer activation uses the actual pointer coordinates", () => {
    expect(clickOrigin({ currentTarget, detail: 1, clientX: 35, clientY: 55 })).toEqual({ x: 35, y: 55 });
  });

  test("keyboard activation uses the button center, not the browser's zero coordinates", () => {
    expect(clickOrigin({ currentTarget, detail: 0, clientX: 0, clientY: 0 })).toEqual({ x: 60, y: 61 });
  });
});
