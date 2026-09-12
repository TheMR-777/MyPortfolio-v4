import { useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";

export function HornerLab() {
  const [bits, setBits] = useState([1, 0, 1, 1]);
  const [step, setStep] = useState(4);
  const result = bits.slice(0, step).reduce((value, bit) => value * 2 + bit, 0);
  const previous = bits.slice(0, Math.max(step - 1, 0)).reduce((value, bit) => value * 2 + bit, 0);

  return (
    <div className="mt-5 border-t border-plate-line pt-5" aria-label="Interactive binary conversion using Horner's method">
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-[9px] uppercase tracking-widest text-plate-faint">Try it / Flip a bit</span>
        <button type="button" className="inline-flex min-h-8 items-center gap-1.5 text-[10px] text-plate-muted hover:text-accent" onClick={() => { setBits([1, 0, 1, 1]); setStep(4); }} aria-label="Reset binary number to 1011"><RotateCcw className="h-3 w-3" />Reset</button>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <div className="flex gap-1.5" role="group" aria-label="Four binary digits">
          {bits.map((bit, index) => (
            <button
              key={index} type="button" className="lab-digit" data-read={index < step} aria-pressed={bit === 1}
              aria-label={`Binary digit ${index + 1}: ${bit}. Toggle digit.`}
              onClick={() => { setBits((values) => values.map((value, i) => i === index ? 1 - value : value)); setStep(4); }}
            >{bit}</button>
          ))}
        </div>
        <ArrowRight className="ml-auto h-4 w-4 text-plate-faint" aria-hidden="true" />
        <output className="min-w-10 text-right font-serif text-4xl tabular-nums text-accent" aria-label="Decimal result" aria-live="polite">{result}</output>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[10px] text-plate-muted" aria-live="polite">{previous} &times; 2 + {bits[step - 1]} = <span className="text-accent">{result}</span><span className="ml-2 text-plate-faint">({step}/4)</span></p>
        <button type="button" className="text-link min-h-8 text-[10px] text-plate-fg" onClick={() => setStep((value) => value === 4 ? 1 : value + 1)}>{step === 4 ? "Walk through the steps" : "Next digit"}<ArrowRight className="h-3 w-3" /></button>
      </div>
      <p className="mt-2 text-[10px] leading-relaxed text-plate-faint">Left to right. Double the result. Add the next digit.</p>
    </div>
  );
}