import { describe, expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { projects } from "../src/data/portfolio.ts";
import { caseStudies } from "../src/data/caseStudies.ts";
import { PortfolioProvider, sections, usePortfolio } from "../src/context/PortfolioContext.tsx";
import { plainText, StyledText } from "../src/components/StyledText.tsx";

// Public link contracts, not a snapshot of layout, copy, order or project count.
const publishedIds = [
  "ems", "erp-core", "vault", "uwb", "overwatch", "apple-mdm", "reporting",
  "evolver", "jobs", "logging", "realtime", "partner-integrations", "erp-modules", "costaz",
  "schemaflow", "mr-crypt", "schema-weaver", "moire", "letitgo", "githubify",
  "smart-cleanup", "myportfolio", "this-site",
];

function Selection() {
  const { selectedProject, searchOpen } = usePortfolio();
  return createElement("output", null, `${selectedProject?.id ?? "none"}|${searchOpen ? "search" : "closed"}`);
}

// Render the real provider and its URL initializer. Only the browser URL boundary
// is supplied; effects, history navigation and native dialogs are NOT covered.
function initialSelection(suffix = "") {
  const previous = Object.getOwnPropertyDescriptor(globalThis, "window");
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: { location: new URL(`https://portfolio.test/${suffix}`) },
  });
  try {
    return renderToStaticMarkup(createElement(PortfolioProvider, null, createElement(Selection)));
  } finally {
    if (previous) Object.defineProperty(globalThis, "window", previous);
    else delete globalThis.window;
  }
}

function renderText(text) {
  return renderToStaticMarkup(createElement(StyledText, { text }));
}

describe("public portfolio records", () => {
  test("published IDs survive and every record has a unique nonempty ID", () => {
    const ids = projects.map((project) => project.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.every((id) => typeof id === "string" && id.trim().length > 0)).toBe(true);
    for (const id of publishedIds) expect(ids).toContain(id);
  });

  test("case studies reference existing projects and have readable theses", () => {
    for (const id of ["ems", "erp-core", "vault", "uwb", "overwatch", "apple-mdm", "reporting"]) {
      expect(caseStudies[id]).toBeDefined();
    }
    for (const [id, study] of Object.entries(caseStudies)) {
      expect(projects.some((project) => project.id === id)).toBe(true);
      expect(plainText(study.thesis).trim().length).toBeGreaterThan(0);
    }
  });

  test("navigation destinations retain unique IDs without freezing their order", () => {
    const ids = sections.map((section) => section.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ["mode", "work", "orchestration", "craft", "philosophy", "skills", "journey", "vision", "contact"]) {
      expect(ids).toContain(id);
    }
  });
});

describe("initial project deep links", () => {
  test("every current project resolves through the actual provider", () => {
    for (const project of projects) {
      expect(initialSelection(`?project=${encodeURIComponent(project.id)}`))
        .toBe(`<output>${project.id}|closed</output>`);
    }
  });

  test("legacy ACE Status links still select Overwatch", () => {
    expect(initialSelection("?project=ace-status#work")).toBe("<output>overwatch|closed</output>");
  });

  test("URL decoding and unrelated parameters do not break project selection", () => {
    expect(initialSelection("?from=share&project=%72eporting#work"))
      .toBe("<output>reporting|closed</output>");
  });

  test("missing, empty and unknown project IDs leave the portfolio unselected", () => {
    for (const suffix of ["", "?project=", "?project=unknown-project", "?project=constructor"]) {
      expect(initialSelection(suffix)).toBe("<output>none|closed</output>");
    }
  });
});

describe("safe, reusable portfolio text", () => {
  test("nested emphasis renders with meaningful HTML semantics", () => {
    const html = renderText("[hi]Learn [em]deeply[/em][/hi] [code]x < 2[/code]");
    expect(html).toMatch(/<strong\b[^>]*>Learn <em\b[^>]*>deeply<\/em><\/strong>/);
    expect(html).toMatch(/<code\b[^>]*>x &lt; 2<\/code>/);
  });

  test("HTML in content stays text; only the supported line break renders", () => {
    const html = renderText('<script>alert("test")</script><img src=x onerror=alert(1)><br />Safe');
    expect(html).not.toContain("<script");
    expect(html).not.toContain("<img");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("&lt;img");
    expect(html).toContain("<br/>");
    expect(html).toContain("Safe");
  });

  test("search text keeps words and separates lines without formatting tags", () => {
    const text = "[hi]One [em]clear[/em][/hi]<br />[ac]thought[/ac] [c=text-text-primary]here[/c]";
    expect(plainText(text)).toBe("One clear thought here");
    expect(plainText("Plain C++ & .NET")).toBe("Plain C++ & .NET");
  });

  test("unknown and unclosed markup cannot silently eat content", () => {
    expect(renderText("[hi]unfinished")).toContain("[hi]unfinished");
    expect(renderText("[note]keep me[/note]")).toContain("[note]keep me[/note]");
    expect(renderText("[/hi]orphan")).toContain("[/hi]orphan");
    expect(renderText("").replace(/<[^>]*>/g, "")).toBe("");
    expect(plainText("")).toBe("");
  });
});
