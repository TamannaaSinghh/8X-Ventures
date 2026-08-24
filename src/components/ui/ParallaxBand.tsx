"use client";

import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

type ParallaxBandProps = {
  /** The full-bleed photograph behind the band. Decorative, so it takes no alt. */
  src: string;
  /** `id` of the heading the band is named by. */
  labelledBy: string;
  className?: string;
  children: ReactNode;
};

/**
 * A full-bleed photographic band whose picture drifts against the page.
 *
 * The band publishes `--par`, its own position relative to the viewport: -1 as
 * it comes in at the bottom, 0 with the band centred, +1 as it leaves at the
 * top. The plate and the copy read that one number and move by different
 * amounts — the picture with the scroll and the copy very slightly against it,
 * which is what separates the two into layers rather than sliding a photograph
 * about behind fixed text.
 *
 * It also publishes `--par-mid`, how nearly centred the band is: 0 at either
 * end of the pass, 1 at the middle. The plate rides that as well, standing a
 * little wider as it arrives and settling back as it centres, so the picture
 * closes on the artboard rather than merely sliding through it.
 *
 * Both are nought and one respectively at the centre by design: the band is at
 * the artboard's exact composition at the moment the reader is looking straight
 * at it, and only departs from it while half the band is still off-screen.
 *
 * Written to the element rather than held in state, so the picture tracks the
 * scroll every frame without re-rendering the band. Under
 * `prefers-reduced-motion`, before hydration and with JavaScript off, both are
 * simply absent and their fallbacks — nought and one — leave the band exactly
 * as the artboard composes it.
 */
export function ParallaxBand({ src, labelledBy, className, children }: ParallaxBandProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduced) {
      el.style.removeProperty("--par");
      el.style.removeProperty("--par-mid");
      return;
    }

    let raf = 0;
    let running = false;

    /* Read on a frame loop rather than from scroll events: those arrive in
       coarse, uneven jumps, and a picture painted straight from them steps
       rather than drifts. The loop only runs while the band is on screen. */
    const frame = () => {
      const r = el.getBoundingClientRect();
      const span = (window.innerHeight + r.height) / 2;
      if (span > 0) {
        const raw = (window.innerHeight / 2 - (r.top + r.height / 2)) / span;
        const p = Math.max(-1, Math.min(1, raw));
        el.style.setProperty("--par", p.toFixed(4));
        el.style.setProperty("--par-mid", (1 - Math.abs(p)).toFixed(4));
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
    };

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      /* A little early, so the picture is already in the right place by the
         time the band's first pixel appears. */
      { rootMargin: "15% 0px" },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      stop();
    };
  }, [reduced]);

  return (
    <section
      ref={ref}
      aria-labelledby={labelledBy}
      className={cn("parallax-band relative isolate overflow-hidden", className)}
    >
      <div aria-hidden="true" className="parallax-plate -z-10">
        <Image src={src} alt="" fill sizes="100vw" className="object-cover" />
      </div>

      <div className="parallax-fore">{children}</div>
    </section>
  );
}
