import { useEffect, useRef, useState, type MouseEvent } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import { personal } from "../data/portfolio";
import { sections, usePortfolio } from "../context/PortfolioContext";
import { GithubIcon } from "./Icons";
import { Dialog } from "./Dialog";
import { useTheme } from "../theme/ThemeProvider";

/** Skills, Vision and Contact live in the menu and search rather than crowding the pill. */
const pillSections = sections.filter((section) => !["contact", "skills", "vision"].includes(section.id));

export function Nav() {
  const [active, setActive] = useState("top");
  const [menuOpen, setMenuOpen] = useState(false);
  const { openSearch, jumpTo } = usePortfolio();
  const { reduceMotion } = useTheme();
  const { scrollYProgress, scrollY } = useScroll();
  const activeRef = useRef("top");

  function navigate(event: MouseEvent<HTMLAnchorElement>, id: string) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    setMenuOpen(false);
    jumpTo(id);
  }

  function updateActive() {
    let current = "top";
    for (const section of pillSections) {
      if ((document.getElementById(section.id)?.getBoundingClientRect().top ?? Infinity) <= 175) current = section.id;
    }
    if (current !== activeRef.current) { activeRef.current = current; setActive(current); }
  }
  useMotionValueEvent(scrollY, "change", updateActive);

  useEffect(() => {
    updateActive();
    const media = matchMedia("(min-width: 1024px)");
    const resize = () => { if (media.matches) setMenuOpen(false); updateActive(); };
    media.addEventListener("change", resize);
    return () => media.removeEventListener("change", resize);
  }, []);

  return (
    <>
      <motion.div className="site-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6 sm:pt-5">
        <nav aria-label="Main navigation" className="plate nav-shell mx-auto flex max-w-6xl items-center justify-between rounded-full py-2 pl-3.5 pr-2">
          <a href="#top" onClick={(event) => navigate(event, "top")} className="flex items-center gap-2.5 rounded-full" aria-label="Muhammad Ammar Khan, back to top">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-accent font-serif text-[25px] italic leading-none text-on-accent">A</span>
            <span className="text-[12px] font-semibold tracking-tight sm:text-[13px]">{personal.handle}</span>
          </a>
          <ul className="hidden items-center lg:flex">
            {pillSections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="nav-link" data-active={active === section.id} aria-current={active === section.id ? "location" : undefined} onClick={(event) => navigate(event, section.id)}>
                  {section.nav}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1">
            <button type="button" onClick={() => openSearch()} className="icon-button text-plate-muted" aria-label="Search portfolio (Control or Command K)" title="Search portfolio (Ctrl / Cmd K)">
              <Search className="h-4 w-4" />
            </button>
            <a href={personal.social.github} target="_blank" rel="noreferrer" className="icon-button hidden text-plate-muted sm:inline-grid" aria-label="GitHub, opens in a new tab">
              <GithubIcon className="h-4 w-4" />
            </a>
            <a href="#contact" onClick={(event) => navigate(event, "contact")} className="ml-1 hidden items-center gap-2 rounded-full bg-plate-fg px-4 py-2.5 text-xs font-semibold text-plate sm:inline-flex">
              Say hello <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <button type="button" onClick={() => setMenuOpen(true)} className="icon-button text-plate-muted lg:hidden" aria-label="Open navigation menu" aria-haspopup="dialog" aria-expanded={menuOpen}>
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {menuOpen && (
        <Dialog labelledBy="mobile-menu-title" onClose={() => setMenuOpen(false)} panelClassName="plate max-w-lg p-6 sm:p-8">
          <div className="flex items-start justify-between">
            <div>
              <p className="eyebrow text-plate-faint">Ink &amp; Paper / Index</p>
              <h2 id="mobile-menu-title" className="mt-3 font-serif text-4xl">Find your way.</h2>
            </div>
            <button type="button" data-autofocus className="icon-button text-plate-muted" aria-label="Close navigation menu" onClick={() => setMenuOpen(false)}><X className="h-5 w-5" /></button>
          </div>
          <nav aria-label="Mobile navigation" className="mt-6">
            {sections.map((section, index) => (
              <motion.a
                key={section.id} href={`#${section.id}`} className="flex items-center gap-4 border-t border-plate-line py-3.5"
                initial={reduceMotion ? false : { opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: reduceMotion ? 0 : index * .035 }}
                onClick={(event) => navigate(event, section.id)}
              >
                <span className="font-mono text-[10px] text-plate-faint">0{index + 1}</span>
                <span className="flex-1 text-sm">{section.label}</span>
                <ArrowUpRight className="h-4 w-4 text-accent" />
              </motion.a>
            ))}
          </nav>
          <button type="button" onClick={() => { setMenuOpen(false); openSearch(); }} className="mt-5 flex w-full items-center gap-3 rounded-xl bg-plate-2 px-4 py-3 text-sm text-plate-muted">
            <Search className="h-4 w-4" /> Find a project or a skill <span className="nav-shortcut ml-auto">Ctrl K</span>
          </button>
        </Dialog>
      )}
    </>
  );
}