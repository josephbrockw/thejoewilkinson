import { Mock } from "../../_shared";

/** The threads register: a compact table, one line per thread, marked closed in ink. */
export function RegisterExample() {
  return (
    <Mock
      head="THREADS REGISTER, updated at each finish"
      note={
        <>
          Blank means open. When a thread is finished you write <b>closed</b> once and strike
          the row, an append-only mark that works in a single pen.
        </>
      }
    >
      <table className="ln-reg">
        <thead>
          <tr><th>Thread</th><th>Pages</th><th>Link</th></tr>
        </thead>
        <tbody>
          <tr><td>Incentive design</td><td>12&#183;34&#183;78</td><td>&#8594;55</td></tr>
          <tr><td>Feedback loops</td><td>41&#183;55</td><td>&#8594;41</td></tr>
          <tr><td>Attention &amp; focus</td><td>19&#183;63</td><td>&#183;</td></tr>
          <tr className="ln-closed"><td>Stoic practice</td><td>07&#183;22</td><td>&#8800;41 <span className="ln-closed-tag">closed</span></td></tr>
        </tbody>
      </table>
    </Mock>
  );
}
