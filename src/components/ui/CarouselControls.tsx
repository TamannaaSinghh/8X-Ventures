"use client";

import { cn } from "@/lib/cn";

type Props = {
  /** Accessible names for each slide, in order. Length drives the track. */
  labels: string[];
  index: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (i: number) => void;
  /** What the controls operate on, e.g. "portfolio companies". */
  subject: string;
  tone?: "dark" | "light";
  className?: string;
};

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="h-[1.6em] w-[1.6em]"
    >
      <path
        d={dir === "left" ? "M15 5 8 12l7 7" : "M9 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Previous / next buttons flanking a segmented progress track.
 *
 * Each track segment is a real button, so the slides are reachable directly
 * by keyboard and by assistive tech rather than only sequentially. Active
 * state is signalled by both colour and thickness (WCAG 1.4.1), and every
 * segment clears 3:1 against its background (WCAG 1.4.11).
 */
export function CarouselControls({
  labels,
  index,
  onPrev,
  onNext,
  onSelect,
  subject,
  tone = "dark",
  className,
}: Props) {
  const light = tone === "light";

  const arrowClass = cn(
    "grid min-h-11 min-w-11 place-items-center rounded-full p-2 text-[1.1rem] transition-[transform,color,background-color] duration-300 sm:text-[1.4rem]",
    "hover:scale-110 active:scale-95",
    light
      ? "text-brand-track hover:bg-white/10 hover:text-white"
      : "text-brand-sky hover:bg-brand-tint",
  );

  return (
    <div className={cn("flex items-center justify-center gap-2 sm:gap-6 lg:gap-8", className)}>
      <button type="button" onClick={onPrev} className={arrowClass}>
        <Chevron dir="left" />
        <span className="sr-only-8x">Previous {subject}</span>
      </button>

      {/* Below `sm` there is not enough width for one target per slide while
          keeping each at 24 CSS px (WCAG 2.2 — 2.5.8 Target Size), so the
          track collapses to a position counter and the arrows do the work. */}
      <p
        className={cn(
          "text-sm font-semibold tabular-nums sm:hidden",
          light ? "text-white" : "text-ink-700",
        )}
      >
        <span aria-hidden="true">
          {index + 1} / {labels.length}
        </span>
        <span className="sr-only-8x">{`${labels[index]} — ${index + 1} of ${labels.length}`}</span>
      </p>

      {/* No gap between segments: the artboard draws one continuous rule with
          the current position picked out, not a row of separated dashes. */}
      <ul className="hidden items-center gap-0 sm:flex" role="list">
        {labels.map((label, i) => {
          const active = i === index;
          return (
            <li key={label + i} className="contents">
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-current={active ? "true" : undefined}
                className="group grid h-8 w-10 place-items-center lg:w-14"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "block w-full rounded-full transition-all duration-500 ease-[var(--ease-out-expo)]",
                    /* Active state is carried by thickness as well as colour,
                       so it does not depend on colour alone (WCAG 1.4.1). */
                    active
                      ? light
                        ? "h-[5px] bg-white"
                        : "h-[5px] bg-brand-track-active"
                      : light
                        ? "h-[2px] bg-white/35 group-hover:bg-white/70"
                        : "h-[2px] bg-brand-track group-hover:bg-brand-track-active",
                  )}
                />
                <span className="sr-only-8x">
                  {active ? `Current: ${label}` : `Show ${label}`}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <button type="button" onClick={onNext} className={arrowClass}>
        <Chevron dir="right" />
        <span className="sr-only-8x">Next {subject}</span>
      </button>
    </div>
  );
}
