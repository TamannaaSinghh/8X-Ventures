"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import {
  contactCompliance,
  contactEnquiry,
  contactHero,
  contactOffices,
  officeImages,
} from "@/content/contact";
import { offices, siteConfig } from "@/content/site";

/**
 * Reach Out, traced from the Figma prototype's frame (node 312-636).
 *
 * The form has nowhere on the server to post to — this site has no API route
 * — so rather than render a control that looks like it works and quietly
 * drops what people write, Submit hands the filled fields to their own mail
 * client, addressed to the pitch inbox. Nothing is lost, and the button does
 * what it appears to do. A real endpoint is the proper fix; see the README
 * note that ships with this page.
 */
export function ContactPage() {
  const f = contactEnquiry.fields;
  const [deckName, setDeckName] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const line = (k: string) => String(data.get(k) ?? "").trim();

    const body = [
      `Name: ${line("name")}`,
      `Company: ${line("company")}`,
      "",
      line("message"),
      deckName ? `\n(Deck to attach: ${deckName})` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href =
      `mailto:${siteConfig.pitchEmail}` +
      `?subject=${encodeURIComponent(`Enquiry from ${line("name") || "the website"}`)}` +
      `&body=${encodeURIComponent(body)}`;
  }

  return (
    <>
      {/* ================= HERO ================= */}
      <section aria-labelledby="reach-heading" className="ro-hero">
        <Reveal as="p" className="ro-eyebrow">
          {contactHero.eyebrow}
        </Reveal>

        <Reveal as="h1" id="reach-heading" className="ro-title">
          <span className="ro-title-1">{contactHero.line1}</span>{" "}
          <span className="ro-title-2">{contactHero.line2}</span>
        </Reveal>

        <Reveal as="p" className="ro-hero-body">
          {contactHero.body}
        </Reveal>

        <Reveal className="ro-hero-mail">
          <a href={`mailto:${siteConfig.pitchEmail}`} className="ro-mail-link">
            {siteConfig.pitchEmail}
          </a>
        </Reveal>
      </section>

      {/* The frame's glass ribbon, spanning the frame under the hero. */}
      <Reveal aria-hidden="true" className="ro-ribbon">
        <Image
          src="/images/contact/ribbon.jpg"
          alt=""
          width={2400}
          height={888}
          sizes="100vw"
          className="ro-ribbon-img"
          priority
        />
      </Reveal>

      {/* ================= ENQUIRY ================= */}
      <section aria-labelledby="enquiry-heading" className="ro-enquiry">
        <div className="ro-enquiry-copy">
          <Reveal as="p" className="ro-eyebrow ro-eyebrow-left">
            {contactEnquiry.eyebrow}
          </Reveal>

          <Reveal as="h2" id="enquiry-heading" className="ro-sub-title">
            <span>{contactEnquiry.line1}</span>{" "}
            <span className="ro-title-2">{contactEnquiry.line2}</span>
          </Reveal>

          <Reveal as="p" className="ro-sub-body">
            {contactEnquiry.body}
          </Reveal>
        </div>

        <Reveal variant="card" className="ro-form-card">
          <form onSubmit={handleSubmit} className="ro-form">
            <p className="ro-field">
              <label htmlFor="ro-name" className="ro-label">
                {f.name.label}
              </label>
              <input
                id="ro-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder={f.name.placeholder}
                className="ro-input"
              />
            </p>

            <p className="ro-field">
              <label htmlFor="ro-email" className="ro-label">
                {f.email.label}
              </label>
              <input
                id="ro-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder={f.email.placeholder}
                className="ro-input"
              />
            </p>

            <p className="ro-field ro-field-wide">
              <label htmlFor="ro-company" className="ro-label">
                {f.company.label}
              </label>
              <input
                id="ro-company"
                name="company"
                type="text"
                autoComplete="organization"
                placeholder={f.company.placeholder}
                className="ro-input"
              />
            </p>

            <p className="ro-field ro-field-wide">
              <label htmlFor="ro-message" className="ro-label">
                {f.message.label}
              </label>
              <textarea
                id="ro-message"
                name="message"
                rows={5}
                placeholder={f.message.placeholder}
                className="ro-input ro-textarea"
              />
            </p>

            <p className="ro-field ro-field-wide">
              <label htmlFor="ro-deck" className="ro-label">
                {f.deck.label}
              </label>
              {/* The frame draws a text row with a "Browse" action. The real
                  control is the file input; the row is its label, so a click
                  or a keyboard press opens the picker exactly once. */}
              <span className="ro-file">
                <span className={deckName ? "ro-file-name is-set" : "ro-file-name"}>
                  {deckName || f.deck.placeholder}
                </span>
                <span aria-hidden="true" className="ro-file-browse">
                  {f.deck.browse}
                </span>
                <input
                  id="ro-deck"
                  name="deck"
                  type="file"
                  accept=".pdf,.ppt,.pptx,.key"
                  className="ro-file-input"
                  onChange={(e) => setDeckName(e.target.files?.[0]?.name ?? "")}
                />
              </span>
            </p>

            <p className="ro-submit-row">
              <button type="submit" className="ro-submit">
                {contactEnquiry.submit}
              </button>
            </p>
          </form>
        </Reveal>
      </section>

      {/* ================= OFFICES ================= */}
      <section aria-labelledby="offices-heading" className="ro-offices">
        <Reveal as="p" className="ro-eyebrow ro-eyebrow-left">
          {contactOffices.eyebrow}
        </Reveal>

        <Reveal as="h2" id="offices-heading" className="ro-sub-title ro-offices-title">
          <span>{contactOffices.lead}</span>{" "}
          <span className="ro-title-2">{contactOffices.accent}</span>
        </Reveal>

        <ul role="list" className="ro-office-grid">
          {offices.map((office, i) => {
            const art = officeImages[office.id];
            return (
              <Reveal as="li" variant="card" key={office.id} delay={Math.min(i, 3) * 120}>
                {/* The footer has always linked at these anchors. */}
                <article id={office.id} className="ro-office">
                  <span className="ro-office-plate">
                    {art && (
                      <Image
                        src={art.src}
                        alt={art.alt}
                        fill
                        sizes="(max-width: 1024px) 92vw, 28vw"
                        className="ro-office-img"
                      />
                    )}
                  </span>

                  <span className="ro-office-foot">
                    <h3 className="ro-office-city">{office.city}</h3>
                    <p className="ro-office-address">{office.address}</p>
                  </span>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </section>

      {/* ================= COMPLIANCE ================= */}
      <section aria-label="Compliance note" className="ro-note">
        <Reveal as="p" className="ro-note-text">
          {contactCompliance}
        </Reveal>
      </section>
    </>
  );
}
