"use client";

import { useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Pointer-driven depth for anything marked `data-tilt`.
 *
 * One delegated listener for the whole document rather than a handler per card:
 * the surfaces that want this are spread across a dozen server components, and
 * this way they stay server components — a card opts in with one attribute and
 * needs no client boundary of its own.
 *
 * What it publishes on the hovered element:
 *   --tilt-x, --tilt-y   where the pointer is, -1 to 1 from the centre
 *   --tilt-mag           how far out that is, 0 at the centre to 1 at a corner
 *   --tilt-px, --tilt-py the same position as percentages, for the sheen
 *
 * The CSS does the rest, so the maths here is free of any particular card's
 * look. Off entirely under `prefers-reduced-motion`, and on coarse pointers,
 * where there is no hover to speak of and a tilt would only fire on tap.
 */
export function TiltRoot() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined" || !window.matchMedia) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let active: HTMLElement | null = null;
    let point: { x: number; y: number } | null = null;
    let frame = 0;

    const clear = (el: HTMLElement) => {
      el.removeAttribute("data-tilting");
      /* Left at rest rather than removed: the properties are what the card
         eases back along, and the transition needs somewhere to go. */
      el.style.setProperty("--tilt-x", "0");
      el.style.setProperty("--tilt-y", "0");
      el.style.setProperty("--tilt-mag", "0");
    };

    const write = () => {
      frame = 0;
      if (!active || !point) return;

      const r = active.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;

      const x = (point.x - r.left) / r.width;
      const y = (point.y - r.top) / r.height;
      const tx = Math.max(-1, Math.min(1, x * 2 - 1));
      const ty = Math.max(-1, Math.min(1, y * 2 - 1));

      active.style.setProperty("--tilt-x", tx.toFixed(3));
      active.style.setProperty("--tilt-y", ty.toFixed(3));
      active.style.setProperty("--tilt-mag", Math.min(1, Math.hypot(tx, ty)).toFixed(3));
      active.style.setProperty("--tilt-px", `${(x * 100).toFixed(2)}%`);
      active.style.setProperty("--tilt-py", `${(y * 100).toFixed(2)}%`);
    };

    const onMove = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const card =
        target && typeof target.closest === "function"
          ? (target.closest("[data-tilt]") as HTMLElement | null)
          : null;

      if (card !== active) {
        if (active) clear(active);
        active = card;
        /* Marked while tracking so the CSS can drop its return transition and
           follow the pointer exactly, then pick it up again on the way out. */
        if (active) active.setAttribute("data-tilting", "");
      }

      if (!active) return;
      point = { x: e.clientX, y: e.clientY };
      if (!frame) frame = requestAnimationFrame(write);
    };

    const onLeave = () => {
      if (active) clear(active);
      active = null;
      point = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointercancel", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      if (active) clear(active);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointercancel", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, [reduced]);

  return null;
}
