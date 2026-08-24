"use client";

import { Reveal } from "@/components/ui/Reveal";
import { aboutJourney } from "@/content/about";
import { useCarousel } from "@/hooks/useCarousel";
import { cn } from "@/lib/cn";

/* The page's own scale, defined on `.ab-stage` — 27 and 32 at 1920. */
const EYEBROW = "text-[length:var(--ab-eyebrow)]";
const BODY = "text-[length:var(--ab-body)]";
/** 173px at 1920, the artboard's numeral to within a pixel. */
const YEAR = "text-[length:clamp(3.75rem,9.01vw,10.8125rem)]";

/** 34 x 21, the artboard's own chevron, centred in a 44px target. */
function Chevron({ up = false }: { up?: boolean }) {
  return (
    <svg
      viewBox="0 0 34 21"
      fill="none"
      aria-hidden="true"
      className="w-[34px] max-lg:w-[26px]"
    >
      <path
        d={up ? "M2 19 17 2.6 32 19" : "M2 2 17 18.4 32 2"}
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * The journey rail. The chevrons step through the timeline entries; the year,
 * kicker, title and copy all change together.
 *
 * The buttons carry the year they move to, so a screen reader hears
 * "Show 2023" rather than "next", and the panel is announced politely on
 * change. Arrow keys work anywhere inside the group.
 */
export function JourneyTimeline() {
  const { entries, initialIndex } = aboutJourney;
  const { index, next, prev, onKeyDown } = useCarousel({
    length: entries.length,
    initialIndex,
    loop: false,
  });
  const entry = entries[index];
  const prevYear = entries[Math.max(index - 1, 0)].year;
  const nextYear = entries[Math.min(index + 1, entries.length - 1)].year;

  const btn =
    "grid min-h-11 min-w-11 place-items-center rounded-full text-brand-sky transition-[color,transform,opacity] duration-300 hover:scale-110 disabled:opacity-30 disabled:hover:scale-100";

  return (
    <div
      role="group"
      aria-roledescription="timeline"
      aria-label="8X Ventures journey by year"
      onKeyDown={onKeyDown}
      className="ab-at ab-jr-group"
    >
      <Reveal className="ab-at ab-jr-year max-lg:mt-12 max-lg:text-center">
        <p
          aria-hidden="true"
          /* Flat, not the artboard's clipped gradient. That fill ran from a
             bright blue down to near-black, and on this band — a dark
             photograph — the foot of every numeral sank into its own
             background. The top of the same gradient is what `brand-sky`
             already is, so the year keeps its colour and loses the fade. */
          className={cn(
            "leading-none font-bold tracking-normal text-brand-sky transition-opacity duration-500 select-none",
            YEAR,
          )}
        >
          {entry.year}
        </p>
      </Reveal>

      {/* the rail: chevrons step the timeline, the lit segment shows where in
          it you are */}
      <Reveal
        delay={80}
        className="ab-at ab-jr-rail flex flex-col items-center justify-between max-lg:hidden"
      >
        <button type="button" onClick={prev} disabled={index === 0} className={btn}>
          <Chevron up />
          <span className="sr-only-8x">{`Show ${prevYear}`}</span>
        </button>
        <span aria-hidden="true" className="ab-jr-track">
          <span
            className="ab-jr-thumb"
            style={
              {
                "--jr-index": index,
                "--jr-count": entries.length,
              } as React.CSSProperties
            }
          />
        </span>
        <button
          type="button"
          onClick={next}
          disabled={index === entries.length - 1}
          className={btn}
        >
          <Chevron />
          <span className="sr-only-8x">{`Show ${nextYear}`}</span>
        </button>
      </Reveal>

      <Reveal delay={160} className="ab-at ab-jr-copy max-lg:mt-8">
        <h3 className={cn("ab-jr-kicker leading-[1.2] font-bold text-brand-sky", EYEBROW)}>
          <span className="sr-only-8x">{entry.year}, </span>
          {entry.kicker}
        </h3>
        <p className={cn("ab-jr-subtitle mt-[0.22em] leading-[1.2] font-bold text-white", BODY)}>
          {entry.title}
        </p>
        {/* 1.28 line-height and this gap are the prototype's: 41px between
            body lines, 82px from the subtitle down to the first of them. */}
        <p
          className={cn(
            "ab-jr-body mt-[1.31em] leading-[1.28] font-light text-pretty text-white/90",
            BODY,
          )}
        >
          {entry.body}
        </p>

        {/* on small screens the rail is hidden, so the controls come inline */}
        <div className="mt-8 flex items-center gap-4 lg:hidden">
          <button type="button" onClick={prev} disabled={index === 0} className={btn}>
            <Chevron up />
            <span className="sr-only-8x">{`Show ${prevYear}`}</span>
          </button>
          <p className="text-sm font-semibold text-white tabular-nums">
            {index + 1} / {entries.length}
          </p>
          <button
            type="button"
            onClick={next}
            disabled={index === entries.length - 1}
            className={btn}
          >
            <Chevron />
            <span className="sr-only-8x">{`Show ${nextYear}`}</span>
          </button>
        </div>

        <p aria-live="polite" className="sr-only-8x">
          {`${entry.year}. ${entry.kicker}. ${entry.title}. ${entry.body}`}
        </p>
      </Reveal>
    </div>
  );
}
