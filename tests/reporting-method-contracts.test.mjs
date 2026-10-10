import { describe, expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ProjectVisual } from "../src/components/ProjectVisual.tsx";
import { Orchestration } from "../src/components/sections/Orchestration.tsx";
import { PortfolioProvider, sections } from "../src/context/PortfolioContext.tsx";
import { ThemeProvider } from "../src/theme/ThemeProvider.tsx";
import { orchestration, projects } from "../src/data/portfolio.ts";
import { caseStudies } from "../src/data/caseStudies.ts";

// Real components/providers, with only their browser initialization boundaries
// supplied. No effects, CSS geometry, click handling or native dialog claims.
function renderMethod() {
  const boundaries = {
    window: {
      location: new URL("https://portfolio.test/#orchestration"),
      addEventListener() {},
      removeEventListener() {},
    },
    document: { documentElement: { dataset: { firstAccent: "iris" } } },
    localStorage: { getItem: (key) => key === "motion" ? "off" : null },
  };
  const previous = Object.fromEntries(Object.keys(boundaries).map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  try {
    for (const [key, value] of Object.entries(boundaries)) Object.defineProperty(globalThis, key, { configurable: true, value });
    return renderToStaticMarkup(createElement(ThemeProvider, null,
      createElement(PortfolioProvider, null, createElement(Orchestration))));
  } finally {
    for (const key of Object.keys(boundaries)) {
      if (previous[key]) Object.defineProperty(globalThis, key, previous[key]);
      else delete globalThis[key];
    }
  }
}

const escaped = (text) => renderToStaticMarkup(createElement("span", null, text)).slice(6, -7);

describe("retained Reporting and method contracts", () => {
  test("Reporting decoration is hidden from assistive technology and adds no focus targets", () => {
    const html = renderToStaticMarkup(createElement(ProjectVisual, { id: "reporting", className: "test-cover" }));
    expect(html).toContain("test-cover");
    expect(html).toContain('aria-hidden="true"');
    expect(html).not.toMatch(/<(?:button|a|input|select|textarea)\b|tabindex=/i);
    // Meaning and the conceptual-art disclosure belong to adjacent case-study
    // prose, not duplicated inside an aria-hidden drawing. SVG is permitted.
  });

  test("act metadata distinguishes five acts from the retained method and reference anchors", () => {
    expect(sections.filter((section) => section.ordinal).map(({ id, ordinal }) => [id, ordinal]))
      .toEqual([["mode", "01"], ["work", "02"], ["craft", "03"], ["philosophy", "04"], ["journey", "05"]]);
    for (const id of ["orchestration", "skills", "vision", "contact"]) {
      expect(sections.find((section) => section.id === id)).toBeDefined();
      expect(sections.find((section) => section.id === id).ordinal).toBeUndefined();
    }
  });

  test("method keeps a focusable anchor, visible credit, review boundary and a native case-study action", () => {
    const html = renderMethod();
    expect(html).toMatch(/<section\b[^>]*id="orchestration"[^>]*tabindex="-1"/);
    expect(html).toMatch(/<button\b[^>]*type="button"[^>]*>Read the reporting case study/);
    const introduction = html.slice(0, html.indexOf("<details"));
    for (const text of [orchestration.lead, orchestration.squad]) expect(introduction).toContain(escaped(text));
    const prose = introduction.replace(/<svg\b[\s\S]*?<\/svg>/g, "");
    for (const text of ["frontend, backend, database-schema, and data specialists", "shared rail", "synthesized into a schema", "explicit human review"]) expect(prose).toContain(text);
    expect(introduction).toContain("Conceptual workflow study / No production data");
    expect(introduction).not.toContain("opacity:0"); // App motion-off boundary.
  });

  test("adoption, reported outcomes and the separate company workflow remain rendered", () => {
    const html = renderMethod();
    for (const text of [orchestration.story.title, orchestration.story.text, ...orchestration.story.points, "Reported outcomes at ACE Money Transfer"]) expect(html).toContain(escaped(text));
    for (const outcome of orchestration.outcomes) expect(html).toContain(escaped(`${outcome.value} ${outcome.label}`));
    const workflow = html.match(/<ol\b[^>]*>([\s\S]*?)<\/ol>/)?.[1];
    expect(workflow).toBeDefined();
    for (const step of orchestration.pipeline) expect(workflow).toContain(escaped(step));
    expect(html).toContain(escaped(orchestration.pipelineNote));
  });

  test("the stack remains available through an initially closed native disclosure", () => {
    const html = renderMethod();
    const stack = [...html.matchAll(/<details\b([^>]*)>([\s\S]*?)<\/details>/g)]
      .find(([, , body]) => body.includes("The stack behind the orchestration"));
    expect(stack).toBeDefined();
    expect(stack[1]).not.toMatch(/\bopen(?:=|\s|$)/);
    expect(stack[2]).toContain("<summary");
    for (const text of [...orchestration.models, ...orchestration.tools, ...orchestration.methods]) expect(stack[2]).toContain(escaped(text));
  });

  test("Reporting retains its six mechanisms and distinguishes product generation from implementation credit", () => {
    const study = caseStudies.reporting;
    expect(study.modules.map(({ name }) => name)).toEqual([
      "Embedded Jupyter runtime", "Gemini script generation", "Graph schema inheritance",
      "Financial visualization presets", "Frequency-based audit snapshots", "3,000+ test harness",
    ]);
    expect(study.collaboration).toContain("Claude Fable");
    expect(study.collaboration).toContain("GPT-6 Astra");
    expect(study.collaboration).toContain("review");
    expect(study.decisions.some(({ detail }) => detail.includes("SchemaFlow"))).toBe(true);
    const description = projects.find(({ id }) => id === "reporting").description;
    expect(description).toContain("Intelligent Scaffolding");
    expect(description).toContain("Gemini");
    expect(description).not.toMatch(/2024|Level 4|self-optimi/i);
  });
});
