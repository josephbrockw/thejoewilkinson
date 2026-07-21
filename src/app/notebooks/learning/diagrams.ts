/**
 * Inline SVG diagrams for the Learning Notebook page (raw markup so hyphenated
 * attrs stay valid). Wide diagrams scroll horizontally on small screens.
 */

export const FLIP_SVG = `
<svg viewBox="0 0 680 232" xmlns="http://www.w3.org/2000/svg" font-family="'IBM Plex Mono',monospace">
  <rect x="8" y="40" width="26" height="150" rx="3" fill="#2E4636"/>
  <rect x="646" y="40" width="26" height="150" rx="3" fill="#2E4636"/>
  <text x="21" y="118" fill="#E9E5D8" font-size="8" transform="rotate(-90 21 118)" text-anchor="middle" letter-spacing="2">FRONT COVER</text>
  <text x="659" y="118" fill="#E9E5D8" font-size="8" transform="rotate(-90 659 118)" text-anchor="middle" letter-spacing="2">BACK COVER</text>
  <rect x="40" y="40" width="600" height="150" fill="#F3F0E7" stroke="#CBC3AE" stroke-width="1"/>
  <g stroke="#E4DEC9" stroke-width="1">
    <line x1="40" y1="66" x2="640" y2="66"/><line x1="40" y1="92" x2="640" y2="92"/>
    <line x1="40" y1="118" x2="640" y2="118"/><line x1="40" y1="144" x2="640" y2="144"/><line x1="40" y1="170" x2="640" y2="170"/>
  </g>
  <rect x="40" y="40" width="330" height="150" fill="#2E4636" opacity="0.06"/>
  <rect x="470" y="40" width="170" height="150" fill="#2E4636" opacity="0.13"/>
  <rect x="370" y="40" width="100" height="150" fill="none" stroke="#9E3B2E" stroke-width="1.1" stroke-dasharray="4 4"/>
  <line x1="58" y1="52" x2="352" y2="52" stroke="#232C27" stroke-width="1.4"/><path d="M352 52 l-8 -3.4 v6.8 z" fill="#232C27"/>
  <line x1="628" y1="52" x2="486" y2="52" stroke="#2E4636" stroke-width="1.4"/><path d="M486 52 l8 -3.4 v6.8 z" fill="#2E4636"/>
  <text x="52" y="34" fill="#232C27" font-size="10" font-weight="600" letter-spacing="1.5">CAPTURE  &#8250;  front to back</text>
  <text x="628" y="34" fill="#2E4636" font-size="10" font-weight="600" letter-spacing="1.5" text-anchor="end">back to front  &#8249;  REFERENCE</text>
  <text x="60" y="86" fill="#232C27" font-size="9.5" font-weight="600">Reading notes</text>
  <text x="60" y="99" fill="#5A645D" font-size="8">raw and linear, body left,</text>
  <text x="60" y="111" fill="#5A645D" font-size="8">margin kept clear at right</text>
  <text x="60" y="146" fill="#232C27" font-size="9.5" font-weight="600">Idea threads</text>
  <text x="60" y="159" fill="#5A645D" font-size="8">promoted as ideas recur</text>
  <text x="420" y="112" fill="#9E3B2E" font-size="8.5" font-weight="600" text-anchor="middle">leave the</text>
  <text x="420" y="124" fill="#9E3B2E" font-size="8.5" font-weight="600" text-anchor="middle">middle open</text>
  <text x="628" y="86" fill="#232C27" font-size="9.5" font-weight="600" text-anchor="end">Dig-deeper &#183; Register</text>
  <text x="628" y="99" fill="#5A645D" font-size="8" text-anchor="end">open loops &#183; threads at a glance</text>
  <text x="628" y="132" fill="#232C27" font-size="9.5" font-weight="600" text-anchor="end">Two indexes</text>
  <text x="628" y="145" fill="#5A645D" font-size="8" text-anchor="end">source &#183; theme (very back)</text>
  <text x="44" y="184" fill="#5A645D" font-size="7">p.1</text>
  <text x="636" y="184" fill="#5A645D" font-size="7" text-anchor="end">p.N</text>
</svg>`;

export const LIFECYCLE_SVG = `
<svg viewBox="0 0 680 214" xmlns="http://www.w3.org/2000/svg" font-family="'IBM Plex Mono',monospace">
  <rect x="8" y="50" width="148" height="66" rx="6" fill="#F1EDE2" stroke="#2E4636" stroke-width="1.2"/>
  <text x="82" y="78" text-anchor="middle" fill="#2E4636" font-size="9" font-weight="600">1 &#183; SET UP</text>
  <text x="82" y="93" text-anchor="middle" fill="#232C27" font-size="8" font-family="Lora,serif">the new volume</text>
  <text x="82" y="105" text-anchor="middle" fill="#5A645D" font-size="7">(or migrate)</text>
  <rect x="178" y="50" width="148" height="66" rx="6" fill="#F1EDE2" stroke="#2E4636" stroke-width="1.2"/>
  <text x="252" y="78" text-anchor="middle" fill="#2E4636" font-size="9" font-weight="600">2 &#183; START A SOURCE</text>
  <text x="252" y="93" text-anchor="middle" fill="#232C27" font-size="8" font-family="Lora,serif">write a header,</text>
  <text x="252" y="105" text-anchor="middle" fill="#5A645D" font-size="7">log it in the index</text>
  <rect x="348" y="50" width="148" height="66" rx="6" fill="#F1EDE2" stroke="#2E4636" stroke-width="1.2"/>
  <text x="422" y="78" text-anchor="middle" fill="#2E4636" font-size="9" font-weight="600">3 &#183; CAPTURE</text>
  <text x="422" y="93" text-anchor="middle" fill="#232C27" font-size="8" font-family="Lora,serif">notes in the body,</text>
  <text x="422" y="105" text-anchor="middle" fill="#5A645D" font-size="7">margin left clear</text>
  <rect x="518" y="50" width="148" height="66" rx="6" fill="#F1EDE2" stroke="#2E4636" stroke-width="1.5"/>
  <text x="592" y="78" text-anchor="middle" fill="#2E4636" font-size="9" font-weight="600">4 &#183; FINISH</text>
  <text x="592" y="93" text-anchor="middle" fill="#232C27" font-size="8" font-family="Lora,serif">Seeds, then the</text>
  <text x="592" y="105" text-anchor="middle" fill="#5A645D" font-size="7">full review pass</text>
  <g stroke="#232C27" stroke-width="1.5" fill="#232C27">
    <line x1="158" y1="83" x2="172" y2="83"/><path d="M176 83 l-7 -3 v6 z"/>
    <line x1="328" y1="83" x2="342" y2="83"/><path d="M346 83 l-7 -3 v6 z"/>
    <line x1="498" y1="83" x2="512" y2="83"/><path d="M516 83 l-7 -3 v6 z"/>
  </g>
  <path d="M592 118 C592 176 252 176 252 122" stroke="#2E4636" stroke-width="1.4" fill="none"/>
  <path d="M252 120 l-4 8 h8 z" fill="#2E4636"/>
  <text x="422" y="150" text-anchor="middle" fill="#2E4636" font-size="8" font-weight="600">repeat for each source</text>
  <text x="340" y="200" text-anchor="middle" fill="#5A645D" font-size="7.5" font-family="Lora,serif">When the notebook fills, migrate the open parts into a new volume and carry on.</text>
</svg>`;

export const MIGRATION_SVG = `
<svg viewBox="0 0 680 236" xmlns="http://www.w3.org/2000/svg" font-family="'IBM Plex Mono',monospace">
  <rect x="24" y="40" width="150" height="176" rx="4" fill="#2E4636" opacity="0.10" stroke="#2E4636" stroke-width="1.2"/>
  <rect x="24" y="40" width="16" height="176" rx="3" fill="#2E4636"/>
  <text x="108" y="30" fill="#2E4636" font-size="9" font-weight="600" text-anchor="middle">VOLUME I &#183; full</text>
  <text x="104" y="70" fill="#232C27" font-size="7.6" text-anchor="middle">stays on the shelf</text>
  <text x="104" y="84" fill="#232C27" font-size="7.6" text-anchor="middle">as an archive</text>
  <g font-family="Lora,serif" font-size="8" fill="#5A645D">
    <text x="52" y="112">&#9642; all reading notes</text>
    <text x="52" y="130">&#9642; closed threads</text>
    <text x="52" y="148">&#9642; old indexes (intact)</text>
  </g>
  <text x="104" y="180" fill="#9E3B2E" font-size="7.4" text-anchor="middle" font-weight="600">label the cover:</text>
  <text x="104" y="192" fill="#9E3B2E" font-size="7.4" text-anchor="middle" font-weight="600">"Vol I &#183; dates"</text>
  <rect x="506" y="40" width="150" height="176" rx="4" fill="#F1EDE2" stroke="#2E4636" stroke-width="1.4"/>
  <rect x="640" y="40" width="16" height="176" rx="3" fill="#2E4636"/>
  <text x="580" y="30" fill="#2E4636" font-size="9" font-weight="600" text-anchor="middle">VOLUME II &#183; fresh</text>
  <g font-family="Lora,serif" font-size="8" fill="#232C27">
    <text x="524" y="72">&#9642; open threads, recopied</text>
    <text x="524" y="90">&#9642; theme index, open only</text>
    <text x="524" y="108">&#9642; register, rebuilt</text>
    <text x="524" y="126">&#9642; open dig-deeper items</text>
  </g>
  <text x="580" y="156" fill="#5A645D" font-size="7.4" text-anchor="middle">first page:</text>
  <text x="580" y="168" fill="#5A645D" font-size="7.4" text-anchor="middle">"carried from Vol I"</text>
  <g stroke="#232C27" stroke-width="1.6" fill="none"><path d="M182 96 L498 80"/><path d="M182 128 L498 110"/></g>
  <path d="M498 80 l-8.4 -1 l2.4 6.4 z" fill="#232C27"/><path d="M498 110 l-8.4 -1 l2.4 6.4 z" fill="#232C27"/>
  <text x="340" y="72" fill="#2E4636" font-size="8" font-weight="600" text-anchor="middle">CARRY what is open</text>
  <path d="M182 150 q40 20 40 44" stroke="#9E3B2E" stroke-width="1.4" fill="none" stroke-dasharray="3 3"/>
  <text x="250" y="210" fill="#9E3B2E" font-size="8" font-weight="600" text-anchor="middle">LEAVE the rest (do not recopy notes)</text>
  <rect x="286" y="120" width="108" height="30" rx="4" fill="#F3F0E7" stroke="#CBC3AE"/>
  <text x="340" y="132" fill="#5A645D" font-size="6.6" text-anchor="middle">cross-volume links stay</text>
  <text x="340" y="143" fill="#232C27" font-size="8.4" text-anchor="middle" font-weight="600">"see I-88"</text>
</svg>`;

export const THEME_SVG = `
<svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg" font-family="'IBM Plex Mono',monospace">
  <rect x="70" y="126" width="200" height="48" rx="3" fill="#9E3B2E" opacity="0.09"/>
  <rect x="70" y="126" width="200" height="48" rx="3" fill="none" stroke="#9E3B2E" stroke-width="1.2"/>
  <text x="80" y="142" fill="#9E3B2E" font-size="7.5" font-weight="600">THEME INDEX</text>
  <text x="80" y="160" fill="#232C27" font-size="8.5" font-family="Lora,serif">Incentive design</text>
  <text x="80" y="170" fill="#5A645D" font-size="7.5">I-12 &#183; I-34 &#183; I-51 &#183; I-78</text>
  <g font-size="8" fill="#232C27">
    <rect x="16" y="30" width="64" height="34" rx="2" fill="#F1EDE2" stroke="#CBC3AE"/><text x="48" y="51" text-anchor="middle">p.12</text>
    <rect x="260" y="30" width="64" height="34" rx="2" fill="#F1EDE2" stroke="#CBC3AE"/><text x="292" y="51" text-anchor="middle">p.34</text>
    <rect x="16" y="236" width="64" height="34" rx="2" fill="#F1EDE2" stroke="#CBC3AE"/><text x="48" y="257" text-anchor="middle">p.51</text>
    <rect x="260" y="236" width="64" height="34" rx="2" fill="#F1EDE2" stroke="#CBC3AE"/><text x="292" y="257" text-anchor="middle">p.78</text>
  </g>
  <g stroke="#232C27" stroke-width="1.2" fill="none" opacity="0.7">
    <path d="M64 60 Q120 100 96 126"/><path d="M280 64 Q250 100 244 126"/>
    <path d="M64 240 Q120 200 96 174"/><path d="M280 236 Q250 200 244 174"/>
  </g>
  <path d="M60 52 Q170 150 264 250" stroke="#232C27" stroke-width="1.4" fill="none"/>
  <path d="M60 52 l7.5 1.2 l-3.6 5.6 z" fill="#232C27"/><path d="M264 250 l-7.5 -1.2 l3.6 -5.6 z" fill="#232C27"/>
  <text x="150" y="120" fill="#5A645D" font-size="7" font-weight="600" transform="rotate(34 150 120)">log A to B and B to A</text>
</svg>`;
