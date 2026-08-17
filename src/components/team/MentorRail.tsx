"use client";

import { useEffect, useRef, useState } from "react";
import { teamMentors } from "@/content/team";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

/**
 * The five mentor bands, with the highlight — and the lit segment of the rule
 * beside them — stepping from one to the next as the section crosses the
 * viewport. The artboard can only show a still frame and lights the third.
 *
 * As with `/about`'s philosophy list, nothing is hidden: all five are always
 * rendered and readable, the highlight is emphasis only. Under
 * `prefers-reduced-motion` it rests on the artboard's default instead of
 * tracking the scroll.
 */
export function MentorRail() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const [index, setIndex] = useState<number>(teamMentors.activeIndex);

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
        const travelled = window.innerHeight - r.top;
        const span = window.innerHeight * 0.85 + r.height;
        const p = Math.min(Math.max(travelled / span, 0), 0.9999);
        setIndex(Math.floor(p * teamMentors.items.length));
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

  const active = reduced ? teamMentors.activeIndex : index;

  return (
    <div className="tm-rail-wrap">
      <span aria-hidden="true" className="tm-rail">
        <span
          className="tm-rail-thumb"
          style={
            {
              "--rail-index": active,
              "--rail-count": teamMentors.items.length,
            } as React.CSSProperties
          }
        />
      </span>

      <ol ref={ref} className="tm-mentors">
        {teamMentors.items.map((item, i) => (
          <li
            key={item}
            aria-current={i === active ? "step" : undefined}
            className={cn(
              "tm-mentor transition-[color] duration-500 ease-[var(--ease-out-soft)]",
              i === active ? "text-white" : "text-white/32",
            )}
          >
            {item}
          </li>
        ))}
      </ol>
    </div>
  );
}
