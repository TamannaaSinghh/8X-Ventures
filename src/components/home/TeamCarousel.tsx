"use client";

import Image from "next/image";
import { CarouselControls } from "@/components/ui/CarouselControls";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { UnderlineLink } from "@/components/ui/UnderlineLink";
import { team, teamIntro } from "@/content/home";
import { useCarousel } from "@/hooks/useCarousel";
import { cn } from "@/lib/cn";

/** Left edge of each slot, as a percentage of the 1920 artboard. Index 2 is
 *  the featured position. */
const SLOT_LEFT = [6.406, 23.021, 39.74, 61.562, 78.385];

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4 shrink-0">
      <path d="M6.94 8.5H4.06V20h2.88zM5.5 3.6a1.67 1.67 0 1 0 0 3.34 1.67 1.67 0 0 0 0-3.34M20 13.44c0-2.9-1.55-4.25-3.62-4.25a3.12 3.12 0 0 0-2.84 1.56h-.04V8.5H10.7V20h2.88v-5.69c0-1.5.29-2.95 2.15-2.95 1.83 0 1.86 1.71 1.86 3.05V20H20z" />
    </svg>
  );
}

export function TeamCarousel() {
  const centre = Math.floor(team.length / 2);
  /* Opens on the member the artboard features in the centre slot. */
  const { index, goTo, next, prev, onKeyDown, offsetOf } = useCarousel({
    length: team.length,
    initialIndex: centre,
  });
  const active = team[index];

  return (
    <section
      aria-labelledby="team-heading"
      className="on-dark relative isolate overflow-hidden"
    >
      <Image src="/images/team-bg.jpg" alt="" fill sizes="100vw" className="-z-10 object-cover" />

      <div className="team-stage">
        <Reveal className="team-eyebrow text-center">
          <Eyebrow tone="light">{teamIntro.eyebrow}</Eyebrow>
        </Reveal>

        <Reveal className="team-heading text-center">
          <h2
            id="team-heading"
            className="text-[length:var(--text-display)] leading-[1.16] font-bold text-white"
          >
            {teamIntro.line1}{" "}
            <span className="block text-brand">{teamIntro.line2}</span>
          </h2>
        </Reveal>

        <Reveal className="team-body text-center">
          <p className="mx-auto max-w-[62ch] text-[length:var(--text-body-lg)] leading-[1.4] font-light text-pretty text-white">
            {teamIntro.body}
          </p>
        </Reveal>

        {/* --- Cards --- */}
        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="The 8X Ventures team"
          onKeyDown={onKeyDown}
          className="team-strip"
        >
          {team.map((member, i) => {
            const slot = centre + offsetOf(i);
            const featured = i === index;
            const left = SLOT_LEFT[slot];
            /* Off-strip members are removed from layout rather than parked
               out of view, so they never widen the document. */
            if (left === undefined) return null;

            return (
              <div
                key={member.id}
                data-featured={featured}
                /* Passed as a custom property, not `left`, so the slot only
                   applies where the traced composition does — an inline
                   `left` would also shift the relatively-positioned card on
                   narrow screens. */
                style={{ "--slot-left": `${left}%` } as React.CSSProperties}
                className={cn(
                  "team-card w-[min(78vw,320px)]",
                  featured ? "bg-gradient-to-b from-[#6FBEE6] to-[#3FA3D8]" : "bg-[#4f4f4f]",
                )}
              >
                <div className="px-[6%] pt-[5%] pb-[3%]">
                  <h3 className="text-[length:clamp(1.125rem,1.719vw,2.0625rem)] leading-tight font-normal text-white">
                    {member.name}
                  </h3>
                  <p className="mt-[0.35em] text-[length:clamp(0.625rem,0.625vw,0.75rem)] tracking-[0.07em] whitespace-nowrap text-white/85 uppercase">
                    {member.role}
                  </p>
                </div>

                <div className="relative min-h-0 flex-1">
                  <Image
                    src={member.image}
                    alt=""
                    /* Carries its own grayscale, which a keyframed arrival
                       would override and then snap back on. */
                    data-img-in="fade"
                    fill
                    sizes="(max-width: 1024px) 78vw, 21vw"
                    className={cn(
                      "object-cover object-top transition-[filter] duration-700",
                      !featured && "grayscale",
                    )}
                  />
                </div>

                {/* Bio + LinkedIn, revealed on hover or keyboard focus */}
                {/* Type sizes come from `.team-bio` in globals.css, in `cqw`
                    so they scale with the card rather than the viewport. */}
                <div className="team-bio">
                  <p className="text-white/95">{member.bio}</p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-[4cqw] inline-flex items-center gap-2 rounded-full border border-white/50 px-[4cqw] py-[2cqw] font-semibold text-white transition-colors duration-300 hover:bg-white/15"
                  >
                    <LinkedInIcon />
                    LinkedIn
                    <span className="sr-only-8x">
                      {` profile for ${member.name} (opens in a new tab)`}
                    </span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* The stage positions the strip and the controls separately, so they
            cannot share a wrapper. The same key handler is attached to both so
            arrow keys work wherever focus sits within the carousel. */}
        <div className="team-controls" onKeyDown={onKeyDown}>
          <CarouselControls
            labels={team.map((m) => `${m.name}, ${m.role}`)}
            index={index}
            onPrev={prev}
            onNext={next}
            onSelect={goTo}
            subject="team member"
            tone="light"
          />
          <p aria-live="polite" className="sr-only-8x">
            {`Showing ${active.name}, ${active.role}. ${index + 1} of ${team.length}.`}
          </p>
        </div>

        <Reveal className="team-cta mt-10 flex justify-center lg:mt-0">
          <UnderlineLink href={teamIntro.cta.href} tone="light">
            {teamIntro.cta.label}
          </UnderlineLink>
        </Reveal>
      </div>
    </section>
  );
}
