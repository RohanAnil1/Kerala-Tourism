"use client";

import { PageIntro } from "@/components/editorial/Primitives";

export default function Error() {
  return (
    <>
      <PageIntro
        label="A MOMENT TO PAUSE"
        title="The road needs a moment."
        description="We couldn't load this page. Reload to get the latest version, or return to the Kerala collection."
      />
      <div className="wrap pb-32 flex gap-4 flex-wrap">
        {/* Resetting the React boundary reuses a stale client after a new build.
            A document reload also fetches the current scripts and route data. */}
        <button className="button" onClick={() => window.location.reload()}>
          Reload page
        </button>
        <a href="/" className="button button-outline">
          Return to Kerala
        </a>
      </div>
    </>
  );
}
