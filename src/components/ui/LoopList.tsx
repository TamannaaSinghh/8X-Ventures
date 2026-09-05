"use client";

import { useLoopScroll } from "@/hooks/useLoopScroll";

/**
 * Copies of the list laid end to end down the track. `useLoopScroll` parks on
 * the second, leaving a copy of runway either way before it wraps.
 */
const COPIES = 4;

/** Blocks in the rail — enough to keep a thumb in view across the wrap. */
const RAIL_BLOCKS = 3;

/**
 * A list of bands on a scroll of its own, with a rail beside it.
 *
 * The design uses this device twice — the team page's mentor bands and LP
 * Day's "deep-tech needs more than capital" — so it lives here rather than in
 * either page. The window is one line per item, so the band keeps the
 * footprint a static list would have, and the reader moves it themselves,
 * looping without end in either direction.
 *
 * The emphasis comes from `marquee-fade-y`, a mask that floors at 0.28 rather
 * than at transparent: whichever line is passing the centre is lit and the
 * rest fall away either side. The rail's thumb follows the same scroll through
 * `--loop-u`, travelling down as the lines travel up.
 *
 * Nothing is hidden — every line is one turn away — and nothing moves unless
 * the reader moves it, so there is no motion to opt out of.
 */
export function LoopList({
  items,
  activeIndex,
  label,
}: {
  items: readonly string[];
  /** Where the frame's still frame sits, and where the rail's thumb starts. */
  activeIndex: number;
  /** Names the scrollable group, e.g. "Our journey". */
  label: string;
}) {
  const { viewportRef, progressRef } = useLoopScroll(COPIES);

  const thumbVars = {
    "--rail-index": activeIndex,
    "--rail-count": items.length,
  } as React.CSSProperties;

  return (
    <div
      ref={progressRef}
      className="tm-rail-wrap"
      style={{ "--tm-count": items.length } as React.CSSProperties}
    >
      <span aria-hidden="true" className="tm-rail">
        <span className="tm-rail-track">
          {Array.from({ length: RAIL_BLOCKS }, (_, block) => (
            <span key={block} className="tm-rail-block">
              <span className="tm-rail-thumb" style={thumbVars} />
            </span>
          ))}
        </span>
      </span>

      <div
        ref={viewportRef}
        tabIndex={0}
        role="group"
        aria-label={`${label} — scroll through the list`}
        className="tm-mentors-window loop-scroll marquee-fade-y"
      >
        {Array.from({ length: COPIES }, (_, copy) => (
          <ol
            key={copy}
            /* One copy carries the meaning; the rest are scenery. */
            aria-hidden={copy > 0 ? "true" : undefined}
            className="tm-mentors text-white"
          >
            {items.map((item) => (
              <li key={item} className="tm-mentor">
                {item}
              </li>
            ))}
          </ol>
        ))}
      </div>
    </div>
  );
}
