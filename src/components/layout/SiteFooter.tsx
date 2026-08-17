import Image from "next/image";
import Link from "next/link";
import {
  copyrightYear,
  footerBlurb,
  footerColumns,
  siteConfig,
  socialLinks,
} from "@/content/site";
import { cn } from "@/lib/cn";

const socialIcons: Record<string, React.ReactNode> = {
  Facebook: (
    <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.24-1.46 1.49-1.46h1.59V4.46A21 21 0 0 0 14.27 4c-2.3 0-3.87 1.4-3.87 3.98V10.5H8v3h2.4V21z" />
  ),
  Instagram: (
    <path d="M12 4.62c2.4 0 2.69.01 3.64.05.88.04 1.35.19 1.67.31.42.16.72.36 1.03.67.31.31.51.61.67 1.03.12.32.27.79.31 1.67.04.95.05 1.24.05 3.65s-.01 2.7-.05 3.65c-.04.88-.19 1.35-.31 1.67-.16.42-.36.72-.67 1.03-.31.31-.61.51-1.03.67-.32.12-.79.27-1.67.31-.95.04-1.24.05-3.64.05s-2.69-.01-3.64-.05c-.88-.04-1.35-.19-1.67-.31a2.78 2.78 0 0 1-1.03-.67 2.78 2.78 0 0 1-.67-1.03c-.12-.32-.27-.79-.31-1.67-.04-.95-.05-1.24-.05-3.65s.01-2.7.05-3.65c.04-.88.19-1.35.31-1.67.16-.42.36-.72.67-1.03.31-.31.61-.51 1.03-.67.32-.12.79-.27 1.67-.31.95-.04 1.24-.05 3.64-.05m0-1.62c-2.44 0-2.75.01-3.71.05-.96.05-1.61.2-2.19.42-.6.23-1.1.54-1.61 1.05-.5.5-.82 1.01-1.05 1.6-.22.58-.37 1.24-.42 2.2C3 9.28 3 9.58 3 12.02s.01 2.75.05 3.71c.05.96.2 1.62.42 2.2.23.59.54 1.1 1.05 1.6.5.5 1.01.82 1.61 1.05.58.22 1.23.37 2.19.42.96.04 1.27.05 3.71.05s2.75-.01 3.71-.05c.96-.05 1.61-.2 2.19-.42.6-.23 1.1-.55 1.61-1.05.5-.5.82-1.01 1.05-1.6.22-.58.37-1.24.42-2.2.04-.96.05-1.27.05-3.71s-.01-2.74-.05-3.7c-.05-.96-.2-1.62-.42-2.2a4.4 4.4 0 0 0-1.05-1.6 4.4 4.4 0 0 0-1.61-1.05c-.58-.22-1.23-.37-2.19-.42C14.75 3.01 14.44 3 12 3m0 4.38a4.62 4.62 0 1 0 0 9.24 4.62 4.62 0 0 0 0-9.24m0 7.62a3 3 0 1 1 0-6 3 3 0 0 1 0 6m5.88-7.8a1.08 1.08 0 1 1-2.16 0 1.08 1.08 0 0 1 2.16 0" />
  ),
  LinkedIn: (
    <path d="M6.94 8.5H4.06V20h2.88zM5.5 3.6a1.67 1.67 0 1 0 0 3.34 1.67 1.67 0 0 0 0-3.34M20 13.44c0-2.9-1.55-4.25-3.62-4.25a3.12 3.12 0 0 0-2.84 1.56h-.04V8.5H10.7V20h2.88v-5.69c0-1.5.29-2.95 2.15-2.95 1.83 0 1.86 1.71 1.86 3.05V20H20z" />
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
        <Link
          href="/"
          aria-label={`${siteConfig.name} — home`}
          className="footer-logo block max-lg:w-[15.6rem]"
        >
          <Image
            src="/images/logo-footer.png"
            alt=""
            width={1000}
            height={500}
            className="h-auto w-full"
          />
        </Link>

        <p
          className={cn(
            "footer-blurb leading-[1.2] font-light text-ink-300 max-lg:mt-8 max-lg:max-w-[34ch]",
            BODY_SIZE,
          )}
        >
          {footerBlurb}
        </p>

        <ul role="list" className="footer-socials max-lg:mt-8 max-lg:gap-5">
          {socialLinks.map((social) => (
            <li key={social.short}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className="fc-border grid aspect-square w-[clamp(2.75rem,2.76vw,3.3125rem)] place-items-center rounded-full border border-ink-900/20 text-ink-800 transition-[transform,background-color,border-color] duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-brand-tint hover:text-brand"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-[62%]">
                  {socialIcons[social.short]}
                </svg>
                <span className="sr-only-8x">{social.label} (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>

        {/* --- Link columns --- */}
        {footerColumns.map((column, i) => (
          <nav
            key={column.heading}
            aria-labelledby={`footer-${column.heading}`}
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
                      "group inline-flex leading-[1.2] font-light text-ink-700 transition-colors duration-300 hover:text-brand",
                      BODY_SIZE,
                    )}
                  >
                    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-[position:0_100%] bg-no-repeat transition-[background-size] duration-400 ease-[var(--ease-out-expo)] group-hover:bg-[length:100%_1px]">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="footer-rule h-px bg-[#A5D7FA] max-lg:mt-16" />

        <p className="footer-copy text-center text-[length:clamp(0.75rem,1.125vw,1.35rem)] leading-[1.2] font-light tracking-[0.2em] text-ink-950 uppercase max-lg:mt-8">
          © {siteConfig.name} {copyrightYear}
        </p>
      </div>
    </footer>
  );
}
