"use client";

import { useCallback, useState } from "react";

type Options = {
  length: number;
  initialIndex?: number;
  /** Wrap past the ends instead of clamping. */
  loop?: boolean;
};

export type Carousel = {
  index: number;
  goTo: (i: number) => void;
  next: () => void;
  prev: () => void;
  /** Attach to the carousel viewport for Left/Right/Home/End support. */
  onKeyDown: (e: React.KeyboardEvent) => void;
  /** Signed distance from the active slide, honouring loop wrap-around. */
  offsetOf: (i: number) => number;
};

/**
 * Index management for the site's carousels.
 *
 * Deliberately does NOT auto-advance: an auto-rotating carousel triggers
 * WCAG 2.2.2 (Pause, Stop, Hide) and 2.3.x concerns, and every carousel in
 * this design is content the user chooses to browse.
 */
export function useCarousel({ length, initialIndex = 0, loop = true }: Options): Carousel {
  const [index, setIndex] = useState(initialIndex);

  const goTo = useCallback(
    (i: number) => {
      if (length === 0) return;
      setIndex(loop ? ((i % length) + length) % length : Math.min(Math.max(i, 0), length - 1));
    },
    [length, loop],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          prev();
          break;
        case "ArrowRight":
          e.preventDefault();
          next();
          break;
        case "Home":
          e.preventDefault();
          goTo(0);
          break;
        case "End":
          e.preventDefault();
          goTo(length - 1);
          break;
        default:
          break;
      }
    },
    [goTo, length, next, prev],
  );

  /**
   * Distance from the active slide. With `loop`, a slide at the far end of
   * the list reads as -1 rather than +(length-1) so the visual ring stays
   * continuous.
   */
  const offsetOf = useCallback(
    (i: number) => {
      let d = i - index;
      if (!loop) return d;
      if (d > length / 2) d -= length;
      if (d < -length / 2) d += length;
      return d;
    },
    [index, length, loop],
  );

  return { index, goTo, next, prev, onKeyDown, offsetOf };
}
