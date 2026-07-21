/** The 12-month view: a few north stars over three months of major events. */
export function YearExample() {
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
