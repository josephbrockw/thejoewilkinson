"use client";

/**
 * The tappable card grid and its worked-example modal — the only stateful piece
 * of the notebook design system, so it stays a client island.
 */

import { useEffect, useRef, useState } from "react";
import { type NotebookCard } from "./types";

/** The worked-example modal for a card. Traps Escape and locks body scroll. */
function Modal({ item, onClose }: { item: NotebookCard; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="ln-overlay" onClick={onClose}>
      <div
        className="ln-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ln-dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ln-dialog-head">
          <div>
            <div className="ln-dialog-eyebrow">{item.tag} &#183; example</div>
            <h3 id="ln-dialog-title">{item.title.replace(/^\d+\s·\s/, "")}</h3>
          </div>
          <button ref={closeRef} className="ln-close" onClick={onClose} aria-label="Close example">
            &#10005;
          </button>
        </div>
        <div className="ln-dialog-body">{item.example}</div>
      </div>
    </div>
  );
}

/**
 * The grid of tappable cards, each opening its example in a modal.
 * `greenTags` is the set of `tag` values shown in green (the rest use the rust
 * accent) — each notebook labels its front/back sections differently.
 */
export function CardGrid({ items, greenTags }: { items: NotebookCard[]; greenTags: Set<string> }) {
  const [open, setOpen] = useState<NotebookCard | null>(null);

  return (
    <>
      <div className="ln-grid">
        {items.map((c) => (
          <button
            key={c.id}
            className={"ln-card" + (c.wide ? " ln-card-wide" : "")}
            onClick={() => setOpen(c)}
            aria-haspopup="dialog"
          >
            <span className={"ln-tag" + (greenTags.has(c.tag) ? "" : " ln-tag-b")}>
              {c.tag}
            </span>
            <h3>{c.title}</h3>
            <p className="ln-card-blurb">{c.blurb}</p>
            {c.bullets.length > 0 && (
              <ul>
                {c.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}
            <span className="ln-view">View example &#8594;</span>
          </button>
        ))}
      </div>
      {open && <Modal item={open} onClose={() => setOpen(null)} />}
    </>
  );
}
