import { type ReactNode } from "react";
import { SHARED_STYLES } from "./_shared";

/**
 * Route layout shared by every notebook page (learning, planning, and any future
 * notebook under /notebooks). Provides the .ln-root scope, injects the shared
 * stylesheet once, and wraps each page in the centered .ln-wrap column. Each page
 * injects only its own page-specific CSS on top of this.
 */
export default function NotebooksLayout({ children }: { children: ReactNode }) {
  return (
    <div className="ln-root">
      <style dangerouslySetInnerHTML={{ __html: SHARED_STYLES }} />
      <main className="ln-wrap">{children}</main>
    </div>
  );
}
