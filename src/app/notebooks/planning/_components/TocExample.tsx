import { Mock } from "../../_shared";

/** Front matter: a contents list (doubling as a time map) beside a topical index. */
export function TocExample() {
  return (
    <div className="ln-two-tight">
      <Mock head="CONTENTS">
        <pre className="ln-pre">{`Yearly plan .............. p.3
Q1 · Jan-Mar ............. p.5
Q2 · Apr-Jun ............. p.11
Q3 · Jul-Sep ............. p.17
Q4 · Oct-Dec ............. p.23
January spread ........... p.30
February spread .......... p.34
March spread ............. p.38`}</pre>
      </Mock>
      <Mock
        head="INDEX"
        note={
          <>
            The contents list doubles as a time map: scanning the page numbers shows where the
            year is already blocked out.
          </>
        }
      >
        <pre className="ln-pre">{`Health & fitness ..... 41, 63
Reading list ......... 12, 55
Trip: Japan .......... 48
Finances ............. 30, 70
Career notes ......... 52`}</pre>
      </Mock>
    </div>
  );
}
