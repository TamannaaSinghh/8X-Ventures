"use client";

import Image from "next/image";
import { useState } from "react";
import { portfolioCards, portfolioFilters } from "@/content/portfolio";

/**
 * The filter row and the card grid.
 *
 * The filters are toggle buttons rather than tabs: they narrow one list in
 * place, they don't swap panels, so `aria-pressed` describes them honestly and
 * nothing has to be arrow-key navigated. The count is announced politely, so a
 * screen reader user hears the result of a press without hunting for it.
 *
 * "Fund II - Coming Soon" is `aria-disabled` rather than `disabled`: there is
 * nothing behind it yet, but it stays focusable so it can be found and read.
 */
export function PortfolioGrid() {
  const [active, setActive] = useState(portfolioFilters[0].id);

  const filter = portfolioFilters.find((f) => f.id === active) ?? portfolioFilters[0];
  /* A company can sit in more than one — Solinas is in three — so the filter
     reads the whole list, not just the fund printed on the card. */
  const cards = filter.vehicle
    ? portfolioCards.filter((c) => (c.vehicles ?? [c.vehicle]).includes(filter.vehicle!))
    : portfolioCards;

  return (
    <>
      <div className="pf-at pf-filters" role="group" aria-label="Filter portfolio by fund">
        {portfolioFilters.map((f) => {
          const isActive = f.id === active;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={f.comingSoon ? undefined : isActive}
              aria-disabled={f.comingSoon || undefined}
              data-active={isActive || undefined}
              data-coming={f.comingSoon || undefined}
              onClick={() => {
                if (!f.comingSoon) setActive(f.id);
              }}
              className="pf-pill"
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="pf-at pf-grid">
        {cards.map((card) => (
          <article key={card.id} className="pf-card">
            <div className="pf-card-photo">
              <Image
                src={card.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 92vw, 28vw"
                className="object-cover object-[50%_35.5%]"
              />
            </div>

            <div className="pf-card-body">
              <p className="pf-card-tags">
                <span>{card.sector}</span>
                <span>{card.vehicle}</span>
              </p>

              <h3 className="pf-card-name">{card.name}</h3>

              <p className="pf-card-raised">
                <strong>{card.raised}</strong>
                <span> Raised</span>
              </p>

              <p className="pf-card-summary">{card.summary}</p>

              <p className="pf-card-stage">
                <strong>{card.stageLabel}</strong>
                <span className="block font-light">{card.stageNote}</span>
              </p>
            </div>
          </article>
        ))}
      </div>

      <p aria-live="polite" className="sr-only-8x">
        {`${cards.length} ${cards.length === 1 ? "company" : "companies"} shown${
          filter.vehicle ? ` for ${filter.label}` : ""
        }.`}
      </p>
    </>
  );
}
