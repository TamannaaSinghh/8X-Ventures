"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * A pointer-reactive field for the flat statement bands — the closing panels
 * and the manifesto, the places where the plate is a single colour and the only
 * thing on it is the sentence.
 *
 * Two things happen under the cursor. A soft light tracks it and lifts the
 * plate, and a scattering of rings drifts in the band and leans towards it. The
 * rings are the hero's sector hotspots borrowed back: the same small open
 * circles, at the same weight, so the band reads as part of the same site
 * rather than a effect dropped on top of it.
 *
 * Everything is inert until the pointer is actually inside the band. There is
 * no idle animation and no requestAnimationFrame loop at rest — the loop starts
 * on enter and stops once the fade-out has finished, so a page carrying one of
 * these costs nothing to leave sitting open.
 *
 * Everything is drawn in white and pale blue at low alpha, so the field can
 * only ever lighten the plate, and the canvas is transparent wherever nothing
 * is drawn — no rectangle edge to give it away, and nothing on the band at all
 * once the pointer has gone.
 *
 * Off entirely under `prefers-reduced-motion`, and on coarse pointers, where
 * there is no hover to react to and the whole thing would only fire on tap.
 */

/** Ring count per this many square pixels of band. */
const AREA_PER_RING = 26000;
const MIN_RINGS = 16;
const MAX_RINGS = 44;

/** How far a ring is drawn towards the pointer at its strongest, in px. */
const LEAN = 26;
/** Radius, in px, over which a ring feels the pointer at all. */
const REACH = 340;

/** Peak opacity of the light. Deliberately low: the bands carry white text at
 *  the sizes the artboard sets, and lifting the plate under it costs contrast.
 *  Enough to read as a light, not enough to move the text off its footing. */
const GLOW_ALPHA = 0.13;

type Ring = {
  /** Home position, as a fraction of the band. Stable across resizes. */
  bx: number;
  by: number;
  r: number;
  /** Per-ring drift, so they do not breathe in unison. */
  phase: number;
  speed: number;
  amp: number;
};

function makeRings(count: number): Ring[] {
  const rings: Ring[] = [];
  for (let i = 0; i < count; i++) {
    rings.push({
      bx: Math.random(),
      by: Math.random(),
      r: 2.5 + Math.random() * 5,
      phase: Math.random() * Math.PI * 2,
      speed: 0.15 + Math.random() * 0.35,
      amp: 4 + Math.random() * 10,
    });
  }
  return rings;
}

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
    let rings: Ring[] = [];

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

      const count = Math.max(
        MIN_RINGS,
        Math.min(MAX_RINGS, Math.round((width * height) / AREA_PER_RING))
      );
      if (rings.length !== count) rings = makeRings(count);
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

      const t = now / 1000;
      ctx.globalCompositeOperation = "lighter";

      /* The light. Two stops rather than one so the core reads as white and the
         falloff carries the brand's blue out to the edge of the pool. */
      const radius = Math.min(width, height) * 0.85;
      const glow = ctx.createRadialGradient(gx, gy, 0, gx, gy, radius);
      glow.addColorStop(0, `rgba(255, 255, 255, ${GLOW_ALPHA * intensity})`);
      glow.addColorStop(0.42, `rgba(146, 214, 255, ${GLOW_ALPHA * 0.42 * intensity})`);
      glow.addColorStop(1, "rgba(0, 132, 214, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      /* The rings. Each drifts on its own slow figure, then leans towards the
         pointer by an amount that falls off with distance — so the field looks
         like it is aware of the cursor near it and indifferent further out. */
      ctx.lineWidth = 1.25;
      for (const ring of rings) {
        const homeX = ring.bx * width;
        const homeY = ring.by * height;

        const driftX = Math.cos(t * ring.speed + ring.phase) * ring.amp;
        const driftY = Math.sin(t * ring.speed * 0.8 + ring.phase * 1.7) * ring.amp;

        const dx = gx - (homeX + driftX);
        const dy = gy - (homeY + driftY);
        const dist = Math.hypot(dx, dy);

        /* Smooth, and zero past REACH, so nothing pops as the pointer sweeps. */
        const near = dist > REACH ? 0 : Math.pow(1 - dist / REACH, 2);
        const pull = near * LEAN * intensity;

        const x = homeX + driftX + (dist > 0.001 ? (dx / dist) * pull : 0);
        const y = homeY + driftY + (dist > 0.001 ? (dy / dist) * pull : 0);

        const alpha = (0.1 + near * 0.5) * intensity;
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, ring.r + near * 2, 0, Math.PI * 2);
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
