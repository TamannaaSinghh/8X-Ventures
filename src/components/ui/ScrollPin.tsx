"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

/**
 * Holds a section still while the list inside it is read.
 *
 * The section stands taller than the screen — a screen's worth to look at, and
 * a runway below it — and the part you look at is `position: sticky`, so it
 * parks against the top of the viewport while the runway scrolls past behind
 * it. The page has not stopped; what has stopped is this section leaving.
 * Whatever comes next cannot arrive until the runway is spent, which is the
 * point: the list gets read before anything else is offered.
 *
 * `--pin-u` is how far through that runway the reader is, 0 to 1, written to
 * the section each frame. The list reads it and nothing else, so it advances
 * on the page's own scroll, from wherever the pointer happens to be, by wheel
 * or touch or keyboard or a dragged scrollbar alike. It replaces a list the
 * reader had to find with the pointer and scroll on its own — and, where that
 * list looped, one that took the page hostage when they did: an endless list
 * has no last item to hand the scroll back from.
 *
 * `data-pinned` is what turns the arrangement on, and it is set here, after
 * mount, and only when motion is welcome. Without it the section is an
 * ordinary one at its artboard height and the list shows every line at once
 * with the middle one lit — which is the artboard's own composition, and so
 * what reduced motion, a failed hydration and no JavaScript at all each get.
 * Nothing is ever stranded behind a scroll that cannot happen.
 */
export function ScrollPin({
  labelledBy,
  className,
  stageClassName,
  sceneTilt = false,
  children,
}: {
  /** `id` of the heading the section is named by. */
  labelledBy: string;
  /** The section's own class — it carries the runway height. */
  className?: string;
  /** The sticky screenful's own class, for a background or a scrim. */
  stageClassName?: string;
  /** Lend the pointer's position to artwork inside, as `[data-tilt]` bands do. */
  sceneTilt?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  /* `useReducedMotion` reports `true` until it has had a chance to ask, so
     this is false through SSR and first paint and turns on only once the
     preference is known — which is exactly when the pin should appear. */
  const pinned = !useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !pinned) return;

    let raf = 0;
    let running = false;

    /* Read on a frame loop rather than from scroll events, as the parallax
       band does: scroll events arrive in coarse, uneven jumps, and a list
       stepped straight from them stutters where it should glide. The loop only
       runs while the section is on screen. */
    const frame = () => {
      /* The runway is everything the section has beyond the screenful that is
         pinned — measured rather than assumed, so the CSS owns the distance.
         `-top` is how much of it has been spent. */
      const runway = el.offsetHeight - window.innerHeight;
      if (runway > 0) {
        const spent = Math.min(Math.max(-el.getBoundingClientRect().top, 0), runway);
        el.style.setProperty("--pin-u", (spent / runway).toFixed(4));
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
    };

    const observer = new IntersectionObserver(([entry]) =>
      entry.isIntersecting ? start() : stop(),
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      stop();
      el.style.removeProperty("--pin-u");
    };
  }, [pinned]);

  return (
    <section
      ref={ref}
      aria-labelledby={labelledBy}
      data-pinned={pinned ? "" : undefined}
      className={cn("pin-section relative", className)}
    >
      {/* The screenful that parks. `overflow` lives here rather than on the
          section, where it would make the section a scroll container of its
          own and quietly break the sticky inside it. */}
      <div
        data-tilt={sceneTilt ? "scene" : undefined}
        className={cn("pin-stage overflow-hidden", stageClassName)}
      >
        {children}
      </div>
    </section>
  );
}
