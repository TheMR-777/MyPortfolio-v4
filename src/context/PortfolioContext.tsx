import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { projects, type Project } from "../data/portfolio";

export const sections = [
  { id: "mode", label: "Mixed mode", nav: "Mode", description: "The Ink & Paper experiment" },
  { id: "work", label: "Selected work", nav: "Work", description: "Enterprise systems and architecture" },
  { id: "craft", label: "Personal craft", nav: "Craft", description: "Open-source tools and small experiments" },
  { id: "philosophy", label: "Philosophy", nav: "Philosophy", description: "Curiosity, discovery, and restraint" },
  { id: "skills", label: "Skills & depth", nav: "Skills", description: "Languages and engineering fundamentals" },
  { id: "journey", label: "Experience & journey", nav: "Journey", description: "The path from curiosity to architecture" },
  { id: "contact", label: "Say hello", nav: "Contact", description: "Start a conversation" },
];

function projectFromUrl() {
  const id = new URLSearchParams(window.location.search).get("project");
  return projects.find((project) => project.id === id) ?? null;
}

function updateHistory(url: URL, push = false) {
  try {
    if (push) history.pushState({ ...history.state, portfolioProjectEntry: true }, "", url);
    else history.replaceState(history.state, "", url);
  } catch { /* Opaque embedded previews can still explore projects without URL updates. */ }
}

type PortfolioContextValue = {
  selectedProject: Project | null;
  openProject: (id: string) => void;
  closeProject: () => void;
  searchOpen: boolean;
  searchQuery: string;
  openSearch: (query?: string) => void;
  closeSearch: () => void;
  jumpTo: (id: string) => void;
};
const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [selectedProject, setSelectedProject] = useState(projectFromUrl);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const onPopState = () => { setSelectedProject(projectFromUrl()); setSearchOpen(false); };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    document.title = selectedProject
      ? `${selectedProject.title} | Ammar Khan`
      : "Muhammad Ammar Khan | Ink & Paper";
  }, [selectedProject]);

  const openProject = useCallback((id: string) => {
    const project = projects.find((entry) => entry.id === id);
    if (!project) return;
    const url = new URL(window.location.href);
    const isReplacingProject = url.searchParams.has("project");
    url.searchParams.set("project", id);
    updateHistory(url, !isReplacingProject);
    setSearchOpen(false);
    setSelectedProject(project);
  }, []);

  const closeProject = useCallback(() => {
    setSelectedProject(null);
    if (history.state?.portfolioProjectEntry) history.back();
    else {
      const url = new URL(window.location.href);
      url.searchParams.delete("project");
      updateHistory(url);
    }
  }, []);

  const openSearch = useCallback((query = "") => {
    setSearchQuery(query);
    setSearchOpen(true);
  }, []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const jumpTo = useCallback((id: string) => {
    setSearchOpen(false);
    const url = new URL(window.location.href);
    url.hash = id;
    updateHistory(url);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const target = document.getElementById(id);
      target?.scrollIntoView({ behavior: document.documentElement.dataset.motion === "off" ? "instant" : "smooth", block: "start" });
      target?.focus({ preventScroll: true });
    }));
  }, []);

  const value = useMemo(() => ({
    selectedProject, openProject, closeProject, searchOpen, searchQuery, openSearch, closeSearch, jumpTo,
  }), [selectedProject, openProject, closeProject, searchOpen, searchQuery, openSearch, closeSearch, jumpTo]);

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  const value = useContext(PortfolioContext);
  if (!value) throw new Error("usePortfolio requires PortfolioProvider");
  return value;
}