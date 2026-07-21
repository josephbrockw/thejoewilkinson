"use client";

/**
 * The Learning Notebook, setup guide (web port of the PDF).
 * Drop-in Next.js App Router page. Self-contained: styles + fonts are inlined,
 * so it works without extra config. Client component (uses state for the modals).
 *
 * Fonts load from Google Fonts via @import. If you prefer next/font, delete the
 * @import line at the top of STYLES and wire up Fraunces / Lora / IBM Plex Mono there.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";

/* ----------------------------------------------------------------------- */
/* Inline SVG diagrams (raw markup so hyphenated attrs stay valid).          */
/* Wide diagrams scroll horizontally on small screens to stay legible.       */
/* ----------------------------------------------------------------------- */

const FLIP_SVG = `
<svg viewBox="0 0 680 232" xmlns="http://www.w3.org/2000/svg" font-family="'IBM Plex Mono',monospace">
  <rect x="8" y="40" width="26" height="150" rx="3" fill="#2E4636"/>
  <rect x="646" y="40" width="26" height="150" rx="3" fill="#2E4636"/>
  <text x="21" y="118" fill="#E9E5D8" font-size="8" transform="rotate(-90 21 118)" text-anchor="middle" letter-spacing="2">FRONT COVER</text>
  <text x="659" y="118" fill="#E9E5D8" font-size="8" transform="rotate(-90 659 118)" text-anchor="middle" letter-spacing="2">BACK COVER</text>
  <rect x="40" y="40" width="600" height="150" fill="#F3F0E7" stroke="#CBC3AE" stroke-width="1"/>
  <g stroke="#E4DEC9" stroke-width="1">
    <line x1="40" y1="66" x2="640" y2="66"/><line x1="40" y1="92" x2="640" y2="92"/>
    <line x1="40" y1="118" x2="640" y2="118"/><line x1="40" y1="144" x2="640" y2="144"/><line x1="40" y1="170" x2="640" y2="170"/>
  </g>
  <rect x="40" y="40" width="330" height="150" fill="#2E4636" opacity="0.06"/>
  <rect x="470" y="40" width="170" height="150" fill="#2E4636" opacity="0.13"/>
  <rect x="370" y="40" width="100" height="150" fill="none" stroke="#9E3B2E" stroke-width="1.1" stroke-dasharray="4 4"/>
  <line x1="58" y1="52" x2="352" y2="52" stroke="#232C27" stroke-width="1.4"/><path d="M352 52 l-8 -3.4 v6.8 z" fill="#232C27"/>
  <line x1="628" y1="52" x2="486" y2="52" stroke="#2E4636" stroke-width="1.4"/><path d="M486 52 l8 -3.4 v6.8 z" fill="#2E4636"/>
  <text x="52" y="34" fill="#232C27" font-size="10" font-weight="600" letter-spacing="1.5">CAPTURE  &#8250;  front to back</text>
  <text x="628" y="34" fill="#2E4636" font-size="10" font-weight="600" letter-spacing="1.5" text-anchor="end">back to front  &#8249;  REFERENCE</text>
  <text x="60" y="86" fill="#232C27" font-size="9.5" font-weight="600">Reading notes</text>
  <text x="60" y="99" fill="#5A645D" font-size="8">raw and linear, body left,</text>
  <text x="60" y="111" fill="#5A645D" font-size="8">margin kept clear at right</text>
  <text x="60" y="146" fill="#232C27" font-size="9.5" font-weight="600">Idea threads</text>
  <text x="60" y="159" fill="#5A645D" font-size="8">promoted as ideas recur</text>
  <text x="420" y="112" fill="#9E3B2E" font-size="8.5" font-weight="600" text-anchor="middle">leave the</text>
  <text x="420" y="124" fill="#9E3B2E" font-size="8.5" font-weight="600" text-anchor="middle">middle open</text>
  <text x="628" y="86" fill="#232C27" font-size="9.5" font-weight="600" text-anchor="end">Dig-deeper &#183; Register</text>
  <text x="628" y="99" fill="#5A645D" font-size="8" text-anchor="end">open loops &#183; threads at a glance</text>
  <text x="628" y="132" fill="#232C27" font-size="9.5" font-weight="600" text-anchor="end">Two indexes</text>
  <text x="628" y="145" fill="#5A645D" font-size="8" text-anchor="end">source &#183; theme (very back)</text>
  <text x="44" y="184" fill="#5A645D" font-size="7">p.1</text>
  <text x="636" y="184" fill="#5A645D" font-size="7" text-anchor="end">p.N</text>
</svg>`;

const LIFECYCLE_SVG = `
<svg viewBox="0 0 680 214" xmlns="http://www.w3.org/2000/svg" font-family="'IBM Plex Mono',monospace">
  <rect x="8" y="50" width="148" height="66" rx="6" fill="#F1EDE2" stroke="#2E4636" stroke-width="1.2"/>
  <text x="82" y="78" text-anchor="middle" fill="#2E4636" font-size="9" font-weight="600">1 &#183; SET UP</text>
  <text x="82" y="93" text-anchor="middle" fill="#232C27" font-size="8" font-family="Lora,serif">the new volume</text>
  <text x="82" y="105" text-anchor="middle" fill="#5A645D" font-size="7">(or migrate)</text>
  <rect x="178" y="50" width="148" height="66" rx="6" fill="#F1EDE2" stroke="#2E4636" stroke-width="1.2"/>
  <text x="252" y="78" text-anchor="middle" fill="#2E4636" font-size="9" font-weight="600">2 &#183; START A SOURCE</text>
  <text x="252" y="93" text-anchor="middle" fill="#232C27" font-size="8" font-family="Lora,serif">write a header,</text>
  <text x="252" y="105" text-anchor="middle" fill="#5A645D" font-size="7">log it in the index</text>
  <rect x="348" y="50" width="148" height="66" rx="6" fill="#F1EDE2" stroke="#2E4636" stroke-width="1.2"/>
  <text x="422" y="78" text-anchor="middle" fill="#2E4636" font-size="9" font-weight="600">3 &#183; CAPTURE</text>
  <text x="422" y="93" text-anchor="middle" fill="#232C27" font-size="8" font-family="Lora,serif">notes in the body,</text>
  <text x="422" y="105" text-anchor="middle" fill="#5A645D" font-size="7">margin left clear</text>
  <rect x="518" y="50" width="148" height="66" rx="6" fill="#F1EDE2" stroke="#2E4636" stroke-width="1.5"/>
  <text x="592" y="78" text-anchor="middle" fill="#2E4636" font-size="9" font-weight="600">4 &#183; FINISH</text>
  <text x="592" y="93" text-anchor="middle" fill="#232C27" font-size="8" font-family="Lora,serif">Seeds, then the</text>
  <text x="592" y="105" text-anchor="middle" fill="#5A645D" font-size="7">full review pass</text>
  <g stroke="#232C27" stroke-width="1.5" fill="#232C27">
    <line x1="158" y1="83" x2="172" y2="83"/><path d="M176 83 l-7 -3 v6 z"/>
    <line x1="328" y1="83" x2="342" y2="83"/><path d="M346 83 l-7 -3 v6 z"/>
    <line x1="498" y1="83" x2="512" y2="83"/><path d="M516 83 l-7 -3 v6 z"/>
  </g>
  <path d="M592 118 C592 176 252 176 252 122" stroke="#2E4636" stroke-width="1.4" fill="none"/>
  <path d="M252 120 l-4 8 h8 z" fill="#2E4636"/>
  <text x="422" y="150" text-anchor="middle" fill="#2E4636" font-size="8" font-weight="600">repeat for each source</text>
  <text x="340" y="200" text-anchor="middle" fill="#5A645D" font-size="7.5" font-family="Lora,serif">When the notebook fills, migrate the open parts into a new volume and carry on.</text>
</svg>`;

const MIGRATION_SVG = `
<svg viewBox="0 0 680 236" xmlns="http://www.w3.org/2000/svg" font-family="'IBM Plex Mono',monospace">
  <rect x="24" y="40" width="150" height="176" rx="4" fill="#2E4636" opacity="0.10" stroke="#2E4636" stroke-width="1.2"/>
  <rect x="24" y="40" width="16" height="176" rx="3" fill="#2E4636"/>
  <text x="108" y="30" fill="#2E4636" font-size="9" font-weight="600" text-anchor="middle">VOLUME I &#183; full</text>
  <text x="104" y="70" fill="#232C27" font-size="7.6" text-anchor="middle">stays on the shelf</text>
  <text x="104" y="84" fill="#232C27" font-size="7.6" text-anchor="middle">as an archive</text>
  <g font-family="Lora,serif" font-size="8" fill="#5A645D">
    <text x="52" y="112">&#9642; all reading notes</text>
    <text x="52" y="130">&#9642; closed threads</text>
    <text x="52" y="148">&#9642; old indexes (intact)</text>
  </g>
  <text x="104" y="180" fill="#9E3B2E" font-size="7.4" text-anchor="middle" font-weight="600">label the cover:</text>
  <text x="104" y="192" fill="#9E3B2E" font-size="7.4" text-anchor="middle" font-weight="600">"Vol I &#183; dates"</text>
  <rect x="506" y="40" width="150" height="176" rx="4" fill="#F1EDE2" stroke="#2E4636" stroke-width="1.4"/>
  <rect x="640" y="40" width="16" height="176" rx="3" fill="#2E4636"/>
  <text x="580" y="30" fill="#2E4636" font-size="9" font-weight="600" text-anchor="middle">VOLUME II &#183; fresh</text>
  <g font-family="Lora,serif" font-size="8" fill="#232C27">
    <text x="524" y="72">&#9642; open threads, recopied</text>
    <text x="524" y="90">&#9642; theme index, open only</text>
    <text x="524" y="108">&#9642; register, rebuilt</text>
    <text x="524" y="126">&#9642; open dig-deeper items</text>
  </g>
  <text x="580" y="156" fill="#5A645D" font-size="7.4" text-anchor="middle">first page:</text>
  <text x="580" y="168" fill="#5A645D" font-size="7.4" text-anchor="middle">"carried from Vol I"</text>
  <g stroke="#232C27" stroke-width="1.6" fill="none"><path d="M182 96 L498 80"/><path d="M182 128 L498 110"/></g>
  <path d="M498 80 l-8.4 -1 l2.4 6.4 z" fill="#232C27"/><path d="M498 110 l-8.4 -1 l2.4 6.4 z" fill="#232C27"/>
  <text x="340" y="72" fill="#2E4636" font-size="8" font-weight="600" text-anchor="middle">CARRY what is open</text>
  <path d="M182 150 q40 20 40 44" stroke="#9E3B2E" stroke-width="1.4" fill="none" stroke-dasharray="3 3"/>
  <text x="250" y="210" fill="#9E3B2E" font-size="8" font-weight="600" text-anchor="middle">LEAVE the rest (do not recopy notes)</text>
  <rect x="286" y="120" width="108" height="30" rx="4" fill="#F3F0E7" stroke="#CBC3AE"/>
  <text x="340" y="132" fill="#5A645D" font-size="6.6" text-anchor="middle">cross-volume links stay</text>
  <text x="340" y="143" fill="#232C27" font-size="8.4" text-anchor="middle" font-weight="600">"see I-88"</text>
</svg>`;

const THEME_SVG = `
<svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg" font-family="'IBM Plex Mono',monospace">
  <rect x="70" y="126" width="200" height="48" rx="3" fill="#9E3B2E" opacity="0.09"/>
  <rect x="70" y="126" width="200" height="48" rx="3" fill="none" stroke="#9E3B2E" stroke-width="1.2"/>
  <text x="80" y="142" fill="#9E3B2E" font-size="7.5" font-weight="600">THEME INDEX</text>
  <text x="80" y="160" fill="#232C27" font-size="8.5" font-family="Lora,serif">Incentive design</text>
  <text x="80" y="170" fill="#5A645D" font-size="7.5">I-12 &#183; I-34 &#183; I-51 &#183; I-78</text>
  <g font-size="8" fill="#232C27">
    <rect x="16" y="30" width="64" height="34" rx="2" fill="#F1EDE2" stroke="#CBC3AE"/><text x="48" y="51" text-anchor="middle">p.12</text>
    <rect x="260" y="30" width="64" height="34" rx="2" fill="#F1EDE2" stroke="#CBC3AE"/><text x="292" y="51" text-anchor="middle">p.34</text>
    <rect x="16" y="236" width="64" height="34" rx="2" fill="#F1EDE2" stroke="#CBC3AE"/><text x="48" y="257" text-anchor="middle">p.51</text>
    <rect x="260" y="236" width="64" height="34" rx="2" fill="#F1EDE2" stroke="#CBC3AE"/><text x="292" y="257" text-anchor="middle">p.78</text>
  </g>
  <g stroke="#232C27" stroke-width="1.2" fill="none" opacity="0.7">
    <path d="M64 60 Q120 100 96 126"/><path d="M280 64 Q250 100 244 126"/>
    <path d="M64 240 Q120 200 96 174"/><path d="M280 236 Q250 200 244 174"/>
  </g>
  <path d="M60 52 Q170 150 264 250" stroke="#232C27" stroke-width="1.4" fill="none"/>
  <path d="M60 52 l7.5 1.2 l-3.6 5.6 z" fill="#232C27"/><path d="M264 250 l-7.5 -1.2 l3.6 -5.6 z" fill="#232C27"/>
  <text x="150" y="120" fill="#5A645D" font-size="7" font-weight="600" transform="rotate(34 150 120)">log A to B and B to A</text>
</svg>`;

/* ----------------------------------------------------------------------- */
/* Reusable example blocks                                                   */
/* ----------------------------------------------------------------------- */

function ThreadExample() {
  return (
    <div className="ln-thread">
      <div className="ln-thread-bar">
        <span>THREAD &#183; Incentive design</span>
        <span>I-41</span>
      </div>
      <div className="ln-thread-body">
        <div className="ln-thread-col">
          <p>Metrics chosen as targets stop measuring what they were meant to. <span className="ln-dim">(Goodhart, notes I-12)</span></p>
          <p>Well-scoped OKRs argue targets still beat no target. <span className="ln-dim">(notes I-78)</span></p>
          <p>The failure mode looks like <em>visibility</em>, not measurement.</p>
          <p>Does this generalize to personal habit tracking?</p>
        </div>
        <div className="ln-thread-margin" aria-label="review margin">
          <span className="ln-mm">REVIEW MARGIN</span>
          <span>&#8594; I-78</span>
          <span>&#8800;</span>
          <span>&#9733;</span>
          <span>&#8595; dig</span>
        </div>
      </div>
      <div className="ln-thread-foot">
        <div><b>SOURCES</b>&nbsp; Goodhart I-12 &#183; Kerr I-34 &#183; OKR book I-78</div>
        <div><b>LINKS</b>&nbsp;&nbsp;&nbsp; &#8592; I-12 &#183; &#8594; I-78 &#183; &#8596; "feedback loops" I-55</div>
      </div>
    </div>
  );
}

function RegisterExample() {
  return (
    <div className="ln-mock">
      <div className="ln-mock-h">THREADS REGISTER, updated at each finish</div>
      <table className="ln-reg">
        <thead>
          <tr><th>Thread</th><th>Pages</th><th>Link</th></tr>
        </thead>
        <tbody>
          <tr><td>Incentive design</td><td>12&#183;34&#183;78</td><td>&#8594;55</td></tr>
          <tr><td>Feedback loops</td><td>41&#183;55</td><td>&#8594;41</td></tr>
          <tr><td>Attention &amp; focus</td><td>19&#183;63</td><td>&#183;</td></tr>
          <tr className="ln-closed"><td>Stoic practice</td><td>07&#183;22</td><td>&#8800;41 <span className="ln-closed-tag">closed</span></td></tr>
        </tbody>
      </table>
      <p className="ln-mock-note">
        Blank means open. When a thread is finished you write <b>closed</b> once and strike
        the row, an append-only mark that works in a single pen.
      </p>
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/* Notation marks + the five collections (in notebook order)                */
/* ----------------------------------------------------------------------- */

const MARKS: { g: string; label: string }[] = [
  { g: "\u2192", label: "connects to" },
  { g: "\u2260", label: "contradicts" },
  { g: "\u2605", label: "develop this" },
  { g: "?", label: "verify / open question" },
  { g: "\u2191", label: "promote to a thread" },
  { g: "\u2193", label: "dig deeper" },
];

const GREEN_TAGS = new Set(["Front of book", "After your notes"]);

type Collection = {
  id: string;
  tag: string;
  title: string;
  blurb: string;
  bullets: string[];
  wide?: boolean;
  example: ReactNode;
};

const COLLECTIONS: Collection[] = [
  {
    id: "reading",
    tag: "Front of book",
    title: "1 \u00b7 Reading notes",
    blurb:
      "The capture layer. One continuous stream from the front, each source taking the pages it needs. Number every page and keep a clear right margin.",
    bullets: ["Close each source with a Seeds block: the 3 to 5 ideas worth carrying forward."],
    example: (
      <div className="ln-mock">
        <div className="ln-mock-h">BOOK &#183; Thinking in Systems (Meadows), I-8</div>
        <pre className="ln-pre">{`\u00b7 A system = elements + interconnections + a purpose.
\u00b7 Stocks change slowly; flows are the rates between them.
\u00b7 Feedback delays cause oscillation and overshoot.`}</pre>
        <div className="ln-mock-h" style={{ marginTop: 14 }}>SEEDS, harvest before moving on</div>
        <pre className="ln-pre">{`\u2605  "Purpose is inferred from behaviour, not stated."
\u2192  delays  \u2194  incentive design   (I-41)
\u2193  read Forrester on system dynamics`}</pre>
        <p className="ln-mock-note">
          The Seeds block pre-extracts the few ideas worth connecting, so the finish pass
          never has to re-read the whole book.
        </p>
      </div>
    ),
  },
  {
    id: "threads",
    tag: "After your notes",
    title: "2 \u00b7 Idea threads",
    blurb:
      "The synthesis layer, growing inward behind your notes. When an idea recurs, give it a dedicated page. One idea per thread.",
    bullets: ["Holds what different sources said, your developing take, and the tensions between them."],
    example: (
      <>
        <ThreadExample />
        <p className="ln-mock-note">
          Body written as you read; the right margin added later, in the finish pass. That is
          the moment a page of notes becomes a node in the web.
        </p>
      </>
    ),
  },
  {
    id: "dig",
    tag: "Back of book",
    title: "3 \u00b7 Dig-deeper list",
    blurb:
      "One running collection for open loops: rabbit holes, unanswered questions, books cited by books, anything you flag mid-read with a down-arrow.",
    bullets: ["Keeps curiosity from getting lost and feeds what you read next."],
    example: (
      <div className="ln-mock">
        <div className="ln-mock-h">DIG-DEEPER, open loops</div>
        <pre className="ln-pre">{`\u2193  Forrester, the origins of system dynamics
\u2193  Is Goodhart's law testable for personal habits?
\u2193  "The Cobra Effect," cited in I-34
\u2193  Attention residue, find the original study`}</pre>
        <p className="ln-mock-note">
          Every down-arrow you write in a margin lands here. When you choose the next book,
          this is the shortlist.
        </p>
      </div>
    ),
  },
  {
    id: "register",
    tag: "Back of book",
    title: "4 \u00b7 Threads register",
    blurb:
      "A compact table, one line per thread: name, its pages, and links to other threads.",
    bullets: [
      "Left blank while a thread is open; marked closed when it is done. Written in ink, nothing is erased.",
    ],
    example: <RegisterExample />,
  },
  {
    id: "indexes",
    tag: "Very back",
    title: "5 \u00b7 Two indexes",
    blurb:
      "Source index: every book to its page numbers. Theme index: your recurring threads, one line each, gathering page numbers over time. The theme index is the connection engine.",
    bullets: [],
    wide: true,
    example: (
      <div className="ln-mock">
        <div className="ln-mock-h">SOURCE INDEX</div>
        <pre className="ln-pre">{`Thinking in Systems, Meadows      I-3, I-8, I-12
On the Folly of Rewarding A, Kerr I-34
Measure What Matters, Doerr       I-70, I-78`}</pre>
        <div className="ln-mock-h" style={{ marginTop: 14 }}>THEME INDEX</div>
        <pre className="ln-pre">{`Incentive design    I-12 \u00b7 I-34 \u00b7 I-51 \u00b7 I-78
Feedback loops      I-8 \u00b7 I-41 \u00b7 I-55
Attention & focus   I-19 \u00b7 I-63`}</pre>
        <p className="ln-mock-note">
          The theme index is the payoff: months apart, four unrelated books all feed one line,
          and that line is a ready-made synthesis list.
        </p>
      </div>
    ),
  },
];

/* ----------------------------------------------------------------------- */
/* Building blocks                                                          */
/* ----------------------------------------------------------------------- */

function Figure({ svg, caption, wide }: { svg: string; caption: ReactNode; wide?: boolean }) {
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

function SectionHead({ n, children }: { n: string; children: ReactNode }) {
  return (
    <div className="ln-sec-head">
      <span className="ln-sec-num">{n}</span>
      <h2>{children}</h2>
    </div>
  );
}

function Modal({ c, onClose }: { c: Collection; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="ln-overlay" onClick={onClose}>
      <div
        className="ln-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ln-dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ln-dialog-head">
          <div>
            <div className="ln-dialog-eyebrow">{c.tag} &#183; example</div>
            <h3 id="ln-dialog-title">{c.title.replace(/^\d+\s\u00b7\s/, "")}</h3>
          </div>
          <button ref={closeRef} className="ln-close" onClick={onClose} aria-label="Close example">
            &#10005;
          </button>
        </div>
        <div className="ln-dialog-body">{c.example}</div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/* Page                                                                     */
/* ----------------------------------------------------------------------- */

export default function Page() {
  const [open, setOpen] = useState<Collection | null>(null);

  return (
    <div className="ln-root">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <main className="ln-wrap">
        {/* COVER */}
        <header className="ln-plate">
          <div className="ln-eyebrow">Volume I &#183; Continued Education</div>
          <h1 className="ln-title">The Learning Notebook</h1>
          <p className="ln-sub">A setup guide for capturing ideas and connecting them later</p>
          <p className="ln-thesis">
            One rule holds the whole system together: <b>keep capture and connection in
            separate layers.</b> You can't predict which note will matter in six months, so
            don't file for perfection as you read. Capture linearly in the <b>body</b> of each
            page, keep the right margin clear, and do all of your connecting in one pass when
            you <b>finish each source</b>. Maintain your reference collections from the back of
            the book.
          </p>
          <div className="ln-penline">
            Built for a single black pen. Every mark is a <b>shape</b>, not a color.
          </div>
        </header>

        <Figure
          svg={FLIP_SVG}
          wide
          caption={
            <>
              <b>Fig. 1 &#183;</b> Where everything lives. Capture grows from the front; your
              reference collections grow from the back. On every capture page the body holds
              notes and the right margin stays clear for the review.
            </>
          }
        />

        {/* 01 FIVE COLLECTIONS */}
        <section className="ln-section">
          <SectionHead n="01">The five collections</SectionHead>
          <p className="ln-lead">
            Everything in the notebook is one of these five, shown in the order you meet them
            flipping from front to back. Tap any card for a worked example. The three at the
            back are reference; set them up first, then the front fills as you read.
          </p>

          <div className="ln-grid">
            {COLLECTIONS.map((c) => (
              <button
                key={c.id}
                className={"ln-card" + (c.wide ? " ln-card-wide" : "")}
                onClick={() => setOpen(c)}
                aria-haspopup="dialog"
              >
                <span className={"ln-tag" + (GREEN_TAGS.has(c.tag) ? "" : " ln-tag-b")}>
                  {c.tag}
                </span>
                <h3>{c.title}</h3>
                <p className="ln-card-blurb">{c.blurb}</p>
                {c.bullets.length > 0 && (
                  <ul>
                    {c.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
                <span className="ln-view">View example &#8594;</span>
              </button>
            ))}
          </div>

          <div className="ln-callout">
            <span className="ln-k">Set these up in order</span>
            <p>
              Label the back collections first, working inward from the very back (indexes,
              then register, then dig-deeper), before you take a single note from the front.
              That keeps your reference structure from getting buried in the capture stream.
            </p>
          </div>
        </section>

        {/* 02 LIFECYCLE */}
        <section className="ln-section">
          <SectionHead n="02">The lifecycle at a glance</SectionHead>
          <p className="ln-lead">
            Here is the whole arc, from a fresh notebook to a finished book and on to the next.
            Everything after this section just details one of these steps.
          </p>
          <Figure
            svg={LIFECYCLE_SVG}
            wide
            caption={
              <>
                <b>Fig. 2 &#183;</b> You set up once. After that it is a loop: start a source,
                capture as you read, then run the full review when you finish it. When the
                volume fills, migrate the living parts and keep going.
              </>
            }
          />
        </section>

        {/* 03 START A NEW NOTEBOOK */}
        <section className="ln-section">
          <SectionHead n="03">Starting a new notebook</SectionHead>
          <p className="ln-lead">
            Do this once per volume. First notebook? Just follow the setup. Continuing from one
            that filled up? Fold in the migration steps below it.
          </p>
          <ol className="ln-steps">
            <li><b>Inside cover:</b> write "Volume I" and today's date, then copy the six-mark notation key (section 06).</li>
            <li><b>From the very back, working inward:</b> label a spread for <em>Source index</em>, then <em>Theme index</em>, then a page for <em>Threads register</em>, then a page for <em>Dig-deeper</em>. Leave them blank.</li>
            <li><b>From the front:</b> number the first ten or so pages, and draw a light vertical rule near the right edge of each. That strip is your review margin.</li>
            <li><b>Start your first source on page 1</b> (section 04).</li>
          </ol>

          <h3 className="ln-subhead">If you are migrating from a full notebook</h3>
          <p className="ln-lead" style={{ fontSize: "1rem" }}>
            A full notebook is not a reset. When you are about 90% through, do one migration
            pass: carry forward only what is still open, and leave the rest as a labeled
            archive on the shelf.
          </p>
          <Figure
            svg={MIGRATION_SVG}
            wide
            caption={
              <>
                <b>Fig. 3 &#183;</b> Migration carries the living layers forward and leaves raw
                notes behind. Volume-prefixed page numbers like <b>I-88</b> keep old links
                walkable, so nothing you referenced is ever lost.
              </>
            }
          />
          <div className="ln-grid ln-grid-2">
            <div className="ln-panel">
              <h3 className="ln-panel-h">Carry forward</h3>
              <ul className="ln-list">
                <li><b>Open idea threads:</b> recopy each one's current synthesis onto a fresh page; on the old page write "moved to Vol II p.X".</li>
                <li><b>Theme index:</b> rebuild with open threads only; they start collecting new page numbers.</li>
                <li><b>Register:</b> recreate with open threads only; closed ones stay archived.</li>
                <li><b>Dig-deeper:</b> bring over items you still care about.</li>
              </ul>
            </div>
            <div className="ln-panel">
              <h3 className="ln-panel-h">Leave behind (archived)</h3>
              <ul className="ln-list">
                <li><b>Reading notes:</b> the Seeds already harvested what mattered; raw pages stay put.</li>
                <li><b>Closed threads:</b> already marked, they stay put.</li>
                <li>The old volume keeps its indexes intact, so you can always reach back with an <code>I-##</code> reference.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 04 START A NEW SOURCE */}
        <section className="ln-section">
          <SectionHead n="04">Starting a new source</SectionHead>
          <p className="ln-lead">
            Each time you pick up a new book or article, open it properly. This is what makes
            the finish pass easy later.
          </p>
          <ol className="ln-steps">
            <li><b>Turn to the next blank page</b> in your reading-notes stream and note its page number.</li>
            <li><b>Write a header:</b> title, author, and the page it starts on. For example, "Thinking in Systems, Meadows, I-8".</li>
            <li><b>Log it in the Source index:</b> one line, title to its starting page.</li>
            <li><b>Read and capture in the body only.</b> Keep the right margin clear; that space is reserved for the finish review.</li>
            <li><b>Keep capturing linearly</b> across as many pages as the source needs. Don't stop to connect ideas yet.</li>
          </ol>
        </section>

        {/* 05 FINISH A SOURCE */}
        <section className="ln-section">
          <SectionHead n="05">Finishing a source: the full review</SectionHead>
          <p className="ln-lead">
            This is the only review the system needs. Run it once, the moment you finish a
            source, and it does all of the connective work in a single sitting.
          </p>
          <ol className="ln-steps">
            <li><b>Harvest Seeds.</b> On the last page of this source's notes, write a Seeds block: the 3 to 5 ideas worth keeping, each with a word on what it connects to or contradicts.</li>
            <li><b>Fill the right margins.</b> Flip back through this source's pages and annotate the margin with the notation set (connects, contradicts, develop, verify, promote, dig).</li>
            <li><b>Promote recurring ideas.</b> Anything you marked to promote, or that now shows up in a second source, gets its own Idea thread page. Link both ways.</li>
            <li><b>Update the Theme index.</b> Add this source's page numbers under each thread it touched.</li>
            <li><b>Update the Threads register.</b> Add any new open threads; mark closed the ones you are done with.</li>
            <li><b>Clear the dig-deeper marks.</b> Copy every down-arrow into the Dig-deeper list, then pick your next read from it.</li>
          </ol>
          <p className="ln-note-line">
            That is the whole pass. The book is captured, connected, and filed, and you have
            already chosen what to read next.
          </p>
          <div className="ln-panel" style={{ marginTop: 14 }}>
            <RegisterExample />
          </div>
        </section>

        {/* 06 REVIEW AND CONNECTIONS */}
        <section className="ln-section">
          <SectionHead n="06">Review and connections</SectionHead>
          <p className="ln-lead">
            The finish pass leans on four small mechanics. Here is how each one works, and the
            notation you write in the margin.
          </p>

          <div className="ln-two">
            <div className="ln-panel">
              <h3 className="ln-panel-h">The four mechanics</h3>
              <ul className="ln-list">
                <li><b>Number every page, label the volume.</b> Refer to pages as <code>I-41</code> (volume plus page) so links still work after a new book.</li>
                <li><b>Keep a right margin.</b> Body notes on the left; the right strip stays blank until the finish pass, then holds the notation.</li>
                <li><b>Link both ways.</b> Note page A to B, then go back and add B to A, so a thread is walkable from either end.</li>
                <li><b>The theme index is your backlink.</b> Each page feeds its number to a thread line, and that line becomes a ready-made synthesis list.</li>
              </ul>
            </div>
            <div className="ln-panel">
              <h3 className="ln-panel-h">Right-margin notation</h3>
              <div className="ln-marks">
                {MARKS.map((m) => (
                  <div className="ln-mark" key={m.label}>
                    <span className="ln-mark-g">{m.g}</span>
                    <span className="ln-mark-l">{m.label}</span>
                  </div>
                ))}
              </div>
              <p className="ln-fine">
                Six shapes, one black pen. Promote lifts an idea up into its own thread; dig
                sends it down to the dig-deeper list. Keep this key on the inside cover.
              </p>
            </div>
          </div>

          <div className="ln-two" style={{ marginTop: 16 }}>
            <div>
              <ThreadExample />
              <p className="ln-fine" style={{ marginTop: 8 }}>
                A thread page in use: body written as you read, review margin filled in the
                finish pass.
              </p>
            </div>
            <Figure
              svg={THEME_SVG}
              caption={
                <>
                  <b>Fig. 4 &#183;</b> The theme index as backlink. Each page feeds its number to
                  the thread; a two-way note makes the link walkable from either end.
                </>
              }
            />
          </div>

          <p className="ln-foot">
            capture in the body &#183; connect in the margins &#183; review when you finish a
            source &#183; migrate what is open
          </p>
        </section>
      </main>

      {open && <Modal c={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/* Styles (namespaced under .ln-root to avoid clashing with your site).     */
/* ----------------------------------------------------------------------- */

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,560;0,9..144,600;1,9..144,400&family=IBM+Plex+Mono:wght@400;500;600&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');

.ln-root{
  --paper:#E9E5D8; --paper2:#F3F0E7; --card:#F1EDE2;
  --ink:#232C27; --ink-soft:#5A645D; --green:#2E4636; --accent:#9E3B2E; --hair:#CBC3AE;
  --disp:'Fraunces',Georgia,serif; --body:'Lora',Georgia,serif; --mono:'IBM Plex Mono',ui-monospace,monospace;
  background:var(--paper); color:var(--ink);
  font-family:var(--body); font-size:17px; line-height:1.55; -webkit-font-smoothing:antialiased;
}
.ln-root *{ box-sizing:border-box; }
.ln-wrap{ max-width:820px; margin:0 auto; padding:clamp(20px,5vw,54px) clamp(16px,5vw,40px) 96px; }
.ln-root h1,.ln-root h2,.ln-root h3{ font-family:var(--disp); color:var(--green); font-weight:560; line-height:1.06; margin:0; font-optical-sizing:auto; }
.ln-root p{ margin:0 0 10px; }
.ln-root b,.ln-root strong{ font-weight:640; color:var(--ink); }
.ln-root em{ font-style:italic; }
.ln-root code{ font-family:var(--mono); font-size:.86em; background:rgba(46,70,54,.08); padding:1px 5px; border-radius:4px; }

.ln-plate{ border:1.6px solid var(--green); background:var(--paper2); padding:clamp(20px,5vw,32px) clamp(18px,5vw,34px); position:relative; }
.ln-plate::before{ content:""; position:absolute; inset:5px; border:.8px solid var(--hair); pointer-events:none; }
.ln-eyebrow{ font-family:var(--mono); font-size:12px; letter-spacing:.28em; text-transform:uppercase; color:var(--accent); font-weight:600; }
.ln-title{ font-size:clamp(2.1rem,8vw,3.4rem); letter-spacing:-.01em; margin:.28em 0 .12em; font-weight:600; }
.ln-sub{ font-family:var(--disp); font-style:italic; font-weight:400; font-size:clamp(1.05rem,3.4vw,1.35rem); color:var(--ink-soft); margin-bottom:.7em; }
.ln-thesis{ font-size:1.02rem; max-width:62ch; }
.ln-thesis b{ color:var(--green); }
.ln-penline{ margin-top:16px; padding-top:12px; border-top:.8px solid var(--hair); font-family:var(--mono); font-size:13px; color:var(--ink-soft); }
.ln-penline b{ color:var(--green); }

.ln-section{ margin-top:clamp(30px,6vw,46px); }
.ln-sec-head{ display:flex; align-items:baseline; gap:12px; border-bottom:1.4px solid var(--green); padding-bottom:6px; margin-bottom:14px; }
.ln-sec-num{ font-family:var(--mono); font-size:13px; font-weight:600; color:var(--accent); }
.ln-sec-head h2{ font-size:clamp(1.4rem,5vw,1.95rem); }
.ln-lead{ font-size:1.05rem; }
.ln-lead b{ color:var(--green); }
.ln-subhead{ font-size:1.15rem; margin:22px 0 6px; }

.ln-fig{ margin:18px 0 6px; }
.ln-svg{ width:100%; }
.ln-svg svg{ display:block; width:100%; height:auto; }
.ln-scroll{ overflow-x:auto; -webkit-overflow-scrolling:touch; }
.ln-svg-wide{ min-width:600px; }
.ln-fig figcaption{ font-family:var(--mono); font-size:12px; color:var(--ink-soft); margin-top:8px; line-height:1.45; }
.ln-fig figcaption b{ color:var(--accent); }

.ln-grid{ display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-top:14px; }
.ln-grid-2{ margin-top:8px; }
.ln-card{ text-align:left; font:inherit; color:inherit; background:var(--card); border:1px solid var(--hair); border-radius:6px; padding:16px 18px; cursor:pointer; transition:transform .12s ease, box-shadow .12s ease, border-color .12s ease; display:flex; flex-direction:column; }
.ln-card:hover{ transform:translateY(-2px); box-shadow:0 6px 18px rgba(35,44,39,.10); border-color:var(--green); }
.ln-card:focus-visible{ outline:2.5px solid var(--accent); outline-offset:2px; }
.ln-card-wide{ grid-column:1 / -1; }
.ln-tag{ align-self:flex-start; font-family:var(--mono); font-size:10px; font-weight:600; letter-spacing:.14em; text-transform:uppercase; padding:3px 8px; border-radius:20px; margin-bottom:9px; background:rgba(46,70,54,.12); color:var(--green); }
.ln-tag-b{ background:rgba(158,59,46,.12); color:var(--accent); }
.ln-card h3{ font-size:1.2rem; margin-bottom:4px; }
.ln-card-blurb{ font-size:.92rem; margin-bottom:6px; }
.ln-card ul{ margin:0 0 10px; padding-left:18px; font-size:.9rem; }
.ln-card li{ margin-bottom:4px; }
.ln-view{ margin-top:auto; font-family:var(--mono); font-size:12px; font-weight:600; color:var(--accent); letter-spacing:.02em; }

.ln-callout{ border-left:3px solid var(--accent); background:var(--paper2); padding:12px 16px; margin:16px 0 0; border-radius:0 4px 4px 0; }
.ln-callout .ln-k{ display:block; font-family:var(--mono); font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:var(--accent); font-weight:600; margin-bottom:4px; }
.ln-callout p{ margin:0; font-size:.95rem; }
.ln-two{ display:grid; grid-template-columns:1fr 1fr; gap:16px; align-items:start; margin-top:14px; }
.ln-panel{ background:var(--card); border:1px solid var(--hair); border-radius:6px; padding:14px 18px; }
.ln-panel-h{ font-size:1.1rem; margin-bottom:8px; }
.ln-list{ margin:0; padding-left:18px; font-size:.95rem; }
.ln-list li{ margin-bottom:7px; }
.ln-fine{ margin:10px 0 0; font-size:.85rem; color:var(--ink-soft); }

.ln-marks{ display:grid; grid-template-columns:1fr 1fr; gap:8px 14px; }
.ln-mark{ display:flex; align-items:center; gap:10px; }
.ln-mark-g{ font-family:var(--mono); font-weight:600; font-size:20px; width:22px; text-align:center; color:var(--ink); }
.ln-mark-l{ font-size:.92rem; }

.ln-steps{ counter-reset:s; list-style:none; padding:0; margin:6px 0 0; }
.ln-steps li{ position:relative; padding:10px 0 10px 36px; border-bottom:.8px solid var(--hair); font-size:1rem; }
.ln-steps li:last-child{ border-bottom:none; }
.ln-steps li::before{ counter-increment:s; content:counter(s,decimal-leading-zero); position:absolute; left:0; top:10px; font-family:var(--mono); font-size:13px; font-weight:600; color:var(--accent); }
.ln-note-line{ margin-top:12px; font-size:1rem; font-style:italic; color:var(--ink-soft); }
.ln-foot{ margin-top:18px; font-family:var(--mono); font-size:12px; color:var(--ink-soft); text-align:center; }

.ln-overlay{ position:fixed; inset:0; background:rgba(30,36,32,.55); display:flex; align-items:flex-end; justify-content:center; padding:0; z-index:1000; backdrop-filter:blur(2px); animation:ln-fade .16s ease; }
.ln-dialog{ background:var(--paper); width:100%; max-width:620px; max-height:92vh; overflow:auto; border-radius:14px 14px 0 0; border:1px solid var(--hair); box-shadow:0 -10px 40px rgba(0,0,0,.25); animation:ln-slide .2s ease; }
.ln-dialog-head{ display:flex; align-items:flex-start; justify-content:space-between; gap:12px; padding:18px 20px 10px; position:sticky; top:0; background:var(--paper); }
.ln-dialog-eyebrow{ font-family:var(--mono); font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:var(--accent); font-weight:600; }
.ln-dialog-head h3{ font-size:1.35rem; margin-top:2px; }
.ln-close{ font:inherit; font-size:18px; line-height:1; background:var(--card); border:1px solid var(--hair); color:var(--ink); width:36px; height:36px; border-radius:8px; cursor:pointer; flex:none; }
.ln-close:hover{ border-color:var(--green); }
.ln-close:focus-visible{ outline:2.5px solid var(--accent); outline-offset:2px; }
.ln-dialog-body{ padding:4px 20px 26px; }

.ln-mock{ font-size:.95rem; }
.ln-mock-h{ font-family:var(--mono); font-size:11px; font-weight:600; letter-spacing:.12em; color:var(--green); text-transform:uppercase; margin-bottom:6px; }
.ln-pre{ font-family:var(--mono); font-size:12.5px; line-height:1.7; background:var(--paper2); border:1px solid var(--hair); border-radius:6px; padding:12px 14px; margin:0; white-space:pre; overflow-x:auto; }
.ln-mock-note{ font-size:.9rem; color:var(--ink-soft); margin-top:12px; }

.ln-reg{ width:100%; border-collapse:collapse; font-size:13px; }
.ln-reg th{ text-align:left; font-family:var(--mono); font-size:10px; letter-spacing:.1em; text-transform:uppercase; color:var(--ink-soft); border-bottom:1px solid var(--hair); padding:6px 8px; }
.ln-reg td{ padding:7px 8px; border-bottom:1px solid var(--hair); }
.ln-reg td:nth-child(2),.ln-reg td:nth-child(3){ font-family:var(--mono); font-size:12px; }
.ln-closed td{ color:var(--ink-soft); text-decoration:line-through; text-decoration-color:var(--ink-soft); }
.ln-closed-tag{ font-family:var(--mono); font-weight:600; color:var(--accent); text-decoration:none; display:inline-block; margin-left:4px; }

.ln-thread{ border:1px solid var(--hair); border-radius:8px; overflow:hidden; background:var(--paper2); }
.ln-thread-bar{ display:flex; justify-content:space-between; align-items:center; background:var(--green); color:#E9E5D8; font-family:var(--mono); font-size:12px; font-weight:600; letter-spacing:.04em; padding:9px 14px; }
.ln-thread-body{ display:grid; grid-template-columns:1fr 128px; }
.ln-thread-col{ padding:12px 14px; font-size:.92rem; }
.ln-thread-col p{ margin:0 0 9px; padding-bottom:9px; border-bottom:1px solid var(--hair); }
.ln-thread-col p:last-child{ border-bottom:none; margin-bottom:0; }
.ln-dim{ color:var(--ink-soft); font-family:var(--mono); font-size:11px; }
.ln-thread-margin{ border-left:1px solid #D9B4AC; padding:12px 12px; display:flex; flex-direction:column; gap:16px; font-family:var(--mono); font-weight:600; font-size:15px; }
.ln-thread-margin .ln-mm{ font-family:var(--mono); font-weight:600; font-size:8.5px; letter-spacing:.1em; color:var(--accent); }
.ln-thread-foot{ border-top:1px solid var(--hair); padding:10px 14px; font-family:var(--mono); font-size:11.5px; color:var(--ink); background:var(--card); }
.ln-thread-foot b{ color:var(--green); }

@keyframes ln-fade{ from{ opacity:0 } to{ opacity:1 } }
@keyframes ln-slide{ from{ transform:translateY(16px) } to{ transform:translateY(0) } }
@media (prefers-reduced-motion: reduce){ .ln-card, .ln-overlay, .ln-dialog{ transition:none; animation:none; } }

@media (max-width:640px){
  .ln-root{ font-size:16px; }
  .ln-grid{ grid-template-columns:1fr; }
  .ln-card-wide{ grid-column:auto; }
  .ln-two{ grid-template-columns:1fr; }
  .ln-marks{ grid-template-columns:1fr; }
  .ln-overlay{ align-items:flex-end; }
  .ln-dialog{ max-height:90vh; }
  .ln-thread-body{ grid-template-columns:1fr 104px; }
}
@media (min-width:641px){
  .ln-overlay{ align-items:center; padding:24px; }
  .ln-dialog{ border-radius:14px; }
}
`;