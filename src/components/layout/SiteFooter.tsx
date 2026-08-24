import Image from "next/image";
import Link from "next/link";
import {
  copyrightYear,
  footerBlurb,
  footerColumns,
  siteConfig,
  socialLinks,
} from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/* Keyed by `short` in `socialLinks` — X, LinkedIn and YouTube, the three
   accounts 8X actually runs. */
const socialIcons: Record<string, React.ReactNode> = {
  X: (
    <path d="M17.3 3.75h2.82l-6.16 7.04L21.2 20.4h-5.66l-4.44-5.8-5.07 5.8H3.2l6.59-7.53L3 3.75h5.8l4.01 5.3zm-.99 14.97h1.56L7.75 5.34H6.08z" />
  ),
  LinkedIn: (
    <path d="M6.94 8.5H4.06V20h2.88zM5.5 3.6a1.67 1.67 0 1 0 0 3.34 1.67 1.67 0 0 0 0-3.34M20 13.44c0-2.9-1.55-4.25-3.62-4.25a3.12 3.12 0 0 0-2.84 1.56h-.04V8.5H10.7V20h2.88v-5.69c0-1.5.29-2.95 2.15-2.95 1.83 0 1.86 1.71 1.86 3.05V20H20z" />
  ),
  YouTube: (
    <path d="M21.13 7.66a2.39 2.39 0 0 0-1.68-1.7C17.96 5.56 12 5.56 12 5.56s-5.96 0-7.45.4a2.39 2.39 0 0 0-1.68 1.7A25.1 25.1 0 0 0 2.47 12c0 1.47.13 2.93.4 4.34a2.39 2.39 0 0 0 1.68 1.7c1.49.4 7.45.4 7.45.4s5.96 0 7.45-.4a2.39 2.39 0 0 0 1.68-1.7c.27-1.41.4-2.87.4-4.34s-.13-2.93-.4-4.34M10.05 14.85V9.15L15.03 12z" />
  ),
};

/** Column x positions are traced; see `FOOTER` in globals.css. */
const COL_CLASS = ["footer-col-1", "footer-col-2", "footer-col-3"];

/* 25px at 1920, the artboard's size for the headings, links and blurb. */
const BODY_SIZE = "text-[length:clamp(0.9375rem,1.302vw,1.5625rem)]";

export function SiteFooter() {
  return (
    <footer className="bg-white">
      <div className="footer-stage">
        {/* --- Identity --- */}
        <Reveal className="footer-logo max-lg:w-[15.6rem]">
          <Link href="/" aria-label={`${siteConfig.name} — home`} className="block">
            <Image
              src="/images/logo-footer.png"
              alt=""
              width={1000}
              height={500}
              className="h-auto w-full"
            />
          </Link>
        </Reveal>

        <Reveal
          as="p"
          delay={80}
          className={cn(
            "footer-blurb leading-[1.2] font-light text-ink-300 max-lg:mt-8 max-lg:max-w-[34ch]",
            BODY_SIZE,
          )}
        >
          {footerBlurb}
        </Reveal>

        <Reveal
          as="ul"
          role="list"
          delay={160}
          className="footer-socials max-lg:mt-8 max-lg:gap-5"
        >
          {socialLinks.map((social) => (
            <li key={social.short}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className="fc-border grid aspect-square w-[clamp(2.75rem,2.76vw,3.3125rem)] place-items-center rounded-full border border-ink-900/20 text-ink-800 transition-[transform,background-color,border-color] duration-300 hover:-translate-y-0.5 hover:border-brand-deep hover:bg-brand-tint hover:text-brand-deep active:translate-y-0 active:scale-95"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-[62%]"
                >
                  {socialIcons[social.short]}
                </svg>
                <span className="sr-only-8x">
                  {social.label} (opens in a new tab)
                </span>
              </a>
            </li>
          ))}
        </Reveal>

        {/* --- Link columns --- */}
        {footerColumns.map((column, i) => (
          <Reveal
            as="nav"
            key={column.heading}
            aria-labelledby={`footer-${column.heading}`}
            delay={200 + i * 90}
            className={cn("footer-col", COL_CLASS[i], "max-lg:mt-12")}
          >
            <h2
              id={`footer-${column.heading}`}
              className={cn(
                "leading-[1.2] font-bold tracking-[0.06em] text-brand uppercase",
                BODY_SIZE,
              )}
            >
              {column.heading}
            </h2>
            <ul role="list" className="footer-links max-lg:mt-5 max-lg:gap-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={cn(
                      /* `brand` is 2.86:1 on white; `brand-deep` clears 4.5:1
                         (WCAG 1.4.3), which body-size link text needs. */
                      "group inline-flex items-center gap-[0.35em] leading-[1.2] font-light text-ink-700 transition-colors duration-300 hover:text-brand-deep",
                      BODY_SIZE,
                    )}
                  >
                    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-[position:0_100%] bg-no-repeat transition-[background-size] duration-400 ease-[var(--ease-out-expo)] group-hover:bg-[length:100%_1px]">
                      {link.label}
                    </span>
                    {/* Space is reserved at rest, so the column does not
                        reflow when the arrow arrives. */}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      focusable="false"
                      className="h-[0.7em] w-[0.7em] shrink-0 -translate-x-1 opacity-0 transition-[opacity,transform] duration-400 ease-[var(--ease-out-expo)] group-focus-visible:translate-x-0 group-focus-visible:opacity-100 group-hover:translate-x-0 group-hover:opacity-100"
                    >
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}

        <Reveal className="footer-rule h-px bg-[#A5D7FA] max-lg:mt-16" />

        <Reveal
          as="p"
          delay={80}
          className="footer-copy text-center text-[length:clamp(0.75rem,1.125vw,1.35rem)] leading-[1.2] font-light tracking-[0.2em] text-ink-950 uppercase max-lg:mt-8"
        >
          © {siteConfig.name} {copyrightYear}
        </Reveal>
      </div>
    </footer>
  );
}
