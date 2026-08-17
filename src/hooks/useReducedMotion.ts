"use client";

import { useEffect, useState } from "react";

/**
 * Tracks `prefers-reduced-motion`. Defaults to `true` during SSR / first paint
 * so that no motion runs before we know the user's preference.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
