"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { CarouselControls } from "@/components/ui/CarouselControls";
import { type LpDayEdition } from "@/content/lpday";

/**
 * One edition's gallery: the year, its standfirst, and the photographs on a
 * strip the reader can move.
 *
 * The strip is a real scroll container with snap points rather than a
 * transformed track. That way it clamps at both ends on its own however many
 * photographs there are and however many fit at the current width, it can be
 * swiped or trackpad-scrolled directly, and the arrows and the segmented
 * track are just another way to drive the same thing. `CarouselControls` is
 * the site's own, so this reads exactly like the other carousels.
 *
 * The controls are drawn under every edition, as the frame draws them — they
 * are part of the band's composition, not something that comes and goes with
 * the window width.
 */
export function LpDayGallery({ edition }: { edition: LpDayEdition }) {
  const stripRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  const scrollTo = useCallback((i: number) => {
    const strip = stripRef.current;
    const slide = strip?.children[i] as HTMLElement | undefined;
    if (!strip || !slide) return;
    strip.scrollTo({ left: slide.offsetLeft - strip.offsetLeft, behavior: "smooth" });
  }, []);

  /* Which slide is nearest the strip's left edge — the one the controls
     consider current. Read from the scroll rather than stored alongside it,
     so a swipe and a button press can never disagree. */
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    let frame = 0;
    const read = () => {
      frame = 0;
      let nearest = 0;
      let best = Infinity;
      for (let i = 0; i < strip.children.length; i++) {
        const el = strip.children[i] as HTMLElement;
        const d = Math.abs(el.offsetLeft - strip.offsetLeft - strip.scrollLeft);
        if (d < best) {
          best = d;
          nearest = i;
        }
      }
      setIndex(nearest);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    strip.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      strip.removeEventListener("scroll", onScroll);
    };
  }, []);

  const labels = edition.images.map((_, i) => `Photograph ${i + 1}`);

  return (
    <div className="lp-edition">
      <div className="lp-edition-head">
        <h3 className="lp-edition-year">
          <span>LP Day</span> <span className="lp-accent">{edition.year}</span>
        </h3>
        <p className="lp-edition-body">{edition.body}</p>
      </div>

      <ul role="list" ref={stripRef} className="lp-strip">
        {edition.images.map((img) => (
          <li key={img.src} className="lp-slide">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 88vw, (max-width: 1024px) 44vw, 21vw"
              className="lp-slide-img"
            />
          </li>
        ))}
      </ul>

      <CarouselControls
        labels={labels}
        index={index}
        onPrev={() => scrollTo(Math.max(0, index - 1))}
        onNext={() => scrollTo(Math.min(edition.images.length - 1, index + 1))}
        onSelect={scrollTo}
        subject={`LP Day ${edition.year} photographs`}
        className="lp-controls"
      />
    </div>
  );
}
