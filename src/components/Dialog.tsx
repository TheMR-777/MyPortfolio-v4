import { useLayoutEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useTheme } from "../theme/ThemeProvider";
import { cn } from "../utils/cn";

export function Dialog({ children, labelledBy, describedBy, onClose, className, panelClassName }: {
  children: ReactNode;
  labelledBy: string;
  describedBy?: string;
  onClose: () => void;
  className?: string;
  panelClassName?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const backdropDown = useRef(false);
  const { reduceMotion } = useTheme();

  useLayoutEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const trigger = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    dialog.showModal();
    const initial = dialog.querySelector<HTMLElement>("[data-autofocus]");
    initial?.focus({ preventScroll: true });

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
      requestAnimationFrame(() => {
        if (trigger?.isConnected && !document.querySelector("dialog[open]")) trigger.focus({ preventScroll: true });
      });
    };
  }, []);

  // Native modal dialogs provide the focus trap and make the background inert.
  return createPortal(
    <dialog
      ref={ref}
      className={cn("dialog-shell", className)}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onPointerDown={(event) => { backdropDown.current = event.target === event.currentTarget; }}
      onClick={(event) => {
        if (backdropDown.current && event.target === event.currentTarget) onClose();
        backdropDown.current = false;
      }}
    >
      <motion.div
        data-dialog-panel
        className={cn("dialog-panel", !panelClassName?.split(" ").includes("plate") && "paper", panelClassName)}
        initial={reduceMotion ? false : { opacity: 0, y: 18, scale: .985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: reduceMotion ? 0 : .35, ease: [.22, 1, .36, 1] }}
      >
        {children}
      </motion.div>
    </dialog>,
    document.body,
  );
}