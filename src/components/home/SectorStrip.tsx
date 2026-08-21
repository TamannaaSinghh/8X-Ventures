"use client";

import { useState } from "react";
import { MotionToggle } from "@/components/ui/MotionToggle";
import { Reveal } from "@/components/ui/Reveal";
import { sectors } from "@/content/home";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Copies of the sector list laid end to end inside the track. The track slides
 * left by exactly one copy and restarts (see `marquee-x`), so the loop is
 * seamless; four copies keep the strip filled at viewports far wider than the
 * list itself.
 */
const COPIES = 4;

const NAME_CLASS =
  "text-[length:clamp(0.6875rem,0.55rem+0.6vw,1.9rem)] tracking-[0.09em] whitespace-nowrap text-ink-500 uppercase";
const DOT_CLASS =
  "h-[6px] w-[6px] shrink-0 rounded-full bg-brand lg:h-2 lg:w-2";
const ROW_GAP = "gap-6 sm:gap-8 lg:gap-14";

/**
 * The band of sectors under the hero CTA, scrolling horizontally.
 *
 * Only this strip needs state, so the client boundary stops here and the rest
 * of the hero stays a server component.
 */
export function SectorStrip() {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);

  return (
    <div className="relative border-t border-ink-900/10">
      <Reveal delay={80} className="py-6 lg:py-8">
        <h2 className="sr-only-8x">Sectors we invest in</h2>

        {reduced ? (
          /* No motion asked for — the original static row, which is also what
             renders without JavaScript. */
          <ul
            role="list"
            className="container-8x flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-6 lg:justify-between lg:gap-x-2"
          >
            {sectors.map((sector, i) => (
              <li
                key={sector.name}
                className="flex items-center gap-4 sm:gap-6"
              >
                {i > 0 && <span aria-hidden="true" className={DOT_CLASS} />}
                <span className={NAME_CLASS}>{sector.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="marquee-fade group overflow-hidden">
            <div
              className={`animate-marquee-x flex w-max [--marquee-duration:26s] ${ROW_GAP} group-hover:[animation-play-state:paused] lg:[--marquee-duration:44s]`}
              /* Inline only while paused, so it does not outrank the
                 hover rule above the rest of the time. */
              style={paused ? { animationPlayState: "paused" } : undefined}
            >
              {Array.from({ length: COPIES }, (_, copy) => (
                <ul
                  key={copy}
                  role="list"
                  /* One copy carries the meaning; the rest are scenery. */
                  aria-hidden={copy > 0 ? "true" : undefined}
                  className={`flex shrink-0 items-center ${ROW_GAP}`}
                >
                  {sectors.map((sector) => (
                    <li
                      key={sector.name}
                      className={`flex items-center ${ROW_GAP}`}
                    >
                      {/* Every name gets a leading dot, so the separators
                          stay evenly spaced across the loop's seam too. */}
                      <span aria-hidden="true" className={DOT_CLASS} />
                      <span className={NAME_CLASS}>{sector.name}</span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        )}
      </Reveal>

      {/* The strip moves on its own, so it needs a way to stop
          (WCAG 2.2.2 Pause, Stop, Hide). It sits in the band's right-hand
          fade, where `marquee-fade` has already dimmed the names, and carries
          the page background so nothing travels behind it. */}
      {!reduced && (
        <div className="container-8x pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-end">
          <MotionToggle
            paused={paused}
            onToggle={() => setPaused((p) => !p)}
            label="sector strip"
            className="pointer-events-auto bg-white"
          />
        </div>
      )}
    </div>
  );
}
