"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { stats, statsHeadline } from "@/content/home";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const figure = stats[0]; // ₹400+Cr — Portfolio revenue generated
const ghost = stats[1]; // 70+ — echoed behind, unlabelled

const format = (n: number, prefix = "", suffix = "") =>
  `${prefix}${n.toLocaleString("en-IN")}${suffix}`;

const FINAL_FIGURE = format(figure.value, figure.prefix, figure.suffix);
const FINAL_GHOST = format(ghost.value, ghost.prefix, ghost.suffix);

/**
 * Where in the run the count resolves. The remaining stretch holds the
 * finished number, so it is read before the next section arrives.
 */
const COUNT_ENDS_AT = 0.72;
const COUNT_MS = 1600;

/**
 * How hard the painted value chases the scroll, per second. Higher tracks the
 * scroll more tightly; lower glides longer after it stops. 9 lands close
 * enough to feel attached to the wheel while still smoothing a notch out.
 */
const CHASE_RATE = 9;

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * "Early signals. Serious scale." — the artboard's composition, played out
 * against the scroll.
 *
 * The section is given spare height and its panel sticks to the top, so the
 * composition holds still while the page scrolls past it and ₹400+Cr counts up
 * under the reader's own scrolling. See "The pinned scroll stage" in
 * `globals.css` for the layout, and for why this is native `position: sticky`
 * rather than an intercepted scroll: the page never stops responding normally
 * to the scrollbar, the keyboard, or Page Down.
 *
 * Below the traced composition's width there is no pin, so the figure falls
 * back to counting once on view, on a timer.
 *
 * The digits are written straight to the DOM rather than held in state: the
 * server renders the final value, so it is correct before hydration, with
 * JavaScript disabled and under `prefers-reduced-motion` — and there is no
 * render-per-frame while the page scrolls. The ticking text is hidden from
 * assistive tech, and a static string carrying the final value is exposed
 * instead, so a screen reader announces "₹400+Cr" once rather than every
 * intermediate frame.
 */
export function StatsSection() {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLElement>(null);
  const figureRef = useRef<HTMLSpanElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const settle = () => {
      if (figureRef.current) figureRef.current.textContent = FINAL_FIGURE;
      if (ghostRef.current) ghostRef.current.textContent = FINAL_GHOST;
    };

    /**
     * `t` is the count's own 0..1 progress, not the scroll's. `eased` curves
     * it — wanted for the timed fallback, which has no other shape, and not
     * wanted when the scroll is already supplying the motion.
     */
    const write = (t: number, eased = true) => {
      const c = clamp01(t);
      const e = eased ? easeOutCubic(c) : c;
      if (figureRef.current) {
        figureRef.current.textContent = format(
          Math.round(e * figure.value),
          figure.prefix,
          figure.suffix,
        );
      }
      if (ghostRef.current) {
        ghostRef.current.textContent = format(
          Math.round(e * ghost.value),
          ghost.prefix,
          ghost.suffix,
        );
      }
    };

    if (reduced) {
      wrap.style.removeProperty("--p");
      settle();
      return;
    }

    /* --- Pinned: the scroll position is the animation's clock -----------
       Rather than paint the raw scroll offset, a rendered value chases the
       target a fixed fraction per frame. Scroll events arrive in coarse,
       uneven jumps -- a wheel notch is tens of pixels -- and painting them
       straight through makes the figure stutter in steps. Chasing turns those
       jumps into a continuous glide that still settles exactly on target.

       Frame-rate corrected, so the glide takes the same time on a 60Hz and a
       144Hz display instead of running twice as fast on the latter. */
    const driveByScroll = () => {
      let raf = 0;
      let shown = -1; // -1 = nothing painted yet, so the first frame snaps
      let last = 0;

      /** Where the scroll actually is, 0..1 across the section's spare run. */
      const target = () => {
        const spare = wrap.offsetHeight - window.innerHeight;
        return spare > 0
          ? clamp01(-wrap.getBoundingClientRect().top / spare)
          : 1;
      };

      const frame = (now: number) => {
        const t = target();
        const dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
        last = now;

        if (shown < 0) {
          shown = t;
        } else {
          /* 1 - e^(-k*dt) is the same exponential ease, sampled correctly for
             however long this frame actually took. */
          shown += (t - shown) * (1 - Math.exp(-CHASE_RATE * dt));
          if (Math.abs(t - shown) < 0.0002) shown = t;
        }

        wrap.style.setProperty("--p", shown.toFixed(4));
        /* Linear against the scroll: the reader's own movement is the easing,
           and a curve on top of it reads as the number lagging behind. */
        write(shown / COUNT_ENDS_AT, false);

        raf = requestAnimationFrame(frame);
      };

      /* The loop only runs while the section is near the viewport. */
      const observer =
        typeof IntersectionObserver === "undefined"
          ? null
          : new IntersectionObserver(
              (entries) => {
                const near = entries.some((e) => e.isIntersecting);
                if (near && !raf) {
                  last = 0;
                  raf = requestAnimationFrame(frame);
                } else if (!near && raf) {
                  cancelAnimationFrame(raf);
                  raf = 0;
                }
              },
              { rootMargin: "100% 0px" },
            );

      if (observer) observer.observe(wrap);
      else raf = requestAnimationFrame(frame);

      return () => {
        cancelAnimationFrame(raf);
        observer?.disconnect();
      };
    };

    /* --- Not pinned: count once, on a timer, when it comes into view ---- */
    const countOnce = () => {
      if (typeof IntersectionObserver === "undefined") return () => {};

      let raf = 0;
      let cancelled = false;

      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          observer.disconnect();

          const start = performance.now();
          const tick = (now: number) => {
            if (cancelled) return;
            const t = Math.min((now - start) / COUNT_MS, 1);
            write(t);
            if (t < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        },
        { threshold: 0.4 },
      );

      observer.observe(wrap);

      return () => {
        cancelled = true;
        cancelAnimationFrame(raf);
        observer.disconnect();
      };
    };

    /* The pin only exists at the width the traced composition applies to, so
       the driver has to follow the same breakpoint. */
    const pinned = window.matchMedia("(min-width: 64rem)");
    let stop = () => {};
    const attach = () => {
      stop();
      wrap.style.removeProperty("--p");
      stop = pinned.matches ? driveByScroll() : countOnce();
    };

    attach();
    pinned.addEventListener("change", attach);

    return () => {
      pinned.removeEventListener("change", attach);
      stop();
      settle();
    };
  }, [reduced]);

  return (
    <section
      ref={wrapRef}
      aria-labelledby="stats-heading"
      className="stats-scroll"
    >
      <div className="stats-pin on-dark relative isolate overflow-hidden">
        {/* The field lives on the stage, not on the panel. It is cut to the
            stage's exact ratio, so sitting on the same box is what keeps it
            uncropped and keeps its light where the type was graded around
            it — see the pinned scroll stage in `globals.css`. */}
        <div className="stats-stage isolate">
          <Image
            src="/images/stats-bg.jpg"
            alt=""
            fill
            priority={false}
            sizes="100vw"
            className="-z-10 object-cover"
          />
          <Reveal
            as="h2"
            id="stats-heading"
            /* No tracking: the artboard sets these at their natural widths, and
               any negative tracking measurably narrows them against it. */
            className="stats-headline text-[length:var(--text-display)] leading-none font-bold text-white"
          >
            {statsHeadline}
          </Reveal>

          {/* The outgoing figure, carried over from the artboard as a flourish.
              It has no caption, so it is decoration rather than information. */}
          <p
            aria-hidden="true"
            className="stats-ghost leading-none font-bold text-white/35 select-none"
          >
            <span ref={ghostRef}>{FINAL_GHOST}</span>
          </p>

          <p className="stats-figure text-[length:var(--text-stat)] leading-none font-bold text-white">
            <span ref={figureRef} aria-hidden="true">
              {FINAL_FIGURE}
            </span>
            <span className="sr-only-8x">{FINAL_FIGURE}</span>
          </p>

          <p className="stats-label text-[length:clamp(1.125rem,0.841rem+2.2vw,3.48rem)] leading-none font-bold text-white">
            {figure.label}
          </p>

          <div aria-hidden="true" className="stats-hand pointer-events-none">
            <Image
              src="/images/robot-hand.png"
              alt=""
              width={1100}
              height={733}
              sizes="27vw"
              className="h-auto w-full"
            />
          </div>
        </div>

        {/* How much of the run is left, so the pin reads as a section with a
            length rather than as a stuck page. */}
        <div aria-hidden="true" className="stats-progress" />
      </div>
    </section>
  );
}
