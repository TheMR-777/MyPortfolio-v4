# Ink & Paper: Design And Interaction System

## Purpose

Ink & Paper presents Muhammad Ammar Khan's work while demonstrating a third theme concept: **Mixed mode**. The experience should feel precise, calm, curious, and unmistakably authored.

The visual language is intentionally built from a tension:

> A readable page made of paper. A focused interface made of ink.

This document explains how to preserve that tension in implementation decisions.

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

The portfolio is a sequence of editorial acts, not a collection of widgets:

1. **Hero:** authorship, positioning, first invitation.
2. **Mode:** the product idea and an invitation to try it.
3. **Work:** evidence through systems and decisions.
4. **Orchestration:** how the work gets built now, and the quality line around it.
5. **Craft:** smaller personal tools and curiosity.
6. **Philosophy and skills:** the thinking beneath the output, and the interests that feed it.
7. **Journey:** proof over time, formative stories, then a clear human invitation.

Sections carry a visible ordinal in their eyebrow (`01 /` through `06 /`). If you add, remove, or reorder a section, renumber every eyebrow and update `sections` in `src/context/PortfolioContext.tsx` so the navigation, mobile menu, and search stay in sync.

### Sub-blocks and the coda

Not every idea earns its own act. These live inside an existing section and carry no ordinal:

- **Beyond computer science** (inside Philosophy): the three interests, each tied to the shipped work it demonstrably fed. If an interest has no such tie, render it as plain text rather than inventing a link.
- **The stories behind the timeline** and **Study & certification** (inside Journey): quiet reference content, the latter behind a collapsed `details`.
- **The longer view** (`#vision`, inside Journey): an unnumbered ink coda stating personal conviction. It is framed explicitly as a conviction, never as a forecast, and is deliberately excluded from the desktop pill (`pillSections` in `Nav.tsx`) to keep that control from crowding — it remains reachable through the mobile menu, search, and deep link.

Keep this rule: a new idea becomes a numbered act only if it changes how the reader understands the work. Otherwise it is a sub-block.

Each section should have one job. Do not combine several jobs just because they share a theme.

## The Three Accent Budgets

Restraint fails when it is a feeling. It holds when it is a count. These three
devices are the ones most likely to multiply silently, so each has a budget.

### 1. The accent focus word in a heading

An `<em className="text-accent">` inside a heading. This is the intended
"spark" — nearly every section heading carries exactly **one** accented focus
word that gives it a point of attention. That is a feature, not a leak.

The two rules that keep it from becoming wallpaper:

- **One per heading, never more.** A heading with two accented words has no
  focus. Choose the single most important word.
- **Prefer a mid-heading focus word over a closing tail.** `Systems that
  [changed] how a company works` reads with more life than a predictable
  `... how a company [works.]` The eye wants the accent to land inside the
  thought, not just at its end. A closing accent is fine when the last word
  genuinely is the point (the hero name, *tested.*, *knowing.*), but reach for
  the interior word first.

Purely structural or reference headings (a collapsed `details` summary, a quiet
sub-block title) may stay unaccented — silence between sparks is what lets each
one register.

### 2. Large accent serif numerals

Big figures in `font-serif ... text-accent`.

**Budget: the hero identity plate only.** Small index markers are a different
device: the `01`/`02`/`03` numerals introducing principle lists (Mode,
Philosophy) use accent italics as list markers, matching the philosophy
principle numbers — they orient, they don't shout.

Nowhere else. Stats elsewhere are set as a single quiet mono line —
`13 mentors · 50+ sessions · 20+ students` — which carries the fact without
competing with the hero for the reader's first impression.

### 3. The eyebrow's accent dash

`Eyebrow` carries a short accent rule. It is the one recurring accent the
reader learns to follow down the page, so it marks **section-level acts only**
(`01 /` through `06 /`).

Sub-blocks use `Label` — same typographic voice, no dash. A page where every
sub-block also claims an eyebrow has no hierarchy left, only noise.

Control surfaces (the theme dock, the mobile menu) are not page content and may
use an eyebrow freely.

## Ink Plate Placement

The footer is the page's single closing gesture — the one place ink rises to
full bleed at the end. **Never place a full-bleed ink plate immediately before
it.** Two stacked slabs deaden the ending. Forward-looking conviction belongs
on paper, as reading.

## The Hand-Drawn Layer

The site is called Ink & Paper, so the pen must show occasionally — but the
vocabulary is deliberately split in two:

- **Technical studies stay machine-crisp.** `ProjectVisual` architecture
  diagrams (EMS, Overwatch, MDM, Vault…) use exact geometry because precision
  *is* the engineering claim. Never apply a sketch effect to them.
- **Editorial moments may be sketched — with smooth, randomized curves, never
  an SVG turbulence filter.** `src/components/HandDrawn.tsx` builds every
  stroke from a handful of randomized points threaded through a Catmull-Rom
  spline (`smoothPath` + `wobble`). This was a deliberate correction: an
  earlier version used `feTurbulence` + `feDisplacementMap`, which displaces
  geometry as pixel-level noise. That reads as loose linework on a large
  shape, but on a *short* stroke — an underline, a signature, a 5px hatch
  mark — the noise wavelength dwarfs the shape and it collapses into an
  illegible scribble. A curve smoothed through a few jittered points stays
  legible at any size, because the randomness lives in the points, not the
  render. **Do not reintroduce a turbulence/displacement filter here.**
  - `HandStrata` — the sketched geological layers beside "the work beneath the
    work." Regenerated once per mount (`useMemo(..., [])`), so each page load
    lays out its own strata; hatch ticks are plain straight segments at a
    randomized angle, which is what keeps a 5px mark from turning to noise.
  - `HandUnderline` — a pen line that draws itself under a quiet-work row's
    title on hover/focus (`pathLength` dash reveal; appears instantly under
    reduced motion). Accepts a `seed` prop that is *only* a `useMemo` key —
    passing a fresh value (the quiet-work rows reroll it on every
    pointer-enter/focus) redraws a new, equally smooth squiggle, so the same
    row never traces quite the same line twice.
  - `HandFlourish` — the stroke beneath the footer signature, and the one
    place where "hand-drawn" must mean *elegant*, not *rough*. It is a single
    calligraphic gesture: three cubic Béziers (a long shallow arc, a rise into
    the crest, a small terminal curl) joined with **C1 continuity** — the
    control point leaving each joint is the mirror of the one arriving, so the
    tangent never changes direction abruptly. Per-visit variation is applied to
    the *gesture parameters* (arc depth, curl radius, where the pen lifts),
    never to individual points. An earlier version sampled a wave through 7
    jittered points; even smoothed, those tiny course-corrections read as a
    hand that hesitated. A signature is confidence with a little breath in it.

One stroke per moment, not several stacked together. This is a hard rule,
learned twice: the quiet-work row carries the margin underline alone (its arrow
stays a plain lucide `ArrowUpRight`), and the underline itself is **one path**.
An earlier version drew a second, fainter "ghost" pass with its own random
points; because the two wobbles diverged, it read as two separate lines — one
from the left, one that seemed to start mid-word and trail off. A pen makes
one mark. Restraint applies to ink exactly as it applies to accent color: if
everything is sketched, nothing reads as a hand.

When extending this file: keep amplitudes small (roughly 1–2 units in a
~100-unit viewBox), use round caps/joins, taper amplitude to zero at both ends
of a line with the sine envelope in `wobble()` so a stroke never meets a
neighboring shape at a hard angle, and remember the rule — **hand-drawn means
"a person was here," so reserve it for human moments.** Sketching a monitoring
pipeline would say the wrong thing about the work.

## Illustration Honesty

A diagram must state what the system actually does. Two specific obligations:

- **Parallel nodes imply equivalence.** If two things are alternatives rather
  than peers, render them as one node naming both (`nanoMDM · microMDM`), and
  give genuinely different concerns their own branch. A three-way fan-out where
  two are substitutes is a factual error, not a simplification.
- **Show the interesting mechanism, not just the flow.** The orchestration
  diagram draws a coordination rail between the specialists because that shared
  bus is the point; a plain funnel would hide it.

Minor personal tools get a **typographic plate** (see `mr_crypt`,
`smart-cleanup`, `myportfolio` in `ProjectVisual.tsx`) rather than an invented
architecture diagram. Do not manufacture structure a project does not have.

### Spacing Rules

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

Motion uses the shared ease `cubic-bezier(.22, 1, .36, 1)`: decisive at the beginning, gentle at the end.

| Motion | Why it exists | Keep it subtle by |
| --- | --- | --- |
| Section reveal | reveals reading order | opacity plus a small vertical offset, once per section |
| Hover lift | confirms an interactive object | 2-5px movement, no bouncing |
| Theme reveal | makes a mode change feel physical | originate at the clicked control and reveal the actual new snapshot |
| Diagram trace | gives a system visual a sense of flow | run only on hover, not continuously |
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

For featured projects, use the narrative sequence:

1. Thesis
2. Challenge
3. Approach
4. Decisions that mattered
5. Reported outcomes
6. Private-work disclosure when applicable

Do not manufacture screenshots. Use architecture studies when the details are confidential or the system is not visually represented by a single UI.

### Experiments

An experiment is acceptable only when it communicates a genuine part of the portfolio's point of view. Existing examples:

- Horner Lab: intuitive understanding through a simple, inspectable rule.
- Moire Lab: a real-world observation made interactive.

Avoid gamification, scorekeeping, forced engagement loops, or decorative controls.

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
- Is the visual addition helping understanding rather than filling space?
- Is the interaction complete for keyboard and touch?
- Does motion stop under reduced-motion preferences?
- Is the content accurate and safe to publish?
- Does the small-screen layout feel designed, not compressed?
- Does `npm run build` succeed?

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