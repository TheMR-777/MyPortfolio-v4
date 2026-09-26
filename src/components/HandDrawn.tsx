import { useMemo } from "react";
import { cn } from "../utils/cn";

/**
 * Ink & Paper's hand-drawn layer.
 *
 * Built from smooth, randomized Catmull-Rom curves through a handful of
 * jittered points — never an SVG turbulence filter. Turbulence displaces
 * geometry as pixel-level noise: fine on a large shape, but on a short
 * stroke (an underline, a signature, a 5px hatch mark) the noise wavelength
 * dwarfs the shape and it reads as an illegible scribble. A curve smoothed
 * through a few randomized points reads as a hand, not static.
 *
 * Randomness lives in the *geometry parameters*, not the render: the strata
 * recompute fresh jittered points on each mount, and the underline flows from
 * a harmonic wave whose frequencies, phases and amplitudes are re-rolled on
 * each hover (via `useMemo`), so the line is never the same stroke twice —
 * but it is always smooth.
 *
 * Reserved for human, editorial moments. The architecture studies in
 * `ProjectVisual` stay machine-crisp on purpose — precision is the
 * engineering claim there. Sketching a monitoring pipeline would say the
 * wrong thing about the work.
 */

function round(n: number) {
  return Math.round(n * 100) / 100;
}

/** A smooth curve through every point (uniform Catmull-Rom → cubic Béziers). */
function smoothPath(points: [number, number][]): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${round(points[0][0])} ${round(points[0][1])}`;
  const p = [points[0], ...points, points[points.length - 1]];
  let d = `M ${round(p[1][0])} ${round(p[1][1])}`;
  for (let i = 1; i < p.length - 2; i++) {
    const [x0, y0] = p[i - 1];
    const [x1, y1] = p[i];
    const [x2, y2] = p[i + 1];
    const [x3, y3] = p[i + 2];
    const c1x = x1 + (x2 - x0) / 6, c1y = y1 + (y2 - y0) / 6;
    const c2x = x2 - (x3 - x1) / 6, c2y = y2 - (y3 - y1) / 6;
    d += ` C ${round(c1x)} ${round(c1y)}, ${round(c2x)} ${round(c2y)}, ${round(x2)} ${round(y2)}`;
  }
  return d;
}

/**
 * A gently wandering line between two x positions. Amplitude tapers to zero
 * at both ends (a sine envelope) so the stroke always settles onto its
 * baseline before it meets a neighboring shape — no hard turns at the seam.
 */
function wobble(xStart: number, xEnd: number, baseline: number, amplitude: number, count: number): [number, number][] {
  const points: [number, number][] = [];
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const envelope = Math.sin(t * Math.PI);
    const y = baseline + (Math.random() * 2 - 1) * amplitude * (0.25 + 0.75 * envelope);
    points.push([xStart + t * (xEnd - xStart), y]);
  }
  return points;
}

/**
 * Generates an organic, silky-smooth undulation between xStart and xEnd.
 * Uses a smooth window envelope sin(t * pi)^1.5 so the stroke starts and ends
 * completely horizontal and tangent to the baseline — guaranteed ZERO hard turns.
 */
function harmonicLine(
  xStart: number,
  xEnd: number,
  baseline: number,
  maxAmp: number,
  steps = 16
): [number, number][] {
  const phi1 = Math.random() * Math.PI * 2;
  const phi2 = Math.random() * Math.PI * 2;
  const f1 = 1.0 + Math.random() * 0.5;
  const f2 = 2.2 + Math.random() * 0.8;
  const a1 = maxAmp * (0.6 + Math.random() * 0.4);
  const a2 = maxAmp * (0.2 + Math.random() * 0.3);

  const points: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    // Window envelope ensures amplitude and derivative smoothly reach 0 at endpoints
    const envelope = Math.pow(Math.sin(t * Math.PI), 1.4);
    const wave = a1 * Math.sin(t * Math.PI * f1 + phi1) + a2 * Math.sin(t * Math.PI * f2 + phi2);
    const y = baseline + envelope * wave;
    points.push([xStart + t * (xEnd - xStart), round(y)]);
  }
  return points;
}

/**
 * A pen underline that draws itself beneath a title on hover or focus, like
 * marking a line in the margin. `seed` is only a memo key — pass a new value
 * (e.g. on pointer-enter) and the squiggle redraws, equally smooth but never
 * quite the same stroke twice.
 *
 * One stroke, deliberately. An earlier version layered a second, fainter
 * "ghost" pass with its own random points; because the two wobbles diverged,
 * it read as two separate lines — one from the left, another that seemed to
 * begin mid-word and trail off. A pen makes one mark.
 *
 * The stroke is generated from a continuous harmonic curve (harmonicLine), not
 * a jittered random walk, and drawn with pathLength={100} plus pure SVG
 * coordinates — deliberately without vector-effect: non-scaling-stroke. That
 * combination (non-scaling-stroke + preserveAspectRatio="none" + a fractional
 * pathLength) makes dash math diverge from the squashed geometry in several
 * engines: the draw stutters, thins, or reads as two lines. A wide 200-unit
 * viewBox keeps the horizontal scale gentle, so the pen always draws as ONE
 * single, continuous stroke from left to right.
 */
export function HandUnderline({ seed = 0, className }: { seed?: number; className?: string }) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { main, markerFaint } = useMemo(() => {
    // Generate the primary stroke points
    const mainPts = harmonicLine(2, 198, 6, 2.0, 18);

    // Marker shadow/bleed pass: tightly married to the primary stroke.
    // Instead of random independent waves which can diverge and create empty gaps,
    // we derive this stroke directly from the primary path points with a subtle,
    // soft downward/organic drift (0.3px to 0.7px).
    // Because the stroke-width of the bleed is 2.8px and main is 1.7px,
    // it hugs and peeks from underneath the main stroke with zero disjointed separation.
    const faintPts: [number, number][] = mainPts.map(([x, y], idx) => {
      const t = idx / (mainPts.length - 1);
      // Subtle organic pressure variance along the marker stroke
      const variance = Math.sin(t * Math.PI) * 0.45 + (Math.sin(t * Math.PI * 3) * 0.2);
      return [round(x + 0.3), round(y + 0.55 + variance)];
    });

    return {
      main: smoothPath(mainPts),
      markerFaint: smoothPath(faintPts),
    };
  }, [seed]);

  return (
    <svg
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
      className={cn("hand-underline", className)}
      aria-hidden="true"
      focusable="false"
    >
      <path d={markerFaint} pathLength={100} className="hand-underline-bleed" />
      <path d={main} pathLength={100} className="hand-underline-main" />
    </svg>
  );
}

/**
 * Geological strata, sketched — the motif for "the work beneath the work."
 * A fresh layout every time the section mounts: three smooth layers, widest
 * at the bottom, with short randomized hatch ticks (each a plain straight
 * segment at a random angle — never turbulence-warped, so they stay legible
 * even at a few pixels long).
 */
export function HandStrata({ className }: { className?: string }) {
  const { top, mid, bottom, ticks } = useMemo(() => {
    const tickCount = 10;
    const ticks = Array.from({ length: tickCount }, (_, i) => {
      const t = i / (tickCount - 1);
      const x = 15 + t * 156 + (Math.random() * 4 - 2);
      const angle = (42 + Math.random() * 18) * (Math.PI / 180);
      const len = 5 + Math.random() * 2.5;
      return { x1: round(x), y1: 60, x2: round(x + Math.cos(angle) * len), y2: round(60 + Math.sin(angle) * len) };
    });
    return {
      top: smoothPath(wobble(58, 130, 19, 1.3, 5)),
      mid: smoothPath(wobble(30, 154, 38, 1.6, 6)),
      bottom: smoothPath(wobble(7, 177, 56, 1.8, 7)),
      ticks,
    };
  }, []);

  return (
    <svg viewBox="0 0 184 70" className={className} fill="none" aria-hidden="true" focusable="false">
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d={top} stroke="currentColor" strokeOpacity=".28" strokeWidth="1.3" />
        <path d={mid} stroke="currentColor" strokeOpacity=".42" strokeWidth="1.4" />
        <path d={bottom} stroke="var(--accent)" strokeOpacity=".85" strokeWidth="1.7" />
        {ticks.map((tick, i) => (
          <line key={i} x1={tick.x1} y1={tick.y1} x2={tick.x2} y2={tick.y2} stroke="var(--accent)" strokeOpacity=".32" strokeWidth="1.1" />
        ))}
      </g>
    </svg>
  );
}

/**
 * A masterclass calligraphic paraph flourish beneath the author's signature.
 *
 * A signature line is drawn FAST — one committed gesture, not a wander. So
 * this is composed as a single pen path a signer would actually make: a
 * generous hammock arc swept under "Ammar Khan.", one rising stroke that
 * doesn't decelerate, a ribbon loop where the pen crosses itself (the
 * classic paraph — the "I signed this" mark), and a tail that lifts off the
 * page. C1-continuous at every join, so there is no corner for the eye to
 * snag on.
 *
 * Only the *gesture parameters* breathe per mount — how deep the hammock
 * sags, where its center sits, where the sweep enters the loop — never
 * individual points. The composition (entry, proportions, loop placement)
 * is fixed, which is what keeps it looking like a practiced signature
 * rather than a random squiggle: someone who signs their name daily makes
 * the same gesture with slightly different breath each time.
 *
 * The geometry runs past the full width of the name (~172px of ink against
 * a ~155px signature) — a paraph that stops short of the name it claims
 * reads as an underline, not a signature.
 */
export function HandFlourish({ className }: { className?: string }) {
  const d = useMemo(() => {
    const dip = 18 + Math.random() * 2.5; // hammock bottom
    const midX = 86 + Math.random() * 6;  // hammock center
    const loopX = 158 + Math.random() * 4; // where the upward sweep enters the loop

    // Entry at x=4, y=11 — the pen lands just past the start of the name.
    // 1. Hammock: dips gracefully under the first half, tangent-horizontal at
    //    its bottom, then rises on a long confident sweep.
    // 2. The rise carries into the loop region without braking.
    // 3. The paraph loop: over the top, back down-left, crossing the rising
    //    stroke, and out again rightward.
    // 4. A short terminal tail as the pen leaves the page.
    return (
      `M 4 11 ` +
      `C 32 ${round(dip * 0.85)}, ${round(midX - 24)} ${round(dip)}, ${round(midX)} ${round(dip)} ` +
      `C ${round(midX + 28)} ${round(dip)}, ${round(loopX - 20)} 12, ${round(loopX)} 8 ` +
      `C ${round(loopX + 14)} 5, 184 6, 184 11 ` +
      `C 184 16, 168 18, 164 15 ` +
      `C 160 12, 168 7, 178 7 ` +
      `C 184 7, 187 11, 186 16`
    );
  }, []);

  return (
    <svg
      viewBox="0 0 190 26"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={d}
        stroke="currentColor"
        strokeOpacity=".88"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
