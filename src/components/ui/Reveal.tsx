"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  /** Optional: a revealed element is sometimes a rule or a spacer. */
  children?: ReactNode;
  /** Render as something other than a <div> (e.g. "section", "li", "h2"). */
  as?: ElementType;
  /** Stagger, in milliseconds. Overrides the automatic cascade. */
  delay?: number;
  variant?: "up" | "scale" | "card";
  className?: string;
  /** Forwarded so a revealed element can still be an aria-labelledby target. */
  id?: string;
  /** Forwarded so a revealed element can keep its own role (a list, say). */
  role?: string;
  /**
   * Any `data-*` attribute, passed through to the rendered element — a card
   * that both rises in on scroll and leans under the pointer needs its
   * `data-tilt` on the same element this renders.
   */
  [key: `data-${string}`]: unknown;
};

/** Milliseconds between neighbours that come into view together. */
const STAGGER = 115;

/** Where the cascade stops lengthening, so a large batch never crawls in.
 *  Past this every remaining block shares the last step and arrives together,
 *  so it wants to be high enough that a section's blocks each get their own. */
const MAX_STEPS = 7;

/** Elements whose call site chose its own delay; that cascade is deliberate. */
const staged = new WeakSet<Element>();

let observer: IntersectionObserver | null = null;

/* Failsafe bookkeeping. Content may never be stranded at opacity 0, but the
   only thing that can strand it is an observer that does not report at all —
   so that is what is watched for, once for the page. Anything narrower ends up
   revealing blocks the reader has not reached, which empties every section
   below the fold before they arrive at it. */
const waiting = new Set<Element>();
let reported = false;
let guard = 0;

function reveal(el: Element, step: number) {
  if (step > 0 && !staged.has(el)) {
    (el as HTMLElement).style.setProperty("--reveal-delay", `${step}ms`);
  }
  waiting.delete(el);
  el.classList.add("is-visible");
}

/**
 * One observer for every revealed block on the page, rather than one each.
 *
 * Sharing it is what makes the cascade possible: everything that crosses the
 * threshold on the same frame arrives in a single callback, which is exactly
 * the set that would otherwise land at once. Ordering that set and spacing it
 * out turns a slab appearing all together into a block settling after the one
 * above it.
 */
function sharedObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      reported = true;
      const arrived = entries.filter((entry) => entry.isIntersecting);
      if (arrived.length === 0) return;

      /* Down the page and then across it, so the cascade follows the reading
         order rather than whatever order the observer reported in. */
      arrived.sort(
        (a, b) =>
          a.boundingClientRect.top - b.boundingClientRect.top ||
          a.boundingClientRect.left - b.boundingClientRect.left,
      );

      arrived.forEach((entry, i) => {
        reveal(entry.target, Math.min(i, MAX_STEPS) * STAGGER);
        observer?.unobserve(entry.target);
      });
    },
    /* Triggered a little nearer the lower edge than it reads as finished at:
       the block starts coming up while it is still arriving on screen, so by
       the time it is somewhere you would look at it, it has settled. Waiting
       until it is well inside the viewport is what makes a reveal feel like it
       is chasing the scroll. */
    { rootMargin: "0px 0px -4% 0px", threshold: 0.02 },
  );

  return observer;
}

/**
 * Fades content in as it scrolls into view, cascading anything that arrives
 * together.
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
  role,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (delay) staged.add(el);

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    const obs = sharedObserver();
    waiting.add(el);
    obs.observe(el);

    /* One check for the whole page, not one per block: if the observer has
       never reported by now it is not going to, and everything comes in at
       once rather than staying invisible. If it has reported, every block is
       left to its own crossing — which is the point of the thing. */
    if (!guard) {
      guard = window.setTimeout(() => {
        if (reported) return;
        for (const stranded of waiting) reveal(stranded, 0);
        waiting.clear();
      }, 2500);
    }

    return () => {
      waiting.delete(el);
      obs.unobserve(el);
    };
  }, [delay]);

  return (
    <Tag
      {...rest}
      ref={ref}
      id={id}
      role={role}
      data-reveal={variant === "up" ? "" : variant}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
