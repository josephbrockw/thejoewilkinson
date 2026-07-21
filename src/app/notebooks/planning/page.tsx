"use client";

/**
 * The Planning Notebook, setup guide (companion to the Learning Notebook page).
 * Drop-in Next.js App Router page. Self-contained: styles + fonts are inlined.
 * Client component (uses state for the modals). Same design system as the
 * Learning Notebook page, so both read as a set.
 *
 * Fonts load from Google Fonts via @import. If you prefer next/font, delete the
 * @import line at the top of STYLES and wire up Fraunces / Lora / IBM Plex Mono there.
 *
 * Sample content (June starting on a Monday; habits Read/Move/Focus; placeholder
 * books and events) is illustrative. Swap freely.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";

/* ----------------------------------------------------------------------- */
/* Inline SVG diagrams                                                       */
/* ----------------------------------------------------------------------- */

const MAP_SVG = `
<svg viewBox="0 0 680 150" xmlns="http://www.w3.org/2000/svg" font-family="'IBM Plex Mono',monospace">
  <line x1="30" y1="22" x2="650" y2="22" stroke="#232C27" stroke-width="1.3"/>
  <path d="M650 22 l-8 -3.4 v6.8 z" fill="#232C27"/>
  <text x="30" y="16" fill="#5A645D" font-size="8" font-weight="600">front of book</text>
  <text x="650" y="16" fill="#5A645D" font-size="8" font-weight="600" text-anchor="end">back of book</text>
  <rect x="16" y="40" width="648" height="72" rx="4" fill="#F3F0E7" stroke="#CBC3AE"/>
  <rect x="16" y="40" width="92" height="72" fill="#2E4636" opacity="0.14"/>
  <rect x="108" y="40" width="96" height="72" fill="#2E4636" opacity="0.10"/>
  <rect x="204" y="40" width="120" height="72" fill="#2E4636" opacity="0.07"/>
  <rect x="324" y="40" width="140" height="72" fill="#9E3B2E" opacity="0.06"/>
  <rect x="464" y="40" width="200" height="72" fill="#9E3B2E" opacity="0.12"/>
  <g stroke="#CBC3AE"><line x1="108" y1="40" x2="108" y2="112"/><line x1="204" y1="40" x2="204" y2="112"/><line x1="324" y1="40" x2="324" y2="112"/><line x1="464" y1="40" x2="464" y2="112"/></g>
  <g text-anchor="middle" fill="#232C27" font-weight="600" font-size="8.5">
    <text x="62" y="72">TOC +</text><text x="62" y="83">Index</text>
    <text x="156" y="72">12-month</text><text x="156" y="83">view</text>
    <text x="264" y="72">Quarterly</text><text x="264" y="83">plans</text>
    <text x="394" y="72">Monthly</text><text x="394" y="83">spreads</text>
    <text x="564" y="70">Daily journal</text><text x="564" y="81">+ collections</text>
  </g>
  <g text-anchor="middle" fill="#5A645D" font-size="7">
    <text x="62" y="100">2 pp</text><text x="156" y="100">4 pp</text><text x="264" y="100">~8 pp</text><text x="394" y="100">~24 pp</text><text x="564" y="100">the rest of the book</text>
  </g>
</svg>`;

const NEST_SVG = `
<svg viewBox="0 0 680 210" xmlns="http://www.w3.org/2000/svg" font-family="'IBM Plex Mono',monospace">
  <rect x="8" y="46" width="148" height="64" rx="6" fill="#F1EDE2" stroke="#2E4636" stroke-width="1.2"/>
  <text x="82" y="72" text-anchor="middle" fill="#2E4636" font-size="9" font-weight="600">YEAR</text>
  <text x="82" y="88" text-anchor="middle" fill="#232C27" font-size="8" font-family="Lora,serif">12-month goals</text>
  <text x="82" y="100" text-anchor="middle" fill="#5A645D" font-size="7">events + goals</text>
  <rect x="178" y="46" width="148" height="64" rx="6" fill="#F1EDE2" stroke="#2E4636" stroke-width="1.2"/>
  <text x="252" y="72" text-anchor="middle" fill="#2E4636" font-size="9" font-weight="600">QUARTER</text>
  <text x="252" y="88" text-anchor="middle" fill="#232C27" font-size="8" font-family="Lora,serif">projects + learning</text>
  <text x="252" y="100" text-anchor="middle" fill="#5A645D" font-size="7">3-month arc</text>
  <rect x="348" y="46" width="148" height="64" rx="6" fill="#F1EDE2" stroke="#2E4636" stroke-width="1.2"/>
  <text x="422" y="72" text-anchor="middle" fill="#2E4636" font-size="9" font-weight="600">MONTH</text>
  <text x="422" y="88" text-anchor="middle" fill="#232C27" font-size="8" font-family="Lora,serif">calendar + habits</text>
  <text x="422" y="100" text-anchor="middle" fill="#5A645D" font-size="7">weekly focus</text>
  <rect x="518" y="46" width="148" height="64" rx="6" fill="#F1EDE2" stroke="#2E4636" stroke-width="1.5"/>
  <text x="592" y="72" text-anchor="middle" fill="#2E4636" font-size="9" font-weight="600">DAY</text>
  <text x="592" y="88" text-anchor="middle" fill="#232C27" font-size="8" font-family="Lora,serif">timed bullet log</text>
  <text x="592" y="100" text-anchor="middle" fill="#5A645D" font-size="7">journal + collections</text>
  <g stroke="#232C27" stroke-width="1.5" fill="#232C27">
    <line x1="158" y1="78" x2="172" y2="78"/><path d="M176 78 l-7 -3 v6 z"/>
    <line x1="328" y1="78" x2="342" y2="78"/><path d="M346 78 l-7 -3 v6 z"/>
    <line x1="498" y1="78" x2="512" y2="78"/><path d="M516 78 l-7 -3 v6 z"/>
  </g>
  <text x="340" y="34" text-anchor="middle" fill="#2E4636" font-size="8" font-weight="600">plan top down</text>
  <path d="M592 112 C592 168 82 168 82 114" stroke="#9E3B2E" stroke-width="1.3" fill="none" stroke-dasharray="4 3"/>
  <path d="M82 114 l-4 8 h8 z" fill="#9E3B2E"/>
  <text x="337" y="150" text-anchor="middle" fill="#9E3B2E" font-size="8" font-weight="600">review rolls back up: day into month into quarter</text>
</svg>`;

/* ----------------------------------------------------------------------- */
/* Reusable example blocks                                                   */
/* ----------------------------------------------------------------------- */

function TocExample() {
  return (
    <div className="ln-two-tight">
      <div className="ln-mock">
        <div className="ln-mock-h">CONTENTS</div>
        <pre className="ln-pre">{`Yearly plan .............. p.3
Q1 · Jan-Mar ............. p.5
Q2 · Apr-Jun ............. p.11
Q3 · Jul-Sep ............. p.17
Q4 · Oct-Dec ............. p.23
January spread ........... p.30
February spread .......... p.34
March spread ............. p.38`}</pre>
      </div>
      <div className="ln-mock">
        <div className="ln-mock-h">INDEX</div>
        <pre className="ln-pre">{`Health & fitness ..... 41, 63
Reading list ......... 12, 55
Trip: Japan .......... 48
Finances ............. 30, 70
Career notes ......... 52`}</pre>
        <p className="ln-mock-note">
          The contents list doubles as a time map: scanning the page numbers shows where the
          year is already blocked out.
        </p>
      </div>
    </div>
  );
}

function YearExample() {
  const stars = ["Reach staff engineer", "Run a sub-4 marathon", "Read all 24 quarterly books"];
  const months = [
    { m: "January", ev: ["Board offsite (18)", "Ski week (25-31)"] },
    { m: "February", ev: ["Conf talk (12)", "Beta launch (26)"] },
    { m: "March", ev: ["Family visit (8)", "Q1 close (31)"] },
  ];
  return (
    <div>
      <div className="ln-stars">
        <div className="ln-mo-k">North stars this year</div>
        <ul>{stars.map((s, i) => <li key={i}>{s}</li>)}</ul>
      </div>
      <div className="ln-year">
        {months.map((x) => (
          <div className="ln-mo" key={x.m}>
            <h4>{x.m}</h4>
            <div className="ln-mo-k">Major events</div>
            <ul>{x.ev.map((e, i) => <li key={i}>{e}</li>)}</ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuarterExample() {
  const review = [
    { m: "Month 1", win: "shipped onboarding beta; 2 books read", miss: "hiring loop slipped a week", carry: "finish the hiring plan" },
    { m: "Month 2", win: "metrics pipeline live", miss: "third book barely started", carry: "block reading time on the calendar" },
    { m: "Month 3", win: "two hires closed", miss: "dashboard still manual", carry: "automate it early next quarter" },
  ];
  return (
    <div className="ln-spread">
      <div className="ln-page">
        <div className="ln-page-h">Left page &#183; plan</div>
        <div className="ln-q-h">Projects</div>
        <ul className="ln-list">
          <li>Ship the onboarding revamp to general availability.</li>
          <li>Stand up the metrics pipeline and a weekly dashboard.</li>
          <li>Close two senior hires.</li>
        </ul>
        <div className="ln-q-h" style={{ marginTop: 12 }}>Learning</div>
        <div className="ln-learn">
          <div>
            <div className="ln-mo-k">Technical expertise</div>
            <ul className="ln-list">
              <li>Designing Data-Intensive Applications</li>
              <li>Database Internals</li>
              <li>Staff Engineer</li>
            </ul>
          </div>
          <div>
            <div className="ln-mo-k">Expanding perspective</div>
            <ul className="ln-list">
              <li>Thinking in Systems</li>
              <li>The Death and Life of Great American Cities</li>
              <li>Letters from a Stoic</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="ln-page">
        <div className="ln-page-h">Right page &#183; review by month</div>
        {review.map((r) => (
          <div className="ln-rev" key={r.m}>
            <h4>{r.m}</h4>
            <div className="ln-rev-line"><span className="ln-rev-k pos">Wins</span><span>{r.win}</span></div>
            <div className="ln-rev-line"><span className="ln-rev-k neg">Misses</span><span>{r.miss}</span></div>
            <div className="ln-rev-line"><span className="ln-rev-k car">Carry</span><span>{r.carry}</span></div>
          </div>
        ))}
        <p className="ln-subnote">Fill one block at each month&apos;s end; read all three as the retro before planning the next quarter.</p>
      </div>
    </div>
  );
}

function MonthSpread() {
  const days = [
    { n: 1, d: "Mon", ev: "Quarter kickoff", h: [1, 1, 1], wk: true },
    { n: 2, d: "Tue", ev: "", h: [1, 0, 1] },
    { n: 3, d: "Wed", ev: "Dentist 3pm", h: [0, 1, 1] },
    { n: 4, d: "Thu", ev: "", h: [1, 1, 0] },
    { n: 5, d: "Fri", ev: "Ship v3 beta", h: [1, 0, 1] },
    { n: 6, d: "Sat", ev: "", h: [1, 1, 0] },
    { n: 7, d: "Sun", ev: "", h: [0, 0, 0] },
    { n: 8, d: "Mon", ev: "1:1 with Sam", h: [1, 1, 1], wk: true },
    { n: 9, d: "Tue", ev: "", h: [1, 1, 1] },
    { n: 10, d: "Wed", ev: "Design review", h: [1, 0, 1] },
  ];
  const dot = (v: number) => (
    <span className={v ? "ln-dot" : "ln-dot-off"}>{v ? "\u25CF" : "\u25CB"}</span>
  );
  return (
    <div className="ln-spread">
      <div className="ln-page">
        <div className="ln-page-h">Left page · month calendar + habits</div>
        <table className="ln-cal">
          <thead>
            <tr>
              <th></th><th></th><th>Events</th>
              <th className="h">R</th><th className="h">M</th><th className="h">F</th>
            </tr>
          </thead>
          <tbody>
            {days.map((r) => (
              <tr key={r.n} className={r.wk ? "wk" : undefined}>
                <td className="num">{r.n}</td>
                <td className="dow">{r.d}</td>
                <td className="ev">{r.ev}</td>
                <td className="h">{dot(r.h[0])}</td>
                <td className="h">{dot(r.h[1])}</td>
                <td className="h">{dot(r.h[2])}</td>
              </tr>
            ))}
            <tr><td className="num">&#8942;</td><td className="dow"></td><td className="ev" style={{ color: "var(--ink-soft)" }}>continues to Jun 30</td><td className="h"></td><td className="h"></td><td className="h"></td></tr>
          </tbody>
        </table>
        <p className="ln-subnote">First two columns are the date and weekday; the last three are one habit each (Read, Move, Focus).</p>
      </div>
      <div className="ln-page">
        <div className="ln-page-h">Right page · weekly focus</div>
        <ul className="ln-wk">
          <li>
            <h4>Week 1 · Jun 1-7</h4>
            <ul><li>Finalize the Q2 retro</li><li>Draft the hiring plan</li></ul>
          </li>
          <li>
            <h4>Week 2 · Jun 8-14</h4>
            <ul><li>Ship onboarding revamp</li><li>Prep the board deck</li></ul>
          </li>
          <li>
            <h4>Week 3 · Jun 15-21</h4>
            <ul><li>Interview loop for the design role</li></ul>
          </li>
        </ul>
        <p className="ln-subnote">Each week block lines up with a week of days on the left page.</p>
      </div>
    </div>
  );
}

function DailyAnatomy() {
  return (
    <>
      <div className="ln-anat">
        <span className="val">&#8226;</span>
        <span className="val t">09:20</span>
        <span className="val d">Ship the onboarding PR</span>
        <span className="lab">signifier</span>
        <span className="lab">start time</span>
        <span className="lab">what you did</span>
      </div>
      <p className="ln-fine">
        <b>&#8226;</b> task&nbsp;&nbsp; <b>&#9675;</b> event&nbsp;&nbsp; <b>&#10003;</b> done&nbsp;&nbsp;
        <b>&gt;</b> migrated to the next day&nbsp;&nbsp; <b>&lt;</b> pushed back onto a month or
        quarter plan. The start time is the one addition to a standard bullet journal: it slots
        between the signifier and the description.
      </p>
    </>
  );
}

function DailyExample() {
  const log: { s: string; t: string; d: string; note?: boolean }[] = [
    { s: "\u2022", t: "07:30", d: "Morning pages, then plan the day" },
    { s: "\u25CB", t: "09:00", d: "Standup" },
    { s: "\u2022", t: "09:20", d: "Ship the onboarding PR" },
    { s: "\u2022", t: "11:45", d: "Review the design doc, leave comments" },
    { s: "\u25CB", t: "13:00", d: "Lunch with Priya" },
    { s: "\u2022", t: "15:30", d: "Draft Q3 project brief (started thread in Projects)" },
    { s: "\u2022", t: "16:10", d: "Idea: batch code reviews to protect mornings", note: true },
    { s: "\u003C", t: "16:40", d: "Deep-dive on caching (pushed to Q3 learning)" },
    { s: "\u2713", t: "18:00", d: "Gym" },
  ];
  return (
    <div className="ln-day">
      <div className="ln-day-h">Thu · Jun 12</div>
      <ul className="ln-log">
        {log.map((e, i) => (
          <li key={i}>
            <span className="ln-sig">{e.s}</span>
            <span className="ln-time">{e.t}</span>
            <span className={e.note ? "ln-desc-note" : undefined}>{e.d}</span>
          </li>
        ))}
      </ul>
      <p className="ln-subnote">
        Daily pages run in sequence. When a project or a notes collection needs room, it takes
        the next open page and gets an index entry, so the journal and collections interleave.
      </p>
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/* The five sections (notebook order, front to back)                        */
/* ----------------------------------------------------------------------- */

const GREEN_TAGS = new Set(["Front of book", "After the front matter"]);

type Section = {
  id: string;
  tag: string;
  title: string;
  blurb: string;
  bullets: string[];
  wide?: boolean;
  example: ReactNode;
};

const SECTIONS: Section[] = [
  {
    id: "toc",
    tag: "Front of book",
    title: "1 \u00b7 Contents + index",
    blurb:
      "A table of contents holding the page number of the yearly plan, each quarter, and each month, plus a topical index. Scanning it shows where your time is already blocked.",
    bullets: ["Set both up first; every new plan and collection adds one line."],
    example: <TocExample />,
  },
  {
    id: "year",
    tag: "After the front matter",
    title: "2 \u00b7 12-month view",
    blurb:
      "The whole year at low resolution: three months to a page, each month holding its major events, plus a few north stars for the year. Concrete goals belong to the quarters.",
    bullets: ["Fixed dates and big directional aims live here, so quarters and months inherit from them."],
    example: <YearExample />,
  },
  {
    id: "quarter",
    tag: "After the year view",
    title: "3 \u00b7 Quarterly spread",
    blurb:
      "A two-page spread. Left: the plan, Projects (1 to 3 bullet goals each) and Learning, split into Technical Expertise and Expanding Perspective, three books each. Right: a month-by-month review.",
    bullets: ["The review page is where the quarter rolls up: fill one block at each month's end, then read all three as your retro."],
    example: <QuarterExample />,
  },
  {
    id: "month",
    tag: "Monthly",
    title: "4 \u00b7 Monthly spread",
    blurb:
      "A two-page spread. Left: a calendar with date and weekday, room for the day's events, and three habit-tracker columns. Right: weekly focus items for the matching weeks.",
    bullets: ["The left and right pages are read together: each week block maps to a week of rows."],
    example: <MonthSpread />,
  },
  {
    id: "daily",
    tag: "Back, the bulk",
    title: "5 \u00b7 Daily journal",
    blurb:
      "A bullet journal with one twist: the start time sits between the signifier and the description. Daily pages interleave with collections for notes and projects.",
    bullets: ["Circle for an event, dot for a task, and the time you actually started it."],
    wide: true,
    example: (
      <>
        <DailyAnatomy />
        <div style={{ marginTop: 14 }}>
          <DailyExample />
        </div>
      </>
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

function Routine({ cadence, items }: { cadence: string; items: string[] }) {
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

function Modal({ c, onClose }: { c: Section; onClose: () => void }) {
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
  const [open, setOpen] = useState<Section | null>(null);

  return (
    <div className="ln-root">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <main className="ln-wrap">
        <header className="ln-plate">
          <div className="ln-eyebrow">Volume I &#183; Planning</div>
          <h1 className="ln-title">The Planning Notebook</h1>
          <p className="ln-sub">One book, four horizons: from the year down to a single timed line</p>
          <p className="ln-thesis">
            The whole system is one idea: <b>plan top down and let each day roll back up.</b> A
            twelve-month view sets the big rocks, quarters turn them into projects and reading,
            months break into a calendar and weekly focus, and days are a timed bullet log. A
            table of contents up front tracks which pages hold which plans, so you can see at a
            glance where your time is already blocked.
          </p>
          <div className="ln-penline">
            Built for a dotted Moleskine and a single pen.
          </div>
        </header>

        <Figure
          svg={MAP_SVG}
          wide
          caption={
            <>
              <b>Fig. 1 &#183;</b> A map of the book. The front matter and plans are compact and
              live up front; the daily journal, interleaved with collections, fills the rest.
            </>
          }
        />

        {/* 01 FIVE SECTIONS */}
        <section className="ln-section">
          <SectionHead n="01">The five sections</SectionHead>
          <p className="ln-lead">
            The notebook holds five kinds of page, in the order you meet them front to back. Tap
            any card for a worked example. Set up the contents and index first; the rest fill in
            as the year runs.
          </p>

          <div className="ln-grid">
            {SECTIONS.map((c) => (
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
        </section>

        {/* 02 NESTING */}
        <section className="ln-section">
          <SectionHead n="02">How the horizons nest</SectionHead>
          <p className="ln-lead">
            Each horizon feeds the next. The year sets goals, the quarter picks the projects and
            books, the month schedules them, and the day records what actually happened. Reviews
            run the other way: a day informs the month, a month closes out the quarter.
          </p>
          <Figure
            svg={NEST_SVG}
            wide
            caption={
              <>
                <b>Fig. 2 &#183;</b> Plan from the year down; review from the day up. The two
                directions keep long-range intent and daily reality in sync.
              </>
            }
          />
        </section>

        {/* 03 FRONT MATTER */}
        <section className="ln-section">
          <SectionHead n="03">Front matter: contents and index</SectionHead>
          <p className="ln-lead">
            Two facing spreads at the very front. The contents list is your time map; the index
            is for finding notes and project collections later.
          </p>
          <ol className="ln-steps">
            <li><b>Contents:</b> as you lay out each plan, add a line with its page number. Yearly plan, then Q1 to Q4, then each month spread.</li>
            <li><b>Read it as a time map:</b> the page numbers alone show how much of the book (and the year) is already committed.</li>
            <li><b>Index:</b> leave a spread blank; add a line whenever a collection or recurring topic first appears, with its page numbers.</li>
          </ol>
          <div style={{ marginTop: 14 }}>
            <TocExample />
          </div>
        </section>

        {/* 04 YEAR */}
        <section className="ln-section">
          <SectionHead n="04">The 12-month view</SectionHead>
          <p className="ln-lead">
            Four pages, three months each, the whole year visible in a few flips. Per month, note
            the <b>major events</b>: fixed dates, trips, launches. Up top, a few <b>north stars</b>{" "}
            for the year. Concrete goals belong to the quarters, so keep this layer sparse.
          </p>
          <div style={{ marginTop: 8 }}>
            <YearExample />
          </div>
          <Routine
            cadence="once a year, revisit each quarter"
            items={[
              "Block every fixed date you already know: trips, birthdays, launches, renewals, deadlines.",
              "Write 3 to 4 north stars and nothing more detailed; concrete plans belong to the quarters.",
              "Whenever a future-dated item appears mid-year, drop it here so it is never lost.",
              "Each quarter, reread this page before planning the next three months.",
            ]}
          />
        </section>

        {/* 05 QUARTER */}
        <section className="ln-section">
          <SectionHead n="05">The quarterly spread</SectionHead>
          <p className="ln-lead">
            A two-page spread. The <b>left page</b> is the plan: <b>Projects</b>, the handful that
            matter with one to three bullet goals each, and <b>Learning</b>, split into Technical
            Expertise and Expanding Perspective with three books each. The <b>right page</b> is a
            review, one block per month, so the quarter has somewhere to roll up.
          </p>
          <div style={{ marginTop: 8 }}>
            <QuarterExample />
          </div>
          <div className="ln-two" style={{ marginTop: 16 }}>
            <div className="ln-panel">
              <h3 className="ln-panel-h">Left page: the plan</h3>
              <ul className="ln-list">
                <li>Projects are high-level capture of what you are working on; the detail lives elsewhere.</li>
                <li>Six books for the quarter, three per focus area, so learning is deliberate not accidental.</li>
              </ul>
            </div>
            <div className="ln-panel">
              <h3 className="ln-panel-h">Right page: the review</h3>
              <ul className="ln-list">
                <li>At each month&apos;s end, write three lines for that month: wins, misses, and what carries forward.</li>
                <li>Before planning the next quarter, read all three blocks together. That reading is the retro.</li>
              </ul>
            </div>
          </div>
          <Routine
            cadence="start and end of each quarter"
            items={[
              "Before planning, read last quarter's review page and carry forward what is unfinished.",
              "Pick the projects and the six books; hold each project to one to three bullet goals.",
              "At each month's end, fill that month's block on the review page: wins, misses, carry forward.",
              "Before the next quarter, read all three month blocks as your retro.",
            ]}
          />
        </section>

        {/* 06 MONTHLY SPREAD */}
        <section className="ln-section">
          <SectionHead n="06">The monthly spread</SectionHead>
          <p className="ln-lead">
            The workhorse layout, across two pages. The left page is the month as a calendar; the
            right page is the weekly focus that steers it.
          </p>
          <div style={{ marginTop: 8 }}>
            <MonthSpread />
          </div>
          <div className="ln-two" style={{ marginTop: 16 }}>
            <div className="ln-panel">
              <h3 className="ln-panel-h">Left page: the calendar</h3>
              <ul className="ln-list">
                <li><b>Columns 1 and 2:</b> the date and the weekday, one row per day of the month.</li>
                <li><b>Middle:</b> room to jot that day&apos;s events.</li>
                <li><b>Last three columns:</b> one key habit each. Fill the dot on the days you did it.</li>
              </ul>
            </div>
            <div className="ln-panel">
              <h3 className="ln-panel-h">Right page: weekly focus</h3>
              <ul className="ln-list">
                <li>One block per week, aligned to the week of rows opposite it.</li>
                <li>A short list of what that week is actually about, pulled down from the quarter.</li>
                <li>Reviewing the habit dots each week shows the trend at a glance.</li>
              </ul>
            </div>
          </div>
          <Routine
            cadence="start of each month, and each week"
            items={[
              "Set up the spread: dates and weekdays down the left, three habit columns, week blocks on the right.",
              "Pull anything relevant down from the 12-month view and the quarter into this month.",
              "Each week, write that week's focus and glance at last week's habit dots.",
              "At month end, fill this month's block on the quarterly review page before starting the next month.",
            ]}
          />
        </section>

        {/* 07 DAILY */}
        <section className="ln-section">
          <SectionHead n="07">The daily journal</SectionHead>
          <p className="ln-lead">
            Most of the book. It is a standard bullet journal with one addition: the start time
            of each entry, written between the signifier and the description.
          </p>
          <div className="ln-two" style={{ marginTop: 8 }}>
            <div>
              <DailyAnatomy />
            </div>
            <DailyExample />
          </div>
          <p className="ln-note-line">
            Because pages run in sequence, project and notes collections simply take the next
            open page and earn an index entry, interleaving with the daily log.
          </p>
          <p className="ln-foot">
            plan the year &#183; commit the quarter &#183; schedule the month &#183; log the day
            &#183; review back up
          </p>
        </section>
      </main>

      {open && <Modal c={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/* Styles (namespaced under .ln-root to match the Learning Notebook page).  */
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
.ln-root h1,.ln-root h2,.ln-root h3,.ln-root h4{ font-family:var(--disp); color:var(--green); font-weight:560; line-height:1.06; margin:0; font-optical-sizing:auto; }
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

.ln-fig{ margin:18px 0 6px; }
.ln-svg{ width:100%; }
.ln-svg svg{ display:block; width:100%; height:auto; }
.ln-scroll{ overflow-x:auto; -webkit-overflow-scrolling:touch; }
.ln-svg-wide{ min-width:600px; }
.ln-fig figcaption{ font-family:var(--mono); font-size:12px; color:var(--ink-soft); margin-top:8px; line-height:1.45; }
.ln-fig figcaption b{ color:var(--accent); }

.ln-grid{ display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-top:14px; }
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

.ln-two{ display:grid; grid-template-columns:1fr 1fr; gap:16px; align-items:start; margin-top:14px; }
.ln-two-tight{ display:grid; grid-template-columns:1fr 1fr; gap:14px; align-items:start; }
.ln-panel{ background:var(--card); border:1px solid var(--hair); border-radius:6px; padding:14px 18px; }
.ln-panel-h{ font-size:1.1rem; margin-bottom:8px; }
.ln-list{ margin:0; padding-left:18px; font-size:.95rem; }
.ln-list li{ margin-bottom:7px; }
.ln-fine{ margin:10px 0 0; font-size:.85rem; color:var(--ink-soft); }

.ln-steps{ counter-reset:s; list-style:none; padding:0; margin:6px 0 0; }
.ln-steps li{ position:relative; padding:10px 0 10px 36px; border-bottom:.8px solid var(--hair); font-size:1rem; }
.ln-steps li:last-child{ border-bottom:none; }
.ln-steps li::before{ counter-increment:s; content:counter(s,decimal-leading-zero); position:absolute; left:0; top:10px; font-family:var(--mono); font-size:13px; font-weight:600; color:var(--accent); }
.ln-note-line{ margin-top:12px; font-size:1rem; font-style:italic; color:var(--ink-soft); }
.ln-foot{ margin-top:18px; font-family:var(--mono); font-size:12px; color:var(--ink-soft); text-align:center; }

.ln-overlay{ position:fixed; inset:0; background:rgba(30,36,32,.55); display:flex; align-items:flex-end; justify-content:center; padding:0; z-index:1000; backdrop-filter:blur(2px); animation:ln-fade .16s ease; }
.ln-dialog{ background:var(--paper); width:100%; max-width:660px; max-height:92vh; overflow:auto; border-radius:14px 14px 0 0; border:1px solid var(--hair); box-shadow:0 -10px 40px rgba(0,0,0,.25); animation:ln-slide .2s ease; }
.ln-dialog-head{ display:flex; align-items:flex-start; justify-content:space-between; gap:12px; padding:18px 20px 10px; position:sticky; top:0; background:var(--paper); }
.ln-dialog-eyebrow{ font-family:var(--mono); font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:var(--accent); font-weight:600; }
.ln-dialog-head h3{ font-size:1.35rem; margin-top:2px; }
.ln-close{ font:inherit; font-size:18px; line-height:1; background:var(--card); border:1px solid var(--hair); color:var(--ink); width:36px; height:36px; border-radius:8px; cursor:pointer; flex:none; }
.ln-close:hover{ border-color:var(--green); }
.ln-close:focus-visible{ outline:2.5px solid var(--accent); outline-offset:2px; }
.ln-dialog-body{ padding:4px 20px 26px; }

.ln-mock{ font-size:.95rem; }
.ln-mock-h{ font-family:var(--mono); font-size:11px; font-weight:600; letter-spacing:.12em; color:var(--green); text-transform:uppercase; margin-bottom:6px; }
.ln-pre{ font-family:var(--mono); font-size:12px; line-height:1.7; background:var(--paper2); border:1px solid var(--hair); border-radius:6px; padding:12px 14px; margin:0; white-space:pre; overflow-x:auto; }
.ln-mock-note{ font-size:.9rem; color:var(--ink-soft); margin-top:12px; }

/* year view */
.ln-year{ display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; }
.ln-mo{ background:var(--paper2); border:1px solid var(--hair); border-radius:6px; padding:10px 12px; }
.ln-mo h4{ font-size:1.02rem; margin-bottom:5px; }
.ln-mo-k{ font-family:var(--mono); font-size:9px; letter-spacing:.1em; text-transform:uppercase; color:var(--accent); font-weight:600; margin:6px 0 2px; }
.ln-mo ul{ margin:0; padding-left:15px; font-size:.85rem; }
.ln-mo li{ margin-bottom:2px; }

/* quarter */
.ln-qwrap{ display:grid; gap:12px; }
.ln-learn{ display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-top:4px; }
.ln-q-h{ font-family:var(--disp); color:var(--green); font-weight:560; font-size:1.02rem; margin:0 0 4px; }
.ln-rev{ padding:8px 0; border-bottom:1px solid #E4DEC9; }
.ln-rev:last-of-type{ border-bottom:none; }
.ln-rev h4{ font-size:.98rem; margin-bottom:4px; }
.ln-rev-line{ display:flex; gap:8px; font-size:.86rem; margin-bottom:3px; }
.ln-rev-k{ font-family:var(--mono); font-size:9px; letter-spacing:.05em; text-transform:uppercase; font-weight:600; flex:none; width:48px; padding-top:2px; }
.ln-rev-k.pos{ color:var(--green); }
.ln-rev-k.neg{ color:var(--accent); }
.ln-rev-k.car{ color:var(--ink-soft); }

/* north stars */
.ln-stars{ background:var(--paper2); border:1px solid var(--hair); border-radius:6px; padding:10px 14px; margin-bottom:10px; }
.ln-stars ul{ margin:4px 0 0; padding-left:18px; font-size:.95rem; }
.ln-stars li{ margin-bottom:2px; }

/* routine checklist */
.ln-routine{ margin-top:18px; background:var(--paper2); border:1px solid var(--hair); border-left:3px solid var(--green); border-radius:0 6px 6px 0; padding:12px 16px 12px 18px; }
.ln-routine-h{ font-family:var(--mono); font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:var(--green); font-weight:600; margin-bottom:8px; }
.ln-routine ul{ list-style:none; margin:0; padding:0; }
.ln-routine li{ position:relative; padding:5px 0 5px 26px; font-size:.95rem; border-bottom:.8px solid #E4DEC9; }
.ln-routine li:last-child{ border-bottom:none; }
.ln-routine li::before{ content:"\\2610"; position:absolute; left:0; top:3px; color:var(--accent); font-size:15px; line-height:1; }

/* monthly spread */
.ln-spread{ display:grid; grid-template-columns:1fr 1fr; gap:14px; }
.ln-page{ background:var(--paper2); border:1px solid var(--hair); border-radius:6px; padding:12px 14px;
  background-image:radial-gradient(var(--hair) 0.6px, transparent 0.6px); background-size:11px 11px; background-position:7px 26px; }
.ln-page-h{ font-family:var(--mono); font-size:10px; letter-spacing:.1em; text-transform:uppercase; color:var(--accent); font-weight:600; margin-bottom:8px; }
.ln-cal{ width:100%; border-collapse:collapse; font-size:12px; }
.ln-cal th{ font-family:var(--mono); font-size:8.5px; letter-spacing:.05em; text-transform:uppercase; color:var(--ink-soft); font-weight:600; text-align:left; padding:2px 5px; border-bottom:1px solid var(--hair); }
.ln-cal th.h, .ln-cal td.h{ text-align:center; width:22px; padding-left:0; padding-right:0; }
.ln-cal td{ padding:5px 5px; border-bottom:1px solid #E4DEC9; vertical-align:top; }
.ln-cal .num{ font-family:var(--mono); font-weight:600; width:22px; }
.ln-cal .dow{ font-family:var(--mono); color:var(--ink-soft); font-size:10.5px; width:34px; }
.ln-cal .ev{ font-size:11.5px; }
.ln-cal .ln-dot{ color:var(--green); }
.ln-cal .ln-dot-off{ color:var(--hair); }
.ln-cal tr.wk td{ border-top:1.6px solid var(--green); }
.ln-wk{ list-style:none; margin:0; padding:0; }
.ln-wk > li{ margin-bottom:12px; }
.ln-wk h4{ font-family:var(--mono); font-size:10px; letter-spacing:.06em; text-transform:uppercase; color:var(--green); margin:0 0 4px; }
.ln-wk ul{ margin:0; padding-left:16px; font-size:.9rem; }
.ln-wk ul li{ margin-bottom:2px; }
.ln-subnote{ font-size:.8rem; color:var(--ink-soft); margin-top:8px; font-style:italic; }

/* daily */
.ln-day{ background:var(--paper2); border:1px solid var(--hair); border-radius:6px; padding:14px 16px;
  background-image:radial-gradient(var(--hair) 0.6px, transparent 0.6px); background-size:11px 11px; background-position:8px 40px; }
.ln-day-h{ font-size:1.05rem; margin-bottom:8px; }
.ln-log{ list-style:none; margin:0; padding:0; }
.ln-log li{ display:grid; grid-template-columns:16px 50px 1fr; gap:8px; align-items:baseline; padding:3px 0; font-size:.92rem; }
.ln-sig{ font-family:var(--mono); font-weight:600; text-align:center; color:var(--ink); }
.ln-time{ font-family:var(--mono); font-size:12px; color:var(--accent); }
.ln-desc-note{ color:var(--ink-soft); font-style:italic; }

/* daily anatomy */
.ln-anat{ display:grid; grid-template-columns:auto auto 1fr; gap:2px 16px; align-items:end; background:var(--paper2); border:1px solid var(--hair); border-radius:6px; padding:16px 18px; }
.ln-anat .val{ font-family:var(--mono); font-size:1.15rem; font-weight:600; }
.ln-anat .val.t{ color:var(--accent); }
.ln-anat .val.d{ font-family:var(--body); font-weight:400; font-size:1rem; }
.ln-anat .lab{ font-family:var(--mono); font-size:9px; letter-spacing:.08em; text-transform:uppercase; color:var(--ink-soft); border-top:1px solid var(--hair); padding-top:4px; margin-top:4px; }

@keyframes ln-fade{ from{ opacity:0 } to{ opacity:1 } }
@keyframes ln-slide{ from{ transform:translateY(16px) } to{ transform:translateY(0) } }
@media (prefers-reduced-motion: reduce){ .ln-card, .ln-overlay, .ln-dialog{ transition:none; animation:none; } }

@media (max-width:640px){
  .ln-root{ font-size:16px; }
  .ln-grid{ grid-template-columns:1fr; }
  .ln-card-wide{ grid-column:auto; }
  .ln-two{ grid-template-columns:1fr; }
  .ln-two-tight{ grid-template-columns:1fr; }
  .ln-year{ grid-template-columns:1fr; }
  .ln-learn{ grid-template-columns:1fr; }
  .ln-spread{ grid-template-columns:1fr; }
  .ln-overlay{ align-items:flex-end; }
  .ln-dialog{ max-height:90vh; }
}
@media (min-width:641px){
  .ln-overlay{ align-items:center; padding:24px; }
  .ln-dialog{ border-radius:14px; }
}
`;