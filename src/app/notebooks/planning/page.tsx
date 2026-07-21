"use client";

/**
 * The Planning Notebook, setup guide (companion to the Learning Notebook page).
 * Composition only: the shared shell + styles come from ../_shared and the route
 * layout; this page pulls its diagrams, worked examples, and card data from the
 * sibling files (diagrams.ts, data.tsx, _components/) and lays out the sections.
 *
 * Sample content (June starting on a Monday; habits Read/Move/Focus; placeholder
 * books and events) is illustrative. Swap freely.
 */

import {
  CardGrid,
  Figure,
  NotebookCover,
  Panel,
  Routine,
  Section,
} from "../_shared";
import { PLANNING_STYLES } from "./styles";
import { MAP_SVG, NEST_SVG } from "./diagrams";
import { GREEN_TAGS, SECTIONS } from "./data";
import { TocExample } from "./_components/TocExample";
import { YearExample } from "./_components/YearExample";
import { QuarterExample } from "./_components/QuarterExample";
import { MonthSpread } from "./_components/MonthSpread";
import { DailyAnatomy } from "./_components/DailyAnatomy";
import { DailyExample } from "./_components/DailyExample";

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PLANNING_STYLES }} />

      <NotebookCover
        eyebrow={<>Volume I &#183; Planning</>}
        title="The Planning Notebook"
        subtitle="One book, four horizons: from the year down to a single timed line"
        thesis={
          <>
            The whole system is one idea: <b>plan top down and let each day roll back up.</b> A
            twelve-month view sets the big rocks, quarters turn them into projects and reading,
            months break into a calendar and weekly focus, and days are a timed bullet log. A
            table of contents up front tracks which pages hold which plans, so you can see at a
            glance where your time is already blocked.
          </>
        }
        penline={<>Built for a dotted Moleskine and a single pen.</>}
      />

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

      <Section
        n="01"
        title="The five sections"
        lead={
          <>
            The notebook holds five kinds of page, in the order you meet them front to back. Tap
            any card for a worked example. Set up the contents and index first; the rest fill in
            as the year runs.
          </>
        }
      >
        <CardGrid items={SECTIONS} greenTags={GREEN_TAGS} />
      </Section>

      <Section
        n="02"
        title="How the horizons nest"
        lead={
          <>
            Each horizon feeds the next. The year sets goals, the quarter picks the projects and
            books, the month schedules them, and the day records what actually happened. Reviews
            run the other way: a day informs the month, a month closes out the quarter.
          </>
        }
      >
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
      </Section>

      <Section
        n="03"
        title="Front matter: contents and index"
        lead={
          <>
            Two facing spreads at the very front. The contents list is your time map; the index
            is for finding notes and project collections later.
          </>
        }
      >
        <ol className="ln-steps">
          <li><b>Contents:</b> as you lay out each plan, add a line with its page number. Yearly plan, then Q1 to Q4, then each month spread.</li>
          <li><b>Read it as a time map:</b> the page numbers alone show how much of the book (and the year) is already committed.</li>
          <li><b>Index:</b> leave a spread blank; add a line whenever a collection or recurring topic first appears, with its page numbers.</li>
        </ol>
        <div style={{ marginTop: 14 }}>
          <TocExample />
        </div>
      </Section>

      <Section
        n="04"
        title="The 12-month view"
        lead={
          <>
            Four pages, three months each, the whole year visible in a few flips. Per month, note
            the <b>major events</b>: fixed dates, trips, launches. Up top, a few <b>north stars</b>{" "}
            for the year. Concrete goals belong to the quarters, so keep this layer sparse.
          </>
        }
      >
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
      </Section>

      <Section
        n="05"
        title="The quarterly spread"
        lead={
          <>
            A two-page spread. The <b>left page</b> is the plan: <b>Projects</b>, the handful that
            matter with one to three bullet goals each, and <b>Learning</b>, split into Technical
            Expertise and Expanding Perspective with three books each. The <b>right page</b> is a
            review, one block per month, so the quarter has somewhere to roll up.
          </>
        }
      >
        <div style={{ marginTop: 8 }}>
          <QuarterExample />
        </div>
        <div className="ln-two" style={{ marginTop: 16 }}>
          <Panel title="Left page: the plan">
            <ul className="ln-list">
              <li>Projects are high-level capture of what you are working on; the detail lives elsewhere.</li>
              <li>Six books for the quarter, three per focus area, so learning is deliberate not accidental.</li>
            </ul>
          </Panel>
          <Panel title="Right page: the review">
            <ul className="ln-list">
              <li>At each month&rsquo;s end, write three lines for that month: wins, misses, and what carries forward.</li>
              <li>Before planning the next quarter, read all three blocks together. That reading is the retro.</li>
            </ul>
          </Panel>
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
      </Section>

      <Section
        n="06"
        title="The monthly spread"
        lead={
          <>
            The workhorse layout, across two pages. The left page is the month as a calendar; the
            right page is the weekly focus that steers it.
          </>
        }
      >
        <div style={{ marginTop: 8 }}>
          <MonthSpread />
        </div>
        <div className="ln-two" style={{ marginTop: 16 }}>
          <Panel title="Left page: the calendar">
            <ul className="ln-list">
              <li><b>Columns 1 and 2:</b> the date and the weekday, one row per day of the month.</li>
              <li><b>Middle:</b> room to jot that day&rsquo;s events.</li>
              <li><b>Last three columns:</b> one key habit each. Fill the dot on the days you did it.</li>
            </ul>
          </Panel>
          <Panel title="Right page: weekly focus">
            <ul className="ln-list">
              <li>One block per week, aligned to the week of rows opposite it.</li>
              <li>A short list of what that week is actually about, pulled down from the quarter.</li>
              <li>Reviewing the habit dots each week shows the trend at a glance.</li>
            </ul>
          </Panel>
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
      </Section>

      <Section
        n="07"
        title="The daily journal"
        lead={
          <>
            Most of the book. It is a standard bullet journal with one addition: the start time
            of each entry, written between the signifier and the description.
          </>
        }
      >
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
      </Section>
    </>
  );
}
