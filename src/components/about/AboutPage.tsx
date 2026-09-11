import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { PointerField } from "@/components/ui/PointerField";
import { UnderlineLink } from "@/components/ui/UnderlineLink";
import { JourneyTimeline } from "@/components/about/JourneyTimeline";
import { PhilosophyScroller } from "@/components/about/PhilosophyScroller";
import { ParallaxBand } from "@/components/ui/ParallaxBand";
import { ScrollPin } from "@/components/ui/ScrollPin";
import {
  aboutCta,
  aboutHero,
  aboutJourney,
  aboutPhilosophy,
  aboutWho,
} from "@/content/about";
import { cn } from "@/lib/cn";

/* The prototype's scale for this page — 27 / 32 / 82 at 1920, defined on
   `.ab-stage`. See the ABOUT PAGE block in globals.css for why it is 0.9x the
   PDF export's. */
const EYEBROW = "text-[length:var(--ab-eyebrow)]";
const BODY = "text-[length:var(--ab-body)]";

export function AboutPage() {
  return (
    <>
      {/* ================= HERO ================= */}
      {/* `overflow-x: clip` rather than `hidden`: the head deliberately spills
          down into the band below (which `hidden` would cut off), but its right
          edge runs past the artboard and must not widen the document. */}
      <section
        aria-labelledby="about-heading"
        data-tilt="scene"
        className="relative overflow-x-clip bg-white"
      >
        <div className="ab-stage ab-hero">
          {/* One flow column rather than four separately placed blocks. Placing
              each at its own percentage of the stage made the spacing between
              them a function of the viewport: the stage's height scales with
              width, but `--ab-*` type does not shrink with it (the mid-terms
              carry a rem component), so the artboard's gaps opened into a hole
              under the headline at 1920 and closed to 3-7px — all but a
              collision — at 1024. Stacked, the rhythm is set in `em` of the
              display size and holds at every width. */}
          <div className="ab-hero-copy">
            <Reveal className="ab-hero-eyebrow">
              <p className={cn("font-bold tracking-normal text-brand uppercase", EYEBROW)}>
                {aboutHero.eyebrow}
              </p>
            </Reveal>

            <Reveal
              as="h1"
              id="about-heading"
              className="ab-hero-title text-[length:var(--ab-display)] leading-[1.2] font-bold tracking-normal text-ink-950"
            >
              {aboutHero.line1} <span className="block text-brand-sky">{aboutHero.line2}</span>
            </Reveal>

            <Reveal className="ab-hero-body">
              <p className={cn("leading-[1.2] font-light text-pretty text-ink-800", BODY)}>
                {aboutHero.body}
              </p>
            </Reveal>

            <Reveal className="ab-hero-links flex flex-wrap items-center gap-x-[7.7rem] gap-y-6">
              {aboutHero.links.map((l) => (
                <UnderlineLink key={l.label} href={l.href}>
                  <span className={l.accent ? "text-brand-sky" : undefined}>{l.label}</span>
                </UnderlineLink>
              ))}
            </Reveal>
          </div>

          {/* Overflows into the band below, as in the artboard */}
          <div
            aria-hidden="true"
            className="ab-at ab-hero-head pointer-events-none z-10 max-lg:absolute max-lg:-top-4 max-lg:right-0 max-lg:w-[46%] max-lg:opacity-25"
          >
            <Image suppressHydrationWarning
              src="/images/about-head.png"
              alt=""
              width={1200}
              height={1200}
              priority
              sizes="(max-width: 1024px) 46vw, 55vw"
              className="art-3d animate-float-3d h-auto w-full"
            />
          </div>
        </div>
      </section>

      {/* ================= WHO WE ARE ================= */}
      <ParallaxBand src="/images/about-circuit.jpg" labelledBy="who-heading" className="on-dark">
        <div className="ab-stage ab-circuit">
          <div className="ab-at ab-who-copy at-col">
            <Reveal>
              <p className={cn("font-bold tracking-normal text-brand uppercase", EYEBROW)}>
                {aboutWho.eyebrow}
              </p>
            </Reveal>
            <Reveal
              as="h2"
              id="who-heading"
              className="at-title text-[length:var(--ab-display)] leading-[1.2] font-bold tracking-normal text-white"
            >
              {aboutWho.line1} <span className="block">{aboutWho.line2}</span>
            </Reveal>
          </div>
        </div>
      </ParallaxBand>

      {/* ================= PHILOSOPHY =================
          Held while its three principles are read — the section and the list
          are one movement, so `PhilosophyPin` owns the `<section>` itself. */}
      <ScrollPin labelledBy="philosophy-heading" sceneTilt className="ab-phi-pin bg-white">
        <div className="ab-stage ab-philosophy">
          <Reveal
            variant="scale"
            className="ab-at ab-phi-chip pointer-events-none max-lg:mx-auto max-lg:w-[62%]"
          >
            <Image suppressHydrationWarning
              src="/images/about-chip.png"
              alt=""
              width={1000}
              height={1000}
              sizes="(max-width: 1024px) 62vw, 40vw"
              style={{ "--float-phase": "-4.5s" } as React.CSSProperties}
              className="art-3d animate-float-3d h-auto w-full"
            />
          </Reveal>

          <div className="ab-at ab-phi-copy at-col max-lg:mt-12">
            <Reveal>
              <p className={cn("font-bold tracking-normal text-brand uppercase", EYEBROW)}>
                {aboutPhilosophy.eyebrow}
              </p>
            </Reveal>

            <Reveal
              as="h2"
              id="philosophy-heading"
              className="at-title text-[length:var(--ab-display)] leading-[1.2] font-bold tracking-normal text-ink-950"
            >
              {aboutPhilosophy.line1}{" "}
              <span className="text-brand-sky">{aboutPhilosophy.line2}</span>
            </Reveal>

            <Reveal className="at-tail">
              <PhilosophyScroller />
            </Reveal>
          </div>
        </div>
      </ScrollPin>

      {/* ================= OUR JOURNEY ================= */}
      <section aria-labelledby="journey-heading" className="on-dark relative isolate overflow-hidden">
        <Image suppressHydrationWarning
          src="/images/about-journey.jpg"
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="ab-stage ab-journey">
          <div className="ab-at ab-jr-head at-col text-center">
            <Reveal>
              <p className={cn("font-bold tracking-[0.02em] text-brand uppercase", EYEBROW)}>
                {aboutJourney.eyebrow}
              </p>
            </Reveal>

            <Reveal
              as="h2"
              id="journey-heading"
              className="at-title text-[length:var(--ab-display)] leading-[1.2] font-bold tracking-normal text-white"
            >
              {aboutJourney.line1}{" "}
              <span className="text-brand-sky">{aboutJourney.line2}</span>
            </Reveal>
          </div>

          {/* Not wrapped in a `Reveal`: the timeline's blocks are `.ab-at`,
              positioned against the stage, and any wrapper carrying a
              `translate` becomes their containing block instead. It reveals
              its own blocks from the inside. */}
          <JourneyTimeline />
        </div>
      </section>

      {/* ================= CLOSING ================= */}
      <section aria-labelledby="about-cta-heading" className="on-dark relative isolate overflow-hidden">
        <Image suppressHydrationWarning src="/images/about-cta.jpg" alt="" fill sizes="100vw" className="-z-10 object-cover" />
        <PointerField />
        <div className="ab-stage ab-cta">
          <div className="ab-at ab-cta-copy at-col">
            <Reveal
              as="h2"
              id="about-cta-heading"
              className="text-[length:clamp(1.5rem,3.44vw,4.13rem)] leading-[1.2] font-light text-pretty text-white"
            >
              {aboutCta.lead}
              <strong className="font-bold">{aboutCta.emphasis}</strong>
            </Reveal>

            <Reveal className="at-tail flex flex-wrap items-center gap-x-[3.4rem] gap-y-6">
              {aboutCta.links.map((l) => (
                <UnderlineLink key={l.label} href={l.href} tone="light">
                  {l.label}
                </UnderlineLink>
              ))}
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
