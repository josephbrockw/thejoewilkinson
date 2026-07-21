/** CSS specific to the Planning Notebook page, appended after SHARED_STYLES. */
export const PLANNING_STYLES = `
.ln-two-tight{ display:grid; grid-template-columns:1fr 1fr; gap:14px; align-items:start; }

/* year view */
.ln-year{ display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; }
.ln-mo{ background:var(--paper2); border:1px solid var(--hair); border-radius:6px; padding:10px 12px; }
.ln-mo h4{ font-size:1.02rem; margin-bottom:5px; }
.ln-mo-k{ font-family:var(--mono); font-size:9px; letter-spacing:.1em; text-transform:uppercase; color:var(--accent); font-weight:600; margin:6px 0 2px; }
.ln-mo ul{ margin:0; padding-left:15px; font-size:.85rem; }
.ln-mo li{ margin-bottom:2px; }

/* quarter */
.ln-qwrap{ display:grid; gap:12px; }
.ln-learn{ display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-top:4px; }
.ln-q-h{ font-family:var(--disp); color:var(--green); font-weight:560; font-size:1.02rem; margin:0 0 4px; }
.ln-rev{ padding:8px 0; border-bottom:1px solid #E4DEC9; }
.ln-rev:last-of-type{ border-bottom:none; }
.ln-rev h4{ font-size:.98rem; margin-bottom:4px; }
.ln-rev-line{ display:flex; gap:8px; font-size:.86rem; margin-bottom:3px; }
.ln-rev-k{ font-family:var(--mono); font-size:9px; letter-spacing:.05em; text-transform:uppercase; font-weight:600; flex:none; width:48px; padding-top:2px; }
.ln-rev-k.pos{ color:var(--green); }
.ln-rev-k.neg{ color:var(--accent); }
.ln-rev-k.car{ color:var(--ink-soft); }

/* north stars */
.ln-stars{ background:var(--paper2); border:1px solid var(--hair); border-radius:6px; padding:10px 14px; margin-bottom:10px; }
.ln-stars ul{ margin:4px 0 0; padding-left:18px; font-size:.95rem; }
.ln-stars li{ margin-bottom:2px; }

/* routine checklist */
.ln-routine{ margin-top:18px; background:var(--paper2); border:1px solid var(--hair); border-left:3px solid var(--green); border-radius:0 6px 6px 0; padding:12px 16px 12px 18px; }
.ln-routine-h{ font-family:var(--mono); font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:var(--green); font-weight:600; margin-bottom:8px; }
.ln-routine ul{ list-style:none; margin:0; padding:0; }
.ln-routine li{ position:relative; padding:5px 0 5px 26px; font-size:.95rem; border-bottom:.8px solid #E4DEC9; }
.ln-routine li:last-child{ border-bottom:none; }
.ln-routine li::before{ content:"\\2610"; position:absolute; left:0; top:3px; color:var(--accent); font-size:15px; line-height:1; }

/* monthly spread */
.ln-spread{ display:grid; grid-template-columns:1fr 1fr; gap:14px; }
.ln-page{ background:var(--paper2); border:1px solid var(--hair); border-radius:6px; padding:12px 14px;
  background-image:radial-gradient(var(--hair) 0.6px, transparent 0.6px); background-size:11px 11px; background-position:7px 26px; }
.ln-page-h{ font-family:var(--mono); font-size:10px; letter-spacing:.1em; text-transform:uppercase; color:var(--accent); font-weight:600; margin-bottom:8px; }
.ln-cal{ width:100%; border-collapse:collapse; font-size:12px; }
.ln-cal th{ font-family:var(--mono); font-size:8.5px; letter-spacing:.05em; text-transform:uppercase; color:var(--ink-soft); font-weight:600; text-align:left; padding:2px 5px; border-bottom:1px solid var(--hair); }
.ln-cal th.h, .ln-cal td.h{ text-align:center; width:22px; padding-left:0; padding-right:0; }
.ln-cal td{ padding:5px 5px; border-bottom:1px solid #E4DEC9; vertical-align:top; }
.ln-cal .num{ font-family:var(--mono); font-weight:600; width:22px; }
.ln-cal .dow{ font-family:var(--mono); color:var(--ink-soft); font-size:10.5px; width:34px; }
.ln-cal .ev{ font-size:11.5px; }
.ln-cal .ln-dot{ color:var(--green); }
.ln-cal .ln-dot-off{ color:var(--hair); }
.ln-cal tr.wk td{ border-top:1.6px solid var(--green); }
.ln-wk{ list-style:none; margin:0; padding:0; }
.ln-wk > li{ margin-bottom:12px; }
.ln-wk h4{ font-family:var(--mono); font-size:10px; letter-spacing:.06em; text-transform:uppercase; color:var(--green); margin:0 0 4px; }
.ln-wk ul{ margin:0; padding-left:16px; font-size:.9rem; }
.ln-wk ul li{ margin-bottom:2px; }
.ln-subnote{ font-size:.8rem; color:var(--ink-soft); margin-top:8px; font-style:italic; }

/* daily */
.ln-day{ background:var(--paper2); border:1px solid var(--hair); border-radius:6px; padding:14px 16px;
  background-image:radial-gradient(var(--hair) 0.6px, transparent 0.6px); background-size:11px 11px; background-position:8px 40px; }
.ln-day-h{ font-size:1.05rem; margin-bottom:8px; }
.ln-log{ list-style:none; margin:0; padding:0; }
.ln-log li{ display:grid; grid-template-columns:16px 50px 1fr; gap:8px; align-items:baseline; padding:3px 0; font-size:.92rem; }
.ln-sig{ font-family:var(--mono); font-weight:600; text-align:center; color:var(--ink); }
.ln-time{ font-family:var(--mono); font-size:12px; color:var(--accent); }
.ln-desc-note{ color:var(--ink-soft); font-style:italic; }

/* daily anatomy */
.ln-anat{ display:grid; grid-template-columns:auto auto 1fr; gap:2px 16px; align-items:end; background:var(--paper2); border:1px solid var(--hair); border-radius:6px; padding:16px 18px; }
.ln-anat .val{ font-family:var(--mono); font-size:1.15rem; font-weight:600; }
.ln-anat .val.t{ color:var(--accent); }
.ln-anat .val.d{ font-family:var(--body); font-weight:400; font-size:1rem; }
.ln-anat .lab{ font-family:var(--mono); font-size:9px; letter-spacing:.08em; text-transform:uppercase; color:var(--ink-soft); border-top:1px solid var(--hair); padding-top:4px; margin-top:4px; }

@media (max-width:640px){
  .ln-two-tight{ grid-template-columns:1fr; }
  .ln-year{ grid-template-columns:1fr; }
  .ln-learn{ grid-template-columns:1fr; }
  .ln-spread{ grid-template-columns:1fr; }
}
`;
