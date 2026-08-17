import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { vision } from "@/content/home";

/* --------------------------------------------------------------------------
   Geometry traced from the 1920 × … source artboard.

   The heading, the numeral and the product render are laid out on a
   full-bleed "stage" whose aspect ratio matches the artboard region, so every
   position below is the artboard measurement expressed as a percentage and
   the composition holds at any viewport width.

     stage            PDF y 2700 → 3560            1920 × 860   (ratio 2.2326)
     "By the Year"    x 115, ink top 196           78.6px bold  #3FA9F5
     "2047"           x 114…1763, ink top 309      ink 1649 × 535
     product render   solid part x 902…1710, y 20…469

   The numeral's type size comes from the measured ink box: a cap height of
   535px in Proxima Nova Bold needs 775.4px (40.383vw at 1920), and its natural
   ink width of 1804px is pulled back to the artboard's 1649px with -0.0501em
   of tracking.

   `leading-none` puts the ink top a fixed fraction of an em below the
   element's box top, which is why the box tops sit above the ink
   measurements. Both are font-metric dependent — re-measure if the face
   changes (`scratchpad/tools/fontcheck.js` prints the numbers).
   -------------------------------------------------------------------------- */

const NUMERAL_SIZE = "40.383vw";
const NUMERAL_TRACKING = "-0.0501em";

/**
 * The artboard's numeral gradient, recovered by least-squares fitting the axis
 * across ~260k glyph pixels: a 186.8° linear ramp (near vertical, leaning to
 * the bottom-left) running from near-white at the top-right to #4693D7.
 *
 * The stop positions are expressed in the *element* box (1676 × 775), which is
 * larger than the glyph ink box (1650 × 534) because of line-height leading
 * above and below and the side bearings left and right. Mapping ink-space t to
 * element-space t, for Proxima Nova Bold at this size, is
 *   t_el = 0.48246 + (t_ink − 0.5) × 0.74933
 * and because both boxes scale with the font size, these percentages stay
 * correct at every viewport width. Recompute if the typeface changes.
 */
const NUMERAL_GRADIENT =
  "linear-gradient(186.8deg, #E4EAF7 10.8%, #E6EDF9 29.5%, #D8E0F2 39.3%, #BAD2EE 48.2%, #9DC1E8 57.2%, #82B2E3 64.7%, #6AA4DE 74.5%, #4693D7 85.7%)";

export function VisionSection() {
  return (
    <section
      aria-labelledby="vision-heading"
      className="relative isolate overflow-hidden bg-white"
    >
      {/* Soft radial wash behind the numeral */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(70% 55% at 32% 48%, #eef4fd 0%, rgba(255,255,255,0) 72%)",
        }}
      />

      <div className="pt-16 pb-16 lg:pt-24 lg:pb-24">
        {/* ---- Stage: exact artboard composition from lg up ----
             Positions live in `globals.css` under "VISION SECTION". ---- */}
        <div className="vision-stage">
          {/* Product render — sits in front of the numeral, as in the design */}
          <Reveal
            variant="scale"
            delay={120}
            className="vision-render pointer-events-none z-20"
          >
            <Image
              src="/images/render-battery.png"
              alt=""
              width={1200}
              height={1200}
              sizes="(max-width: 1024px) 56vw, 51vw"
              className="animate-float-slow h-auto w-full [will-change:transform]"
            />
          </Reveal>

          {/* Heading */}
          <Reveal className="vision-heading z-10">
            <h2
              id="vision-heading"
              className="text-[length:clamp(1.25rem,4.094vw,4.9125rem)] leading-none font-bold text-[#3FA9F5]"
            >
              {vision.eyebrow} <span className="sr-only-8x">{vision.year}</span>
            </h2>
          </Reveal>

          {/* The numeral — the same information as the heading, rendered as art */}
          <Reveal
            delay={80}
            className="vision-numeral z-0"
          >
            <p
              aria-hidden="true"
              className="bg-clip-text leading-none font-bold text-transparent select-none"
              style={{
                fontSize: NUMERAL_SIZE,
                letterSpacing: NUMERAL_TRACKING,
                backgroundImage: NUMERAL_GRADIENT,
              }}
            >
              {vision.year}
            </p>
          </Reveal>
        </div>

        {/* ---- Supporting copy ---- */}
        <div className="container-8x mt-10 grid gap-10 lg:mt-16 lg:grid-cols-2 lg:items-start lg:gap-16">
          <Reveal delay={120}>
            <p className="max-w-[34ch] text-[length:var(--text-body-lg)] leading-[1.35] font-light text-pretty text-ink-900">
              {vision.body}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-[length:var(--text-display-sm)] leading-[1.15] font-bold tracking-normal text-balance text-brand lg:text-right">
              {vision.closingLine1} {vision.closingLine2}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
