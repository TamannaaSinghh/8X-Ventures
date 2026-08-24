"use client";

import { aboutPhilosophy } from "@/content/about";
import { useLoopScroll } from "@/hooks/useLoopScroll";

/**
 * Copies of the principles laid end to end down the track. `useLoopScroll`
 * parks on the second, leaving a copy of runway either way before it wraps.
 */
const COPIES = 4;

const LINE = "clamp(1.75rem, 4.42vw, 5.3rem)";

const ITEM_CLASS =
  "text-[length:var(--phi-line)] leading-[1.22] font-bold tracking-[0.005em] whitespace-nowrap uppercase";

/**
 * The three principles, on a scroll of their own.
 *
 * The list used to read `window.scroll` and step the highlight as the section
 * crossed the viewport, which tied its pace to the page's. It is now the
 * reader's to move: a three-line window they scroll themselves, looping without
 * end in either direction — past the last principle is the first again.
 *
 * The emphasis comes from `marquee-fade-y`, a mask that floors at 0.28 rather
 * than at transparent: whichever line is passing the centre is lit and its
 * neighbours are dimmed, with no per-line state to keep in step with the
 * scroll. Nothing is hidden — every principle is one turn away, and nothing
 * moves unless the reader moves it, so there is no motion to opt out of.
 */
export function PhilosophyScroller() {
  const { viewportRef } = useLoopScroll(COPIES);

  return (
    <div style={{ "--phi-line": LINE } as React.CSSProperties}>
      {/* The rail belongs to the window, not to the track, so it stays put
          while the principles travel past it. */}
      <div className="border-l-[8px] border-brand-sky pl-[4.4%]">
        {/* Three lines tall — the artboard's lit centre and its two
            neighbours. Spelled out rather than composed, since Tailwind reads
            class names straight from the source. */}
        <div
          ref={viewportRef}
          tabIndex={0}
          role="group"
          aria-label="How we work — scroll through the principles"
          className="loop-scroll marquee-fade-y h-[calc(var(--phi-line)*1.22*3)]"
        >
          {Array.from({ length: COPIES }, (_, copy) => (
            <ol
              key={copy}
              /* One copy carries the meaning; the rest are scenery. */
              aria-hidden={copy > 0 ? "true" : undefined}
              className="text-brand-sky"
            >
              {aboutPhilosophy.items.map((item) => (
                <li key={item} className={ITEM_CLASS}>
                  {item}
                </li>
              ))}
            </ol>
          ))}
        </div>
      </div>
    </div>
  );
}
