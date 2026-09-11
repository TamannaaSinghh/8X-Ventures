import Image from "next/image";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { Reveal } from "@/components/ui/Reveal";
import { PointerField } from "@/components/ui/PointerField";
import { UnderlineLink } from "@/components/ui/UnderlineLink";
import { portfolioCta, portfolioHero, portfolioIntro } from "@/content/portfolio";
import { cn } from "@/lib/cn";

/* The page's type scale, shared with `/about` — 32 / 82 at 1920. */
const BODY = "text-[length:var(--ab-body)]";

export function PortfolioPage() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section
        aria-labelledby="portfolio-heading"
        className="pf-hero-section on-dark relative isolate overflow-hidden"
      >
        <Image suppressHydrationWarning
          src="/images/portfolio-hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          /* the artboard runs the photo off the right edge, not the left */
          className="-z-10 object-cover object-left"
        />
        <div aria-hidden="true" className="pf-hero-scrim" />
        <div className="pf-stage pf-hero">
          <div className="pf-at pf-hero-copy at-col">
            <Reveal
              as="h1"
              id="portfolio-heading"
              className="pf-hero-title font-bold tracking-normal text-white"
            >
              {portfolioHero.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </Reveal>

            <Reveal className="at-body">
              <p className={cn("leading-[1.2] font-light text-pretty text-white", BODY)}>
                {portfolioHero.body}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= THE GRID ================= */}
      <section aria-labelledby="companies-heading" className="relative bg-white">
        {/* The stage is the column: its three blocks — heading, filters, grid —
            are a single stack in flow, and the filters come from
            `PortfolioGrid`, so there is nowhere else to put the wrapper. */}
        <div className="pf-stage pf-list at-col">
          <Reveal
            as="h2"
            id="companies-heading"
            className="pf-list-title text-[length:var(--ab-display)] leading-[1.2] font-bold tracking-normal text-ink-950"
          >
            {portfolioIntro.line1}{" "}
            <span className="text-brand-sky">{portfolioIntro.line2}</span>
          </Reveal>

          <PortfolioGrid />
        </div>
      </section>

      {/* ================= CLOSING ================= */}
      <section aria-labelledby="portfolio-cta-heading" className="on-dark relative isolate overflow-hidden bg-[#023363]">
        {/* The artboard does not use this photograph as-is: it is multiplied
            down, per channel, by #6D8AA3 — measured off the export against the
            source file (R x0.429, G x0.541, B x0.640). The wrapper carries that
            colour and the photograph multiplies into it. */}
        <div aria-hidden="true" className="pf-cta-photo">
          <Image suppressHydrationWarning src="/images/portfolio-cta.jpg" alt="" fill sizes="100vw" className="object-cover mix-blend-multiply" />
        </div>
        <PointerField />
        <div className="pf-stage pf-cta">
          <div className="pf-at pf-cta-copy at-col text-center">
            <Reveal as="h2" id="portfolio-cta-heading" className="pf-cta-title text-white">
              <span className="block font-light">{portfolioCta.lead}</span>
              <span className="block font-bold">{portfolioCta.line1}</span>
              <span className="block font-bold">{portfolioCta.line2}</span>
            </Reveal>

            <Reveal className="at-tail flex justify-center">
              <UnderlineLink href={portfolioCta.link.href} tone="light">
                {portfolioCta.link.label}
              </UnderlineLink>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
