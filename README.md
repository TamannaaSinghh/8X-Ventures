# 8X Ventures — Website

Next.js rebuild of the **8x Website v5.0** design. The homepage is complete;
the remaining routes exist as placeholders so navigation resolves.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
npm run lint
```

**Stack** — Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4
(CSS-first `@theme`) · no runtime UI dependencies.

---

## Structure

```
src/
├── app/
│   ├── layout.tsx              root layout: fonts, metadata, skip link, header/footer
│   ├── page.tsx                the homepage — composes the nine sections
│   ├── globals.css             design tokens, base styles, motion, reduced-motion
│   ├── not-found.tsx
│   └── about|team|portfolio|media|contact|disclosures|privacy|terms/
│                               placeholder routes (see "Scope")
├── components/
│   ├── layout/                 SiteHeader, SiteFooter, PagePlaceholder
│   ├── home/                   one component per homepage section
│   └── ui/                     Reveal, UnderlineLink, Eyebrow, CountUp,
│                               CarouselControls, RotatingWord
├── content/
│   ├── site.ts                 nav, footer, offices, socials
│   └── home.ts                 every string on the homepage
├── hooks/                      useCarousel, useReducedMotion
└── lib/cn.ts
```

**All copy lives in `src/content`.** No component contains a hard-coded string,
so text, portfolio companies, team members and journey stages can be edited
without touching layout code.

### Homepage sections, in order

| Component | Section |
|---|---|
| `Hero` | 8X mark (`HeroMark`, with sector hotspots), headline, sector strip |
| `ManifestoBanner` | "The future will not be inherited." — rotating sector word |
| `VisionSection` | "By the Year 2047" |
| `StatsSection` | "Early signals. Serious scale." — rotating figure |
| `PortfolioCarousel` | "Founders at the Frontier" |
| `FounderJourney` | arc of seven stages |
| `TeamCarousel` | "Operators. Investors." |
| `LpDaySection` | LP Day editions + promo band |
| `ClosingCta` | "Building something the world is not ready for yet?" |

---

## Design system

Tokens are defined in `globals.css` under `@theme`, so every Tailwind utility
is generated from one source. **The palette is the artboard's own**, sampled
from the source file — see "Colour" below.

**Typography** is fluid: each step is a `clamp()` whose middle term reaches the
source artboard's value exactly at 1920 px and scales down from there. Every
middle term keeps a `rem` component so text still responds to the reader's
browser font-size setting (WCAG 1.4.4).

### Fonts

The site is set in **Proxima Nova** — the artboard's own typeface, taken from
the client's font folder. Faces live in `src/app/fonts/` and are wired up with
`next/font/local` in `app/layout.tsx`.

Each face was subset to Latin + Latin Extended-A + general punctuation +
currency (the **₹** in the stats figure is present and verified) and converted
to woff2, which takes it from ~135 KB to ~34 KB:

| Face | Weight | Shipped | Preloaded |
|---|---|---|---|
| `ProximaNova-Regular.woff2` | 400 | yes | yes |
| `ProximaNova-Bold.woff2` | 700 | yes | yes |
| `ProximaNova-Italic.woff2` | 400 italic | in `fonts/`, not declared | — |
| `ProximaNova-BoldItalic.woff2` | 700 italic | in `fonts/`, not declared | — |

**Three weights the design uses were not in the folder: Light 300, Semibold 600
and Extrabold 800.** Only Regular and Bold were supplied. With no face for
those weights, CSS font matching resolves them to the nearest real face:

| Design weight | Renders as | Where it shows |
|---|---|---|
| Light 300 | Regular 400 | all body copy, subheads, nav, footer links |
| Semibold 600 | Bold 700 | the stats caption |
| Extrabold 800 | Bold 700 | the sector separator dots |

Verified by measurement that this is a real-face substitution, not browser
synthesis — requesting 300 and 400 produces identical advance widths, as does
600/700/800. Nothing is faux-bolded or faux-lightened. The visible consequence
is that **body copy sits one step heavier than the artboard**; dropping
`ProximaNova-Light.woff2` into `src/app/fonts/` and adding one line to the `src`
array in `layout.tsx` fixes it.

The italics are converted and sitting in `fonts/` but deliberately not declared,
so they are neither preloaded nor fetched — the homepage has no italic text.
Add them to the `src` array when a page needs them.

Two notes for launch: Proxima Nova is a commercial typeface and serving it from
a public site needs a **webfont** licence (a desktop licence does not cover it),
and the `.otf` originals are not in the repo — only the subset woff2 files are.

**Assets** were extracted directly from the source PDF at print resolution and
downsampled for web (`public/images`).

Three of them came out of the PDF with an opaque white backing rather than an
alpha channel, which showed as a pale slab against the page — the 3D ribbon and
both logos. All three are now keyed to transparency by flood-filling the
background inward from the border, which removes the surrounding white without
touching enclosed light areas (a global white threshold would punch a hole
through the bright highlight at the centre of the 8). The cut edge is ramped
over a few pixels so no white fringe survives.

### Vision section — traced composition

"By the Year 2047" is reproduced from the artboard rather than approximated.
Its geometry lives in `globals.css` under `VISION SECTION` as plain CSS (not
arbitrary Tailwind values, which are easy to typo and are silently dropped when
the scanner misses them). Everything is a percentage of a stage with the
artboard's aspect ratio, so the composition holds at any width:

| | artboard | built |
|---|---|---|
| "2047" ink box | 1649 × 535 at x114, y309 | within 1px, −0.1% / −0.7% |
| "By the Year" | x115, ink top 196 | within 1px |
| product render | body 729 wide at x980, y24 | within 1px, ±0.0% width |

The type size comes from the measured ink box — a 535px cap height in Proxima
Nova Bold needs 775.4px (**40.383vw**), pulled from its natural 1804px ink width
to the artboard's 1649px with **−0.0501em** tracking. The gradient axis was
recovered by least-squares fitting ~260k glyph pixels: a **186.8°** ramp, with
stops remapped from ink space into element space so they stay correct as the
type scales.

Both the size and the gradient mapping are **font-metric dependent** — if the
typeface changes, re-run `fontcheck` to get the new cap height and ink width,
then re-measure the positions. The gradient now matches the artboard within
**ΔRGB ≤ 14** on every clean sample.

### Stats section — traced composition

"Early signals. Serious scale." is reproduced from the artboard the same way as
the 2047 block: a stage with the artboard's aspect ratio (1920 × 1067) and every
element placed as a percentage of it, in `globals.css` under `STATS SECTION`.

| | artboard | built |
|---|---|---|
| headline | ink 407–1513 × 165–244 | within 1px |
| ghost "70+" | ink 761–1181 × 344–501 | within 1px |
| figure "₹400+Cr" | ink 443–1477, cap height 182 | within 2px |
| label | ink 615–1304 × 798–846 | within 1px, 1.6% wider* |
| hand | visible 0–448 × 736–1023 | within 1px |

\* the label is Semibold 600 in the design; with no Semibold face it renders
Bold, which is fractionally wider. Fixed by supplying `ProximaNova-Semibold`.

Two things a bounding-box comparison alone would not have caught:

- **The hand is mirrored in the artboard.** The PDF places the render with a
  flipped transform, and extraction kept the raw pixels — so the extents matched
  while the hand pointed the wrong way. `robot-hand.png` has been flipped to
  match, which is why `.stats-hand` sits flush at `left: 0`.
- **The background is not the placed image.** The artboard composites a grain
  layer and blend over `xref 434`, so the extracted asset is a visibly different
  gradient. `stats-bg.jpg` is now rebuilt from the artboard render itself, with
  the type and the hand masked out by their silhouettes and the holes closed by
  pull-push (pyramid) interpolation. It is cut to the section's exact aspect
  ratio, so `object-cover` never crops it.

The **ghost "70+" is not the figure faded**: it is set smaller (157px cap height
against the figure's 182) and tracked much wider (+0.1156em). Those numbers came
from high-pass filtering the artboard to lift the glyphs off the graded field.

The artboard shows this section as a **still** — no controls, no rotation — so
that is what it is. Nothing auto-updates, which means no WCAG 2.2.2 obligation
and no pause control. The figure still counts up once on scroll, respecting
`prefers-reduced-motion`, and settles on exactly the value in the design.

Below 1024px the stage would be only ~215px tall while the type keeps readable
minimums, so narrow viewports stack in ordinary centred flow instead.

> **If an image edit does not show up**, delete the whole `.next` directory, not
> just `.next/cache` — Next's image optimizer keeps variants that survive a
> cache-folder delete and a dev-server restart.

### Team section — traced composition + hover bios

"Operators. Investors." is traced onto a 1920 × 1699 stage (`globals.css`,
`TEAM SECTION`). All five cards land within 1px of the artboard:

| | artboard | built |
|---|---|---|
| card 1 / 2 / 4 / 5 | 290 × 408 at y 717 | exact |
| featured card | 388 × 516 at y 649 | exact |
| slot lefts | 6.406 / 23.021 / 39.740 / 61.562 / 78.385 % | exact |
| name / role type | ~33px / ~12px | exact |

**The card text is the same size on every card** — the featured card is
*larger*, not scaled up. Measuring the PDF export suggested otherwise (it
renders the card component's type noticeably smaller than the prototype), so
these numbers were taken from the prototype screenshot instead. Scaling the
whole card, which is what the first version did, shrank the side cards' type
and was the main reason it looked wrong.

As with the stats field, **the background is not the placed asset** — the
artboard composites over it, so `team-bg.jpg` is rebuilt from the artboard
render with the type and cards masked out and the holes closed by pull-push
interpolation, cut to the section's exact aspect ratio.

**Card heights are measured to the card edge, not to where its fill stops.**
The featured card's blue fill is hidden behind the portrait for its lower
third, so a fill-colour measurement reads 516px when the card is really 544px.
The 28px shortfall let the artboard's own card — baked into the background
plate underneath — show as a strip of somebody else's jacket beneath the live
card. Both the CSS height and the background's inpaint mask use 544 now.

**Hover bios.** Each card carries a condensed biography and a LinkedIn link,
taken from the profile pages on 8xventures.co (`bio` and `linkedin` in
`content/home.ts`). The panel is revealed on `:hover` **and** `:focus-within`,
and it is only ever transparent — never `display: none` — so the link inside
stays focusable and tabbing to it brings the panel up. Each link's accessible
name names the person and warns about the new tab.

Bio type is sized in **`cqw`** against the card (`container-type: inline-size`),
not the viewport, so it reads at ~13px on a side card and ~18px on the featured
one instead of being uniformly tiny.

**Only the featured card animates its size.** When both the incoming and
outgoing cards transitioned symmetrically, the outgoing one stayed taller for
the first half of the swap and its lower edge showed beneath the incoming card.
Non-featured cards now snap to the small size and animate only their slot.

Below 1024px only the featured card is shown, centred.

> **Watch the cascade.** These section rules are *unlayered*, so they beat
> Tailwind utilities, which live in `@layer utilities`. A `max-lg:hidden` on a
> card lost to `.team-card { display: flex }` regardless of source order — the
> breakpoint rules for these components belong in the same CSS block, not in
> class names.

### Closing section — traced composition

"Building something the world is not ready for yet?" sits on a 1920 × 1062
stage (`globals.css`, `CLOSING SECTION`). The headline lands within 1px
vertically and 3px horizontally of the artboard, at 93.8px / line-height 1.215.

**The oversized "Good." and the robot arm are part of the background plate**,
not separate layers. Separating them meant masking and inpainting more than a
third of the section, which flattened the gradient into a featureless blob.
Both are decorative — the word is echoed for assistive tech in the markup, the
arm carries no alt text — so baking them in keeps the composition
pixel-identical to the artboard, and only the headline's thin glyph strokes
need filling (4.5% of the section). The plate is cut to the section's exact
aspect ratio, so `object-cover` never crops it on desktop.

**No call-to-action button.** The artboard has none here; the "Share Your
Vision" link that was in this section came from the equivalent panel on the
Perspectives page and has been removed. The footer still carries it.

Below 1024px the section switches to a 3:4 stage anchored `object-bottom`, so
the arm stays in frame with the headline over it.

### Footer — traced composition

The footer is traced onto a 1920 × 577 stage (`globals.css`, `FOOTER`).
Measured against the artboard:

| | artboard | built |
|---|---|---|
| stage | 1920 × 577 | exact |
| logo (visible) | 233 × 85 at x121, y109 | within 1px |
| blurb | ink x124, lines at 222 / 252 / 282 | exact, same three line breaks |
| social circles | 53px at x120 / 226 / 331, y335 | exact |
| column x | 691 / 1113 / 1542 | within 1px |
| heading ink top | 111 | exact |
| link rows | 171, 217, 263, 309, 355 (pitch 46) | **exact** |
| rule | x120–1799, y485, `#A5D7FA` | exact |
| copyright | ink x816–1103, top 527 | within 4px |

Two notes. The blurb's container is deliberately **narrower than the
artboard's 420px ink width**: the artboard sets it in Proxima Nova Light and it
renders here in Regular, ~6% wider, so a container matched to 420px carried an
extra word up onto the second line. Narrowing to 22.7% restores the artboard's
three line breaks. And the copyright's tracking was set by measurement (0.2em)
rather than by eye — 0.34em overshot the artboard's 287px width by 55px.

### Sector hotspots on the 8X mark

`components/home/HeroMark.tsx` puts a hotspot on the mark for each of the six
sectors; hovering, focusing or tapping one opens a short description of the work
we back there. `Hero` itself stays a server component — only the mark needs to
be interactive, so the `"use client"` boundary stops at `HeroMark`.

**The float.** The mark carries a 9s float, and a coordinate map cannot track a
moving target, so the overlay is nested *inside* the animated element: the
hotspots ride the float and stay on the ribbon. The float is then also paused
(`data-paused` → `animation-play-state`) while a popup is open, so the panel is
a still thing to read and the pointer cannot have the dot drift out from under
it. Both, rather than either.

**Placing the hotspots.** `/images/hero-infinity.png` is a flat raster with no
regions to hook into, so `sectors` in `content/home.ts` carries an `x`/`y`
percentage per sector, read off the file's own alpha and colour: its ink runs
x 122–1814 of 2000 and y 215–1051 of 1250, and each point was checked to sit on
solid ribbon rather than in one of the two holes or on a specular highlight
(≥96% solid across the 44px target). To retune one, edit the numbers — nothing
else moves. Keep any two at least ~17% of the width apart: that is what holds
the 44px targets clear of each other on a 294px mark at a 320px viewport
(measured: 52px between the closest centres).

The marker is deliberately two-tone — a white core, a `#0077C2` ring, a white
halo — on the same reasoning as the focus ring: the ribbon runs from near-white
speculars to deep navy, so one edge or the other stays legible wherever a dot
lands.

Accessibility handling:

- Hotspots are **real buttons** and open on focus exactly as on hover, so the
  content is reachable by keyboard (2.1.1). Verified by tabbing: the six follow
  the nav in sector order, each opens on arrival and closes as focus moves on.
- Open/closed is **state, not a CSS `:hover` rule**, because Escape has to be
  able to overrule the pointer. Escape closes from anywhere on the page and
  leaves focus where it was; the popup is hoverable (an invisible bridge spans
  the gap to the dot, and leaving is delayed 140ms) and persists until dismissed
  (1.4.13). A click or tap outside closes it too.
- **Tap-to-toggle on touch**: the hover-open is skipped for touch pointers, so
  the tap owns it and a second tap closes what the first opened.
- Targets are **44×44** (2.5.8, and 2.5.5 while we are here).
- The description is tied to the button with `aria-describedby`, so it is read
  on focus whether or not the panel is open; the panel's `visibility` toggles
  with it, keeping a closed panel out of the accessibility tree and out of the
  pointer's way.
- Under `prefers-reduced-motion` the float does not run and the panel appears
  without a transition. Nothing is animated that is not already covered by the
  global reduced-motion rule.
- Below 40rem every panel drops below its hotspot: the mark is barely 220px tall
  there, and a panel placed above a high hotspot would collide with the header.

### The rotating sector word

In the manifesto banner the bold word cycles through the six sectors
(`sectorsInline` in `content/home.ts`), starting on **manufacturing** so first
paint matches the artboard. `components/ui/RotatingWord.tsx` measures each word
from hidden copies and animates the slot's width, so the words either side glide
rather than jump and the paragraph never reflows (verified: one paragraph height
across a full cycle).

Accessibility handling:

- The rotating element is `aria-hidden`. The paragraph exposes **one static
  sentence naming every sector**, so assistive tech gets the whole meaning at
  once instead of a phrase that changes mid-read. Confirmed against the
  accessibility tree — a single text node, no partial or repeated announcements.
- A **pause control** sits under the sentence (WCAG 2.2.2 Pause, Stop, Hide).
- Under `prefers-reduced-motion` the rotation does not run, the word rests on
  "manufacturing", and the pause control is hidden.

---

## Accessibility

Target: **WCAG 2.1 Level AA**, with the WCAG 2.2 target-size addition.

**Everything except colour contrast passes.** Colour is a deliberate exception:
the client asked for the artboard's palette verbatim, and that palette does not
meet 1.4.3. The failures are inventoried below so the cost is explicit.

| Check | Result |
|---|---|
| axe-core, all rules **except** colour-contrast — 6 routes × 4 breakpoints | **0 violations** |
| 1.4.3 Contrast (minimum) | **fails — see "Colour" below** |
| 1.4.10 Reflow @ 320 px | no horizontal scroll |
| 1.4.4 Resize text @ 200% and 400% | no horizontal scroll |
| 1.4.12 Text spacing | no clipping, no horizontal scroll |
| 1.4.11 Non-text contrast — focus indicator | two-tone ring, passes on every background |
| 2.1.1 / 2.1.2 Keyboard | 61 stops, all named, all visible, logical order, no traps |
| 2.2.2 Pause, Stop, Hide | pause controls on both auto-rotating elements |
| 2.4.3 Focus order · 2.4.7 Focus visible | verified |
| 2.5.8 Target size (2.2) | ≥24px; dot tracks collapse to a counter under 640px |
| 4.1.2 Name, Role, Value | carousels, menu, controls all verified |
| Reduced motion | all animation stops, all content visible |

Also in place: a skip link, one `h1` with an unbroken heading order, landmark
regions on every section, `aria-live` slide announcements, `inert` on off-screen
slides, and a `forced-colors` block.

### Colour — the artboard's palette, and what it costs

Restored at the client's request. `#009EFF`, `#3FA9F5` and `#2DB5E5` are all
below 3:1 on white, so **no** use of them as text passes AA at any size.

**On solid backgrounds** — 29 elements, 6 pairings (axe-detected):

| Foreground | Background | Ratio | Needs | Elements | Where |
|---|---|---|---|---|---|
| `#009EFF` | white | 2.86:1 | 3:1 | 16 | eyebrows, accent headings |
| `#3FA9F5` | white | 2.55:1 | 3:1 | 2 | hero line 2, "the Frontier" |
| white | `#3FA9F5` | 2.55:1 | 4.5:1 | 4 | portfolio card pills, quote |
| white | `#3FA9F5` | 2.55:1 | 3:1 | 3 | portfolio card name, "Raised" |
| `#2DB5E5` | white | 2.37:1 | 3:1 | 3 | nav "Reach Out" |
| `#009EFF` | `#E9F6FD` | 2.47:1 | 3:1 | 1 | LP Day promo eyebrow |

**Over photography and gradients** — axe reports these as *incomplete* rather
than failing, because it cannot sample an image. Measured directly by hiding
each text element and photographing the background behind it:

| Element | White text | Verdict |
|---|---|---|
| Manifesto sentence | 1.26:1 | fail |
| CTA headline | 1.34:1 | fail |
| Manifesto headline | 1.64:1 | fail |
| Team body | 2.03:1 | fail |
| LP Day "2025" | 2.10:1 | fail |
| Stats headline | 2.32:1 | fail |
| Team headline | 2.40:1 | fail |
| LP Day "2026" | 12.91:1 | pass (that photo is dark behind the label) |
| "By the Year" `#3FA9F5` | 2.56:1 | fail |

**If you want these fixed later**, the hue-preserving swaps that clear AA are:

| Design value | Compliant swap | Ratio on white |
|---|---|---|
| `#009EFF` (text) | `#0077C2` | 4.75:1 |
| `#3FA9F5` (text) | `#1F94E0` | 3.30:1 (large) / `#0077C2` for body |
| `#2DB5E5` (text) | `#0077C2` | 4.75:1 |
| `#009EFF` (controls, arrows, tracks) | `#0084D6` | 3.98:1 |
| `#808080` (footer blurb) | `#737373` | 4.74:1 |

For the white-on-imagery cases the two options are a navy wash over the artwork
(≈0.72 alpha restores 4.5:1) or inverting the type to navy — on the closing
panel, navy measures **8.65:1** on the untouched artwork.

Two things were deliberately **not** given the design's colours, because they
are interaction affordances the artboard does not specify:

- the **focus ring** (two-tone white-then-navy, so it survives any background), and
- the **skip link** fill (`#0077C2`, so its white label is legible).

---

## Scope and open items

- **The homepage, `/about` and `/portfolio` are built.** `/team`, `/media`,
  `/contact` and the legal routes render `PagePlaceholder` with the correct
  headings and metadata, so no navigation link 404s. Designs for the remaining
  pages exist in the source file (artboard pages 4–5) and can be built next.

  `/about` is traced from artboard page 2 (1920 × 4761) as five stages —
  hero 773, circuit 887, philosophy 729, journey 1006, closing 714 — with every
  element placed as a percentage of its stage (`globals.css`, `ABOUT PAGE`).
  The circuit, journey and closing backgrounds are plates rebuilt from the
  artboard render with the live text inpainted out; the robot head and the chip
  are extracted through their soft masks.

  **The page follows the Figma prototype, not the PDF export.** The two
  disagree, and the prototype is the live design. It is unscaled — its circuit
  band runs the full 1920, and it draws the journey year numeral at exactly the
  export's 403px of ink — so the differences between them are real edits, not
  an artefact of a resized screenshot. Its type is **0.9× the export's**
  throughout: **27 / 82 / 32** against 30 / 90 / 35, confirmed independently on
  the hero headline and the journey heading (82 both times). Those three sizes
  are `--ab-eyebrow` / `--ab-body` / `--ab-display` on `.ab-stage`.

  In the **hero**, the block is 701 tall rather than 836, its margin is 6.25%
  rather than 7.77%, the head is larger and sits with its crown level with the
  eyebrow, and the two links sit ~126px apart rather than ~74. The body's
  measure (49.5%) keeps the artboard's line break: "…with the power" fits, "to"
  does not. Every ink box lands within 1–2px of the prototype's, except "for
  Deep-Tech", which renders 13px wider.

  In the **journey**, the background and the year numeral are the export's
  exactly, and everything else moved: the copy block sits ~48px lower and ~9px
  right, the rail moved right to x870, and the copy's measure (31.8%) is what
  keeps the artboard's four lines — "…need dedicated" on the first, "and"
  pushed off the third. Ink targets, band-relative: eyebrow 166, heading 230,
  year 579, kicker 520, subtitle 561, body 643 with a 41px pitch. All land
  within 1–2px; the copy's glyphs run ~2% wider than Figma's rendering of the
  same size, which shows as a slight drift along each line and nowhere else.

  The year numeral's fill was sampled down the artboard's own glyphs rather
  than guessed — it holds a mid blue for the top half and then drops away into
  the background, so the gradient's stops steepen (`.ab-jr-year p`). Both
  heading lines are centred on the page, so they are placed with left/right
  rather than a measured left.

  That 701 block then sits 72px lower, making the stage 773: the prototype is
  scrolled past its own navigation, so it cannot say how much air belongs above
  the eyebrow, and the artboard clears its navigation by 133px. The header's ink
  ends at y75 and the eyebrow's begins at y207, so the built page keeps the same
  132px. Shifting the block moves the head with it — the crown stays level with
  the eyebrow — and leaves the rhythm inside the block untouched.

  Display headings and eyebrows carry **no letter-spacing**. The artboard's own
  ink measures this exactly: "A Venture Firm Built" is 825px wide there and 791
  with the −0.02em the build used to apply — the difference is precisely
  19 gaps × 1.8px. Removing it brought the homepage into line too ("By the Year"
  is now 398px in both).

  Two sections are interactive:

  - **Philosophy** (`PhilosophyScroller`) steps the highlight from one principle
    to the next as the section crosses the viewport. All three lines are always
    rendered and readable — the highlight is emphasis only, so no content is
    hidden behind the scroll — and under `prefers-reduced-motion` it rests on
    the artboard's default (the middle line) instead of tracking the scroll.
    The active line carries `aria-current="step"`.
  - **Journey** (`JourneyTimeline`) steps through 2021–2024 on the rail's
    chevrons, which are labelled with the year they move to ("Show 2023") rather
    than "next", disable at the ends, and answer arrow keys anywhere in the
    group. The year, kicker, title and copy change together and the panel is
    announced politely.

    The rail is the artboard's: a 2px `#3FA9F5` track from band y448 to y807
    with 34 × 21 chevrons above and below, each centred in a 44px target. The
    lit white segment is a **position indicator** — one entry's worth of the
    track, sliding as the timeline steps. The artboard can only show a still
    frame, and parks it mid-rail; drawn here as what it depicts, it is 1/n tall
    and sits at index/n. The plate underneath had to be repaired first: the
    export's own rail survived the inpainting at x834–840, so with ours moved
    right to x870 the section was showing two. `about-journey.orig.jpg` is the
    plate as it was.

    Below `lg` the rail is hidden, so the same controls
    appear inline under the copy with an "n / 4" position. Entries come from the
    profile copy on 8xventures.co/about; the rail opens on 2022, as the artboard
    shows.

  `/portfolio` is traced from artboard page 3 (1920 × 5155) as three stages —
  hero 1255, list 2244, closing 823 — over the shared footer (`globals.css`,
  `PORTFOLIO PAGE`). The prototype was read the same way as `/about`'s, by
  opening the frame and measuring it: it moves the hero copy and the card grid
  out to the newer 6.25% margin and sets the hero headline, the section heading
  and the closing lines at **0.9× the export** (140 → 126, 90 → 82, 67 → 60),
  while the filter pills and the cards keep the export's geometry and type —
  measured against the prototype, the pill row (966px wide, 57.8 tall) and the
  card names come back unchanged. It also **drops the "PORTFOLIO" eyebrow** the
  export sets above the section heading. Ink lands within 1–3px throughout:
  hero headline 275 with a 153 pitch, subhead 817, heading 215, pill row 373
  (60 tall, 46 apart, x474–1446 against the export's 476.9–1443.1), grid 535,
  cards 537 × 772 against the export's 536.7 × 769.6, closing lines 203/277/353
  and its link 547.

  Two things the export does not say on its face:

  - **The closing photograph is toned.** It is not used as-is — it is
    multiplied down per channel, which the export gives away when sampled
    against the source file (R ×0.429, G ×0.541, B ×0.640, i.e. a multiply with
    `#6D8AA3`). The page reproduces that rather than the raw image, which is far
    brighter. The hero photograph, checked the same way, is untouched (×1.000).
  - **The section heading is left-aligned, not centred.** In the export it runs
    x173–1747 and reads as centred; the prototype keeps that left edge with the
    smaller type, so it now ends at 1580 and sits ~80px left of the page's
    middle, over centred pills. The build follows the prototype. It looks like a
    side effect of the type change rather than a decision — say the word and it
    is a one-line change to centre it.

  The filter row (`PortfolioGrid`) is real: **All / SPV Portfolio / Fund I**
  narrow the grid by the company's `vehicle`, and **Fund II - Coming Soon** is
  inert. They are toggle buttons rather than tabs — they narrow one list in
  place rather than swapping panels — so `aria-pressed` describes them honestly
  and nothing needs arrow-key handling; the resulting count is announced
  politely. "Coming Soon" is `aria-disabled` rather than `disabled`, so it stays
  focusable and can be found and read.

  The grid runs **six cards, two rows of three**, as the artboard does. The
  artboard fills its six by repeating three placeholder cards ("Armory"); these
  are the six real companies from 8xventures.co/portfolio — the three the page
  shows plus the three behind its "Load More" — with 8X's own sector labels and
  their own descriptions, condensed to the two lines the card is drawn for
  (`portfolio` in `content/home.ts`, which the homepage carousel reads too).

  **Funds.** Every card carries **Fund I**, per 8X; Solinas Integrity also sits
  in the SPV portfolio, which is what its card shows and what the SPV filter
  finds (`vehicles` in `content/home.ts` records both). Nothing is tagged Fund
  II, because the artboard's fourth pill reads "Fund II - Coming Soon" and is
  greyed out — the build reproduces that, inert. Note this differs from the
  live site, which labels most of these "Second Fund".

  Below `lg` the hero photograph crops much narrower, bringing its bright
  corridor in under the copy that the artboard keeps on the dark left wall, so a
  scrim holds the contrast there; at `lg` and up the composition does it unaided
  and the scrim is not drawn.

- **Content to confirm with 8X:**
  - **Founder journey stage names.** The artboard renders only the active node
    ("Technology Validation"). The other six in `content/home.ts` are a working
    set and need sign-off.
  - **Portfolio details.** The design uses "Armory / $4M" as placeholder copy on
    repeated cards. Real company names were taken from the portfolio artboard
    and the live site; the raise amounts, descriptions and quotes are
    placeholders.
  - **Statistics.** `₹400+Cr` and `70+` come from the design; `18+` and `80Y+`
    from the current live site. All need confirming.
  - **Office addresses, social URLs and the contact email** are not in the
    design; the footer links currently point at plausible destinations.
  - **Sector descriptions** in the hero hotspots (`sectors[].description` in
    `content/home.ts`) are placeholder copy written to fit the panel — one
    sentence, 12–15 words. They are 8X's positioning to state, not ours, so
    they need replacing or signing off before launch.
  - **Portfolio card figures.** Each card's summary is now the company's own
    description from 8xventures.co. What is still the artboard's placeholder,
    identical on every card, is **"$4M Raised"**, **"Invested at: Seed Stage"**
    and "Scaled from product validation to commercial deployment."
    (`content/portfolio.ts`). These are attached to real, named companies now,
    so they should be corrected or removed before the site goes anywhere near
    production — a wrong raise figure against a real company is worse than a
    blank one.

- **Images** are the design's stock/placeholder photography. Swap in licensed
  assets before launch and revisit the `alt` text in `content/home.ts`.
