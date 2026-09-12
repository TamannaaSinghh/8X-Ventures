/**
 * The environments in the "Why we invested" band, stepped through by the
 * section's own scroll.
 *
 * The same device as `/about`'s "How we work" and the team page's mentor
 * bands, and now the same mechanism: a three-line window onto a track that is
 * one blank line, the environments, and one blank line again. The blanks are
 * what let the first and the last reach the lit centre — without them the list
 * would start with its first line already at the middle and end with a last
 * that could never get there.
 *
 * Nothing here scrolls itself. The track is translated by `--pin-u`, the
 * progress `ScrollPin` publishes while the band is held, so the environments
 * advance on the page's own scroll rather than on a scroll of their own.
 *
 * It used to be a scroller with four copies of the list laid end to end,
 * looping without end. That read well on its own and behaved badly on the
 * page: a list with no end can never hand the scroll back to what is below it,
 * so a reader who put the pointer over it drove the environments round and
 * round and never reached the snapshot below. It also only ever moved for a
 * reader who happened to find it with the pointer.
 *
 * The emphasis comes from `marquee-fade-y`, the same mask those sections use:
 * whichever line is passing the centre is lit and its neighbours are dimmed,
 * with no per-line state to keep in step.
 *
 * Unpinned — reduced motion, no JavaScript, or a viewport too short to hold a
 * screenful still — the track keeps neither its blank lines nor its travel, so
 * the first three environments sit in the window with the middle one lit. That is the frame's
 * own still, which draws the list at rest with its centre line emphasised.
 */
export function EnvironmentList({
  items,
  label,
}: {
  items: readonly string[];
  /** Names the list for the group, e.g. "Where Neuralzome has to work". */
  label: string;
}) {
  return (
    /* The rule belongs to the window, not to the track, so it stays put while
       the environments travel past it. */
    <div className="pd-env-rail" style={{ "--pd-count": items.length } as React.CSSProperties}>
      {/* Not a scroller and no longer focusable: there is nothing here for a
          keyboard to scroll, and the list moves with the page for everyone. */}
      <div role="group" aria-label={label} className="marquee-fade-y pd-env-window">
        <ul className="pd-env pd-env-track">
          {items.map((item) => (
            <li key={item} className="pd-env-item">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
