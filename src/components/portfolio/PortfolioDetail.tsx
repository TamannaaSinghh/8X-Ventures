import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnvironmentList } from "@/components/portfolio/EnvironmentList";
import { Reveal } from "@/components/ui/Reveal";
import { UnderlineLink } from "@/components/ui/UnderlineLink";
import { portfolioCards } from "@/content/portfolio";
import {
  detailArt,
  detailCta,
  detailLabels,
  eightXView,
  portfolioDetails,
} from "@/content/portfolio-detail";

/**
 * A portfolio company's page, traced from the Figma prototype's
 * `Portfolio / Company` frame (node 302-213).
 *
 * The frame runs eight bands: hero, the four-column fact strip, the centred
 * statement, a full-width photograph, the dark "Why we invested" field, the
 * company snapshot, the dark "8X View" field and the gradient closing panel.
 * They are all here in that order; the measurements live in `globals.css`
 * under `pd-`, in vw against the 1920 artboard, the same way the portfolio
 * grid's are.
 *
 * Everything the frame varies per company comes from `content/portfolio-detail`
 * and everything it repeats — the 8X View copy, the closing panel — is set
 * once there too.
 */

/**
 * The way back to the grid.
 *
 * The frame does not draw one, but a company page is otherwise a dead end —
 * the only route back is the browser's own button or the nav's Portfolio
 * link. `/team/[id]` already carries the same affordance, so this follows it.
 * Set at both ends of the page: at the top where a reader who arrived from
 * the grid looks for it, and at the foot so leaving does not mean scrolling
 * all the way back up.
 *
 * Two links to one destination with one accessible name — the same link
 * twice, which is what it is.
 */
function BackToPortfolio() {
  return (
    <Link href="/portfolio" className="pd-back">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        focusable="false"
        className="pd-back-arrow"
      >
        <path
          d="M19 12H5M11 18l-6-6 6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Back to Portfolio
    </Link>
  );
}

/** What the company is called once the page has already introduced it — the
 *  frame closes the 8X View band on "Neuralzome", not "Neuralzome
 *  Cybernetics". One-word names are already short. */
function shortName(name: string) {
  return name.split(" ")[0];
}

/** The frame sets the first word in ink and the rest in brand blue. */
function splitName(name: string) {
  const [first, ...rest] = name.split(" ");
  if (rest.length === 0) return <span>{first}</span>;
  return (
    <>
      <span className="pd-hero-name-1">{first}</span>{" "}
      <span className="pd-hero-name-2">{rest.join(" ")}</span>
    </>
  );
}

/**
 * Sets one run of the standfirst in brand blue, as the frame does with
 * "off-road robotics". Falls back to plain text when the run is not present,
 * so a rewritten descriptor can never lose a word.
 */
function highlight(text: string, run: string) {
  const at = run ? text.indexOf(run) : -1;
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <strong className="pd-hero-accent">{run}</strong>
      {text.slice(at + run.length)}
    </>
  );
}

export function PortfolioDetail({ id }: { id: string }) {
  const company = portfolioCards.find((c) => c.id === id);
  if (!company) notFound();

  const detail = portfolioDetails[id];
  if (!detail) notFound();

  return (
    <>
      {/* ============================================================ HERO */}
      <section aria-labelledby="company-heading" className="pd-band pd-hero">
        <div className="pd-hero-copy">
          <Reveal className="pd-back-top">
            <BackToPortfolio />
          </Reveal>

          <Reveal as="p" className="pd-eyebrow">
            {detailLabels.heroEyebrow}
          </Reveal>

          <Reveal as="h1" id="company-heading" className="pd-hero-name">
            {splitName(company.name)}
          </Reveal>

          <Reveal as="p" className="pd-hero-standfirst">
            {highlight(detail.descriptor.text, detail.descriptor.highlight)}
          </Reveal>

          <Reveal className="pd-hero-link">
            <UnderlineLink href={company.website}>Visit Website</UnderlineLink>
          </Reveal>
        </div>

        {/* The frame sets the company's product shot here with its logo
            lockup over the shot's top-left corner. Where that artwork exists
            it is used as drawn; where it does not, the mark stands in on the
            same bloom. */}
        {detail.art?.hero ? (
          <Reveal variant="scale" className="pd-hero-art">
            <Image
              src={detail.art.hero}
              alt=""
              width={1200}
              height={809}
              className="pd-hero-art-shot"
              priority
            />
            {detail.art.lockup && (
              <Image
                src={detail.art.lockup}
                alt={`${company.name} logo`}
                width={1400}
                height={413}
                className="pd-hero-art-lockup"
                priority
              />
            )}
          </Reveal>
        ) : (
          <Reveal variant="scale" className="pd-hero-mark">
            <Image
              src={company.image}
              alt={company.imageAlt || `${company.name} logo`}
              width={640}
              height={640}
              className="pd-hero-mark-img"
              priority
            />
          </Reveal>
        )}
      </section>

      {/* ==================================================== FACT STRIP */}
      <section aria-label={`${company.name} at a glance`} className="pd-band pd-strip">
        {[
          { label: "Sector", value: company.sector },
          { label: "Fund", value: company.vehicle },
          { label: "Invested at", value: detail.investedAt },
          { label: "Status", value: detail.status },
        ].map((cell, i) => (
          <Reveal key={cell.label} delay={Math.min(i, 3) * 90} className="pd-strip-cell">
            <p className="pd-strip-label">{cell.label}</p>
            <p className="pd-strip-value">{cell.value}</p>
          </Reveal>
        ))}
      </section>

      {/* ===================================================== STATEMENT */}
      <section aria-labelledby="statement-heading" className="pd-band pd-statement">
        <Reveal as="h2" id="statement-heading" className="pd-statement-head">
          <span className="pd-statement-1">{detail.statement.line1}</span>{" "}
          <span className="pd-statement-2">{detail.statement.line2}</span>
        </Reveal>

        {detail.intro.map((para, i) => (
          <Reveal key={i} as="p" delay={(i + 1) * 90} className="pd-statement-body">
            {para}
          </Reveal>
        ))}
      </section>

      {/* ======================================================== FIGURE */}
      <Reveal as="figure" variant="scale" className="pd-band pd-figure">
        <Image
          src={detailArt.team}
          alt=""
          fill
          sizes="(max-width: 1024px) 92vw, 60vw"
          className="pd-figure-img"
        />
      </Reveal>

      {/* ================================================ WHY WE INVESTED */}
      <section
        aria-labelledby="why-heading"
        className="pd-band-full pd-why"
        data-photo={detail.art?.why ? "" : undefined}
      >
        {detail.art?.why && (
          <>
            <Image
              src={detail.art.why}
              alt=""
              fill
              sizes="100vw"
              className="pd-why-bg"
            />
            {/* The photograph is dark on the left and opens out to the right;
                the scrim follows it so the copy keeps 4.5:1 without flattening
                the landscape the frame is showing (WCAG 1.4.3). */}
            <span aria-hidden="true" className="pd-why-scrim" />
          </>
        )}

        <div className="pd-why-inner">
          <Reveal as="p" className="pd-eyebrow pd-eyebrow-on-dark">
            {detailLabels.whyEyebrow}
          </Reveal>

          <Reveal as="h2" id="why-heading" className="pd-dark-head">
            <span className="pd-dark-head-1">{detail.why.line1}</span>{" "}
            <span className="pd-dark-head-2">{detail.why.line2}</span>
          </Reveal>

          <Reveal as="p" className="pd-dark-body">
            {detail.why.body}
          </Reveal>

          <Reveal className="pd-env-wrap">
            <EnvironmentList
              items={detail.why.environments}
              label={`Where ${shortName(company.name)} has to work`}
            />
          </Reveal>

          <Reveal as="p" className="pd-dark-close">
            {detail.why.close}
          </Reveal>
        </div>
      </section>

      {/* ====================================================== SNAPSHOT */}
      <section aria-labelledby="snapshot-heading" className="pd-band pd-snapshot">
        {/* The frame stands the product shot on the plain page — no bloom
            behind it, because the shot carries its own white ground. Only the
            mark, which has to hold a corner of the layout on its own, gets
            the bloom. */}
        <Reveal
          variant="scale"
          className="pd-snapshot-mark"
          data-photo={detail.art?.snapshot ? "" : undefined}
        >
          <Image
            src={detail.art?.snapshot ?? company.image}
            alt=""
            width={detail.art?.snapshot ? 1392 : 640}
            height={detail.art?.snapshot ? 1044 : 640}
            className="pd-snapshot-mark-img"
          />
        </Reveal>

        <div className="pd-snapshot-list">
          <Reveal as="h2" id="snapshot-heading" className="pd-snapshot-head">
            <span className="pd-snapshot-head-1">{detailLabels.snapshot.lead}</span>{" "}
            <span className="pd-snapshot-head-2">{detailLabels.snapshot.accent}</span>
          </Reveal>

          {[
            { label: "Sector", value: company.sector },
            { label: "Technology area", value: detail.snapshot.technologyArea },
            { label: "Use case", value: detail.snapshot.useCase },
            { label: "Market relevance", value: detail.snapshot.marketRelevance },
          ].map((row, i) => (
            <Reveal key={row.label} delay={Math.min(i, 3) * 90} className="pd-snapshot-row">
              <p className="pd-snapshot-label">{row.label}</p>
              <p className="pd-snapshot-value">{row.value}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ======================================================= 8X VIEW */}
      <section aria-labelledby="view-heading" className="pd-band-full pd-view">
        <Image
          src={detailArt.circuit}
          alt=""
          fill
          sizes="100vw"
          className="pd-view-bg"
        />

        <div className="pd-why-inner">
          <Reveal as="p" className="pd-eyebrow pd-eyebrow-on-dark">
            {eightXView.eyebrow}
          </Reveal>

          <Reveal as="h2" id="view-heading" className="pd-dark-head">
            <span className="pd-dark-head-1">{eightXView.line1}</span>{" "}
            <span className="pd-dark-head-2">{eightXView.line2}</span>
          </Reveal>

          <Reveal as="p" className="pd-dark-body">
            {eightXView.body}
          </Reveal>

          <Reveal as="p" className="pd-dark-close">
            {eightXView.close.replace("%s", shortName(company.name))}
          </Reveal>
        </div>
      </section>

      {/* =========================================================== CTA */}
      <section aria-labelledby="detail-cta-heading" className="pd-band-full pd-cta">
        <Reveal as="h2" id="detail-cta-heading" className="pd-cta-head">
          <span className="pd-cta-lead">{detailCta.lead}</span>
          <span className="pd-cta-line">{detailCta.line1}</span>
          <span className="pd-cta-line">{detailCta.line2}</span>
        </Reveal>

        <Reveal className="pd-cta-link">
          <UnderlineLink href={detailCta.link.href} tone="light">
            {detailCta.link.label}
          </UnderlineLink>
        </Reveal>
      </section>

      {/* The way back, on the page's own ground rather than inside the closing
          panel — the panel asks for something, this only navigates. */}
      <Reveal className="pd-band pd-back-foot">
        <BackToPortfolio />
      </Reveal>
    </>
  );
}
