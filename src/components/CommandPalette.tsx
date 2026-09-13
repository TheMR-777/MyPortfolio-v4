import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUp, CornerDownLeft, FileText, Search, SlidersHorizontal, X } from "lucide-react";
import { Dialog } from "./Dialog";
import { sections, usePortfolio } from "../context/PortfolioContext";
import { projects } from "../data/portfolio";
import { ACCENTS, MODES, MODE_META, useTheme } from "../theme/ThemeProvider";
import { plainText } from "./StyledText";

type Entry = { id: string; title: string; detail: string; group: "Explore" | "Project" | "Appearance"; keywords: string; action: () => void };

function SearchDialog({ initialQuery }: { initialQuery: string }) {
  const { closeSearch, jumpTo, openProject } = usePortfolio();
  const { setMode, setAccent, mode, accent } = useTheme();
  const [query, setQuery] = useState(initialQuery);
  const [activeIndex, setActiveIndex] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);

  const entries = useMemo<Entry[]>(() => [
    ...sections.map((section) => ({ id: `section-${section.id}`, title: section.label, detail: section.description, group: "Explore" as const, keywords: section.description, action: () => jumpTo(section.id) })),
    ...projects.map((project) => ({ id: project.id, title: project.title, detail: project.tech.join(" / "), group: "Project" as const, keywords: `projects case study ${project.kind} ${project.summary} ${plainText(project.description)} ${project.tech.join(" ")}`, action: () => openProject(project.id) })),
    ...MODES.map((item) => ({ id: `mode-${item}`, title: `${MODE_META[item].label} mode`, detail: item === mode ? "Your current theme" : MODE_META[item].material, group: "Appearance" as const, keywords: "theme appearance light dark mixed", action: () => { closeSearch(); setMode(item); } })),
    ...ACCENTS.map((color) => ({ id: `accent-${color.id}`, title: `${color.name} accent`, detail: color.id === accent.id ? "Your current accent" : "Change the accent color", group: "Appearance" as const, keywords: "color colour palette swatch appearance", action: () => { closeSearch(); setAccent(color); } })),
  ], [jumpTo, openProject, closeSearch, setMode, setAccent, mode, accent.id]);

  const results = useMemo(() => {
    const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!words.length) return entries.filter((entry) => entry.group !== "Appearance").slice(0, 10);
    return entries.map((entry) => {
      const haystack = `${entry.title} ${entry.detail} ${entry.keywords}`.toLowerCase();
      const matched = words.every((word) => haystack.includes(word));
      const score = entry.title.toLowerCase().startsWith(query.toLowerCase()) ? 10 : words.filter((word) => entry.title.toLowerCase().includes(word)).length + (entry.group === "Project" ? 1 : 0);
      return { entry, matched, score };
    }).filter((item) => item.matched).sort((a, b) => b.score - a.score).map((item) => item.entry);
  }, [query, entries]);

  const selectedIndex = Math.min(activeIndex, Math.max(0, results.length - 1));
  useEffect(() => {
    list.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest", behavior: "instant" });
  }, [selectedIndex, query]);

  return (
    <Dialog labelledBy="search-title" onClose={closeSearch} className="search-dialog" panelClassName="max-w-[620px]">
      <h2 id="search-title" className="sr-only">Search the portfolio</h2>
      <div className="flex items-center gap-3 border-b border-line px-5 py-4 sm:px-6">
        <Search className="h-5 w-5 text-accent" aria-hidden="true" />
        <input
          ref={input} data-autofocus value={query} type="text" autoComplete="off" spellCheck={false}
          placeholder="A project, a skill, a little curiosity..."
          className="min-w-0 flex-1 bg-transparent py-1.5 text-base text-ink outline-none focus-visible:outline-none sm:text-sm"
          aria-label="Search projects, skills, sections, and appearance"
          role="combobox" aria-autocomplete="list" aria-expanded="true" aria-controls="portfolio-search-results"
          aria-activedescendant={results.length ? `search-result-${selectedIndex}` : undefined}
          onChange={(event) => { setQuery(event.target.value); setActiveIndex(0); }}
          onKeyDown={(event) => {
            if (event.nativeEvent.isComposing) return;
            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
              event.preventDefault();
              if (results.length) setActiveIndex((index) => (index + (event.key === "ArrowDown" ? 1 : results.length - 1)) % results.length);
            }
            if (event.key === "Enter" && results[selectedIndex]) { event.preventDefault(); results[selectedIndex].action(); }
          }}
        />
        <button type="button" onClick={closeSearch} className="icon-button -mr-2 text-ink-faint" aria-label="Close search"><X className="h-4 w-4" /></button>
      </div>
      <div className="px-6 pb-2 pt-4 font-mono text-[9px] uppercase tracking-[.17em] text-ink-faint">{query.trim() ? `${results.length} ${results.length === 1 ? "path" : "paths"} found` : "A few places to begin"}</div>
      <div ref={list} id="portfolio-search-results" role="listbox" aria-label="Search results" className="max-h-[min(440px,54dvh)] overflow-y-auto overscroll-contain px-2 pb-2 sm:px-3">
        {results.map((entry, index) => (
          <button
            key={entry.id} id={`search-result-${index}`} type="button" role="option" aria-selected={index === selectedIndex}
            className="search-result" tabIndex={-1}
            onPointerMove={(event) => { if (event.pointerType === "mouse") setActiveIndex(index); }}
            onMouseDown={(event) => event.preventDefault()}
            onClick={entry.action}
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line text-ink-faint">
              {entry.group === "Project" ? <FileText className="h-4 w-4" /> : entry.group === "Appearance" ? <SlidersHorizontal className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            </span>
            <span className="min-w-0 flex-1"><span className="block text-[13px] font-medium text-ink">{entry.title}</span><span className="mt-1 block truncate text-[10px] text-ink-muted">{entry.detail}</span></span>
            <span className="hidden font-mono text-[8px] uppercase tracking-widest text-ink-faint sm:inline">{entry.group}</span>
            <CornerDownLeft className="result-arrow h-3.5 w-3.5 text-ink-faint opacity-35" />
          </button>
        ))}
      </div>
      {!results.length && (
        <div className="px-8 pb-10 pt-6 text-center">
          <p className="font-serif text-3xl">A path not taken. Yet.</p>
          <p className="mt-3 text-xs leading-relaxed text-ink-muted">Try a language like C++, a project like SchemaFlow, or a theme like Mixed.</p>
          <button type="button" className="text-link mt-5 min-h-10 text-accent" onClick={() => { setQuery(""); setActiveIndex(0); input.current?.focus(); }}>Clear the search <ArrowRight className="h-3.5 w-3.5" /></button>
        </div>
      )}
      <div className="flex items-center justify-between gap-4 border-t border-line px-6 py-3 text-[9px] text-ink-faint">
        <span>{projects.length} projects. One curious mind.</span>
        <span className="hidden items-center gap-2 sm:inline-flex"><ArrowUp className="h-3 w-3" /><ArrowDown className="-ml-2 h-3 w-3" />navigate<span className="ml-2">Enter to open</span></span>
      </div>
      <p className="sr-only" role="status">{results.length} search results.</p>
    </Dialog>
  );
}

export function CommandPalette() {
  const { searchOpen, searchQuery, openSearch, closeSearch } = usePortfolio();
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k" && !event.altKey && !event.isComposing) {
        if (event.repeat) { event.preventDefault(); return; }
        if (document.querySelector("dialog[open]") && !searchOpen) return;
        event.preventDefault();
        if (searchOpen) closeSearch(); else openSearch();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [searchOpen, openSearch, closeSearch]);
  return searchOpen ? <SearchDialog initialQuery={searchQuery} /> : null;
}