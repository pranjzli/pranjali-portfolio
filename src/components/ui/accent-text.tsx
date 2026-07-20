import { Fragment, type ReactNode } from "react";

/**
 * Renders copy with two inline markers:
 *   *word*     -> serif italic accent
 *   [[word]]   -> highlighter chip (alternating yellow / green)
 */
export function AccentText({ children }: { children: string }) {
  const tokens = children.split(/(\*[^*]+\*|\[\[[^\]]+\]\])/g);
  let highlightIndex = 0;

  const out: ReactNode[] = tokens.map((tok, i) => {
    if (tok.startsWith("*") && tok.endsWith("*")) {
      return (
        <span key={i} className="serif">
          {tok.slice(1, -1)}
        </span>
      );
    }
    if (tok.startsWith("[[") && tok.endsWith("]]")) {
      const cls = highlightIndex++ % 2 === 0 ? "mark-green" : "mark-yellow";
      return (
        <span key={i} className={cls}>
          {tok.slice(2, -2)}
        </span>
      );
    }
    return <Fragment key={i}>{tok}</Fragment>;
  });

  return <>{out}</>;
}
