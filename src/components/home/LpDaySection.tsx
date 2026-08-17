import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { UnderlineLink } from "@/components/ui/UnderlineLink";
import { lpDay } from "@/content/home";

function ArrowRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="h-6 w-6 shrink-0 text-brand transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5"
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

export function LpDaySection() {
  return (
    <section aria-labelledby="lpday-heading" className="bg-white py-20 lg:py-32">
      <div className="container-8x">
        <Reveal className="text-center">
          <Eyebrow>{lpDay.eyebrow}</Eyebrow>
          <h2
            id="lpday-heading"
            className="mt-4 text-[length:var(--text-display)] leading-[1.1] font-bold tracking-normal text-balance text-ink-900"
          >
            {lpDay.line1} <span className="text-brand">{lpDay.line2}</span>
          </h2>
          <p className="mx-auto mt-8 max-w-[60ch] text-[length:var(--text-body-lg)] leading-[1.4] font-light text-pretty text-ink-400">
            {lpDay.body}
          </p>
        </Reveal>

        {/* --- Edition cards --- */}
        <ul role="list" className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-2 lg:gap-10">
          {lpDay.editions.map((edition, i) => (
            <Reveal as="li" key={edition.year} delay={i * 120}>
              <Link
                href={edition.href}
                className="group block overflow-hidden rounded-[18px] bg-white shadow-[0_18px_45px_-24px_rgba(0,40,90,0.35)] transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-[0_28px_60px_-26px_rgba(0,40,90,0.45)]"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={edition.image}
                    alt={edition.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 92vw, 46vw"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                  />
                  {/* Light wash under the year label, matching the artboard's
                      own vignette. Not enough to guarantee 4.5:1 on a bright
                      photograph — see README. */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(to top, rgba(6,34,71,0.45) 0%, rgba(6,34,71,0.18) 18%, rgba(6,34,71,0) 40%)",
                    }}
                  />
                  <p className="absolute bottom-5 left-6 text-[clamp(1.5rem,2.1vw,2.5rem)] font-bold text-white">
                    {edition.year}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-6 px-6 py-6 lg:px-8">
                  <span className="text-[length:var(--text-body-lg)] font-light text-ink-400">
                    {`Gallery & Highlights`}
                  </span>
                  <ArrowRight />
                  <span className="sr-only-8x">{`for LP Day ${edition.year}`}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>

        {/* --- Promo band --- */}
        <Reveal delay={120}>
          <div className="mt-12 flex flex-col gap-8 rounded-[20px] bg-brand-tint px-8 py-10 lg:mt-16 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:px-14 lg:py-14">
            <div className="lg:w-[58%] lg:shrink-0">
              <Eyebrow tone="tint" className="text-[length:clamp(0.8125rem,0.6rem+0.4vw,1.25rem)]">
                {lpDay.promo.eyebrow}
              </Eyebrow>
              <h3 className="mt-3 text-[clamp(1.375rem,2.1vw,2.5rem)] leading-tight font-bold text-balance text-ink-900">
                {lpDay.promo.title}
              </h3>
              <p className="mt-3 text-[length:var(--text-body-lg)] leading-[1.4] font-light text-pretty text-ink-800">
                {lpDay.promo.body}
              </p>
            </div>

            <div className="shrink-0">
              <UnderlineLink href={lpDay.promo.cta.href}>{lpDay.promo.cta.label}</UnderlineLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
