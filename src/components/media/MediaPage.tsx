import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { UnderlineLink } from "@/components/ui/UnderlineLink";
import { lpDay } from "@/content/home";
import { mediaBook, mediaCta, mediaHero, mediaInsights } from "@/content/media";

/* The frame's arrow: a 47 x 32 shaft-and-head at the right of each LP Day
   card's bar. Decorative — the card's own text names the destination. */
function ArrowRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="h-6 w-6 shrink-0 text-brand transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5 lg:h-8 lg:w-8"
    >
      <path
        d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 20 22" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M19 9.27a1.5 1.5 0 0 1 0 2.6L2.75 21.25A1.5 1.5 0 0 1 .5 19.95V2.19A1.5 1.5 0 0 1 2.75.89Z" />
    </svg>
  );
}

export function MediaPage() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section aria-labelledby="media-heading" data-tilt="scene" className="md-hero">
        <div className="md-shell">
          <div className="md-hero-copy">
            <Reveal>
              <h1 id="media-heading" className="md-display text-ink-950">
                <span className="block">{mediaHero.line1}</span>
                <span className="block text-brand-sky">{mediaHero.line2}</span>
              </h1>
            </Reveal>

            <Reveal delay={80}>
              <p className="md-copy md-hero-body text-ink-600">{mediaHero.body}</p>
            </Reveal>
          </div>

          {/* Decorative: the mark is the site's own, and the headline beside
              it already says what the page is. */}
          <Reveal variant="scale" delay={40} className="md-hero-art">
            <Image
              src={mediaHero.art.src}
              alt=""
              width={mediaHero.art.width}
              height={mediaHero.art.height}
              priority
              sizes="(max-width: 1024px) 100vw, 51vw"
              className="art-3d h-auto w-full"
            />
          </Reveal>
        </div>
      </section>

      {/* ================= THE BOOK ================= */}
      <section aria-labelledby="book-heading" data-tilt="scene" className="md-book">
        <div className="md-shell md-book-grid">
          <Reveal variant="scale" className="md-book-art">
            <Image
              src={mediaBook.cover.src}
              alt={mediaBook.cover.alt}
              width={mediaBook.cover.width}
              height={mediaBook.cover.height}
              sizes="(max-width: 1024px) 70vw, 26vw"
              className="art-3d h-auto w-full"
            />
          </Reveal>

          <div className="md-book-copy">
            <Reveal as="h2" id="book-heading" className="md-display text-ink-950">
              <span className="block">{mediaBook.line1}</span>
              <span className="block text-brand-sky">{mediaBook.line2}</span>
            </Reveal>

            {mediaBook.paragraphs.map((paragraph, i) => (
              <Reveal as="p" key={paragraph} delay={80 + i * 80} className="md-copy text-ink-600">
                {paragraph}
              </Reveal>
            ))}

            <Reveal delay={240} className="md-book-cta">
              <UnderlineLink href={mediaBook.cta.href}>{mediaBook.cta.label}</UnderlineLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= LP DAY ================= */}
      <section aria-labelledby="lpday-heading" className="md-lpday">
        <div className="md-shell">
          <Reveal className="text-center">
            <p className="md-eyebrow">{lpDay.eyebrow}</p>
            <h2 id="lpday-heading" className="md-display md-lpday-title text-balance text-ink-950">
              {lpDay.line1} <span className="text-brand-sky">{lpDay.line2}</span>
            </h2>
            <p className="md-copy md-lpday-body text-pretty text-ink-600">{lpDay.body}</p>
          </Reveal>

          <ul role="list" className="md-lp-cards">
            {lpDay.editions.map((edition, i) => (
              <Reveal as="li" variant="card" key={edition.year} delay={i * 120}>
                <Link href={edition.href} data-tilt="card" className="group md-lp-card">
                  <div className="md-lp-still">
                    <Image
                      src={edition.image}
                      alt={edition.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 92vw, 41vw"
                      className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                    />
                    {/* The frame's own wash under the year. Not enough on its
                        own to guarantee 4.5:1 over a bright still — see README. */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(to top, rgba(6,34,71,0.45) 0%, rgba(6,34,71,0.18) 18%, rgba(6,34,71,0) 40%)",
                      }}
                    />
                    <p className="md-lp-year">{edition.year}</p>
                  </div>

                  <div className="md-lp-foot">
                    <span className="md-copy text-ink-400">{`Gallery & Highlights`}</span>
                    <ArrowRight />
                    <span className="sr-only-8x">{`for LP Day ${edition.year}`}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= INSIGHTS ================= */}
      <section aria-labelledby="insights-heading" className="md-insights">
        <div className="md-shell">
          <Reveal className="text-center">
            <p className="md-eyebrow">{mediaInsights.eyebrow}</p>
            <h2 id="insights-heading" className="md-display md-ins-title text-balance text-ink-950">
              <span className="block">{mediaInsights.line1}</span>
              <span className="block text-brand-sky">{mediaInsights.line2}</span>
            </h2>
            <p className="md-copy md-ins-body text-pretty text-ink-600">{mediaInsights.body}</p>
          </Reveal>

          <ul role="list" className="md-ins-cards">
            {mediaInsights.items.map((item, i) => (
              <Reveal as="li" variant="card" key={item.title} delay={i * 120}>
                <Link href={item.href} data-tilt="card" className="group md-ins-card">
                  <div aria-hidden="true" className="md-ins-plate">
                    <span className="md-ins-play">
                      <PlayGlyph />
                    </span>
                  </div>

                  <div className="md-ins-text">
                    <h3 className="md-ins-name">{item.title}</h3>
                    <span className="md-ins-kicker">{item.kicker}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= CLOSING ================= */}
      <section aria-labelledby="media-cta-heading" className="on-dark md-cta">
        <Image
          src="/images/media-cta-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover"
        />

        <div className="md-shell">
          <Reveal as="h2" id="media-cta-heading" className="md-cta-title text-center text-balance">
            <span className="block">{mediaCta.line1}</span>
            <span className="block">
              {mediaCta.line2} <span className="pl-[0.26em] font-bold">{mediaCta.emphasis}</span>
            </span>
          </Reveal>

          <Reveal delay={120} className="md-cta-link flex justify-center">
            <UnderlineLink href={mediaCta.link.href} tone="light">
              {mediaCta.link.label}
            </UnderlineLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
