"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
  /** Re-runs the count when this changes (e.g. the active stat index). */
  runKey?: string | number;
};

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Counts a figure up once it scrolls into view.
 *
 * The digits are written straight to the DOM rather than held in state: the
 * server renders the final value, so it is correct before hydration, with
 * JavaScript disabled, and under `prefers-reduced-motion` — and there is no
 * render-per-frame during the count.
 *
 * The ticking text is hidden from assistive tech; a static string carrying the
 * final value is exposed instead, so a screen reader announces "₹400+Cr" once
 * rather than every intermediate frame.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  durationMs = 1600,
  className,
  runKey,
}: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || typeof IntersectionObserver === "undefined") return;

    const format = (n: number) => `${prefix}${n.toLocaleString("en-IN")}${suffix}`;

    let raf = 0;
    let cancelled = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();

        el.textContent = format(0);
        const start = performance.now();
        const tick = (now: number) => {
          if (cancelled) return;
          const t = Math.min((now - start) / durationMs, 1);
          el.textContent = format(Math.round(easeOutExpo(t) * value));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      el.textContent = format(value);
    };
  }, [value, prefix, suffix, durationMs, reduced, runKey]);

  const final = `${prefix}${value.toLocaleString("en-IN")}${suffix}`;

  return (
    <span className={className}>
      <span ref={ref} aria-hidden="true">
        {final}
      </span>
      <span className="sr-only-8x">{final}</span>
    </span>
  );
}
