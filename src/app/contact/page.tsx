import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { UnderlineLink } from "@/components/ui/UnderlineLink";
import { offices, siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Share Your Vision",
  description:
    "Building in deep-tech? We would like to understand what you see before others do.",
};

/**
 * `/contact` has no artboard yet, so this stays the shared placeholder's
 * shell — same landmarks, heading order and type tokens as the other
 * unbuilt routes. What it adds is the contact detail 8X actually publishes:
 * the pitch address, and the three offices under the `#chennai` / `#noida`
 * / `#dubai` anchors the footer has always linked to and which, until now,
 * resolved to nothing on the page.
 */
export default function Page() {
  return (
    <section aria-labelledby="page-heading" className="bg-white">
      <div className="container-8x py-32 lg:py-44">
        <Eyebrow>Reach Out</Eyebrow>
        <h1
          id="page-heading"
          className="mt-4 max-w-[18ch] text-[length:var(--text-display)] leading-[1.08] font-bold tracking-normal text-balance text-ink-900"
        >
          Share Your Vision
        </h1>
        <p className="mt-8 max-w-[52ch] text-[length:var(--text-body-lg)] leading-[1.4] font-light text-pretty text-ink-500">
          Building in deep-tech? We would like to understand what you see before
          others do.
        </p>

        <p className="mt-8 max-w-[52ch] text-[length:var(--text-body-lg)] leading-[1.4] font-light text-ink-500">
          To share your pitch deck, write to us at{" "}
          <a
            href={`mailto:${siteConfig.pitchEmail}`}
            className="font-normal text-brand-deep underline decoration-2 underline-offset-4 transition-[color,text-decoration-color,text-underline-offset] duration-300 hover:text-ink-900 hover:decoration-brand-rule hover:underline-offset-[6px]"
          >
            {siteConfig.pitchEmail}
          </a>
          .
        </p>

        <h2 className="mt-20 text-[length:var(--text-body-lg)] font-bold text-ink-900">
          Offices
        </h2>
        <ul
          role="list"
          className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {offices.map((office) => (
            <li key={office.id} id={office.id} className="scroll-mt-32">
              <h3 className="text-[length:var(--text-body-lg)] font-bold text-ink-900">
                {office.city}
              </h3>
              <p className="mt-1 text-[length:var(--text-sm-fluid)] font-light text-ink-400">
                {office.country}
              </p>
              <p className="mt-4 max-w-[32ch] text-[length:var(--text-sm-fluid)] leading-[1.5] font-light text-ink-500">
                {office.label}
              </p>
              <address className="mt-2 max-w-[32ch] text-[length:var(--text-sm-fluid)] leading-[1.5] font-light text-ink-500 not-italic">
                {office.address}
              </address>
            </li>
          ))}
        </ul>

        <div className="mt-16">
          <UnderlineLink href="/">Back to home</UnderlineLink>
        </div>
      </div>
    </section>
  );
}
