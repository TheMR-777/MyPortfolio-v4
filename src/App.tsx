import { ThemeProvider } from "./theme/ThemeProvider";
import { Nav } from "./components/Nav";
import { ThemeDock } from "./components/ThemeDock";
import { PortfolioProvider } from "./context/PortfolioContext";
import { Hero } from "./components/sections/Hero";
import { ModeShowcase } from "./components/sections/ModeShowcase";
import { Work } from "./components/sections/Work";
import { Orchestration } from "./components/sections/Orchestration";
import { Craft } from "./components/sections/Craft";
import { Philosophy } from "./components/sections/Philosophy";
import { Contact, Journey } from "./components/sections/Journey";
import { ProjectDialog } from "./components/ProjectDialog";
import { CommandPalette } from "./components/CommandPalette";

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <div className="relative min-h-screen">
          <a className="skip-link" href="#main-content">Skip to content</a>
          <Nav />
          <main id="main-content" tabIndex={-1} className="outline-none">
            <Hero />
            <ModeShowcase />
            <Work />
            <Orchestration />
            <Craft />
            <Philosophy />
            <Journey />
          </main>
          <Contact />
          <ThemeDock />
          <ProjectDialog />
          <CommandPalette />
        </div>
      </PortfolioProvider>
    </ThemeProvider>
  );
}
