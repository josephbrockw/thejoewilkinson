/** The quarterly spread: the plan on the left page, a month-by-month review on the right. */
export function QuarterExample() {
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
        <p className="ln-subnote">Fill one block at each month&rsquo;s end; read all three as the retro before planning the next quarter.</p>
      </div>
    </div>
  );
}
