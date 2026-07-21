/** Inline SVG diagrams for the Planning Notebook page. */

export const MAP_SVG = `
<svg viewBox="0 0 680 150" xmlns="http://www.w3.org/2000/svg" font-family="'IBM Plex Mono',monospace">
  <line x1="30" y1="22" x2="650" y2="22" stroke="#232C27" stroke-width="1.3"/>
  <path d="M650 22 l-8 -3.4 v6.8 z" fill="#232C27"/>
  <text x="30" y="16" fill="#5A645D" font-size="8" font-weight="600">front of book</text>
  <text x="650" y="16" fill="#5A645D" font-size="8" font-weight="600" text-anchor="end">back of book</text>
  <rect x="16" y="40" width="648" height="72" rx="4" fill="#F3F0E7" stroke="#CBC3AE"/>
  <rect x="16" y="40" width="92" height="72" fill="#2E4636" opacity="0.14"/>
  <rect x="108" y="40" width="96" height="72" fill="#2E4636" opacity="0.10"/>
  <rect x="204" y="40" width="120" height="72" fill="#2E4636" opacity="0.07"/>
  <rect x="324" y="40" width="140" height="72" fill="#9E3B2E" opacity="0.06"/>
  <rect x="464" y="40" width="200" height="72" fill="#9E3B2E" opacity="0.12"/>
  <g stroke="#CBC3AE"><line x1="108" y1="40" x2="108" y2="112"/><line x1="204" y1="40" x2="204" y2="112"/><line x1="324" y1="40" x2="324" y2="112"/><line x1="464" y1="40" x2="464" y2="112"/></g>
  <g text-anchor="middle" fill="#232C27" font-weight="600" font-size="8.5">
    <text x="62" y="72">TOC +</text><text x="62" y="83">Index</text>
    <text x="156" y="72">12-month</text><text x="156" y="83">view</text>
    <text x="264" y="72">Quarterly</text><text x="264" y="83">plans</text>
    <text x="394" y="72">Monthly</text><text x="394" y="83">spreads</text>
    <text x="564" y="70">Daily journal</text><text x="564" y="81">+ collections</text>
  </g>
  <g text-anchor="middle" fill="#5A645D" font-size="7">
    <text x="62" y="100">2 pp</text><text x="156" y="100">4 pp</text><text x="264" y="100">~8 pp</text><text x="394" y="100">~24 pp</text><text x="564" y="100">the rest of the book</text>
  </g>
</svg>`;

export const NEST_SVG = `
<svg viewBox="0 0 680 210" xmlns="http://www.w3.org/2000/svg" font-family="'IBM Plex Mono',monospace">
  <rect x="8" y="46" width="148" height="64" rx="6" fill="#F1EDE2" stroke="#2E4636" stroke-width="1.2"/>
  <text x="82" y="72" text-anchor="middle" fill="#2E4636" font-size="9" font-weight="600">YEAR</text>
  <text x="82" y="88" text-anchor="middle" fill="#232C27" font-size="8" font-family="Lora,serif">12-month goals</text>
  <text x="82" y="100" text-anchor="middle" fill="#5A645D" font-size="7">events + goals</text>
  <rect x="178" y="46" width="148" height="64" rx="6" fill="#F1EDE2" stroke="#2E4636" stroke-width="1.2"/>
  <text x="252" y="72" text-anchor="middle" fill="#2E4636" font-size="9" font-weight="600">QUARTER</text>
  <text x="252" y="88" text-anchor="middle" fill="#232C27" font-size="8" font-family="Lora,serif">projects + learning</text>
  <text x="252" y="100" text-anchor="middle" fill="#5A645D" font-size="7">3-month arc</text>
  <rect x="348" y="46" width="148" height="64" rx="6" fill="#F1EDE2" stroke="#2E4636" stroke-width="1.2"/>
  <text x="422" y="72" text-anchor="middle" fill="#2E4636" font-size="9" font-weight="600">MONTH</text>
  <text x="422" y="88" text-anchor="middle" fill="#232C27" font-size="8" font-family="Lora,serif">calendar + habits</text>
  <text x="422" y="100" text-anchor="middle" fill="#5A645D" font-size="7">weekly focus</text>
  <rect x="518" y="46" width="148" height="64" rx="6" fill="#F1EDE2" stroke="#2E4636" stroke-width="1.5"/>
  <text x="592" y="72" text-anchor="middle" fill="#2E4636" font-size="9" font-weight="600">DAY</text>
  <text x="592" y="88" text-anchor="middle" fill="#232C27" font-size="8" font-family="Lora,serif">timed bullet log</text>
  <text x="592" y="100" text-anchor="middle" fill="#5A645D" font-size="7">journal + collections</text>
  <g stroke="#232C27" stroke-width="1.5" fill="#232C27">
    <line x1="158" y1="78" x2="172" y2="78"/><path d="M176 78 l-7 -3 v6 z"/>
    <line x1="328" y1="78" x2="342" y2="78"/><path d="M346 78 l-7 -3 v6 z"/>
    <line x1="498" y1="78" x2="512" y2="78"/><path d="M516 78 l-7 -3 v6 z"/>
  </g>
  <text x="340" y="34" text-anchor="middle" fill="#2E4636" font-size="8" font-weight="600">plan top down</text>
  <path d="M592 112 C592 168 82 168 82 114" stroke="#9E3B2E" stroke-width="1.3" fill="none" stroke-dasharray="4 3"/>
  <path d="M82 114 l-4 8 h8 z" fill="#9E3B2E"/>
  <text x="337" y="150" text-anchor="middle" fill="#9E3B2E" font-size="8" font-weight="600">review rolls back up: day into month into quarter</text>
</svg>`;
