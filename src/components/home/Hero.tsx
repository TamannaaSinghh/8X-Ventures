import Image from "next/image";
import { HeroMark } from "@/components/home/HeroMark";
import { SectorStrip } from "@/components/home/SectorStrip";
import { Reveal } from "@/components/ui/Reveal";
import { UnderlineLink } from "@/components/ui/UnderlineLink";
import { hero } from "@/content/home";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-white">
      {/* Decorative radial glow behind the mark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -z-10 w-[140vw] max-w-[1600px] -translate-x-1/2 opacity-70 sm:w-[110vw]"
      >
        <Image
          src="/images/hero-glow.png"
          alt=""
          width={946}
          height={946}
          priority
          className="h-auto w-full"
        />
      </div>

      {/* Top padding set so the 8X mark's ink clears the header by ~100px, as
          in the artboard (logo bottom 176 -> mark top 276). */}
      <div className="container-8x pt-24 pb-14 sm:pt-28 lg:pt-[5.5rem] lg:pb-20">
        {/* --- The 8X infinity mark, with a hotspot per sector --- */}
        {/* Only the mark needs to be interactive, so the client boundary stops
            there and the rest of the hero stays a server component. */}
        <Reveal variant="scale" className="mx-auto w-full max-w-[1120px]">
          <HeroMark />
        </Reveal>

        {/* --- Headline --- */}
        <Reveal delay={80}>
          <h1
            id="hero-heading"
            className="mx-auto mt-4 max-w-[22ch] text-center text-[length:var(--text-display)] leading-[1.08] font-bold tracking-normal text-balance text-ink-950 sm:mt-2"
          >
            {hero.headline.line1}{" "}
            <span className="text-brand-sky">{hero.headline.line2}</span>
          </h1>
        </Reveal>

        {/* --- Subhead --- */}
        <Reveal delay={160}>
          <p className="mx-auto mt-8 max-w-[52ch] text-center text-[length:var(--text-body-lg)] leading-[1.45] font-light text-pretty text-ink-800 lg:mt-12">
            {hero.subhead}
          </p>
        </Reveal>

        {/* --- CTA --- */}
        <Reveal delay={240} className="mt-10 flex justify-center lg:mt-14">
          <UnderlineLink href={hero.cta.href}>{hero.cta.label}</UnderlineLink>
        </Reveal>
      </div>

      <SectorStrip />
    </section>
  );
}
