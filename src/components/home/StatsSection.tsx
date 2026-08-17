import Image from "next/image";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { stats, statsHeadline } from "@/content/home";

/**
 * "Early signals. Serious scale." — reproduced as the still composition the
 * artboard shows: headline, the previous figure ghosted behind, the live
 * figure, its caption, and the robotic hand entering from the left.
 *
 * Positions live in `globals.css` under "STATS SECTION" as percentages of a
 * stage with the artboard's aspect ratio.
 *
 * Nothing auto-rotates here, so there is no WCAG 2.2.2 obligation and no
 * pause control — the artboard has neither. The figure still counts up once
 * on scroll, which respects `prefers-reduced-motion` and settles on exactly
 * the value shown in the design.
 */
export function StatsSection() {
  const figure = stats[0]; // ₹400+Cr — Portfolio revenue generated
  const ghost = stats[1]; // 70+ — echoed behind, unlabelled

  return (
    <section aria-labelledby="stats-heading" className="on-dark relative isolate overflow-hidden">
      <Image src="/images/stats-bg.jpg" alt="" fill sizes="100vw" className="-z-10 object-cover" />

      <div className="stats-stage">
        <Reveal
          as="h2"
          id="stats-heading"
          /* No tracking: the artboard sets these at their natural widths, and
             any negative tracking measurably narrows them against it. */
          className="stats-headline text-[length:var(--text-display)] leading-none font-bold text-white"
        >
          {statsHeadline}
        </Reveal>

        {/* The outgoing figure, carried over from the artboard as a flourish.
            It has no caption, so it is decoration rather than information. */}
        <p
          aria-hidden="true"
          className="stats-ghost leading-none font-bold text-white/35 select-none"
        >
          {`${ghost.prefix ?? ""}${ghost.value}${ghost.suffix ?? ""}`}
        </p>

        <p className="stats-figure text-[length:var(--text-stat)] leading-none font-bold text-white">
          <CountUp value={figure.value} prefix={figure.prefix} suffix={figure.suffix} />
        </p>

        <p className="stats-label text-[length:clamp(1.125rem,0.841rem+2.2vw,3.48rem)] leading-none font-bold text-white">
          {figure.label}
        </p>

        <div aria-hidden="true" className="stats-hand pointer-events-none">
          <Image
            src="/images/robot-hand.png"
            alt=""
            width={1100}
            height={733}
            sizes="27vw"
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
