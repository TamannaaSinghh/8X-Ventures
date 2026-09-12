/**
 * A list of bands stepped through by its section's own scroll, with a rail
 * beside it.
 *
 * The design uses this device twice — the team page's mentor bands and LP
 * Day's "deep-tech needs more than capital" — so it lives here rather than in
 * either page. The window is one line per item, so the band keeps the
 * footprint a static list would have.
 *
 * It used to be a scroller of its own, looping without end: four copies of the
 * list laid end to end, each wrapping into the next. That read well on its own
 * and behaved badly on the page. A list with no end can never hand the scroll
 * back to what is below it — `overscroll-behavior: contain` is not an
 * ornament there, it is the only thing keeping a flick from running away — so
 * a reader who put the pointer over it drove the names round and round and
 * never reached the section beyond. It also only ever moved for a reader who
 * found it with the pointer.
 *
 * Now the section holds still and the list steps through on the page's own
 * scroll — see `ScrollPin`, which publishes `--pin-u` — one line at a time,
 * from the first name to the last, and then the page carries on. The blank
 * lines above the first and below the last are what let those two reach the
 * lit centre; without them the list would start with its first line already
 * at the middle and end with a last that could never get there.
 *
 * The emphasis comes from `marquee-fade-y`, a mask that floors at 0.28 rather
 * than at transparent: whichever line is passing the centre is lit and the
 * rest fall away either side. The rail's thumb reads the same `--pin-u`,
 * travelling down as the lines travel up, the way a scrollbar does.
 *
 * Unpinned — reduced motion, no JavaScript, or a viewport too short to hold a
 * screenful still — the track keeps neither its blank lines nor its travel, so
 * every name sits in the window at once with the middle one lit and the thumb
 * parked on it. That is the artboard's own still frame.
 */
export function LoopList({
  items,
  activeIndex,
  label,
}: {
  items: readonly string[];
  /** Where the still frame sits, and where the rail's thumb parks unpinned. */
  activeIndex: number;
  /** Names the list, e.g. "Our journey". */
  label: string;
}) {
  return (
    <div
      className="tm-rail-wrap"
      style={
        {
          "--tm-count": items.length,
          "--rail-index": activeIndex,
          "--rail-count": items.length,
        } as React.CSSProperties
      }
    >
      <span aria-hidden="true" className="tm-rail">
        <span className="tm-rail-thumb" />
      </span>

      {/* Not a scroller and no longer focusable: there is nothing here for a
          keyboard to scroll, and the list moves with the page for everyone. */}
      <div role="group" aria-label={label} className="tm-mentors-window marquee-fade-y">
        <ol className="tm-mentors tm-mentors-track text-white">
          {items.map((item) => (
            <li key={item} className="tm-mentor">
              {item}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
