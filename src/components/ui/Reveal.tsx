"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  /** Render as something other than a <div> (e.g. "section", "li", "h2"). */
  as?: ElementType;
  /** Stagger, in milliseconds. */
  delay?: number;
  variant?: "up" | "scale";
  className?: string;
  /** Forwarded so a revealed element can still be an aria-labelledby target. */
  id?: string;
};

/**
 * Fades content in as it scrolls into view.
 *
 * The hidden start state lives behind an `html.js-reveal` class that is only
 * set when scripting is available (see `layout.tsx`), so the page is fully
 * readable without JavaScript. `prefers-reduced-motion: reduce` neutralises
 * the whole effect in CSS.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  variant = "up",
  className,
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    // Failsafe: anything already at or above the fold is shown immediately,
    // so content can never be stranded at opacity 0 if the observer misfires.
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add("is-visible");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      data-reveal={variant === "scale" ? "scale" : ""}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
