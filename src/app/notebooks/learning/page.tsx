"use client";

/**
 * The Learning Notebook, setup guide (web port of the PDF).
 * Composition only: the shared shell + styles come from ../_shared and the route
 * layout; this page pulls its diagrams, worked examples, and card data from the
 * sibling files (diagrams.ts, data.tsx, _components/) and lays out the sections.
 */

import {
  CardGrid,
  Figure,
  NotebookCover,
  Panel,
  Section,
} from "../_shared";
import { LEARNING_STYLES } from "./styles";
import { FLIP_SVG, LIFECYCLE_SVG, MIGRATION_SVG, THEME_SVG } from "./diagrams";
import { COLLECTIONS, GREEN_TAGS, MARKS } from "./data";
import { ThreadExample } from "./_components/ThreadExample";
import { RegisterExample } from "./_components/RegisterExample";

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: LEARNING_STYLES }} />

      <NotebookCover
        eyebrow={<>Volume I &#183; Continued Education</>}
        title="The Learning Notebook"
        subtitle="A setup guide for capturing ideas and connecting them later"
        thesis={
          <>
            One rule holds the whole system together: <b>keep capture and connection in
            separate layers.</b> You can&rsquo;t predict which note will matter in six months, so
            don&rsquo;t file for perfection as you read. Capture linearly in the <b>body</b> of each
            page, keep the right margin clear, and do all of your connecting in one pass when
            you <b>finish each source</b>. Maintain your reference collections from the back of
            the book.
          </>
        }
        penline={
          <>
            Built for a single black pen. Every mark is a <b>shape</b>, not a color.
          </>
        }
      />

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

      <Section
        n="01"
        title="The five collections"
        lead={
          <>
            Everything in the notebook is one of these five, shown in the order you meet them
            flipping from front to back. Tap any card for a worked example. The three at the
            back are reference; set them up first, then the front fills as you read.
          </>
        }
      >
        <CardGrid items={COLLECTIONS} greenTags={GREEN_TAGS} />

        <div className="ln-callout">
          <span className="ln-k">Set these up in order</span>
          <p>
            Label the back collections first, working inward from the very back (indexes,
            then register, then dig-deeper), before you take a single note from the front.
            That keeps your reference structure from getting buried in the capture stream.
          </p>
        </div>
      </Section>

      <Section
        n="02"
        title="The lifecycle at a glance"
        lead={
          <>
            Here is the whole arc, from a fresh notebook to a finished book and on to the next.
            Everything after this section just details one of these steps.
          </>
        }
      >
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
      </Section>

      <Section
        n="03"
        title="Starting a new notebook"
        lead={
          <>
            Do this once per volume. First notebook? Just follow the setup. Continuing from one
            that filled up? Fold in the migration steps below it.
          </>
        }
      >
        <ol className="ln-steps">
          <li><b>Inside cover:</b> write &ldquo;Volume I&rdquo; and today&rsquo;s date, then copy the six-mark notation key (section 06).</li>
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
          <Panel title="Carry forward">
            <ul className="ln-list">
              <li><b>Open idea threads:</b> recopy each one&rsquo;s current synthesis onto a fresh page; on the old page write &ldquo;moved to Vol II p.X&rdquo;.</li>
              <li><b>Theme index:</b> rebuild with open threads only; they start collecting new page numbers.</li>
              <li><b>Register:</b> recreate with open threads only; closed ones stay archived.</li>
              <li><b>Dig-deeper:</b> bring over items you still care about.</li>
            </ul>
          </Panel>
          <Panel title="Leave behind (archived)">
            <ul className="ln-list">
              <li><b>Reading notes:</b> the Seeds already harvested what mattered; raw pages stay put.</li>
              <li><b>Closed threads:</b> already marked, they stay put.</li>
              <li>The old volume keeps its indexes intact, so you can always reach back with an <code>I-##</code> reference.</li>
            </ul>
          </Panel>
        </div>
      </Section>

      <Section
        n="04"
        title="Starting a new source"
        lead={
          <>
            Each time you pick up a new book or article, open it properly. This is what makes
            the finish pass easy later.
          </>
        }
      >
        <ol className="ln-steps">
          <li><b>Turn to the next blank page</b> in your reading-notes stream and note its page number.</li>
          <li><b>Write a header:</b> title, author, and the page it starts on. For example, &ldquo;Thinking in Systems, Meadows, I-8&rdquo;.</li>
          <li><b>Log it in the Source index:</b> one line, title to its starting page.</li>
          <li><b>Read and capture in the body only.</b> Keep the right margin clear; that space is reserved for the finish review.</li>
          <li><b>Keep capturing linearly</b> across as many pages as the source needs. Don&rsquo;t stop to connect ideas yet.</li>
        </ol>
      </Section>

      <Section
        n="05"
        title="Finishing a source: the full review"
        lead={
          <>
            This is the only review the system needs. Run it once, the moment you finish a
            source, and it does all of the connective work in a single sitting.
          </>
        }
      >
        <ol className="ln-steps">
          <li><b>Harvest Seeds.</b> On the last page of this source&rsquo;s notes, write a Seeds block: the 3 to 5 ideas worth keeping, each with a word on what it connects to or contradicts.</li>
          <li><b>Fill the right margins.</b> Flip back through this source&rsquo;s pages and annotate the margin with the notation set (connects, contradicts, develop, verify, promote, dig).</li>
          <li><b>Promote recurring ideas.</b> Anything you marked to promote, or that now shows up in a second source, gets its own Idea thread page. Link both ways.</li>
          <li><b>Update the Theme index.</b> Add this source&rsquo;s page numbers under each thread it touched.</li>
          <li><b>Update the Threads register.</b> Add any new open threads; mark closed the ones you are done with.</li>
          <li><b>Clear the dig-deeper marks.</b> Copy every down-arrow into the Dig-deeper list, then pick your next read from it.</li>
        </ol>
        <p className="ln-note-line">
          That is the whole pass. The book is captured, connected, and filed, and you have
          already chosen what to read next.
        </p>
        <Panel style={{ marginTop: 14 }}>
          <RegisterExample />
        </Panel>
      </Section>

      <Section
        n="06"
        title="Review and connections"
        lead={
          <>
            The finish pass leans on four small mechanics. Here is how each one works, and the
            notation you write in the margin.
          </>
        }
      >
        <div className="ln-two">
          <Panel title="The four mechanics">
            <ul className="ln-list">
              <li><b>Number every page, label the volume.</b> Refer to pages as <code>I-41</code> (volume plus page) so links still work after a new book.</li>
              <li><b>Keep a right margin.</b> Body notes on the left; the right strip stays blank until the finish pass, then holds the notation.</li>
              <li><b>Link both ways.</b> Note page A to B, then go back and add B to A, so a thread is walkable from either end.</li>
              <li><b>The theme index is your backlink.</b> Each page feeds its number to a thread line, and that line becomes a ready-made synthesis list.</li>
            </ul>
          </Panel>
          <Panel title="Right-margin notation">
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
          </Panel>
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
      </Section>
    </>
  );
}
