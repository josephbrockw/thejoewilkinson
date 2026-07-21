/**
 * Composable, prop-driven building blocks shared by every notebook page.
 *
 * These are the repeated structural pieces (cover, section, panel, figure, mock,
 * routine) lifted out of the individual pages so each page reads as composition.
 * All of them use CSS classes already defined in SHARED_STYLES — no new styles.
 * Stateless and presentational (the only interactive piece, CardGrid, lives in
 * ./cards).
 */

import { type CSSProperties, type ReactNode } from "react";

/** The cover plate: eyebrow, title, subtitle, thesis, and the pen line. */
export function NotebookCover({
  eyebrow,
  title,
  subtitle,
  thesis,
  penline,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  subtitle: ReactNode;
  thesis: ReactNode;
  penline: ReactNode;
}) {
  return (
    <header className="ln-plate">
      <div className="ln-eyebrow">{eyebrow}</div>
      <h1 className="ln-title">{title}</h1>
      <p className="ln-sub">{subtitle}</p>
      <p className="ln-thesis">{thesis}</p>
      <div className="ln-penline">{penline}</div>
    </header>
  );
}

/** A numbered section heading (e.g. "01 · The five sections"). */
export function SectionHead({ n, children }: { n: string; children: ReactNode }) {
  return (
    <div className="ln-sec-head">
      <span className="ln-sec-num">{n}</span>
      <h2>{children}</h2>
    </div>
  );
}

/**
 * A numbered section: heading, an optional lead paragraph, then its body.
 * Anything beyond the single lead (extra paragraphs, subheads, figures, panels)
 * goes in `children`.
 */
export function Section({
  n,
  title,
  lead,
  children,
}: {
  n: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="ln-section">
      <SectionHead n={n}>{title}</SectionHead>
      {lead != null && <p className="ln-lead">{lead}</p>}
      {children}
    </section>
  );
}

/** A captioned diagram. Wide figures scroll horizontally on small screens. */
export function Figure({ svg, caption, wide }: { svg: string; caption: ReactNode; wide?: boolean }) {
  return (
    <figure className="ln-fig">
      <div className={wide ? "ln-scroll" : undefined}>
        <div
          className={wide ? "ln-svg ln-svg-wide" : "ln-svg"}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

/** A bordered panel with an optional heading. */
export function Panel({
  title,
  style,
  children,
}: {
  title?: ReactNode;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div className="ln-panel" style={style}>
      {title != null && <h3 className="ln-panel-h">{title}</h3>}
      {children}
    </div>
  );
}

/** A mock header row (the small uppercase label above a mock block). */
export function MockHead({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div className="ln-mock-h" style={style}>
      {children}
    </div>
  );
}

/** The muted note under a mock block. */
export function MockNote({ children }: { children: ReactNode }) {
  return <p className="ln-mock-note">{children}</p>;
}

/**
 * A mock "handwritten page" block. For the common single-block case pass `head`
 * and `note`; for multi-header mocks omit them and compose <MockHead>/<MockNote>
 * inside `children`.
 */
export function Mock({
  head,
  note,
  children,
}: {
  head?: ReactNode;
  note?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="ln-mock">
      {head != null && <MockHead>{head}</MockHead>}
      {children}
      {note != null && <MockNote>{note}</MockNote>}
    </div>
  );
}

/** A checkbox-style routine list, labelled with its cadence. */
export function Routine({ cadence, items }: { cadence: string; items: string[] }) {
  return (
    <div className="ln-routine">
      <div className="ln-routine-h">Routine &#183; {cadence}</div>
      <ul>
        {items.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
