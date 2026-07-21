/** The monthly spread: a calendar with habit columns beside the week's focus. */
export function MonthSpread() {
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
    <span className={v ? "ln-dot" : "ln-dot-off"}>{v ? "●" : "○"}</span>
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
