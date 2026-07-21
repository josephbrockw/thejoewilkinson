import { Mock, MockHead, type NotebookCard } from "../_shared";
import { ThreadExample } from "./_components/ThreadExample";
import { RegisterExample } from "./_components/RegisterExample";

/** Right-margin notation: six shapes, one black pen. */
export const MARKS: { g: string; label: string }[] = [
  { g: "→", label: "connects to" },
  { g: "≠", label: "contradicts" },
  { g: "★", label: "develop this" },
  { g: "?", label: "verify / open question" },
  { g: "↑", label: "promote to a thread" },
  { g: "↓", label: "dig deeper" },
];

/** Card tags rendered in green (the rest use the rust accent). */
export const GREEN_TAGS = new Set(["Front of book", "After your notes"]);

/** The five collections, in notebook order (front to back). */
export const COLLECTIONS: NotebookCard[] = [
  {
    id: "reading",
    tag: "Front of book",
    title: "1 · Reading notes",
    blurb:
      "The capture layer. One continuous stream from the front, each source taking the pages it needs. Number every page and keep a clear right margin.",
    bullets: ["Close each source with a Seeds block: the 3 to 5 ideas worth carrying forward."],
    example: (
      <Mock
        note={
          <>
            The Seeds block pre-extracts the few ideas worth connecting, so the finish pass
            never has to re-read the whole book.
          </>
        }
      >
        <MockHead>BOOK &#183; Thinking in Systems (Meadows), I-8</MockHead>
        <pre className="ln-pre">{`· A system = elements + interconnections + a purpose.
· Stocks change slowly; flows are the rates between them.
· Feedback delays cause oscillation and overshoot.`}</pre>
        <MockHead style={{ marginTop: 14 }}>SEEDS, harvest before moving on</MockHead>
        <pre className="ln-pre">{`★  "Purpose is inferred from behaviour, not stated."
→  delays  ↔  incentive design   (I-41)
↓  read Forrester on system dynamics`}</pre>
      </Mock>
    ),
  },
  {
    id: "threads",
    tag: "After your notes",
    title: "2 · Idea threads",
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
    title: "3 · Dig-deeper list",
    blurb:
      "One running collection for open loops: rabbit holes, unanswered questions, books cited by books, anything you flag mid-read with a down-arrow.",
    bullets: ["Keeps curiosity from getting lost and feeds what you read next."],
    example: (
      <Mock
        head="DIG-DEEPER, open loops"
        note={
          <>
            Every down-arrow you write in a margin lands here. When you choose the next book,
            this is the shortlist.
          </>
        }
      >
        <pre className="ln-pre">{`↓  Forrester, the origins of system dynamics
↓  Is Goodhart's law testable for personal habits?
↓  "The Cobra Effect," cited in I-34
↓  Attention residue, find the original study`}</pre>
      </Mock>
    ),
  },
  {
    id: "register",
    tag: "Back of book",
    title: "4 · Threads register",
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
    title: "5 · Two indexes",
    blurb:
      "Source index: every book to its page numbers. Theme index: your recurring threads, one line each, gathering page numbers over time. The theme index is the connection engine.",
    bullets: [],
    wide: true,
    example: (
      <Mock
        note={
          <>
            The theme index is the payoff: months apart, four unrelated books all feed one line,
            and that line is a ready-made synthesis list.
          </>
        }
      >
        <MockHead>SOURCE INDEX</MockHead>
        <pre className="ln-pre">{`Thinking in Systems, Meadows      I-3, I-8, I-12
On the Folly of Rewarding A, Kerr I-34
Measure What Matters, Doerr       I-70, I-78`}</pre>
        <MockHead style={{ marginTop: 14 }}>THEME INDEX</MockHead>
        <pre className="ln-pre">{`Incentive design    I-12 · I-34 · I-51 · I-78
Feedback loops      I-8 · I-41 · I-55
Attention & focus   I-19 · I-63`}</pre>
      </Mock>
    ),
  },
];
