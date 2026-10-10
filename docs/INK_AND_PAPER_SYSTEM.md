# Ink & Paper: Design And Interaction System

## Purpose

Ink & Paper presents Muhammad Ammar Khan's work while demonstrating a third theme concept: **Mixed mode**. The experience should feel precise, calm, curious, and unmistakably authored.

The visual language is intentionally built from a tension:

> A readable page made of paper. A focused interface made of ink.

This document explains how to preserve that tension in implementation decisions.

## Status Of This Guidance

This describes Ink & Paper's identity, current implementation and useful design
judgments. It is not a universal style law. Factual accuracy, privacy, accessibility
and compatibility are safeguards; accent placement, drawing technique and composition
are creative choices evaluated in context. See `../AGENTS.md` for that distinction.

SVG is welcome and already central to the artwork. No medium, path count, word count
or fixed section count is inherently more artistic or accessible. Choose an approach
for its meaning, rendered quality, responsive behavior and maintenance cost. Treat
past bug reports as scoped evidence, not authority to ban an entire technique.

## The Two-Material Model

There are only two primary surface meanings:

| Material | Semantic role | Typical use |
| --- | --- | --- |
| Paper | The reading environment | page background, long-form content, project-dialog body |
| Plate | A moment of focus | nav, identity panel, project cards, experiments, modal cover, footer |

`src/index.css` owns these tokens.

| Token group | Meaning |
| --- | --- |
| `--paper`, `--paper-2` | canvas and gently differentiated paper surface |
| `--ink`, `--ink-muted`, `--ink-faint` | paper-context text hierarchy |
| `--plate`, `--plate-2` | focused/elevated surface hierarchy |
| `--plate-fg`, `--plate-muted`, `--plate-faint` | plate-context text hierarchy |
| `--line`, `--line-strong`, `--plate-line` | quiet structure, not decoration |
| `--accent`, `--accent-soft`, `--on-accent` | context-aware accent value |

### Modes

| Mode | Paper | Plate | Design job |
| --- | --- | --- | --- |
| Light | light | light | A calm, continuous canvas |
| Mixed | warm light | deep dark | Reading on paper; interaction and focus on ink |
| Dark | deep dark | slightly raised dark | Low-light focus and visual calm |

Mixed is the default because it makes hierarchy intrinsic: a plate is immediately legible as a shift in attention without needing excessive dividers, shadows, or glow.

## Accent Behavior

An accent swatch is not a single fixed hex value. The theme provider stores hue and saturation plus a paper-safe and plate-safe lightness. The CSS token system resolves the visible accent from context.

This means:

- `text-accent` on paper should remain readable.
- `text-accent` on a `plate` should become a brighter expression of the same hue.
- Accent-colored filled controls should use `text-on-accent` for legible foreground text and icons.
- `bg-accent-soft` is for quiet support, not a replacement for hierarchy.

When adding a new swatch, define all of `h`, `s`, `light`, and `dark` in `src/theme/ThemeProvider.tsx`; update the early bootstrapping map in `index.html` at the same time to avoid a visible color flash.

## Layout Rhythm

The current portfolio reads as a sequence of editorial acts rather than unrelated widgets:

1. **Hero:** authorship, positioning, first invitation.
2. **Mode:** the product idea and an invitation to try it.
3. **Work:** evidence through systems and decisions.
4. **Method interlude** (`#orchestration`, unnumbered): how the work gets built now, and the human quality boundary.
5. **Craft:** smaller personal tools and curiosity.
6. **Philosophy and skills:** the thinking beneath the output, and the interests that feed it.
7. **Journey:** proof over time, formative stories, then a clear human invitation.

Five acts currently carry ordinals: Mode `01`, Work `02`, Craft `03`, Philosophy `04`, Journey `05`. Hero, method and supporting destinations are unnumbered; method uses `Label`. This map is not a fixed template for future work. When a requested composition changes it, update `sections[].ordinal` in `src/context/PortfolioContext.tsx`, visible labels and corresponding tests together. Navigation should reflect authored metadata rather than array positions; preserve existing anchors, including `#orchestration`.

### Sub-blocks and the coda

Not every idea earns its own act. These live inside an existing section and carry no ordinal:

- **Beyond computer science** (inside Philosophy): the three interests, each tied to the shipped work it demonstrably fed. If an interest has no such tie, render it as plain text rather than inventing a link.
- **The stories behind the timeline** and **Reference shelf** (inside Journey): formative stories and supporting material; the shelf contains writing, research and certification behind `details`.
- **The longer view** (`#vision`, inside Journey): currently a paper reading passage stating personal conviction, not a forecast. It is excluded from the desktop pill (`pillSections` in `Nav.tsx`) and remains reachable through the mobile menu, search and deep link.

Let a new idea's importance and relationship to the surrounding content determine
whether it needs an act, a sub-block or a quiet reference. Avoid adding sections simply
to house every new fact, but do not force distinct ideas into an ill-fitting structure.

Each section should have one job. Do not combine several jobs just because they share a theme.

## Accent And Hierarchy

Accent gives the eye a place to land; it is not a quota to fill. A heading may
emphasize a word, a phrase or nothing. Choose placement from the sentence's meaning
and the whole composition, not a mandatory middle word or colored closing tail.

Large serif numerals currently give the identity plate prominence. Elsewhere,
quieter figures often fit better, but there is no hero-only restriction. The test is
whether a number deserves that attention and is factually supported.

`Eyebrow` has an accent dash; `Label` offers a quieter marker. Their present use
distinguishes major acts from supporting content. Use that contrast deliberately
without treating every heading or sub-block as a fixed component assignment.

## Ink Plate Placement

The current ending uses paper for reflection and ink for the footer. Protect its
rhythm during unrelated work. Adjacent full-width dark surfaces can feel heavy;
evaluate their purpose, proportion and separation when redesigning the ending.
This is a compositional concern, not a ban on a particular sequence of surfaces.

## The Hand-Drawn Layer

Hand-drawn accents can add a human presence without turning the site into a themed
notebook. Crisp geometry is the current starting point for technical studies, while
editorial marks are looser. Neither style is inherently correct for an entire class
of content: meaning, legibility and coherence decide.

Current helpers in `src/components/HandDrawn.tsx`:

- `HandStrata` uses smooth curves through randomized points and short straight hatch
  marks. Its variation is generated per mount.
- `HandUnderline` uses a harmonic curve and a derived, faint bleed path; the current
  implementation has **two paths**, not the single path described by older notes.
  Its `seed` is a memo key that regenerates the drawing; hover/focus reveals the mark
  and reduced motion removes the drawing animation.
- `HandFlourish` is an available calligraphic helper with per-mount parameter
  variation. Its presence in this file does not require rendering it in the footer.
  Check the consuming component rather than treating an old description as a task.

### Rendering history, not technique bans

Earlier notes reported that turbulence/displacement settings made tiny strokes
illegible, and independently randomized "ghost" lines appeared disconnected. Those
are scale/parameter/geometry problems, not evidence that SVG filters or multiple paths
are forbidden. Curves with controlled variation are the current solution.

The useful constraint is perceptual: a mark should read intentionally at its actual
display size, remain clear across themes and not obscure text. Inspect narrow/wide
layouts, wrapping and static/reduced-motion states. A new technique can be appropriate
if it meets those needs; do not change working art solely to satisfy a path count.

## Illustration Honesty

A technical diagram should distinguish alternatives, parallel peers, inheritance,
flow and boundaries accurately. Labels, grouping, line styles or different arrangements
can make those relationships clear; no particular node layout is compulsory.

Draw the mechanism worth understanding. The current squad diagram uses a coordination
rail to distinguish collaboration from an independent fan-out; a future drawing should
preserve that meaning, not necessarily the same rail geometry.

Personal projects may use typography, a conceptual illustration, a diagram or a small
interaction. Choose what expresses their idea without manufacturing capabilities or
architecture. A modest project need not look like an enterprise system to merit art.

### Spacing Guidance

- Use `Section` for the baseline page rhythm.
- Use structural lines to start or close a thought; do not draw lines around everything.
- On a wide viewport, let the content choose its max width. Avoid stretching every line of copy across the screen.
- On mobile, preserve hierarchy before preserving side-by-side layout. Stack with intention; do not merely squeeze columns.

## Type System

| Typeface | Use | Personality |
| --- | --- | --- |
| Instrument Serif | Major headings, quotations, intentional italics | Human, editorial, curious |
| Manrope | Interface text and reading copy | Clear, modern, calm |
| JetBrains Mono | labels, metadata, architecture cues, small technical details | Precise, structural |

### Type Hierarchy

- Display serif is reserved for the thing a visitor should remember from a section.
- Sans copy should explain rather than compete.
- Mono metadata should be small and restrained. It gives information a supporting role.
- Italic serif should punctuate a phrase, not become a visual effect applied everywhere.
- `StyledText` is the content-layer implementation for intentional inline emphasis. It is safer and more reusable than injecting HTML.

## Motion System

Motion uses the shared ease `cubic-bezier(.22, 1, .36, 1)`: decisive at the beginning, gentle at the end. These are current patterns and useful starting points, not fixed limits on future experiments.

| Motion | Why it exists | Keep it subtle by |
| --- | --- | --- |
| Section reveal | reveals reading order | opacity plus a small vertical offset, once per section |
| Hover lift | confirms an interactive object | a small, calm movement for ordinary controls |
| Theme reveal | makes a mode change feel physical | originate at the clicked control and reveal the actual new snapshot |
| Diagram trace | gives a system visual a sense of flow | hover-triggered feedback with meaning readable at rest |
| Small experiments | makes a concept discoverable | one input, one immediate visible result |

All movement must degrade cleanly when `prefers-reduced-motion` is set or the user disables gentle motion in the theme dock. Use the established `useTheme().reduceMotion` and `MotionConfig`; do not introduce a second motion-preference state.

## Interaction System

### Theme Dock

The floating dock is part of the portfolio's thesis, not a decoration.

- It exposes Light, Mixed, and Dark directly.
- It opens a compact appearance panel for accent and motion choices.
- It persists choice locally where storage is available.
- Arrow keys navigate theme options inside the mode group.
- A browser without View Transitions still gets an immediate, correct mode change.

### Search

`Ctrl/Cmd + K` is an understated discovery tool.

- It searches portfolio sections, projects, technologies, project descriptions, modes, and accents.
- It supports Arrow Up/Down and Enter.
- It should not open over another modal dialog.
- Result labels should describe what will happen: Explore, Project, Appearance.

### Project Case Studies

Projects are opened through a native dialog wrapper, which gives focus trapping and an inert background. The dialog also updates `?project=<id>` for shareable deep links.

The current case-study structure offers a useful starting sequence, not a mandatory
story template for every project:

1. Thesis
2. Challenge
3. Approach
4. Decisions that mattered
5. Reported outcomes
6. Private-work disclosure when applicable

Do not manufacture screenshots. Use architecture studies when the details are confidential or the system is not visually represented by a single UI.

### Experiments

Experiments can communicate a point of view through play, discovery or direct explanation. Existing examples:

- Horner Lab: intuitive understanding through a simple, inspectable rule.
- Moire Lab: a real-world observation made interactive.

Avoid forced engagement loops and distracting controls. Playfulness is not itself a
problem; judge whether the interaction rewards curiosity and belongs to this portfolio.

## Accessibility Baseline

The aesthetic depends on subtle contrast, so accessibility cannot be an afterthought.

- Use semantic elements and real buttons/links.
- Keep `:focus-visible` and do not replace it with hover-only affordance.
- Label icon buttons with `aria-label`.
- Use `aria-pressed`, `role="switch"`, `role="listbox"`, and related ARIA only when interaction semantics require it.
- Place focus deliberately when opening a dialog and return focus to the trigger when closing it.
- Respect motion preferences.
- Keep text contrast usable in every mode and with every accent.
- Test keyboard access to the theme dock, search, navigation, project dialogs, details disclosures, sliders, and copy actions.

## Writing Voice

The voice is reflective, technical, and specific. It earns confidence through detail instead of adjectives.

Prefer:

- “Built a reusable approval engine so modules could plug into shared workflow logic.”
- “Replaced per-project reporting with a language-agnostic service.”
- “A conceptual architecture study; no production data.”

Avoid:

- “Revolutionary,” “unbreakable,” “the best,” “world-class,” or similar unsupported absolutes.
- Empty verbs such as “leveraged,” “synergized,” or “utilized” when a direct verb exists.
- Overexplaining every implementation detail.
- Claims that have no supplied source, measured result, or clear contextual framing.

## Change Checklist

For any UI change, answer these before considering it complete:

- Does it use paper/plate semantics rather than an arbitrary visual style?
- Does it remain legible in Light, Mixed, and Dark modes?
- Does the accent adapt correctly on both paper and a plate?
- Is the section still accomplishing one clear job?
- Does the visual addition strengthen understanding, character or composition rather than merely fill space?
- Is the interaction complete for keyboard and touch?
- Does motion stop under reduced-motion preferences?
- Is the content accurate and safe to publish?
- Does the small-screen layout feel designed, not compressed?
- Do `bun test ./tests`, `.\node_modules\.bin\tsc --noEmit` and `bun run build` succeed for application changes? For docs-only changes, review consistency and `git diff --check` instead; report browser checks separately.

## Common Repairs

| Symptom | First place to inspect | Typical correct repair |
| --- | --- | --- |
| Accent is too faint or too bright in one mode | `ThemeProvider.tsx`, `index.css` token context | Adjust the swatch's light/dark values; do not override one component color |
| A plate looks incorrect after mode switching | local component classes | Replace paper-context colors with plate-context semantic utilities |
| Deep link opens no project | `PortfolioContext.tsx`, project IDs | Keep project IDs stable and use `openProject` |
| Modal feels inaccessible | `Dialog.tsx`, trigger markup | Reuse the dialog wrapper and give the dialog a visible close action and title |
| Mobile content feels crowded | section layout and density | Reduce competing content or stack deliberately; do not just reduce font size |
| A new project lacks visual personality | `ProjectVisual.tsx`, case-study data | Identify the system's unique relationship or constraint and show that conceptually |
| Copy feels too promotional | relevant data file | Replace adjectives with a specific constraint, decision, or reported outcome |

## Final Reminder

The defining quality of this project is not that it is visually busy or technically flashy. It is that every part feels like it had a reason to exist.

Future changes should preserve that feeling.
