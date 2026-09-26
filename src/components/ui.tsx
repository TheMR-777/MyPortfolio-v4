import React from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";
import { useTheme } from "../theme/ThemeProvider";

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} tabIndex={-1} className={cn("relative mx-auto w-full max-w-6xl px-5 sm:px-8 py-20 sm:py-28 outline-none", className)}>
      {children}
    </section>
  );
}

/**
 * Section-level act marker. The accent dash is deliberate: it is the one
 * recurring accent the reader learns to follow down the page.
 * Sub-blocks use `Label` instead, so this stays meaningful.
 */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] leading-relaxed text-ink-faint", className)}>
      <span aria-hidden="true" className="h-px w-7 shrink-0 bg-accent" />
      {children}
    </div>
  );
}

/** Sub-block marker. No accent — quieter than an Eyebrow on purpose. */
export function Label({ children, className, onPlate }: { children: React.ReactNode; className?: string; onPlate?: boolean }) {
  return <p className={cn("label", onPlate ? "text-plate-faint" : "text-ink-faint", className)}>{children}</p>;
}

export function Heading({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={cn("mt-5 font-serif text-[2.65rem] sm:text-5xl md:text-[3.65rem] leading-[1.02] tracking-tight", className)}>
      {children}
    </h2>
  );
}

export function Plate({
  children,
  className,
  as: Tag = "div",
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  hover?: boolean;
}) {
  return (
    <Tag
      className={cn(
        "plate rounded-3xl",
        hover && "transition-transform duration-500 will-change-transform hover:-translate-y-1",
        className
      )}
    >
      {children}
    </Tag>
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const { reduceMotion } = useTheme();
  return (
    <motion.div
      className={cn("reveal min-w-0", className)}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -35px 0px" }}
      transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-current/15 px-2.5 py-1 font-mono text-[10px] tracking-wide",
        className
      )}
    >
      {children}
    </span>
  );
}

export function TechLine({ items, className }: { items: string[]; className?: string }) {
  return <div className={cn("tech-line", className)}>{items.map((item) => <span key={item}>{item}</span>)}</div>;
}
