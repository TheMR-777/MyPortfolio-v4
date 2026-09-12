import { createElement, type ReactNode } from "react";

const CLASS: Record<string, string> = {
  hi: "st-hi",
  ac: "st-ac",
  em: "st-em",
  dim: "st-dim",
  code: "st-code",
  i: "italic",
  dt: "st-dim",
};

export function StyledText({ text, className }: { text: string; className?: string }) {
  type Frame = { tag: string; className: string; opening: string; children: ReactNode[] };
  const stack: Frame[] = [{ tag: "root", className: "", opening: "", children: [] }];
  const tokens = /\[(\/?)(hi|ac|em|dim|code|i|dt|c)(?:=([^\]]+))?\]|<br\s*\/?>/g;
  let last = 0;
  let key = 0;

  // A local stack supports nested emphasis without shared regex state or raw HTML.
  for (const token of text.matchAll(tokens)) {
    const current = stack[stack.length - 1];
    const index = token.index ?? 0;
    if (index > last) current.children.push(text.slice(last, index));
    const [raw, closing, tag, customClasses] = token;
    if (raw.startsWith("<br")) current.children.push(<br key={key++} />);
    else if (!closing) {
      const custom = customClasses?.includes("text-accent") ? "st-ac"
        : customClasses?.includes("text-text-primary") ? "st-hi"
        : customClasses?.includes("text-text-secondary") ? "st-dim" : "";
      stack.push({ tag, className: tag === "c" ? custom : CLASS[tag] ?? "", opening: raw, children: [] });
    } else if (stack.length > 1 && current.tag === tag) {
      const frame = stack.pop()!;
      const element = tag === "code" ? "code" : tag === "hi" ? "strong" : tag === "em" || tag === "i" ? "em" : "span";
      stack[stack.length - 1].children.push(createElement(element, { key: key++, className: frame.className }, frame.children));
    } else current.children.push(raw);
    last = index + raw.length;
  }
  if (last < text.length) stack[stack.length - 1].children.push(text.slice(last));
  while (stack.length > 1) {
    const frame = stack.pop()!;
    stack[stack.length - 1].children.push(frame.opening, ...frame.children);
  }
  return <span className={className}>{stack[0].children}</span>;
}

export function plainText(text: string) {
  return text.replace(/\[(?:\/?(?:hi|ac|em|dim|code|i|dt)|c=[^\]]+|\/c)\]/g, "").replace(/<br\s*\/?>/g, " ");
}
