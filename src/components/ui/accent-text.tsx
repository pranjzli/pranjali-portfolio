import { Fragment, type ReactNode } from "react";

/**
 * Renders copy with three inline markers:
 *   *word*     -> serif italic accent
 *   [[word]]   -> highlighter chip (alternating yellow / green)
 *   {{name}}   -> inline company logo from /images/logos/<name>.png
 */
export function AccentText({ children }: { children: string }) {
  const tokens = children.split(/(\*[^*]+\*|\[\[[^\]]+\]\]|\{\{[^}]+\}\})/g);
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
    if (tok.startsWith("{{") && tok.endsWith("}}")) {
      const name = tok.slice(2, -2);
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src={`/images/logos/${name}.png`}
          alt=""
          aria-hidden
          className="inline-block size-[1.15em] translate-y-[-0.1em] rounded-[0.25em] align-middle"
        />
      );
    }
    return <Fragment key={i}>{tok}</Fragment>;
  });

  return <>{out}</>;
}
