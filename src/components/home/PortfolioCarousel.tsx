"use client";

import Image from "next/image";
import { CarouselControls } from "@/components/ui/CarouselControls";
import { Reveal } from "@/components/ui/Reveal";
import { UnderlineLink } from "@/components/ui/UnderlineLink";
import { portfolio, portfolioHeadline } from "@/content/home";
import { useCarousel } from "@/hooks/useCarousel";
import { cn } from "@/lib/cn";

export function PortfolioCarousel() {
  const { index, goTo, next, prev, onKeyDown, offsetOf } = useCarousel({
    length: portfolio.length,
  });

  return (
    // Bottom padding trimmed so the run from "View All Portfolio" to the
    // journey eyebrow is the artboard's ~207px rather than 256px.
    <section
      aria-labelledby="portfolio-heading"
      className="relative bg-white py-20 lg:pt-32 lg:pb-20"
    >
      <div className="container-8x">
        <Reveal>
          <h2
            id="portfolio-heading"
            className="text-center text-[length:var(--text-display)] leading-[1.1] font-bold tracking-normal text-balance text-ink-900"
          >
            {portfolioHeadline.lead}{" "}
            <span className="text-brand-sky">{portfolioHeadline.accent}</span>
          </h2>
        </Reveal>

        {/* --- Carousel --- */}
        <Reveal delay={120}>
          <div
            role="group"
            aria-roledescription="carousel"
            aria-label="Portfolio companies"
            onKeyDown={onKeyDown}
            className="mt-12 lg:mt-20"
          >
            {/* `overflow-x: clip` (not hidden) keeps the off-centre slides from
                widening the document — which would break WCAG 1.4.10 Reflow —
                while still allowing the cards to breathe vertically. */}
            <div className="relative mx-auto h-[600px] max-w-[1720px] overflow-x-clip sm:h-[680px] lg:h-[760px]">
              {portfolio.map((company, i) => {
                const offset = offsetOf(i);
                const active = offset === 0;
                const aside = Math.abs(offset) === 1;

                return (
                  /* A plain div, not <article>: the implicit `article` role
                     does not permit an explicit `group` role, which the
                     carousel slide pattern requires. */
                  <div
                    key={company.id}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${portfolio.length}: ${company.name}`}
                    aria-hidden={!active}
                    inert={!active}
                    className={cn(
                      /* Positioning is done entirely through the inline
                         `transform` — Tailwind's translate utilities set the
                         separate `translate` property and would compose with
                         it, doubling the offset. */
                      "absolute top-1/2 left-1/2 w-[min(88vw,520px)]",
                      "overflow-hidden rounded-[28px] transition-[transform,opacity] duration-700 ease-[var(--ease-out-expo)]",
                      "[will-change:transform,opacity]",
                      active && "z-30 block opacity-100 shadow-[0_30px_70px_-30px_rgba(0,60,120,0.45)]",
                      aside && "z-20 hidden opacity-100 lg:block",
                      /* Slides further out are removed from layout entirely
                         rather than parked off-screen. */
                      !active && !aside && "hidden",
                    )}
                    style={{
                      transform: active
                        ? "translate(-50%, -50%) scale(1)"
                        : `translate(calc(-50% + ${offset * 97}%), -50%) scale(0.74)`,
                    }}
                  >
                    {/* Photo */}
                    {/* The client supplied logos rather than photography, so
                        the panel is a white plate with the mark held inside
                        it — same box, same aspect, `contain` not `cover`. */}
                    <div className="relative aspect-[47/30] w-full bg-white">
                      {active ? (
                        <Image
                          src={company.image}
                          alt={company.imageAlt}
                          fill
                          sizes="(max-width: 640px) 88vw, 470px"
                          className="object-contain p-[9%]"
                        />
                      ) : null}
                    </div>

                    {/* Detail panel */}
                    <div
                      className={cn(
                        "px-7 pt-6 pb-8 lg:px-8 lg:pb-10",
                        active
                          ? "bg-brand-sky text-white"
                          : /* Preview only — inert and hidden from assistive tech,
                               so it is exempt from the contrast minimum. */
                            "bg-brand-pale text-brand-sky/45",
                      )}
                    >
                      <ul role="list" className="flex flex-wrap gap-3">
                        {[company.sector, company.vehicle].map((tag) => (
                          <li
                            key={tag}
                            className={cn(
                              "rounded-full border px-4 py-1.5 text-xs font-medium sm:text-sm",
                              active ? "border-white/70" : "border-brand-sky/30",
                            )}
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>

                      <h3 className="mt-5 text-[clamp(1.75rem,3.4vw,2.6rem)] leading-tight font-normal">
                        {company.name}
                      </h3>

                      <p className="mt-2 text-[clamp(1.1rem,2vw,1.6rem)]">
                        <span className="font-bold">{company.metric.value}</span>{" "}
                        <span className="font-normal">{company.metric.label}</span>
                      </p>

                      {company.quote && (
                        <blockquote className="mt-5 text-[clamp(0.9rem,1.4vw,1.05rem)] leading-relaxed">
                          <p>
                            &ldquo;{company.quote.text}&rdquo;{" "}
                            <cite className="font-bold not-italic">
                              — {company.quote.attribution}
                            </cite>
                          </p>
                        </blockquote>
                      )}

                      <p className="sr-only-8x">{company.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <CarouselControls
              className="mt-8 lg:mt-4"
              labels={portfolio.map((c) => c.name)}
              index={index}
              onPrev={prev}
              onNext={next}
              onSelect={goTo}
              subject="portfolio company"
            />

            {/* Announces the change for screen reader users */}
            <p aria-live="polite" className="sr-only-8x">
              {`Showing ${portfolio[index].name}, slide ${index + 1} of ${portfolio.length}.`}
            </p>
          </div>
        </Reveal>

        <Reveal delay={200} className="mt-14 flex justify-center lg:mt-20">
          <UnderlineLink href="/portfolio">View All Portfolio</UnderlineLink>
        </Reveal>
      </div>
    </section>
  );
}
