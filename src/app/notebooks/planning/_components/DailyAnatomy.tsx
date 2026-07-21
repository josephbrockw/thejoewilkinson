/** The anatomy of a daily entry: signifier, start time, description. */
export function DailyAnatomy() {
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
