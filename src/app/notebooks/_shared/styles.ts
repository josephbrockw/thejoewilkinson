/**
 * Shared notebook design system, CSS.
 *
 * Every rule common to the Learning and Planning notebook pages lives here.
 * Each page imports SHARED_STYLES, appends its own page-specific rules, and
 * injects the combined string via an inline <style> (keeps the pages
 * self-contained, no build config required). Styles are namespaced under
 * .ln-root so they never clash with the rest of the site.
 */

export const SHARED_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,560;0,9..144,600;1,9..144,400&family=IBM+Plex+Mono:wght@400;500;600&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');

.ln-root{
  --paper:#E9E5D8; --paper2:#F3F0E7; --card:#F1EDE2;
  --ink:#232C27; --ink-soft:#5A645D; --green:#2E4636; --accent:#9E3B2E; --hair:#CBC3AE;
  --disp:'Fraunces',Georgia,serif; --body:'Lora',Georgia,serif; --mono:'IBM Plex Mono',ui-monospace,monospace;
  background:var(--paper); color:var(--ink);
  font-family:var(--body); font-size:17px; line-height:1.55; -webkit-font-smoothing:antialiased;
}
.ln-root *{ box-sizing:border-box; }
.ln-wrap{ max-width:820px; margin:0 auto; padding:clamp(20px,5vw,54px) clamp(16px,5vw,40px) 96px; }
.ln-root h1,.ln-root h2,.ln-root h3,.ln-root h4{ font-family:var(--disp); color:var(--green); font-weight:560; line-height:1.06; margin:0; font-optical-sizing:auto; }
.ln-root p{ margin:0 0 10px; }
.ln-root b,.ln-root strong{ font-weight:640; color:var(--ink); }
.ln-root em{ font-style:italic; }
.ln-root code{ font-family:var(--mono); font-size:.86em; background:rgba(46,70,54,.08); padding:1px 5px; border-radius:4px; }

.ln-plate{ border:1.6px solid var(--green); background:var(--paper2); padding:clamp(20px,5vw,32px) clamp(18px,5vw,34px); position:relative; }
.ln-plate::before{ content:""; position:absolute; inset:5px; border:.8px solid var(--hair); pointer-events:none; }
.ln-eyebrow{ font-family:var(--mono); font-size:12px; letter-spacing:.28em; text-transform:uppercase; color:var(--accent); font-weight:600; }
.ln-title{ font-size:clamp(2.1rem,8vw,3.4rem); letter-spacing:-.01em; margin:.28em 0 .12em; font-weight:600; }
.ln-sub{ font-family:var(--disp); font-style:italic; font-weight:400; font-size:clamp(1.05rem,3.4vw,1.35rem); color:var(--ink-soft); margin-bottom:.7em; }
.ln-thesis{ font-size:1.02rem; max-width:62ch; }
.ln-thesis b{ color:var(--green); }
.ln-penline{ margin-top:16px; padding-top:12px; border-top:.8px solid var(--hair); font-family:var(--mono); font-size:13px; color:var(--ink-soft); }
.ln-penline b{ color:var(--green); }

.ln-section{ margin-top:clamp(30px,6vw,46px); }
.ln-sec-head{ display:flex; align-items:baseline; gap:12px; border-bottom:1.4px solid var(--green); padding-bottom:6px; margin-bottom:14px; }
.ln-sec-num{ font-family:var(--mono); font-size:13px; font-weight:600; color:var(--accent); }
.ln-sec-head h2{ font-size:clamp(1.4rem,5vw,1.95rem); }
.ln-lead{ font-size:1.05rem; }
.ln-lead b{ color:var(--green); }

.ln-fig{ margin:18px 0 6px; }
.ln-svg{ width:100%; }
.ln-svg svg{ display:block; width:100%; height:auto; }
.ln-scroll{ overflow-x:auto; -webkit-overflow-scrolling:touch; }
.ln-svg-wide{ min-width:600px; }
.ln-fig figcaption{ font-family:var(--mono); font-size:12px; color:var(--ink-soft); margin-top:8px; line-height:1.45; }
.ln-fig figcaption b{ color:var(--accent); }

.ln-grid{ display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-top:14px; }
.ln-card{ text-align:left; font:inherit; color:inherit; background:var(--card); border:1px solid var(--hair); border-radius:6px; padding:16px 18px; cursor:pointer; transition:transform .12s ease, box-shadow .12s ease, border-color .12s ease; display:flex; flex-direction:column; }
.ln-card:hover{ transform:translateY(-2px); box-shadow:0 6px 18px rgba(35,44,39,.10); border-color:var(--green); }
.ln-card:focus-visible{ outline:2.5px solid var(--accent); outline-offset:2px; }
.ln-card-wide{ grid-column:1 / -1; }
.ln-tag{ align-self:flex-start; font-family:var(--mono); font-size:10px; font-weight:600; letter-spacing:.14em; text-transform:uppercase; padding:3px 8px; border-radius:20px; margin-bottom:9px; background:rgba(46,70,54,.12); color:var(--green); }
.ln-tag-b{ background:rgba(158,59,46,.12); color:var(--accent); }
.ln-card h3{ font-size:1.2rem; margin-bottom:4px; }
.ln-card-blurb{ font-size:.92rem; margin-bottom:6px; }
.ln-card ul{ margin:0 0 10px; padding-left:18px; font-size:.9rem; }
.ln-card li{ margin-bottom:4px; }
.ln-view{ margin-top:auto; font-family:var(--mono); font-size:12px; font-weight:600; color:var(--accent); letter-spacing:.02em; }

.ln-two{ display:grid; grid-template-columns:1fr 1fr; gap:16px; align-items:start; margin-top:14px; }
.ln-panel{ background:var(--card); border:1px solid var(--hair); border-radius:6px; padding:14px 18px; }
.ln-panel-h{ font-size:1.1rem; margin-bottom:8px; }
.ln-list{ margin:0; padding-left:18px; font-size:.95rem; }
.ln-list li{ margin-bottom:7px; }
.ln-fine{ margin:10px 0 0; font-size:.85rem; color:var(--ink-soft); }

.ln-steps{ counter-reset:s; list-style:none; padding:0; margin:6px 0 0; }
.ln-steps li{ position:relative; padding:10px 0 10px 36px; border-bottom:.8px solid var(--hair); font-size:1rem; }
.ln-steps li:last-child{ border-bottom:none; }
.ln-steps li::before{ counter-increment:s; content:counter(s,decimal-leading-zero); position:absolute; left:0; top:10px; font-family:var(--mono); font-size:13px; font-weight:600; color:var(--accent); }
.ln-note-line{ margin-top:12px; font-size:1rem; font-style:italic; color:var(--ink-soft); }
.ln-foot{ margin-top:18px; font-family:var(--mono); font-size:12px; color:var(--ink-soft); text-align:center; }

.ln-overlay{ position:fixed; inset:0; background:rgba(30,36,32,.55); display:flex; align-items:flex-end; justify-content:center; padding:0; z-index:1000; backdrop-filter:blur(2px); animation:ln-fade .16s ease; }
.ln-dialog{ background:var(--paper); width:100%; max-width:640px; max-height:92vh; overflow:auto; border-radius:14px 14px 0 0; border:1px solid var(--hair); box-shadow:0 -10px 40px rgba(0,0,0,.25); animation:ln-slide .2s ease; }
.ln-dialog-head{ display:flex; align-items:flex-start; justify-content:space-between; gap:12px; padding:18px 20px 10px; position:sticky; top:0; background:var(--paper); }
.ln-dialog-eyebrow{ font-family:var(--mono); font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:var(--accent); font-weight:600; }
.ln-dialog-head h3{ font-size:1.35rem; margin-top:2px; }
.ln-close{ font:inherit; font-size:18px; line-height:1; background:var(--card); border:1px solid var(--hair); color:var(--ink); width:36px; height:36px; border-radius:8px; cursor:pointer; flex:none; }
.ln-close:hover{ border-color:var(--green); }
.ln-close:focus-visible{ outline:2.5px solid var(--accent); outline-offset:2px; }
.ln-dialog-body{ padding:4px 20px 26px; }

.ln-mock{ font-size:.95rem; }
.ln-mock-h{ font-family:var(--mono); font-size:11px; font-weight:600; letter-spacing:.12em; color:var(--green); text-transform:uppercase; margin-bottom:6px; }
.ln-pre{ font-family:var(--mono); font-size:12px; line-height:1.7; background:var(--paper2); border:1px solid var(--hair); border-radius:6px; padding:12px 14px; margin:0; white-space:pre; overflow-x:auto; }
.ln-mock-note{ font-size:.9rem; color:var(--ink-soft); margin-top:12px; }

@keyframes ln-fade{ from{ opacity:0 } to{ opacity:1 } }
@keyframes ln-slide{ from{ transform:translateY(16px) } to{ transform:translateY(0) } }
@media (prefers-reduced-motion: reduce){ .ln-card, .ln-overlay, .ln-dialog{ transition:none; animation:none; } }

@media (max-width:640px){
  .ln-root{ font-size:16px; }
  .ln-grid{ grid-template-columns:1fr; }
  .ln-card-wide{ grid-column:auto; }
  .ln-two{ grid-template-columns:1fr; }
  .ln-overlay{ align-items:flex-end; }
  .ln-dialog{ max-height:90vh; }
}
@media (min-width:641px){
  .ln-overlay{ align-items:center; padding:24px; }
  .ln-dialog{ border-radius:14px; }
}
`;
