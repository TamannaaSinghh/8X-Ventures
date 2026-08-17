"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

type Props = {
  words: readonly string[];
  /** Which word to show first, and to rest on when motion is reduced. */
  startIndex?: number;
  intervalMs?: number;
  /** Owned by the parent so a pause control can sit outside the hidden text. */
  paused?: boolean;
  className?: string;
};

/**
 * Swaps one word for the next inside a sentence.
 *
 * Purely visual: the element is `aria-hidden`, and the sentence around it
 * exposes a static version naming every word, so assistive tech gets the whole
 * meaning at once instead of a phrase that changes mid-read.
 *
 * The slot's width is measured from hidden copies of each word and animated,
 * so the words either side glide rather than jump, and nothing reflows.
 * Rotation stops entirely under `prefers-reduced-motion`, resting on
 * `startIndex`.
 */
export function RotatingWord({
  words,
  startIndex = 0,
  intervalMs = 2400,
  paused = false,
  className,
}: Props) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(startIndex);
  const [width, setWidth] = useState<number | null>(null);

  const sizersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const hostRef = useRef<HTMLSpanElement>(null);

  const running = !reduced && !paused;

  /* Derived rather than stored, so reduced motion always rests on the
     design's word without a state write inside an effect. */
  const shown = reduced ? startIndex : index;

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), intervalMs);
    return () => window.clearInterval(id);
  }, [running, intervalMs, words.length]);

  /* Measure the active word, and re-measure when the fluid type size changes. */
  useLayoutEffect(() => {
    const measure = () => {
      const el = sizersRef.current[shown];
      // rounded up so sub-pixel measurement never clips the word's last glyph
      if (el) setWidth(Math.ceil(el.getBoundingClientRect().width));
    };
    measure();

    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    const host = hostRef.current;
    if (host) ro.observe(host);
    for (const s of sizersRef.current) if (s) ro.observe(s);
    return () => ro.disconnect();
  }, [shown, words]);

  return (
    <span
      ref={hostRef}
      aria-hidden="true"
      className={cn(
        "relative inline-block overflow-visible align-baseline",
        "transition-[width] duration-500 ease-[var(--ease-out-expo)]",
        className,
      )}
      style={width != null ? { width: `${width}px` } : undefined}
    >
      {/* Hidden copies, used only to measure each word at the current size. */}
      <span className="pointer-events-none invisible absolute top-0 left-0 block h-0 overflow-hidden">
        {words.map((word, i) => (
          <span
            key={word}
            ref={(el) => {
              sizersRef.current[i] = el;
            }}
            /* `w-fit` matters: as plain blocks they would each stretch to the
               widest sibling and every word would measure the same. */
            className="block w-fit whitespace-nowrap"
          >
            {word}
          </span>
        ))}
      </span>

      <span
        key={words[shown]}
        className={cn("inline-block whitespace-nowrap", !reduced && "animate-word-in")}
      >
        {words[shown]}
      </span>
    </span>
  );
}
