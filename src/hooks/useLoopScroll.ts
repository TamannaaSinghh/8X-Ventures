"use client";

import { useEffect, useRef } from "react";

/**
 * Endless scrolling for a list the user drives themselves.
 *
 * The viewport holds `copies` identical copies of the list laid end to end and
 * parks on the second one, so there is a full copy of runway in each direction.
 * Whenever the scroll position leaves that copy it is moved back by exactly one
 * copy's height — the content repeats with that period, so the correction lands
 * on an identical frame and is invisible. Scrolling past the last line arrives
 * back at the first, in either direction, and the viewport never reaches an end
 * to bump against.
 *
 * `progressRef` is given the position within a copy as `--loop-u`, a number
 * from 0 to 1, for anything that has to track the scroll — the mentor rail's
 * thumb reads it. Set on an element rather than in React state so the value can
 * update every frame without re-rendering the list.
 */
export function useLoopScroll(copies: number) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    /** One copy of the list. Read live, so a resize or a late font corrects it. */
    const copyHeight = () => el.scrollHeight / copies;

    const settle = () => {
      const h = copyHeight();
      if (h <= 0) return;

      // Park in the second copy: [h, 2h) has a copy of slack either side, so a
      // fast flick never runs into the scroller's own top or bottom.
      const raw = el.scrollTop;
      const wrapped = h + ((((raw - h) % h) + h) % h);
      if (Math.abs(wrapped - raw) > 0.5) el.scrollTop = wrapped;

      progressRef.current?.style.setProperty(
        "--loop-u",
        (((wrapped - h) / h) || 0).toFixed(4),
      );
    };

    el.scrollTop = copyHeight();
    settle();

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        settle();
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [copies]);

  return { viewportRef, progressRef };
}
