import { aboutPhilosophy } from "@/content/about";

const LINE = "clamp(1.75rem, 4.42vw, 5.3rem)";

const ITEM_CLASS =
  "text-[length:var(--phi-line)] leading-[1.22] font-bold tracking-[0.005em] whitespace-nowrap uppercase";

/**
 * The three principles, stepped through by the section's own scroll.
 *
 * A three-line window onto a five-line track: a blank line, the three
 * principles, a blank line. The blanks are what let the first and the last
 * reach the lit centre — without them the list would start with its first line
 * already at the middle and end with a last that could never get there. Two
 * lines of travel, three stops, one for each principle.
 *
 * Nothing here scrolls itself. The track is translated by `--phi-u`, the
 * progress `PhilosophyPin` publishes as the section is held, so the principles
 * advance on the page's own scroll rather than on a scroll of their own. This
 * list used to be the reader's to move — a scroller with its own overflow —
 * which meant it moved only for a reader who happened to put the pointer on
 * it, and, while it looped, trapped the page when they did.
 *
 * The emphasis comes from `marquee-fade-y`, a mask that floors at 0.28 rather
 * than at transparent: whichever line is passing the centre is lit and its
 * neighbours are dimmed, with no per-line state to keep in step.
 */
export function PhilosophyScroller() {
  return (
    <div style={{ "--phi-line": LINE } as React.CSSProperties}>
      {/* The rail belongs to the window, not to the track, so it stays put
          while the principles travel past it. */}
      <div className="border-l-[8px] border-brand-sky pl-[4.4%]">
        <div className="phi-window marquee-fade-y">
          <ol className="phi-track text-brand-sky">
            {aboutPhilosophy.items.map((item) => (
              <li key={item} className={ITEM_CLASS}>
                {item}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
