/** A worked "idea thread" page: body written as you read, review margin filled later. */
export function ThreadExample() {
  return (
    <div className="ln-thread">
      <div className="ln-thread-bar">
        <span>THREAD &#183; Incentive design</span>
        <span>I-41</span>
      </div>
      <div className="ln-thread-body">
        <div className="ln-thread-col">
          <p>Metrics chosen as targets stop measuring what they were meant to. <span className="ln-dim">(Goodhart, notes I-12)</span></p>
          <p>Well-scoped OKRs argue targets still beat no target. <span className="ln-dim">(notes I-78)</span></p>
          <p>The failure mode looks like <em>visibility</em>, not measurement.</p>
          <p>Does this generalize to personal habit tracking?</p>
        </div>
        <div className="ln-thread-margin" aria-label="review margin">
          <span className="ln-mm">REVIEW MARGIN</span>
          <span>&#8594; I-78</span>
          <span>&#8800;</span>
          <span>&#9733;</span>
          <span>&#8595; dig</span>
        </div>
      </div>
      <div className="ln-thread-foot">
        <div><b>SOURCES</b>&nbsp; Goodhart I-12 &#183; Kerr I-34 &#183; OKR book I-78</div>
        <div><b>LINKS</b>&nbsp;&nbsp;&nbsp; &#8592; I-12 &#183; &#8594; I-78 &#183; &#8596; &ldquo;feedback loops&rdquo; I-55</div>
      </div>
    </div>
  );
}
