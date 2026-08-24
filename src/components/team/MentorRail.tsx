"use client";

import { teamMentors } from "@/content/team";
import { useLoopScroll } from "@/hooks/useLoopScroll";

/**
 * Copies of the mentor list laid end to end down the track. `useLoopScroll`
 * parks on the second, leaving a copy of runway either way before it wraps.
 */
const COPIES = 4;

/** Blocks in the rail — enough to keep a thumb in view across the wrap. */
const RAIL_BLOCKS = 3;

/**
 * The five mentor bands, on a scroll of their own.
 *
 * This used to read `window.scroll` and step the highlight as the section
 * crossed the viewport, which tied its pace to the page's. It is now the
 * reader's to move, the way `/about`'s philosophy list is: a window one line
 * per mentor tall — so the band keeps the footprint the static list had — that
 * they scroll themselves, looping without end in either direction.
 *
 * The emphasis comes from `marquee-fade-y`, a mask that floors at 0.28 rather
 * than at transparent: whichever name is passing the centre is lit and the rest
 * fall away either side. The rail's thumb follows the same scroll through
 * `--loop-u`, travelling down as the names travel up.
 *
 * Nothing is hidden — every mentor is one turn away — and nothing moves unless
 * the reader moves it, so there is no motion to opt out of.
 */
export function MentorRail() {
  const { viewportRef, progressRef } = useLoopScroll(COPIES);

  const thumbVars = {
    "--rail-index": teamMentors.activeIndex,
    "--rail-count": teamMentors.items.length,
  } as React.CSSProperties;

  return (
    <div
      ref={progressRef}
      className="tm-rail-wrap"
      style={{ "--tm-count": teamMentors.items.length } as React.CSSProperties}
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
        aria-label="Our journey — scroll through the mentor bands"
        className="tm-mentors-window loop-scroll marquee-fade-y"
      >
        {Array.from({ length: COPIES }, (_, copy) => (
          <ol
            key={copy}
            /* One copy carries the meaning; the rest are scenery. */
            aria-hidden={copy > 0 ? "true" : undefined}
            className="tm-mentors text-white"
          >
            {teamMentors.items.map((item) => (
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
