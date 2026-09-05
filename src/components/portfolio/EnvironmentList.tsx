"use client";

import { useLoopScroll } from "@/hooks/useLoopScroll";

/**
 * Copies of the list laid end to end down the track. `useLoopScroll` parks on
 * the second, leaving a copy of runway either way before it wraps.
 */
const COPIES = 4;

/**
 * The environments in the "Why we invested" band, on a scroll of their own.
 *
 * The same mechanism as `/about`'s "How we work": a three-line window the
 * reader moves themselves, looping without end in either direction — past the
 * last environment is the first again. Nothing moves unless the reader moves
 * it, so there is no motion to opt out of and no auto-advance to fight.
 *
 * The emphasis comes from `marquee-fade-y`, the same mask that section uses:
 * whichever line is passing the centre is lit and its neighbours are dimmed,
 * with no per-line state to keep in step with the scroll. Nothing is hidden —
 * every environment is one turn away.
 *
 * The frame draws five environments at once with the third lit. It is a still,
 * so it cannot show the turn; three at a time is what the mask is cut for, and
 * the lit centre is the frame's own emphasis.
 */
export function EnvironmentList({
  items,
  label,
}: {
  items: readonly string[];
  /** Names the list for the group, e.g. "Where Neuralzome has to work". */
  label: string;
}) {
  const { viewportRef } = useLoopScroll(COPIES);

  return (
    /* The rule belongs to the window, not to the track, so it stays put while
       the environments travel past it. */
    <div className="pd-env-rail">
      <div
        ref={viewportRef}
        tabIndex={0}
        role="group"
        aria-label={`${label} — scroll through the list`}
        className="loop-scroll marquee-fade-y pd-env-window"
      >
        {Array.from({ length: COPIES }, (_, copy) => (
          <ul
            key={copy}
            /* One copy carries the meaning; the rest are scenery. */
            aria-hidden={copy > 0 ? "true" : undefined}
            className="pd-env"
          >
            {items.map((item) => (
              <li key={item} className="pd-env-item">
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
