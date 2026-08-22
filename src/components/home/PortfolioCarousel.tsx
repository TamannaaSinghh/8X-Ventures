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
    // The artboard's vertical run was budgeted around a taller card. With
    // the card at the size it actually draws, the section is paced to sit
    // inside one viewport — heading, cards and controls scroll as one.
    <section
      aria-labelledby="portfolio-heading"
      className="relative bg-white py-12 lg:pt-16 lg:pb-14"
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
            className="mt-6 lg:mt-9"
          >
            {/* `overflow-x: clip` (not hidden) keeps the off-centre slides from
                widening the document — which would break WCAG 1.4.10 Reflow —
                while still allowing the cards to breathe vertically: `clip` is
                the one value that pairs with a `visible` cross axis, so a card
                that runs long overlaps rather than being cut off.
                The track is height-bound because the slides are absolutely
                positioned; it is set just above the tallest card. */}
            <div className="relative mx-auto h-[350px] max-w-[1720px] overflow-x-clip sm:h-[375px] lg:h-[395px]">
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
                      "absolute top-1/2 left-1/2 w-[min(86vw,380px)]",
                      "overflow-hidden rounded-[28px] transition-[transform,opacity] duration-700 ease-[var(--ease-out-expo)]",
                      "[will-change:transform,opacity]",
                      active && "z-30 block opacity-100 shadow-[0_30px_70px_-30px_rgba(0,60,120,0.45)]",
                      aside &&
                        "z-20 hidden opacity-100 shadow-[0_18px_44px_-30px_rgba(0,60,120,0.4)] lg:block",
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
                    {/* White on every card, active or preview: several of the
                        supplied logos carry their own white or grey plate, so
                        a tinted panel behind them shows as a pale rectangle.
                        The preview cards are set apart by their shadow and
                        their tinted detail panel instead. */}
                    <div className="relative aspect-[16/9] w-full bg-white">
                      <Image
                        src={company.image}
                        alt={active ? company.imageAlt : ""}
                        fill
                        sizes="(max-width: 640px) 86vw, 380px"
                        className={cn("object-contain p-[7%]", !active && "opacity-40")}
                      />
                    </div>

                    {/* Detail panel */}
                    <div
                      className={cn(
                        "px-5 pt-4 pb-5 lg:px-6 lg:pb-6",
                        active
                          ? "bg-brand-sky text-white"
                          : /* Preview only — inert and hidden from assistive tech,
                               so it is exempt from the contrast minimum. */
                            "bg-brand-pale text-brand-sky/45",
                      )}
                    >
                      <ul role="list" className="flex flex-wrap gap-2">
                        {[company.sector, company.vehicle].map((tag) => (
                          <li
                            key={tag}
                            className={cn(
                              "rounded-full border px-3 py-1 text-[11px] font-medium sm:text-xs",
                              active ? "border-white/70" : "border-brand-sky/30",
                            )}
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>

                      <h3 className="mt-3.5 text-[clamp(1.25rem,2vw,1.625rem)] leading-tight font-normal">
                        {company.name}
                      </h3>

                      <p className="mt-1 text-[clamp(0.9rem,1.15vw,1rem)]">
                        <span className="font-bold">{company.metric.value}</span>{" "}
                        <span className="font-normal">{company.metric.label}</span>
                      </p>

                      {company.quote && (
                        <blockquote className="mt-3 text-[clamp(0.775rem,0.9vw,0.8125rem)] leading-relaxed">
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
              className="mt-5 lg:mt-4"
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

        <Reveal delay={200} className="mt-8 flex justify-center lg:mt-10">
          <UnderlineLink href="/portfolio">View All Portfolio</UnderlineLink>
        </Reveal>
      </div>
    </section>
  );
}
