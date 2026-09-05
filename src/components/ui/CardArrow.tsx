/**
 * The badge that marks a card as having a page of its own.
 *
 * The glyph is the same arrow the LP Day cards already carry in their footer
 * row, so the site says "this opens something" one way rather than two. Those
 * cards keep their inline version — they have a footer to hold it; this is for
 * the cards that do not, and it sits in the top corner instead.
 *
 * Decorative: every card it goes on is already a link with its own accessible
 * name, so the arrow adds nothing to announce and is hidden from assistive
 * tech. It is also not focusable — the card's own link is the target.
 *
 * Put `data-card-arrow` on whichever element carries the card's hover, and the
 * arrow will answer to that element's hover and focus.
 *
 * `tone` says what it is sitting on, not what colour it is: `light` for the
 * blue and dark cards, `dark` for the insight cards, whose plate renders pale
 * whatever its gradient says.
 */
export function CardArrow({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <span aria-hidden="true" className="card-arrow" data-tone={tone}>
      <svg viewBox="0 0 24 24" fill="none" focusable="false">
        <path
          d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
