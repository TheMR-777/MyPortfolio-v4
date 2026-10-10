# Small regression safety net

From `portfolio/`, with the existing dependencies and Bun available:

```powershell
bun test ./tests
.\node_modules\.bin\tsc --noEmit
bun run build
```

No new package, package script, Vite setting or browser-test dependency is required.
Tests are `.mjs` outside `src`: Bun loads the actual TS/TSX application modules,
while the existing TypeScript check remains scoped to the application. Tests are
validated by executing them, not by claiming that `tsc` checked these files.

## Contracts covered

| File | What it protects |
| --- | --- |
| `portfolio-contracts.test.mjs` | Stable published project IDs, unique IDs, retained detailed studies, navigation metadata, initial selection for every project URL, `ace-status` alias, invalid/encoded query handling, nested emphasis, HTML escaping, malformed markup and plain search text |
| `theme-contracts.test.mjs` | Actual `index.html` first-paint scripts: Mixed default, all saved modes/accents, first-visit random accents without storage writes, agreement with React's accent tokens, storage failures, motion-preference precedence; actual pointer/keyboard transition-origin calculation |
| `reporting-method-contracts.test.mjs` | Non-interactive Reporting decoration, five-act metadata, rendered method anchor/credit/review/action, retained adoption/workflow/reference content, native stack disclosure, six Reporting mechanisms and separated implementation credit |

These checks deliberately do **not** snapshot project order/count, full copy, styles,
artwork geometry or the present gallery layout. The Reporting/method checks protect
retained content and five-act metadata, not the discarded pilot artwork or its layout.
SVG is allowed; the old test's HTML-only requirement was not a product contract.
New records are allowed.
Existing public IDs are intentional compatibility contracts, not disposable snapshots.

Tests are evidence about behavior, not the source of art direction. Current metadata
assertions can change alongside an authorized restructuring; they do not establish a
permanent five-section design law. Do not add technique bans or geometric quotas just
to freeze an implementation preference. Preserve meaningful compatibility and safety checks.

The URL checks server-render the real `PortfolioProvider`. A temporary `window.location`
boundary is restored in `finally`; run these tests normally, **not with `--concurrent`**.
Theme scripts execute in an isolated VM with deterministic random input. The DOM,
storage and system-preference boundaries are substitutes; the application logic is not.

## What still needs a real browser

- Native dialogs opening/closing, Escape, focus trap/restoration and visible focus.
- Push/replace history, Back/Forward, copy/share actions and anchor destinations.
- Search shortcut, result selection, filters, skill evidence links and mobile menu.
- React effects and persistence after a deliberate accent choice; first paint alone
  cannot prove that React never saves a random accent.
- View Transition fallback, system preference changes and the in-product motion switch.
- Horner/Moiré interactions, responsive layout, text zoom, contrast and dock overlap.

For a quick smoke pass, use a wide viewport and a narrow 390px viewport:

1. Inspect Mixed, Light and Dark; open the appearance panel, choose an accent,
   reload and confirm the deliberate choice remains. Use a fresh browser context
   for the first-visit test; do not clear unrelated browsing data.
2. Inspect the restored Reporting drawing both in Work and its dialog, including the
   single conceptual-art caption in the dialog. Open Reporting from the method link
   too; check local human/AI credit, squad/pivot content, the separate incident workflow
   and native stack disclosure. Close with Escape and check focus returns. Open it
   again, then exercise Back/Forward. Load `?project=ace-status` and confirm Overwatch.
3. Open search with Ctrl/Cmd+K; choose a result with arrows/Enter. Confirm it cannot
   open over a non-search modal. Test a filter and a retained section link.
4. Operate disclosures and the Horner/Moiré controls by keyboard. Disable gentle
   motion; separately check system-reduced motion and text zoom.
5. Record actual results and any failure, not just that the page loaded. The current
   scope and deferred checks live in the studio's
   [alignment progress](../../context-transfer/MEGA_ALIGNMENT_PROGRESS.md).

Automated checks are a safety net, not visual/accessibility acceptance or independent
verification of the portfolio owner's reported project outcomes.
