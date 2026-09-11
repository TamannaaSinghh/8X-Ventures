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

/** Fraction of the viewport bottom the observer holds a block back through. */
const DEAD_ZONE = 0.04;

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
let bottomWatched = false;

/**
 * The other way a block can be stranded, which the timeout above does not
 * cover because the observer is reporting normally.
 *
 * `rootMargin` holds a block back until it is 4% clear of the viewport
 * bottom. A block sitting inside the document's own final 4% can never get
 * there: the page runs out of scroll first, so the observer never fires for
 * it and it stays at opacity 0 however far you scroll. The footer copyright
 * is exactly such a block.
 *
 * So rather than watching for "reader is at the bottom" — which a late
 * layout shift falsifies, and which sub-pixel rounding makes brittle — this
 * asks whether the block could clear the dead zone at maximum scroll. If it
 * could not, it is revealed as soon as it is actually on screen.
 */
function flushUnreachable() {
  if (waiting.size === 0) return;
  const doc = document.documentElement;
  const maxScroll = Math.max(0, doc.scrollHeight - window.innerHeight);
  const deadZoneTop = window.innerHeight * (1 - DEAD_ZONE);

  for (const el of [...waiting]) {
    const box = el.getBoundingClientRect();
    /* Where this block's top would land once the page is scrolled as far as
       it goes. At or below the dead-zone line means it can never intersect. */
    const restingTop = box.top + window.scrollY - maxScroll;
    const onScreen = box.top < window.innerHeight && box.bottom > 0;
    if (onScreen && restingTop >= deadZoneTop) {
      reveal(el, 0);
      observer?.unobserve(el);
    }
  }
}

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
    { rootMargin: `0px 0px -${DEAD_ZONE * 100}% 0px`, threshold: 0.02 },
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

    if (!bottomWatched) {
      bottomWatched = true;
      window.addEventListener("scroll", flushUnreachable, { passive: true });
      window.addEventListener("resize", flushUnreachable, { passive: true });
      /* Lazy media settling changes the document height after the last
         scroll event, which moves what "maximum scroll" means. */
      new ResizeObserver(flushUnreachable).observe(document.documentElement);
      requestAnimationFrame(flushUnreachable);
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
