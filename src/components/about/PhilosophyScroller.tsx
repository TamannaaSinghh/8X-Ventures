"use client";

import { useEffect, useRef, useState } from "react";
import { aboutPhilosophy } from "@/content/about";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

/**
 * The three principles, with the highlight stepping from one to the next as the
 * section moves through the viewport — the artboard shows the middle one lit
 * and the two either side dimmed.
 *
 * Nothing is hidden: all three lines are always rendered and readable, the
 * highlight is emphasis only. So there is no content behind the scroll, and
 * under `prefers-reduced-motion` the highlight simply rests on the artboard's
 * default rather than tracking the scroll.
 */
export function PhilosophyScroller() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  // annotated: `activeIndex` is a literal type through `as const`
  const [index, setIndex] = useState<number>(aboutPhilosophy.activeIndex);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = el.getBoundingClientRect();
        // 0 when the list first meets the bottom of the viewport, 1 when it
        // has travelled a full viewport height past it
        const travelled = window.innerHeight - r.top;
        const span = window.innerHeight * 0.85 + r.height;
        const p = Math.min(Math.max(travelled / span, 0), 0.9999);
        setIndex(Math.floor(p * aboutPhilosophy.items.length));
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  const active = reduced ? aboutPhilosophy.activeIndex : index;

  return (
    <ol ref={ref} className="relative border-l-[8px] border-brand-sky pl-[4.4%]">
      {aboutPhilosophy.items.map((item, i) => (
        <li
          key={item}
          aria-current={i === active ? "step" : undefined}
          className={cn(
            "text-[length:clamp(1.75rem,4.42vw,5.3rem)] leading-[1.22] font-bold tracking-[0.005em] whitespace-nowrap uppercase",
            "transition-[color,opacity] duration-500 ease-[var(--ease-out-soft)]",
            i === active ? "text-brand-sky" : "text-brand-sky/28",
          )}
        >
          {item}
        </li>
      ))}
    </ol>
  );
}
