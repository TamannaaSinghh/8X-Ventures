"use client";

import Image from "next/image";
import Link from "next/link";
import { MentorRail } from "@/components/team/MentorRail";
import { CardArrow } from "@/components/ui/CardArrow";
import { Reveal } from "@/components/ui/Reveal";
import { UnderlineLink } from "@/components/ui/UnderlineLink";
import { teamCta, teamGroup, teamHero, teamMentors, teamPartners, type Person } from "@/content/team";
import { cn } from "@/lib/cn";

/* The inner pages' scale — 27 / 32 / 82 at 1920. */
const EYEBROW = "text-[length:var(--ab-eyebrow)]";
const BODY = "text-[length:var(--ab-body)]";
const DISPLAY = "text-[length:var(--ab-display)] leading-[1.2] font-bold tracking-normal";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4 shrink-0">
      <path d="M6.94 8.5H4.06V20h2.88zM5.5 3.6a1.67 1.67 0 1 0 0 3.34 1.67 1.67 0 0 0 0-3.34M20 13.44c0-2.9-1.55-4.25-3.62-4.25a3.12 3.12 0 0 0-2.84 1.56h-.04V8.5H10.7V20h2.88v-5.69c0-1.5.29-2.95 2.15-2.95 1.83 0 1.86 1.71 1.86 3.05V20H20z" />
    </svg>
  );
}

/**
 * A portrait card: name and role at the top, the cut-out portrait below, and
 * the person's bio and LinkedIn on hover.
 *
 * The card is the grid's own item, not wrapped in one — the grids size their
 * children with `.tm-pt-grid .tm-card { width: ... }`, so an intermediate
 * element takes that width instead and the card, which has only an aspect
 * ratio, collapses to nothing.
 *
 * The whole card navigates to the profile, but the anchor is the name and it
 * is stretched over the card rather than the card being a `div` with a click
 * handler: that keeps real link semantics — a URL to open in a new tab, a
 * context menu, and keyboard support without reimplementing Enter and Space.
 * LinkedIn sits above the stretched link and is a sibling of it, so the two
 * anchors never nest.
 */
function PersonCard({
  person,
  variant,
  index = 0,
}: {
  person: Person;
  variant: "partner" | "team";
  /** Position in its grid, so a row of cards arrives one after another. */
  index?: number;
}) {
  return (
    <Reveal
      as="article"
      variant="card"
      delay={Math.min(index, 5) * 90}
      data-tilt="card"
      data-card-arrow=""
      className={cn("tm-card", variant === "team" && "tm-card-sm")}
    >
      <CardArrow />

      <div className="tm-card-head">
        <h3 className="tm-card-name">
          <Link href={`/team/${person.id}`} className="tm-card-open">
            {person.name}
          </Link>
        </h3>
        <p className="tm-card-role">{person.role}</p>
      </div>

      <div className="tm-card-photo">
        <Image
          src={person.image}
          alt=""
          fill
          sizes="(max-width: 1024px) 45vw, 21vw"
          className="object-contain object-bottom"
        />
      </div>

      <div className="tm-card-bio">
        <p>{person.bio}</p>
        <a
          href={person.linkedin}
          target="_blank"
          rel="noreferrer noopener"
          className="tm-card-link"
        >
          <LinkedInIcon />
          LinkedIn
          <span className="sr-only-8x">{` profile for ${person.name} (opens in a new tab)`}</span>
        </a>
      </div>
    </Reveal>
  );
}

export function TeamPage() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section
        aria-labelledby="team-heading"
        data-tilt="scene"
        className="tm-hero-section relative overflow-x-clip bg-white"
      >
        <div className="tm-stage tm-hero">
          <Reveal as="h1" id="team-heading" className={cn("tm-at tm-hero-title text-ink-950", DISPLAY)}>
            {teamHero.line1} <span className="block text-brand-sky">{teamHero.line2}</span>
          </Reveal>

          <Reveal className="tm-at tm-hero-body max-lg:mt-8">
            <p className={cn("leading-[1.2] font-light text-pretty text-ink-800", BODY)}>
              {teamHero.body}
            </p>
          </Reveal>

          {/* Runs on down into the band below, as in the artboard */}
          <div
            aria-hidden="true"
            className="tm-at tm-hero-engine pointer-events-none z-10 max-lg:absolute max-lg:-top-6 max-lg:right-0 max-lg:w-[52%] max-lg:opacity-30"
          >
            <Image
              src="/images/team-engine.png"
              alt=""
              width={1500}
              height={1500}
              priority
              sizes="(max-width: 1024px) 52vw, 57vw"
              className="art-3d h-auto w-full"
            />
          </div>
        </div>
      </section>

      {/* ================= PARTNERS & BOARD ================= */}
      <section aria-labelledby="partners-heading" className="on-dark relative isolate overflow-hidden bg-[#144a7e]">
        <div aria-hidden="true" className="tm-partners-bg">
          <Image src="/images/team-gradient.jpg" alt="" width={2400} height={1600} sizes="140vw" priority />
        </div>

        <div className="tm-stage tm-partners">
          <Reveal className="tm-at tm-pt-eyebrow text-center">
            <p className={cn("font-bold tracking-[0.02em] text-brand-sky uppercase", EYEBROW)}>
              {teamPartners.eyebrow}
            </p>
          </Reveal>

          <Reveal
            as="h2"
            id="partners-heading"
            className={cn("tm-at tm-pt-title text-center text-white max-lg:mt-3", DISPLAY)}
          >
            {teamPartners.line1} <span className="text-brand-sky">{teamPartners.line2}</span>
          </Reveal>

          <Reveal className="tm-at tm-pt-body max-lg:mt-6">
            <p className={cn("text-center leading-[1.35] font-light text-pretty text-white/95", BODY)}>
              {teamPartners.body}
            </p>
          </Reveal>

          <div className="tm-at tm-pt-grid">
            {teamPartners.people.map((p, i) => (
              <PersonCard key={p.id} person={p} variant="partner" index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= THE TEAM ================= */}
      <section aria-labelledby="the-team-heading" className="relative bg-white">
        <div className="tm-stage tm-group">
          <Reveal className="tm-at tm-gp-eyebrow text-center">
            <p className={cn("font-bold tracking-[0.02em] text-brand uppercase", EYEBROW)}>
              {teamGroup.eyebrow}
            </p>
          </Reveal>

          <Reveal
            as="h2"
            id="the-team-heading"
            className={cn("tm-at tm-gp-title text-center text-ink-950 max-lg:mt-3", DISPLAY)}
          >
            {teamGroup.line1} <span className="text-brand-sky">{teamGroup.line2}</span>
          </Reveal>

          <Reveal className="tm-at tm-gp-body max-lg:mt-6">
            <p className={cn("text-center leading-[1.2] font-light text-pretty text-ink-800", BODY)}>
              {teamGroup.body}
            </p>
          </Reveal>

          <div className="tm-at tm-gp-grid">
            {teamGroup.people.map((p, i) => (
              <PersonCard key={p.id} person={p} variant="team" index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= MENTORS ================= */}
      <section aria-labelledby="mentors-heading" className="on-dark relative isolate overflow-hidden bg-[#023363]">
        <div aria-hidden="true" className="tm-mentors-art">
          <Image
            src="/images/team-infinity.jpg"
            alt=""
            width={1200}
            height={1500}
            sizes="(max-width: 1024px) 80vw, 51vw"
            className="h-auto w-full"
          />
        </div>

        <div className="tm-stage tm-mentor-band">
          <Reveal className="tm-at tm-mt-eyebrow">
            <p className={cn("font-bold tracking-[0.02em] text-brand-sky uppercase", EYEBROW)}>
              {teamMentors.eyebrow}
            </p>
          </Reveal>

          <Reveal
            as="h2"
            id="mentors-heading"
            className={cn("tm-at tm-mt-title text-white max-lg:mt-3", DISPLAY)}
          >
            {teamMentors.line1} <span className="block">{teamMentors.line2}</span>
          </Reveal>

          <Reveal delay={120} className="tm-at tm-mt-list max-lg:mt-10">
            <MentorRail />
          </Reveal>

          <Reveal className="tm-at tm-mt-closing max-lg:mt-10">
            <p className="tm-mt-closing-text font-bold text-white">
              {teamMentors.closing1}
              <span className="block">{teamMentors.closing2}</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= CLOSING ================= */}
      <section aria-labelledby="team-cta-heading" className="on-dark relative isolate overflow-hidden bg-[#0096d0]">
        <div aria-hidden="true" className="tm-cta-bg">
          <Image src="/images/team-gradient.jpg" alt="" width={2400} height={1600} sizes="180vw" />
        </div>

        <div className="tm-stage tm-cta">
          <Reveal
            as="h2"
            id="team-cta-heading"
            className="tm-at tm-cta-title text-center leading-[1.2] text-white"
          >
            <span className="block font-light">{teamCta.line1}</span>
            <span className="block font-bold">{teamCta.line2}</span>
          </Reveal>

          <Reveal className="tm-at tm-cta-link flex justify-center max-lg:mt-10">
            <UnderlineLink href={teamCta.link.href} tone="light">
              {teamCta.link.label}
            </UnderlineLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
