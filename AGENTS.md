# Portfolio Stewardship Guide

## Read First

This is not a generic portfolio template. It is a living UI/UX case study called **Ink & Paper**. Its central idea is **Mixed mode**: a warm, readable paper canvas paired with dark, focused ink surfaces.

Before changing anything, read:

1. This file.
2. `docs/INK_AND_PAPER_SYSTEM.md`.
3. The component and data files directly involved in the request.
4. `src/index.css` before changing any visual styling or theme behavior.

Do not redesign the site simply because a familiar portfolio pattern would be easier to implement. Preserve the intentional choices already present unless the user explicitly asks to reconsider them.

## The Standard

Every contribution should make the portfolio feel more considered, not merely more decorated or more feature-rich.

Use this test before shipping:

> Does this change create more clarity, more truthful depth, or a more meaningful interaction without stealing attention from the work?

If the answer is no, do not add it.

## Non-Negotiable Design Principles

### 1. Treat theme as material, not color

The site has two surface roles:

- **Paper:** the page canvas and long-form reading surface.
- **Plate:** focused/elevated areas such as the navigation, identity panel, project cards, dialogs, and footer.

Mixed mode is the product idea. It is not a fourth accent palette and must not collapse into a standard dark theme or a dashboard full of dark boxes.

- In Mixed mode, paper is warm and light; plates are deep and dark.
- In Light mode, paper and plates are both light.
- In Dark mode, paper and plates are both dark.
- Use semantic token utilities such as `bg-paper`, `text-ink`, `bg-plate`, and `text-plate-fg`.
- Never hard-code a black, white, gray, or accent color in a component if a token can express the intent.
- Accent color has two context-aware expressions: a deeper tone on paper and a brighter tone on plates. Do not bypass this by applying a fixed accent color to text or controls.

### 2. The site is editorial, not a dashboard

The first viewport is a single composition: name, concise positioning, one action, and the identity plate. Maintain that clarity.

- Favor deliberate asymmetry, quiet space, strong type, and one memorable visual idea per section.
- Use dense UI only where density itself communicates something meaningful: an architecture study, command palette, mini experiment, or case-study detail.
- Do not introduce decorative stat strips, badge piles, timeline clutter, generic bento grids, hero overlays, or marketing-card stacks.
- Cards are interaction containers or focused material changes, not a default layout primitive.
- A border, shadow, radius, or glow must communicate hierarchy or interaction. Remove it if it does not.

### 3. Practice restraint

This portfolio intentionally gives the eye quiet places to rest.

- One clear headline per section.
- One accent should lead at a time.
- Prefer a short, exact sentence over a second paragraph.
- Prefer one strong visual study over stock photography, a generic illustration, or a collage.
- Avoid gratuitous gradients, glass effects, blobs, badges, animated counters, and excessive rounded rectangles.
- Never add an element solely because an empty area feels unfamiliar. Empty space is part of the composition.

### 4. Make motion explain hierarchy

Motion should orient, reveal, or give feedback. It should never perform for its own sake.

- Use the established slow editorial reveal cadence for section entry.
- Keep hover movement small and calm: usually a few pixels, never a jump or wobble.
- Theme changes use a circular View Transition from the activation point when supported; preserve the guarded fallback.
- Respect `prefers-reduced-motion` and the in-product motion control. Any new motion must become static under reduced motion.
- Do not add auto-playing movement to content. The existing marquee is intentionally low-emphasis and pauses on hover.

### 5. Design interactions as complete systems

An interaction is not complete when it looks clickable. It is complete when it works by mouse, keyboard, touch, and screen reader.

- Native controls first: `button`, `a`, `details`, `input`, and `dialog` where appropriate.
- Every icon-only button needs an accessible name.
- Keep visible focus states intact.
- Dialogs must support Escape, outside-click dismissal where appropriate, focus placement, focus restoration, and a visible close button. Reuse `src/components/Dialog.tsx`.
- Do not use a custom `div` modal, custom checkbox, or custom select if native semantics can solve the problem.
- Do not remove keyboard shortcuts or deep links without a replacement.
- Do not make hover the only way to understand or use a control.

### 6. Keep content accurate and appropriately private

The best presentation is credible.

- Do not invent metrics, user-testing percentages, client praise, outcomes, dates, product capabilities, or awards.
- Keep the difference clear between verified outcome, project claim supplied by the owner, conceptual visual, and personal interpretation.
- Enterprise case studies may describe architecture and reported outcomes, but cannot expose private source, credentials, production screenshots, or sensitive partner data.
- Architecture graphics are intentionally conceptual. Keep the visible disclosure: `Conceptual architecture study / No production data`.
- Avoid boastful copy. Lead with the problem, the decision, the constraint, or the changed outcome.

## Implementation Map

| Concern | Source of truth | Rules |
| --- | --- | --- |
| Global theme tokens and visual primitives | `src/index.css` | Change tokens before component-level styling. Preserve paper/plate semantics. |
| Modes, accents, persistence, motion preference | `src/theme/ThemeProvider.tsx` | Use `setMode`, `setAccent`, and `useTheme`; do not write theme storage ad hoc. |
| Main portfolio content | `src/data/portfolio.ts` | Keep content normalized and use the existing inline markup where needed. |
| Detailed project narratives | `src/data/caseStudies.ts` | Keep enterprise descriptions architectural and truthful. |
| Project navigation, search state, deep links | `src/context/PortfolioContext.tsx` | Use `usePortfolio`; preserve `?project=<id>` behavior. |
| Rich text markup | `src/components/StyledText.tsx` | Use `StyledText` for data-backed marked-up text. Do not inject HTML. |
| Project illustrations | `src/components/ProjectVisual.tsx` | Keep them abstract, semantic, and explicitly non-production. |
| Dialog behavior | `src/components/Dialog.tsx` | Reuse for all modal experiences. |

## Content And Visual Workflow

1. **Find the smallest correct surface.** Change data first for a copy/content request; change a local component for a local behavior; change the token system only when the system truly needs to evolve.
2. **Understand the hierarchy.** Identify the one thing the section needs to communicate before adding markup or styling.
3. **Use existing primitives.** Start with `Section`, `Eyebrow`, `Heading`, `Reveal`, `TechLine`, `Dialog`, `StyledText`, and the theme/context hooks.
4. **Work in semantic tokens.** Verify the change in Light, Mixed, and Dark. A component that only works in one mode is broken.
5. **Finish the interaction.** Add keyboard behavior, focus states, labels, empty states, loading/error feedback, and mobile behavior where applicable.
6. **Check the content claim.** If the supplied data does not substantiate a statement, soften it or ask the owner rather than inventing proof.
7. **Verify.** Run `npm run build` through the project build workflow. For visual changes, inspect all modes, a narrow viewport, a wide viewport, keyboard navigation, and reduced motion if browser tooling is available.

## Component-Level Guidance

### Sections

- `Section` supplies the page rhythm and focusable hash target. Use it before creating new section wrappers.
- Let sections breathe. Do not shrink vertical spacing to fit more content above the fold.
- Do not use `h-screen` or force fixed heights for content sections.

### Typography

- **Instrument Serif** carries the emotional/editorial signal: major headings, quotations, selective italic emphasis.
- **Manrope** is the workhorse for reading and interface text.
- **JetBrains Mono** signals metadata, labels, IDs, technical details, and quiet structural information.
- Serif italics are emphasis, not decoration. One considered phrase is stronger than an entire italic paragraph.
- Keep line lengths readable. Do not turn all portfolio copy into large display type.

### Plates And Cards

- A `plate` means focused material, not merely a card with a background.
- On a plate, use plate semantic colors: `text-plate-fg`, `text-plate-muted`, `border-plate-line`, `bg-plate-2`.
- Do not nest multiple plates merely to create depth. Use a nested surface only when it improves scanning or interaction.
- Prefer a structural rule, label, or spacing change before adding a shadow.

### Links And Controls

- Use `primary-button`, `text-link`, and `icon-button` where they fit rather than creating near-duplicates.
- Distinguish internal navigation from external links. External links use `target="_blank"`, `rel="noreferrer"`, and an accessible label that says they open in a new tab when the context is not otherwise clear.
- Keep touch targets at least 40px when practical.

### Data-Backed Copy

- The markup engine supports `[hi]`, `[ac]`, `[em]`, `[dim]`, `[code]`, `[i]`, `[dt]`, `[c=...]`, and `<br />`.
- Use it sparingly. A markup tag must create hierarchy, not decorate every sentence.
- Keep raw data free of JSX. It must remain searchable and reusable by the command palette.

### Visual Studies And Experiments

- `ProjectVisual` is a diagram language: relationships, layers, flow, coverage, validation, and boundaries.
- A new visual should explain the project’s unique idea. Do not copy a diagram motif just to fill a card.
- Make interactive demos simple enough to understand in a few seconds. The Horner and Moire labs are models: one input, immediate consequence, a short explanatory sentence.

## Invariants: Do Not Break These Casually

- Mixed mode remains the default mode.
- The theme dock remains accessible, persistent, and usable on small screens.
- Accent selection changes both paper and plate contexts correctly.
- Theme switching has a standard fallback when the View Transitions API is unavailable.
- Motion can be reduced by system preference and turned off in the theme dock.
- The project dialog remains deep-linkable through `?project=<id>` and Back closes it correctly.
- `Ctrl/Cmd + K` opens search, except when another non-search dialog is active.
- The project dialog must keep the conceptual-art disclosure for enterprise work.
- Project filtering, search, and linked related-work affordances must continue to reach every project.
- No content change should require a design rewrite, and no design change should silently rewrite factual content.

## What Future Agents Must Not Do

- Replace the design with a generic SaaS, agency, or dashboard layout.
- Flatten Mixed mode into a simple background-color toggle.
- Add a hero card, hero badge cluster, metrics ribbon, profile social row, or floating promo overlay.
- Add stock photos or AI imagery where an abstract architecture study communicates the work more honestly.
- Add arbitrary gradient backgrounds, neon glows, or animated visual noise.
- Turn every project into a large paragraph or every paragraph into an animation.
- Hard-code visual colors inside components or duplicate theme state outside the theme provider.
- Use fake testimonials, fabricated test data, invented percentages, or unsourced claims.
- Expose confidential enterprise details.
- Remove accessibility behavior in order to simplify markup.
- Edit `package.json` or Vite configuration directly unless explicitly instructed by the repository owner.

## Definition Of Done

A change is done only when all applicable items are true:

- The request is satisfied with the smallest coherent change.
- The page still feels like one authored system in Light, Mixed, and Dark modes.
- Desktop and small-screen layouts remain intentional rather than merely non-broken.
- Keyboard use, visible focus, and reduced motion are supported.
- New claims are sourced in project data or clearly framed as conceptual/editorial.
- No private enterprise information has leaked.
- The production build succeeds.
- The final response references changed file paths, summarizes behavior, and states any verification that could not be performed.

## Suggested Handoff Prompt

Use this when asking a future agent to work on the site:

> Read `AGENTS.md` and `docs/INK_AND_PAPER_SYSTEM.md` first. Preserve Ink & Paper’s editorial Mixed-mode design and its paper/plate token system. Make the smallest complete change that satisfies the request. Do not introduce generic cards, dashboard layouts, decorative clutter, unverified claims, or inaccessible interactions. Verify Light, Mixed, and Dark modes, reduced motion, keyboard behavior, mobile layout, and the production build where relevant.