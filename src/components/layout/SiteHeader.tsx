"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { primaryNav, siteConfig } from "@/content/site";
import { cn } from "@/lib/cn";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* --- Solidify the bar once the page has scrolled off the hero --------- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* --- Close the panel on navigation ------------------------------------
     Adjusted during render rather than in an effect, so the panel is never
     painted open on the new route. Focus is deliberately left alone here:
     the browser moves it as part of the navigation. */
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  /* --- Modal behaviour: scroll lock, Escape, focus trap ----------------- */
  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panel) return;

      const items = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || !panel.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500",
        scrolled || open
          ? "bg-white/92 shadow-[0_1px_0_rgba(0,0,0,0.07)] backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      {/* The bar's height is its tallest child plus this padding, and
          `--header-h` is written to match, so the padding is whatever holds
          68/80/96/110: the lockup at 30/40/52/64, or the 44px menu toggle
          where it is the taller of the two, inside 12/18/22/23. */}
      <div className="container-8x flex items-center justify-between gap-6 py-3 sm:py-[18px] lg:py-[22px] xl:py-[23px]">
        <Link
          href="/"
          className="shrink-0 transition-transform duration-500 hover:scale-[1.03] active:scale-[0.99]"
          aria-label={`${siteConfig.name} — home`}
        >
          {/* A real `alt` rather than the usual empty one for a lockup beside a
              labelled link: this is the only thing on the page that names the
              firm, so if the file ever fails to arrive the name still shows
              instead of a blank gap. The link keeps its own `aria-label`, so
              assistive tech reads the destination once, not twice. */}
          <Image suppressHydrationWarning
            src="/images/logo-mark.png"
            alt={siteConfig.name}
            width={703}
            height={259}
            priority
            data-img-in="none"
            /* These are the mark itself now, not a box mostly made of nothing:
               the file used to carry 191px of transparent padding down its 450,
               so 58% of any height set here was the only part you could see —
               a 78px lockup was 45px of ink. Cropped to its own bounds, the
               number is what you get.

               64 at `xl` is the artboard's own: it draws the lockup 174 x 64 on
               its 1920 frame, which is this file's aspect exactly. */
            className="h-[30px] w-auto sm:h-10 lg:h-[52px] xl:h-16"
          />
        </Link>

        {/* --- Desktop navigation --- */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8 xl:gap-14 2xl:gap-[4.5rem]">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className={cn(
                    "group relative inline-block py-2 text-[length:var(--text-nav)] tracking-[0.04em] uppercase transition-colors duration-300",
                    item.emphasis
                      ? "font-bold text-brand-cyan"
                      : "font-light text-ink-600 hover:text-brand-deep",
                    isCurrent(item.href) && !item.emphasis && "text-ink-900",
                  )}
                >
                  {item.label}
                  {/* Underline doubles as the current-page marker so state is
                      never carried by colour alone (WCAG 1.4.1). */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-0 -bottom-0.5 h-[2px] origin-left rounded-full bg-brand-rule transition-[transform,height,background-color] duration-400 ease-[var(--ease-out-expo)]",
                      "group-hover:h-[3px] group-hover:bg-brand-deep group-focus-visible:h-[3px] group-focus-visible:scale-x-100",
                      isCurrent(item.href)
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* --- Mobile toggle --- */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => (open ? close() : setOpen(true))}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full text-ink-800 transition-colors hover:bg-ink-900/5 lg:hidden"
        >
          <span className="sr-only-8x">
            {open ? "Close menu" : "Open menu"}
          </span>
          <span aria-hidden="true" className="relative block h-4 w-6">
            <span
              className={cn(
                "absolute inset-x-0 top-0 h-0.5 rounded-full bg-current transition-transform duration-400 ease-[var(--ease-out-expo)]",
                open && "translate-y-[7px] rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute inset-x-0 top-[7px] h-0.5 rounded-full bg-current transition-opacity duration-200",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "absolute inset-x-0 top-[14px] h-0.5 rounded-full bg-current transition-transform duration-400 ease-[var(--ease-out-expo)]",
                open && "-translate-y-[7px] -rotate-45",
              )}
            />
          </span>
        </button>
      </div>

      {/* --- Mobile panel --- */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="border-t border-ink-900/8 bg-white lg:hidden"
      >
        <nav aria-label="Primary (mobile)" className="container-8x py-6">
          <ul className="flex flex-col gap-1">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className={cn(
                    "block border-b border-ink-900/8 py-4 text-lg tracking-[0.04em] uppercase transition-[color,background-color,padding] duration-300 hover:bg-brand-tint hover:ps-3",
                    item.emphasis
                      ? "font-bold text-brand-cyan"
                      : "font-light text-ink-700 hover:text-brand-deep",
                    isCurrent(item.href) && "text-ink-900",
                  )}
                >
                  {item.label}
                  {isCurrent(item.href) && (
                    <span className="sr-only-8x"> (current page)</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
