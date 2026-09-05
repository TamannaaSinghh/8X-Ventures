import Image from "next/image";
import { LpDayGallery } from "@/components/media/LpDayGallery";
import { LoopList } from "@/components/ui/LoopList";
import { Reveal } from "@/components/ui/Reveal";
import { UnderlineLink } from "@/components/ui/UnderlineLink";
import {
  lpDayCta,
  lpDayGallery,
  lpDayHero,
  lpDayIntro,
  lpDayProgramme,
  lpDayQuotes,
  lpDayWhy,
} from "@/content/lpday";

/**
 * LP Day, traced from the Figma prototype's frame (node 320-55).
 *
 * Eight bands, in the frame's order: the auditorium hero, the intro, the dark
 * "why it exists" field with its scrolling list, the programme grid, the
 * gallery with a carousel per edition, the quotes field, and the closing panel.
 */
export function LpDayPage() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section aria-labelledby="lp-heading" className="lp-hero">
        <Image
          src={lpDayHero.image}
          alt={lpDayHero.imageAlt}
          fill
          sizes="100vw"
          className="lp-hero-img"
          priority
        />
        {/* The frame's own grade over the photograph, which is what lets the
            white type clear 4.5:1 across a lit stage (WCAG 1.4.3). */}
        <span aria-hidden="true" className="lp-hero-scrim" />

        <div className="lp-hero-copy">
          <Reveal as="p" className="lp-hero-eyebrow">
            {lpDayHero.eyebrow}
          </Reveal>

          <Reveal as="h1" id="lp-heading" className="lp-hero-title">
            <span className="lp-hero-title-1">{lpDayHero.line1}</span>{" "}
            <span className="lp-accent">{lpDayHero.line2}</span>
          </Reveal>

          <Reveal as="p" className="lp-hero-body">
            {lpDayHero.body}
          </Reveal>
        </div>
      </section>

      {/* ================= INTRO ================= */}
      <section aria-labelledby="lp-intro-heading" className="lp-intro">
        <Reveal as="h2" id="lp-intro-heading" className="lp-intro-title">
          <span>{lpDayIntro.line1}</span>{" "}
          <span className="lp-accent">{lpDayIntro.line2}</span>
        </Reveal>

        <Reveal as="p" className="lp-intro-sub">
          <span className="lp-line">{lpDayIntro.sub1}</span>
          <span className="lp-line">{lpDayIntro.sub2}</span>
        </Reveal>

        <Reveal as="p" className="lp-intro-body">
          {lpDayIntro.body}
        </Reveal>
      </section>

      {/* ================= WHY ================= */}
      <section aria-labelledby="lp-why-heading" className="lp-why">
        <Image src={lpDayWhy.image} alt="" fill sizes="100vw" className="lp-why-img" />
        <span aria-hidden="true" className="lp-why-scrim" />

        <div className="lp-why-copy">
          <Reveal as="p" className="lp-eyebrow">
            {lpDayWhy.eyebrow}
          </Reveal>

          <Reveal as="h2" id="lp-why-heading" className="lp-dark-title">
            <span className="lp-line">{lpDayWhy.line1}</span>
            <span className="lp-line lp-accent">{lpDayWhy.line2}</span>
          </Reveal>

          <Reveal className="lp-why-list">
            <LoopList
              items={lpDayWhy.items}
              activeIndex={lpDayWhy.activeIndex}
              label={lpDayWhy.eyebrow}
            />
          </Reveal>

          <Reveal as="p" className="lp-why-close">
            {lpDayWhy.close}
          </Reveal>
        </div>
      </section>

      {/* ================= PROGRAMME ================= */}
      <section aria-labelledby="lp-prog-heading" className="lp-prog">
        <Reveal as="p" className="lp-eyebrow lp-eyebrow-ink">
          {lpDayProgramme.eyebrow}
        </Reveal>

        <Reveal as="h2" id="lp-prog-heading" className="lp-title">
          <span className="lp-line">{lpDayProgramme.line1}</span>
          <span className="lp-line lp-accent">{lpDayProgramme.line2}</span>
        </Reveal>

        <ul role="list" className="lp-prog-grid">
          {lpDayProgramme.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={Math.min(i, 3) * 90} className="lp-prog-item">
              <h3 className="lp-prog-title">{item.title}</h3>
              <p className="lp-prog-body">{item.body}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ================= GALLERY ================= */}
      <section aria-labelledby="lp-gallery-heading" className="lp-gallery">
        <Reveal as="p" className="lp-eyebrow lp-eyebrow-ink">
          {lpDayGallery.eyebrow}
        </Reveal>

        <Reveal as="h2" id="lp-gallery-heading" className="lp-title">
          <span className="lp-line">{lpDayGallery.line1}</span>
          <span className="lp-line lp-accent">{lpDayGallery.line2}</span>
        </Reveal>

        <Reveal as="p" className="lp-gallery-body">
          {lpDayGallery.body}
        </Reveal>

        {lpDayGallery.editions.map((edition) => (
          <LpDayGallery key={edition.year} edition={edition} />
        ))}
      </section>

      {/* ================= QUOTES ================= */}
      <section aria-labelledby="lp-quotes-heading" className="lp-quotes">
        <Image src={lpDayQuotes.image} alt="" fill sizes="100vw" className="lp-quotes-img" />
        <span aria-hidden="true" className="lp-quotes-scrim" />

        <div className="lp-quotes-inner">
          <Reveal as="h2" id="lp-quotes-heading" className="lp-quotes-head">
            {lpDayQuotes.heading}
          </Reveal>

          <ul role="list" className="lp-quotes-grid">
            {lpDayQuotes.items.map((quote, i) => (
              <Reveal as="li" key={quote} delay={Math.min(i, 3) * 120} className="lp-quote">
                <blockquote className="lp-quote-text">{`“${quote}”`}</blockquote>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section aria-labelledby="lp-cta-heading" className="lp-cta">
        <Image src={lpDayCta.image} alt="" fill sizes="100vw" className="lp-cta-img" />

        <div className="lp-cta-inner">
          <Reveal as="h2" id="lp-cta-heading" className="lp-cta-head">
            <span className="lp-line">{lpDayCta.line1}</span>
            <span className="lp-line">{lpDayCta.line2}</span>
            <span className="lp-line lp-cta-strong">{lpDayCta.line3}</span>
          </Reveal>

          <Reveal className="lp-cta-link">
            <UnderlineLink href={lpDayCta.link.href} tone="light">
              {lpDayCta.link.label}
            </UnderlineLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
