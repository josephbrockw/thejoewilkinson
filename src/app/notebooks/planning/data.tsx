import { type NotebookCard } from "../_shared";
import { TocExample } from "./_components/TocExample";
import { YearExample } from "./_components/YearExample";
import { QuarterExample } from "./_components/QuarterExample";
import { MonthSpread } from "./_components/MonthSpread";
import { DailyAnatomy } from "./_components/DailyAnatomy";
import { DailyExample } from "./_components/DailyExample";

/** Card tags rendered in green (the rest use the rust accent). */
export const GREEN_TAGS = new Set(["Front of book", "After the front matter"]);

/** The five sections, in notebook order (front to back). */
export const SECTIONS: NotebookCard[] = [
  {
    id: "toc",
    tag: "Front of book",
    title: "1 · Contents + index",
    blurb:
      "A table of contents holding the page number of the yearly plan, each quarter, and each month, plus a topical index. Scanning it shows where your time is already blocked.",
    bullets: ["Set both up first; every new plan and collection adds one line."],
    example: <TocExample />,
  },
  {
    id: "year",
    tag: "After the front matter",
    title: "2 · 12-month view",
    blurb:
      "The whole year at low resolution: three months to a page, each month holding its major events, plus a few north stars for the year. Concrete goals belong to the quarters.",
    bullets: ["Fixed dates and big directional aims live here, so quarters and months inherit from them."],
    example: <YearExample />,
  },
  {
    id: "quarter",
    tag: "After the year view",
    title: "3 · Quarterly spread",
    blurb:
      "A two-page spread. Left: the plan, Projects (1 to 3 bullet goals each) and Learning, split into Technical Expertise and Expanding Perspective, three books each. Right: a month-by-month review.",
    bullets: ["The review page is where the quarter rolls up: fill one block at each month's end, then read all three as your retro."],
    example: <QuarterExample />,
  },
  {
    id: "month",
    tag: "Monthly",
    title: "4 · Monthly spread",
    blurb:
      "A two-page spread. Left: a calendar with date and weekday, room for the day's events, and three habit-tracker columns. Right: weekly focus items for the matching weeks.",
    bullets: ["The left and right pages are read together: each week block maps to a week of rows."],
    example: <MonthSpread />,
  },
  {
    id: "daily",
    tag: "Back, the bulk",
    title: "5 · Daily journal",
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
