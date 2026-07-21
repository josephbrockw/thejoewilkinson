/** CSS specific to the Learning Notebook page, appended after SHARED_STYLES. */
export const LEARNING_STYLES = `
.ln-subhead{ font-size:1.15rem; margin:22px 0 6px; }
.ln-grid-2{ margin-top:8px; }

.ln-callout{ border-left:3px solid var(--accent); background:var(--paper2); padding:12px 16px; margin:16px 0 0; border-radius:0 4px 4px 0; }
.ln-callout .ln-k{ display:block; font-family:var(--mono); font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:var(--accent); font-weight:600; margin-bottom:4px; }
.ln-callout p{ margin:0; font-size:.95rem; }

.ln-marks{ display:grid; grid-template-columns:1fr 1fr; gap:8px 14px; }
.ln-mark{ display:flex; align-items:center; gap:10px; }
.ln-mark-g{ font-family:var(--mono); font-weight:600; font-size:20px; width:22px; text-align:center; color:var(--ink); }
.ln-mark-l{ font-size:.92rem; }

.ln-reg{ width:100%; border-collapse:collapse; font-size:13px; }
.ln-reg th{ text-align:left; font-family:var(--mono); font-size:10px; letter-spacing:.1em; text-transform:uppercase; color:var(--ink-soft); border-bottom:1px solid var(--hair); padding:6px 8px; }
.ln-reg td{ padding:7px 8px; border-bottom:1px solid var(--hair); }
.ln-reg td:nth-child(2),.ln-reg td:nth-child(3){ font-family:var(--mono); font-size:12px; }
.ln-closed td{ color:var(--ink-soft); text-decoration:line-through; text-decoration-color:var(--ink-soft); }
.ln-closed-tag{ font-family:var(--mono); font-weight:600; color:var(--accent); text-decoration:none; display:inline-block; margin-left:4px; }

.ln-thread{ border:1px solid var(--hair); border-radius:8px; overflow:hidden; background:var(--paper2); }
.ln-thread-bar{ display:flex; justify-content:space-between; align-items:center; background:var(--green); color:#E9E5D8; font-family:var(--mono); font-size:12px; font-weight:600; letter-spacing:.04em; padding:9px 14px; }
.ln-thread-body{ display:grid; grid-template-columns:1fr 128px; }
.ln-thread-col{ padding:12px 14px; font-size:.92rem; }
.ln-thread-col p{ margin:0 0 9px; padding-bottom:9px; border-bottom:1px solid var(--hair); }
.ln-thread-col p:last-child{ border-bottom:none; margin-bottom:0; }
.ln-dim{ color:var(--ink-soft); font-family:var(--mono); font-size:11px; }
.ln-thread-margin{ border-left:1px solid #D9B4AC; padding:12px 12px; display:flex; flex-direction:column; gap:16px; font-family:var(--mono); font-weight:600; font-size:15px; }
.ln-thread-margin .ln-mm{ font-family:var(--mono); font-weight:600; font-size:8.5px; letter-spacing:.1em; color:var(--accent); }
.ln-thread-foot{ border-top:1px solid var(--hair); padding:10px 14px; font-family:var(--mono); font-size:11.5px; color:var(--ink); background:var(--card); }
.ln-thread-foot b{ color:var(--green); }

@media (max-width:640px){
  .ln-marks{ grid-template-columns:1fr; }
  .ln-thread-body{ grid-template-columns:1fr 104px; }
}
`;
