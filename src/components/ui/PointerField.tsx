"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * A pointer-reactive field for the closing panels — the one at the foot of each
 * page, and the home page's manifesto, the places where the whole band is a
 * sentence and the thing it asks for.
 *
 * Not "the flat bands", as this used to say: every one of them is a graded
 * photograph or a gradient, and reading that literally is what left the two
 * closing panels on the inner pages — a company's and LP Day's — without it
 * while the five above them had it. What decides is the band's job, not its
 * plate. The photographic bands that carry body copy rather than a closing
 * line — `pd-why`, `pd-view`, the parallax band on `/about` — stay clear of it,
 * because a field under a paragraph is decoration competing with reading.
 *
 * Two things happen under the cursor: a light tracks it, and the band's ruled
 * filaments bow away from it, hardest where they pass closest and settling back
 * to straight further out. The pointer reads as a lens held over the plate.
 *
 * It is the site's own image rather than an effect borrowed from elsewhere: the
 * glass ribbon on `/contact` and the light trails behind the team band are both
 * a line of light that bends.
 *
 * Nothing is drawn away from the pointer, and that is the stroke rather than a
 * loop condition — each filament is painted with a radial gradient centred on
 * the pointer, so it fades to nothing before the edge of the reach. The plate
 * is clean everywhere the cursor is not, and there is no rim where the effect
 * stops.
 *
 * This replaced a scatter of small rings. They were drawn at a standing opacity
 * whether the pointer was near them or not, so on a plate this flat they read
 * as specks of dust; and they leaned *towards* the cursor, so several would
 * converge on one spot and overlap into a blot. Both were fixed before they
 * were dropped, and dropped anyway: dots on a statement band are a texture, and
 * this wants to be a gesture.
 *
 * The filaments are painted over the plate rather than added to it. These bands
 * are already a bright blue, and an additive white has almost no headroom left
 * to lighten there — which is why the field this replaces was invisible on
 * exactly the bands that carry it. The light keeps `lighter`, where it belongs:
 * it is atmosphere, and on the darker bands it has the room to read as one, and
 * it is kept low because these bands carry white text at the sizes the artboard
 * sets and lifting the plate underneath it costs contrast.
 *
 * Everything is inert until the pointer is actually inside the band. There is
 * no idle animation and no requestAnimationFrame loop at rest — the loop starts
 * on enter and stops once the fade-out has finished, so a page carrying one of
 * these costs nothing to leave sitting open.
 *
 * Off entirely under `prefers-reduced-motion`, and on coarse pointers, where
 * there is no hover to react to and the whole thing would only fire on tap.
 */

/** Spacing of the filaments down the band, in px. */
const LINE_GAP = 40;

/** How far from the pointer a filament is lit at all. Beyond this nothing is
 *  drawn, which is what keeps the plate clean. */
const REACH = 300;

/** Width of the bend, and how hard it bows. `SIGMA` is the radius over which
 *  the lens has any effect on a line; `BOW` is the share of a line's distance
 *  from the pointer it is pushed away by at the peak. */
const SIGMA = 170;
const BOW = 0.82;

/** Peak opacity of a filament, where it passes closest to the pointer. */
const LINE_ALPHA = 0.92;
const LINE_WIDTH = 2.1;

/** How finely a filament is sampled along its length, in px. Small enough that
 *  the bend is a curve rather than a series of corners. */
const STEP = 9;

const LENS_RADIUS = 380;
const LENS_CORE = 0.2;
const LENS_MID = 0.12;

export function PointerField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined" || !window.matchMedia) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const canvas = canvasRef.current;
    const band = canvas?.parentElement;
    if (!canvas || !band) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    /* Where the pointer is, and where the light has got to. The light is eased
       rather than pinned so it carries a little weight, the same way the tilted
       artwork lags the cursor instead of snapping to it. */
    let px = 0;
    let py = 0;
    let gx = 0;
    let gy = 0;
    let placed = false;

    /* 1 while the pointer is inside the band, 0 once it has left; `intensity`
       is what actually chases it, and is what everything is drawn against. */
    let target = 0;
    let intensity = 0;

    let frame = 0;
    let last = 0;
    let visible = true;

    const resize = () => {
      const r = band.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = r.width;
      height = r.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    };

    const draw = (now: number) => {
      frame = 0;

      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0.016;
      last = now;

      /* Roughly a fifth of a second to reach the target either way, frame-rate
         independent so a slow frame does not jump the fade. */
      const k = 1 - Math.pow(0.0001, dt);
      intensity += (target - intensity) * k;
      gx += (px - gx) * k;
      gy += (py - gy) * k;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      /* Settled back to rest: clear the canvas, drop the loop, and leave the
         band alone until the pointer comes back. */
      if (target === 0 && intensity < 0.004) {
        intensity = 0;
        last = 0;
        return;
      }

      ctx.globalCompositeOperation = "lighter";

      /* The light. Two stops rather than one so the core reads as white and the
         falloff carries the brand's blue out to the edge of the pool. */
      const glow = ctx.createRadialGradient(gx, gy, 0, gx, gy, LENS_RADIUS);
      glow.addColorStop(0, `rgba(255, 255, 255, ${LENS_CORE * intensity})`);
      glow.addColorStop(0.45, `rgba(146, 214, 255, ${LENS_MID * intensity})`);
      glow.addColorStop(1, "rgba(0, 132, 214, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      /* Over the plate, not added to it: these bands are already a bright
         blue, and an additive white has almost no headroom left to lighten
         there — which is why the field this replaces was invisible on exactly
         the bands that carry it. The light above keeps `lighter`, where it
         belongs: it is atmosphere, and on the darker bands it has the room to
         read as one. */
      ctx.globalCompositeOperation = "source-over";

      /* The refraction. The band is ruled with filaments of light, and the
         pointer is a lens held over them: each one bows away from it, hardest
         where it passes closest, and settles back to straight further out.

         Nothing is drawn away from the pointer, and that is not a loop
         condition but the stroke itself — every filament is painted with a
         radial gradient centred on the pointer, so it fades to nothing before
         it reaches the edge of the reach. The plate is clean everywhere the
         cursor is not, with no rim where the effect stops.

         It is the site's own image: the glass ribbon on `/contact` and the
         light trails behind the team band are both a line of light that bends. */
      const lit = ctx.createRadialGradient(gx, gy, 0, gx, gy, REACH);
      lit.addColorStop(0, `rgba(255, 255, 255, ${LINE_ALPHA * intensity})`);
      lit.addColorStop(0.5, `rgba(198, 234, 255, ${LINE_ALPHA * 0.45 * intensity})`);
      lit.addColorStop(1, "rgba(198, 234, 255, 0)");

      ctx.strokeStyle = lit;
      ctx.lineWidth = LINE_WIDTH;
      ctx.lineCap = "round";

      const fromX = Math.max(0, gx - REACH);
      const toX = Math.min(width, gx + REACH);

      /* Ruled from the top of the band rather than from the pointer, so the
         filaments stay put as the cursor moves and it is the bend that travels
         along them. */
      const firstLine = Math.max(0, Math.floor((gy - REACH) / LINE_GAP)) * LINE_GAP;

      for (let baseY = firstLine; baseY <= gy + REACH; baseY += LINE_GAP) {
        if (baseY < 0 || baseY > height) continue;

        const dy = baseY - gy;
        ctx.beginPath();

        for (let x = fromX; x <= toX; x += STEP) {
          const dx = x - gx;
          /* Gaussian in both axes, so the bow is strongest directly under the
             pointer and eases off in every direction at once. */
          const bump = Math.exp(-((dx * dx + dy * dy) / (SIGMA * SIGMA)));
          const y = baseY + (dy / SIGMA) * bump * BOW * SIGMA;
          if (x === fromX) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.stroke();
      }

      ctx.globalCompositeOperation = "source-over";
      frame = requestAnimationFrame(draw);
    };

    const start = () => {
      if (!frame && visible) frame = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const r = band.getBoundingClientRect();
      px = e.clientX - r.left;
      py = e.clientY - r.top;

      /* First reading of the session lands the light where the pointer already
         is, rather than flying it in from the corner. */
      if (!placed) {
        gx = px;
        gy = py;
        placed = true;
      }

      target = 1;
      start();
    };

    const onLeave = () => {
      target = 0;
      placed = false;
      start();
    };

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(band);

    /* A band scrolled out of view stops drawing; anything mid-fade is finished
       off first so it never freezes half-lit. */
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!visible) {
          target = 0;
          intensity = 0;
          placed = false;
          cancelAnimationFrame(frame);
          frame = 0;
          last = 0;
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          ctx.clearRect(0, 0, width, height);
        }
      },
      { threshold: 0 }
    );
    io.observe(band);

    band.addEventListener("pointermove", onMove, { passive: true });
    band.addEventListener("pointerleave", onLeave);
    band.addEventListener("pointercancel", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      band.removeEventListener("pointermove", onMove);
      band.removeEventListener("pointerleave", onLeave);
      band.removeEventListener("pointercancel", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-field" />;
}
