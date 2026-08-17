import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { closingCta } from "@/content/home";

/**
 * The closing panel, traced from the artboard.
 *
 * The gradient field, the oversized "Good." and the robot arm are a single
 * background plate rebuilt from the artboard render — both of those are
 * decorative (the word is echoed for assistive tech below, the arm carries no
 * alt text), and separating them meant inpainting more than a third of the
 * section, which flattened the gradient. Baking them keeps the composition
 * pixel-identical; only the headline is live text.
 *
 * The artboard sets that headline in white over its brightest artwork, which
 * measures roughly 1.4:1 — kept as designed at the client's request. README
 * records the measurement and the fix.
 */
export function ClosingCta() {
  return (
    <section aria-labelledby="cta-heading" className="relative isolate overflow-hidden">
      <Image
        src="/images/cta-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover object-bottom lg:object-center"
      />

      <div className="cta-stage">
        <Reveal
          as="h2"
          id="cta-heading"
          className="cta-heading text-center text-[length:clamp(1.75rem,4.884vw,5.8625rem)] leading-[1.215] font-normal text-balance text-white"
        >
          {closingCta.line1} <span className="lg:block">{closingCta.line2}</span>
        </Reveal>

        {/* The word set as art in the plate, kept in the reading order here. */}
        <p className="sr-only-8x">{closingCta.ghost}</p>
      </div>
    </section>
  );
}
