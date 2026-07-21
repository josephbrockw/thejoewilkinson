import { type ReactNode } from "react";

/** One card in a notebook's "five sections" grid; its `example` shows in the modal. */
export type NotebookCard = {
  id: string;
  tag: string;
  title: string;
  blurb: string;
  bullets: string[];
  wide?: boolean;
  example: ReactNode;
};
