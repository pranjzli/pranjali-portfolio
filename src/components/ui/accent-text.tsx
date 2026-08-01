import { Fragment, type ReactNode } from "react";

/**
 * Renders copy with three inline markers:
 *   *word*     -> serif italic accent
 *   [[word]]   -> highlighter chip (alternating yellow / green, starts yellow)
 *   {{name}}   -> inline company logo from /images/logos/<name>.png
 *
 * A logo is glued to the company name that follows it (a plain word, or the
 * next [[chip]]/*serif* run) inside a `whitespace-nowrap` span, so the icon
 * never gets orphaned at the end of a line away from its name.
 */
export function AccentText({ children }: { children: string }) {
  const tokens = children.split(/(\*[^*]+\*|\[\[[^\]]+\]\]|\{\{[^}]+\}\})/g);
  let highlightIndex = 0;

  const isMarker = (t: string) => /^(\*|\[\[|\{\{)/.test(t);

  const renderMarker = (tok: string, key: number | string): ReactNode => {
    if (tok.startsWith("*") && tok.endsWith("*")) {
      return (
        <span key={key} className="serif">
          {tok.slice(1, -1)}
        </span>
      );
    }
    if (tok.startsWith("[[") && tok.endsWith("]]")) {
      const cls = highlightIndex++ % 2 === 0 ? "mark-yellow" : "mark-green";
      return (
        <span key={key} className={cls}>
          {tok.slice(2, -2)}
        </span>
      );
    }
    return <Fragment key={key}>{tok}</Fragment>;
  };

  const logoImg = (name: string, key: number | string) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={key}
      src={`/images/logos/${name}.png`}
      alt=""
      aria-hidden
      className="inline-block size-[1.15em] translate-y-[-0.1em] rounded-[0.25em] align-middle"
    />
  );

  const out: ReactNode[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i];
    if (!tok) continue; // skip empties, incl. tokens consumed by a preceding logo

    if (tok.startsWith("{{") && tok.endsWith("}}")) {
      const name = tok.slice(2, -2);
      const group: ReactNode[] = [logoImg(name, `${i}-img`), " "];

      const next = tokens[i + 1];
      if (typeof next === "string" && /^\s+$/.test(next)) {
        // Pure space between the logo and the next marker (e.g. "{{x}} [[X]]").
        tokens[i + 1] = "";
        const after = tokens[i + 2];
        if (typeof after === "string" && isMarker(after)) {
          group.push(renderMarker(after, `${i + 2}-m`));
          tokens[i + 2] = "";
        }
        out.push(
          <span key={i} className="whitespace-nowrap">
            {group}
          </span>,
        );
        continue;
      }
      if (typeof next === "string") {
        // Leading space(s) then a word — glue the logo to that first word,
        // leave the rest of the run to flow (and wrap) normally.
        const m = next.match(/^(\s*)(\S+)([\s\S]*)$/);
        if (m) {
          group.push(m[2]);
          tokens[i + 1] = m[3];
          out.push(
            <span key={i} className="whitespace-nowrap">
              {group}
            </span>,
          );
          continue;
        }
      }
      out.push(
        <span key={i} className="whitespace-nowrap">
          {logoImg(name, `${i}-solo`)}
        </span>,
      );
      continue;
    }

    out.push(renderMarker(tok, i));
  }

  return <>{out}</>;
}
