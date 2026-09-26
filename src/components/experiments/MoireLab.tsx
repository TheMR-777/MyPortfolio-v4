import { useId, useState } from "react";
import { RotateCcw } from "lucide-react";
import { Label } from "../ui";

export function MoireLab() {
  const [angle, setAngle] = useState(6);
  const id = useId();
  return (
    <section className="plate mt-8 rounded-2xl p-5 sm:p-6" aria-labelledby={`${id}-title`}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <Label onPlate>An interactive study</Label>
          <h3 id={`${id}-title`} className="mt-2 font-serif text-2xl">A small rotation. A new pattern.</h3>
        </div>
        <button type="button" className="icon-button text-plate-muted" aria-label="Reset rotation to six degrees" onClick={() => setAngle(6)}><RotateCcw className="h-4 w-4" /></button>
      </div>
      <div className="relative mt-5 h-56 overflow-hidden rounded-xl border border-plate-line bg-plate" aria-hidden="true">
        <div className="moire-pattern absolute -inset-48 text-plate-fg opacity-35" />
        <div className="moire-pattern absolute -inset-48 text-accent opacity-90" style={{ transform: `rotate(${angle}deg)` }} />
      </div>
      <div className="mt-5 flex items-center justify-between gap-4">
        <label htmlFor={`${id}-angle`} className="text-xs text-plate-muted">Angle between the line fields</label>
        <output htmlFor={`${id}-angle`} className="font-mono text-xs tabular-nums text-accent">{angle.toFixed(1)}&deg;</output>
      </div>
      <input id={`${id}-angle`} type="range" min="0" max="16" step="0.1" value={angle} onChange={(event) => setAngle(Number(event.target.value))} className="mt-3 h-8 w-full cursor-ew-resize accent-accent" aria-valuetext={`${angle.toFixed(1)} degrees`} />
      <p className="mt-2 text-xs leading-relaxed text-plate-muted">Neither layer contains the large bands you see. They emerge from the interference between two simple patterns.</p>
    </section>
  );
}