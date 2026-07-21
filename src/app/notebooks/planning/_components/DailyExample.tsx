/** A day in the journal: a timed bullet log that interleaves with collections. */
export function DailyExample() {
  const log: { s: string; t: string; d: string; note?: boolean }[] = [
    { s: "•", t: "07:30", d: "Morning pages, then plan the day" },
    { s: "○", t: "09:00", d: "Standup" },
    { s: "•", t: "09:20", d: "Ship the onboarding PR" },
    { s: "•", t: "11:45", d: "Review the design doc, leave comments" },
    { s: "○", t: "13:00", d: "Lunch with Priya" },
    { s: "•", t: "15:30", d: "Draft Q3 project brief (started thread in Projects)" },
    { s: "•", t: "16:10", d: "Idea: batch code reviews to protect mornings", note: true },
    { s: "<", t: "16:40", d: "Deep-dive on caching (pushed to Q3 learning)" },
    { s: "✓", t: "18:00", d: "Gym" },
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
