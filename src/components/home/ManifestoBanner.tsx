"use client";

import Image from "next/image";
import { useState } from "react";
import { MotionToggle } from "@/components/ui/MotionToggle";
import { Reveal } from "@/components/ui/Reveal";
import { RotatingWord } from "@/components/ui/RotatingWord";
import { manifesto, sectorsInline, sectorsInlineStart } from "@/content/home";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ManifestoBanner() {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);

  return (
    <section
      id="manifesto"
      aria-labelledby="manifesto-heading"
      className="on-dark relative isolate overflow-hidden"
    >
      <Image
        src="/images/gradient-blue-1.jpg"
        alt=""
        fill
        sizes="100vw"
        className="animate-drift -z-20 object-cover [will-change:transform]"
      />

      <div className="container-8x py-24 text-center sm:py-32 lg:py-44">
        <Reveal>
          <h2
            id="manifesto-heading"
            className="mx-auto max-w-[24ch] text-[length:var(--text-display)] leading-[1.1] font-bold tracking-normal text-balance text-white"
          >
            {manifesto.line1}{" "}
            <span className="lg:block">{manifesto.line2}</span>
          </h2>
        </Reveal>

        <Reveal delay={140}>
          <p className="mx-auto mt-10 max-w-[60ch] text-[length:var(--text-lead)] leading-[1.4] font-light text-pretty text-white lg:mt-14">
            {/* Visual sentence: the sector cycles through the list. */}
            <span aria-hidden="true">
              {manifesto.supportPre}
              <RotatingWord
                words={sectorsInline}
                startIndex={sectorsInlineStart}
                paused={paused}
                className="font-bold"
              />
              {manifesto.supportPost}
            </span>

            {/* What assistive tech reads: the same sentence, every sector named. */}
            <span className="sr-only-8x">{manifesto.supportScreenReader}</span>
          </p>
        </Reveal>
      </div>

      {/* The word changes on its own, so it needs a way to stop
          (WCAG 2.2.2 Pause, Stop, Hide). Parked in the section's bottom-right
          corner so it stays out of the statement it belongs to. Hidden when
          the user has already asked for reduced motion, since nothing moves. */}
      {!reduced && (
        <div className="container-8x pointer-events-none absolute inset-x-0 bottom-6 flex justify-end lg:bottom-8">
          <MotionToggle
            paused={paused}
            onToggle={() => setPaused((p) => !p)}
            label="sector animation"
            tone="dark"
            className="pointer-events-auto"
          />
        </div>
      )}
    </section>
  );
}
