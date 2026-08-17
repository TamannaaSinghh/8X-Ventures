"use client";

import Image from "next/image";
import { CarouselControls } from "@/components/ui/CarouselControls";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { journey, journeyIntro, type JourneyStage } from "@/content/home";
import { useCarousel } from "@/hooks/useCarousel";
import { cn } from "@/lib/cn";

/* --------------------------------------------------------------------------
   The arc

   Node centres traced from the source artboard fall on the parabola
   y = 232 − 0.00033125·(x − 960)², plotted in a 1920 × 420 viewBox whose
   origin sits at y = −80. The connecting line is the equivalent quadratic
   Bézier through the same vertex.
   -------------------------------------------------------------------------- */

const VIEW = { w: 1920, h: 420, top: -80 };
const NODE_X = [160, 380, 620, 960, 1300, 1540, 1760];
const arcY = (x: number) => 232 - 0.00033125 * (x - 960) ** 2;

const NODES = NODE_X.map((x) => ({
  x,
  y: arcY(x),
  leftPct: (x / VIEW.w) * 100,
  topPct: ((arcY(x) - VIEW.top) / VIEW.h) * 100,
}));

const ARC_PATH = `M 0 ${arcY(0).toFixed(1)} Q 960 ${(4 * 232 - 2 * arcY(0)) / 2} 1920 ${arcY(0).toFixed(1)}`;

/* --------------------------------------------------------------------------
   Stage icons
   -------------------------------------------------------------------------- */

const ICONS: Record<JourneyStage["icon"], React.ReactNode> = {
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 4.5 4.5" />
    </>
  ),
  beaker: (
    <>
      <path d="M9 3v6.2L4.6 17.4A2 2 0 0 0 6.35 20.4h11.3a2 2 0 0 0 1.75-3L15 9.2V3" />
      <path d="M8 3h8M7.5 14h9" />
    </>
  ),
  chip: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M10.5 10.5h3v3h-3zM12 3v4M12 17v4M3 12h4M17 12h4M7.5 3v4M16.5 3v4M7.5 17v4M16.5 17v4M3 7.5h4M3 16.5h4M17 7.5h4M17 16.5h4" />
    </>
  ),
  brain: (
    <>
      <path d="M12 6.5a3 3 0 0 0-5.7-1.3A2.8 2.8 0 0 0 4 8a2.8 2.8 0 0 0 .9 2 2.8 2.8 0 0 0 .6 4.4A3 3 0 0 0 9 19a3 3 0 0 0 3-2.6z" />
      <path d="M12 6.5a3 3 0 0 1 5.7-1.3A2.8 2.8 0 0 1 20 8a2.8 2.8 0 0 1-.9 2 2.8 2.8 0 0 1-.6 4.4A3 3 0 0 1 15 19a3 3 0 0 1-3-2.6z" />
      <path d="M12 6.5v10" />
    </>
  ),
  factory: (
    <>
      <path d="M3 20V11l5.5 3.5V11L14 14.5V7l7 4v9z" />
      <path d="M3 20h18M7 17h1.5M11.5 17H13M16 17h1.5" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V4M4 20h16" />
      <path d="m7.5 15.5 3.5-4 3 2.5 5-6.5" />
      <path d="M19.5 7.5H16M19.5 7.5V11" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.3 2.4 3.5 5.3 3.5 8.5S14.3 18.2 12 20.5c-2.3-2.3-3.5-5.3-3.5-8.5S9.7 5.9 12 3.5" />
    </>
  ),
};

function StageIcon({ icon, className }: { icon: JourneyStage["icon"]; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {ICONS[icon]}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */

export function FounderJourney() {
  const { index, goTo, next, prev, onKeyDown, offsetOf } = useCarousel({
    length: journey.length,
  });

  const active = journey[index];
  const centre = Math.floor(journey.length / 2);

  return (
    <section aria-labelledby="journey-heading" className="relative overflow-hidden bg-white">
      <div className="container-8x pt-20 pb-16 lg:pt-32 lg:pb-24">
        <Reveal className="text-center">
          <Eyebrow>{journeyIntro.eyebrow}</Eyebrow>
          <h2
            id="journey-heading"
            className="mt-4 text-[length:var(--text-display)] leading-[1.1] font-bold tracking-normal text-balance text-ink-900"
          >
            {journeyIntro.line1}{" "}
            <span className="text-brand lg:block">{journeyIntro.line2}</span>
          </h2>
        </Reveal>

        {/* --- Floating ribbon --- */}
        <Reveal variant="scale" delay={120} className="mx-auto mt-8 w-[78%] max-w-[900px] lg:mt-2">
          <Image
            src="/images/ribbon-3d.png"
            alt=""
            width={1400}
            height={789}
            sizes="(max-width: 1024px) 78vw, 900px"
            className="animate-float-slow h-auto w-full [will-change:transform]"
          />
        </Reveal>

        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="Founder journey stages"
          onKeyDown={onKeyDown}
          className="relative"
        >
          {/* --- Arc (wide screens) --------------------------------------
              The curve itself is decorative; the buttons layered over it are
              the real controls and carry the accessible names. --- */}
          <div
            className="relative -mt-10 hidden w-full lg:block"
            style={{ aspectRatio: `${VIEW.w} / ${VIEW.h}` }}
          >
            <svg
              viewBox={`0 ${VIEW.top} ${VIEW.w} ${VIEW.h}`}
              aria-hidden="true"
              focusable="false"
              className="absolute inset-0 h-full w-full overflow-visible"
            >
              <path d={ARC_PATH} fill="none" stroke="#9aa4ad" strokeWidth="1.2" />
            </svg>

            {journey.map((stage, i) => {
              const pos = NODES[centre + offsetOf(i)];
              if (!pos) return null;
              const isActive = i === index;

              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full",
                    "transition-[left,top,width,background-color] duration-700 ease-[var(--ease-out-expo)]",
                    "[will-change:left,top]",
                    /* Width is a share of the strip; aspect-square keeps the
                       nodes circular regardless of the strip's aspect ratio. */
                    "aspect-square",
                    isActive
                      ? "w-[7.2%] bg-[radial-gradient(circle_at_32%_28%,#7fc0f8_0%,#4b95e5_62%,#3b84d6_100%)] text-white"
                      : "w-[3.45%] bg-[radial-gradient(circle_at_32%_28%,#a9d4ff_0%,#5aa8f0_55%,#3f8fdd_100%)] hover:ring-4 hover:ring-brand/35",
                  )}
                  style={{ left: `${pos.leftPct}%`, top: `${pos.topPct}%` }}
                >
                  {isActive && <StageIcon icon={stage.icon} className="w-[52%]" />}
                  <span className="sr-only-8x">
                    {isActive
                      ? `Current stage: ${stage.title}`
                      : `Show stage ${i + 1}: ${stage.title}`}
                  </span>
                </button>
              );
            })}
          </div>

          {/* --- Compact indicator (small screens) --- */}
          <div className="mt-6 flex justify-center lg:hidden">
            <span
              aria-hidden="true"
              className="grid h-20 w-20 place-items-center rounded-full bg-[radial-gradient(circle_at_32%_28%,#7fc0f8_0%,#4b95e5_62%,#3b84d6_100%)] text-white"
            >
              <StageIcon icon={active.icon} className="h-9 w-9" />
            </span>
          </div>

          {/* --- Active stage --- */}
          <div className="mt-8 text-center lg:mt-2">
            <h3 className="text-[length:var(--text-display-sm)] leading-tight font-bold tracking-normal text-balance text-brand">
              {active.title}
            </h3>
            <p className="mx-auto mt-5 max-w-[52ch] text-[length:var(--text-body-lg)] leading-[1.4] font-light text-pretty text-ink-900">
              {active.description}
            </p>
          </div>

          <CarouselControls
            className="mt-8 lg:mt-10"
            labels={journey.map((s) => s.title)}
            index={index}
            onPrev={prev}
            onNext={next}
            onSelect={goTo}
            subject="journey stage"
          />

          <p aria-live="polite" className="sr-only-8x">
            {`Stage ${index + 1} of ${journey.length}: ${active.title}. ${active.description}`}
          </p>
        </div>
      </div>
    </section>
  );
}
