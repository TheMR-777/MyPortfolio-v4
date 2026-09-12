import { useCallback, useEffect, useRef, useState } from "react";

export function useClipboard() {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  const copy = useCallback(async (text: string) => {
    let success = false;
    try {
      await navigator.clipboard.writeText(text);
      success = true;
    } catch {
      // Clipboard access can be denied in an embedded preview; try a real selection.
      const previousFocus = document.activeElement as HTMLElement | null;
      const field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.cssText = "position:fixed;left:-9999px;top:0;opacity:0";
      (document.querySelector("dialog[open]") ?? document.body).appendChild(field);
      field.select();
      try { success = document.execCommand("copy"); } catch { success = false; }
      field.remove();
      previousFocus?.focus({ preventScroll: true });
    }
    if (!mounted.current) return success;
    if (timeout.current) clearTimeout(timeout.current);
    setCopied(success);
    setError(!success);
    if (success) timeout.current = setTimeout(() => setCopied(false), 2400);
    return success;
  }, []);

  return { copy, copied, error };
}