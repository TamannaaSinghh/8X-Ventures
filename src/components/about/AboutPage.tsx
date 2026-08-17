import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { UnderlineLink } from "@/components/ui/UnderlineLink";
import { JourneyTimeline } from "@/components/about/JourneyTimeline";
import { PhilosophyScroller } from "@/components/about/PhilosophyScroller";
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
      <section aria-labelledby="about-heading" className="relative overflow-x-clip bg-white">
        <div className="ab-stage ab-hero">
          <Reveal className="ab-at ab-hero-eyebrow">
            <p className={cn("font-bold tracking-normal text-brand uppercase", EYEBROW)}>
              {aboutHero.eyebrow}
            </p>
          </Reveal>

          <Reveal
            as="h1"
            id="about-heading"
            className="ab-at ab-hero-title text-[length:var(--ab-display)] leading-[1.2] font-bold tracking-normal text-ink-950"
          >
            {aboutHero.line1} <span className="block text-brand-sky">{aboutHero.line2}</span>
          </Reveal>

          <Reveal className="ab-at ab-hero-body max-lg:mt-8">
            <p className={cn("leading-[1.2] font-light text-pretty text-ink-800", BODY)}>
              {aboutHero.body}
            </p>
          </Reveal>

          <Reveal className="ab-at ab-hero-links flex flex-wrap items-center gap-x-[7.7rem] gap-y-6 max-lg:mt-10">
            {aboutHero.links.map((l) => (
              <UnderlineLink key={l.label} href={l.href}>
                <span className={l.accent ? "text-brand-sky" : undefined}>{l.label}</span>
              </UnderlineLink>
            ))}
          </Reveal>

          {/* Overflows into the band below, as in the artboard */}
          <div
            aria-hidden="true"
            className="ab-at ab-hero-head pointer-events-none z-10 max-lg:absolute max-lg:-top-4 max-lg:right-0 max-lg:w-[46%] max-lg:opacity-25"
          >
            <Image
              src="/images/about-head.png"
              alt=""
              width={1200}
              height={1200}
              priority
              sizes="(max-width: 1024px) 46vw, 55vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      {/* ================= WHO WE ARE ================= */}
      <section aria-labelledby="who-heading" className="on-dark relative isolate overflow-hidden">
        <Image
          src="/images/about-circuit.jpg"
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="ab-stage ab-circuit">
          <Reveal className="ab-at ab-who-eyebrow">
            <p className={cn("font-bold tracking-normal text-brand uppercase", EYEBROW)}>
              {aboutWho.eyebrow}
            </p>
          </Reveal>
          <Reveal
            as="h2"
            id="who-heading"
            className="ab-at ab-who-title text-[length:var(--ab-display)] leading-[1.2] font-bold tracking-normal text-white max-lg:mt-4"
          >
            {aboutWho.line1} <span className="block">{aboutWho.line2}</span>
          </Reveal>
        </div>
      </section>

      {/* ================= PHILOSOPHY ================= */}
      <section aria-labelledby="philosophy-heading" className="relative overflow-hidden bg-white">
        <div className="ab-stage ab-philosophy">
          <Reveal
            variant="scale"
            className="ab-at ab-phi-chip pointer-events-none max-lg:mx-auto max-lg:w-[62%]"
          >
            <Image
              src="/images/about-chip.png"
              alt=""
              width={1000}
              height={1000}
              sizes="(max-width: 1024px) 62vw, 40vw"
              className="h-auto w-full"
            />
          </Reveal>

          <Reveal className="ab-at ab-phi-eyebrow max-lg:mt-12">
            <p className={cn("font-bold tracking-normal text-brand uppercase", EYEBROW)}>
              {aboutPhilosophy.eyebrow}
            </p>
          </Reveal>

          <Reveal
            as="h2"
            id="philosophy-heading"
            className="ab-at ab-phi-title text-[length:var(--ab-display)] leading-[1.2] font-bold tracking-normal text-ink-950 max-lg:mt-3"
          >
            {aboutPhilosophy.line1}{" "}
            <span className="text-brand-sky">{aboutPhilosophy.line2}</span>
          </Reveal>

          <Reveal className="ab-at ab-phi-list max-lg:mt-10">
            <PhilosophyScroller />
          </Reveal>
        </div>
      </section>

      {/* ================= OUR JOURNEY ================= */}
      <section aria-labelledby="journey-heading" className="on-dark relative isolate overflow-hidden">
        <Image
          src="/images/about-journey.jpg"
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="ab-stage ab-journey">
          <Reveal className="ab-at ab-jr-eyebrow text-center">
            <p className={cn("font-bold tracking-[0.02em] text-brand uppercase", EYEBROW)}>
              {aboutJourney.eyebrow}
            </p>
          </Reveal>

          <Reveal
            as="h2"
            id="journey-heading"
            className="ab-at ab-jr-title text-center text-[length:var(--ab-display)] leading-[1.2] font-bold tracking-normal text-white max-lg:mt-3"
          >
            {aboutJourney.line1}{" "}
            <span className="text-brand-sky">{aboutJourney.line2}</span>
          </Reveal>

          <JourneyTimeline />
        </div>
      </section>

      {/* ================= CLOSING ================= */}
      <section aria-labelledby="about-cta-heading" className="on-dark relative isolate overflow-hidden">
        <Image src="/images/about-cta.jpg" alt="" fill sizes="100vw" className="-z-10 object-cover" />
        <div className="ab-stage ab-cta">
          <Reveal
            as="h2"
            id="about-cta-heading"
            className="ab-at ab-cta-title text-[length:clamp(1.5rem,3.44vw,4.13rem)] leading-[1.2] font-light text-pretty text-white"
          >
            {aboutCta.lead}
            <strong className="font-bold">{aboutCta.emphasis}</strong>
          </Reveal>

          <Reveal className="ab-at ab-cta-links flex flex-wrap items-center gap-x-[3.4rem] gap-y-6 max-lg:mt-10">
            {aboutCta.links.map((l) => (
              <UnderlineLink key={l.label} href={l.href} tone="light">
                {l.label}
              </UnderlineLink>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
