"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { sectors } from "@/content/home";

/**
 * The 8X mark, with a hotspot on the ribbon for each sector we work in.
 *
 * The overlay is nested *inside* the floating element rather than beside it, so
 * the hotspots ride the 9s float and stay on the ribbon at all times — a
 * coordinate map cannot track a moving target any other way. The float is then
 * also paused while a popup is open (`data-paused`), so what you are reading
 * holds still and the pointer cannot have the control drift out from under it.
 * Both, in other words, not either.
 *
 * The reveal itself follows `.team-bio`: hover *and* focus, with the panel kept
 * in the DOM and transitioned rather than mounted, so it can animate.
 *
 * WCAG notes:
 *   2.1.1  hotspots are real buttons, so they are reachable and operable by
 *          keyboard; focus opens the popup exactly as hover does.
 *   1.4.13 the popup is hoverable (an invisible bridge spans the gap between
 *          the dot and the panel, and leaving is delayed), it persists until
 *          dismissed, and Escape closes it from anywhere on the page — which
 *          is why open/closed is state here rather than a CSS `:hover` rule
 *          that Escape could not overrule.
 *   2.5.8  targets are 44px; the map keeps them from overlapping at any width.
 *
 * The description is tied to the button with `aria-describedby`, so a screen
 * reader reads it on focus whether or not the panel happens to be open.
 */
export function HeroMark() {
  const uid = useId();
  const [open, setOpen] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  const cancelClose = () => {
    if (closeTimer.current !== undefined) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = undefined;
    }
  };

  /* A short grace period, so a wobble off the 14px dot on the way to the panel
     does not snatch it away. */
  const closeSoon = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(null), 140);
  };

  const show = (name: string) => {
    cancelClose();
    setOpen(name);
  };

  useEffect(() => cancelClose, []);

  // Escape and outside clicks dismiss. Both are on the document because a
  // hover-opened popup leaves focus elsewhere entirely (1.4.13 Dismissible).
  useEffect(() => {
    if (open === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        cancelClose();
        setOpen(null);
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        cancelClose();
        setOpen(null);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="hero-mark" data-paused={open !== null}>
      <Image
        src="/images/hero-infinity.png"
        alt=""
        width={1600}
        height={1000}
        priority
        sizes="(max-width: 1024px) 92vw, 1120px"
        className="h-auto w-full"
      />

      <ul role="list" aria-label="What we work on" className="hero-spots">
        {sectors.map((sector) => {
          const panelId = `${uid}-${sector.name.replace(/\s+/g, "-").toLowerCase()}`;
          const isOpen = open === sector.name;

          return (
            <li
              key={sector.name}
              data-open={isOpen}
              style={
                {
                  "--spot-x": `${sector.x}%`,
                  "--spot-y": `${sector.y}%`,
                } as React.CSSProperties
              }
              /* Enter/leave rather than a CSS `:hover`, so Escape can win.
                 React fires these for the subtree as a whole, so moving from
                 the dot into the panel is not a leave. */
              onPointerEnter={(e) => {
                // On touch the tap fires enter *and* click; let click own it,
                // so a second tap closes what the first one opened.
                if (e.pointerType !== "touch") show(sector.name);
              }}
              onPointerLeave={(e) => {
                if (e.pointerType !== "touch") closeSoon();
              }}
              onFocus={() => show(sector.name)}
              onBlur={closeSoon}
            >
              <button
                type="button"
                className="hero-spot"
                aria-expanded={isOpen}
                aria-controls={panelId}
                /* the description only — the name is already the button's
                   own label, and hearing it twice helps nobody */
                aria-describedby={`${panelId}-desc`}
                onClick={() => (isOpen ? setOpen(null) : show(sector.name))}
              >
                <span className="sr-only-8x">{sector.name}</span>
              </button>

              <div id={panelId} className="hero-pop" data-place={sector.place}>
                <p className="text-[length:clamp(0.9375rem,1.05vw,1.25rem)] font-bold text-ink-950">
                  {sector.name}
                </p>
                <p
                  id={`${panelId}-desc`}
                  className="mt-1 text-[length:clamp(0.8125rem,0.92vw,1.0625rem)] leading-[1.4] font-light text-pretty text-ink-800"
                >
                  {sector.description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
