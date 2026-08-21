import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  href: string;
  children: ReactNode;
  /** Light text + light rule, for use on navy / photographic backgrounds. */
  tone?: "dark" | "light";
  className?: string;
};

/** Where the link goes, which decides which arrow it wears. */
function destination(href: string) {
  if (href.startsWith("#")) return "anchor" as const;
  if (href.startsWith("/")) return "internal" as const;
  return "external" as const;
}

/* Drawn on the same 24-box as the rest of the site's icons. The arrow says
   what kind of move the link makes: down the page, along to another page, or
   out of the site entirely. */
const ARROW_PATH = {
  anchor: "M12 5v14M6 13l6 6 6-6",
  internal: "M5 12h14M13 6l6 6-6 6",
  external: "M7 17 17 7M9 7h8v8",
} as const;

/**
 * The design's signature call-to-action: a plain label sitting on a short
 * brand-blue rule that sweeps on hover.
 *
 * Hover and focus are carried by four things at once — the label lifts and
 * deepens in colour, the rule thickens and widens, and an arrow slides in —
 * so the state never depends on colour alone (WCAG 1.4.1). The arrow's space
 * is reserved at rest, so nothing reflows when it appears.
 */
export function UnderlineLink({
  href,
  children,
  tone = "dark",
  className,
}: Props) {
  const kind = destination(href);
  const light = tone === "light";

  const content = (
    <span className="relative inline-flex flex-col items-center gap-[0.55em]">
      <span className="inline-flex items-center gap-[0.4em] transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5">
        <span>{children}</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          focusable="false"
          className={cn(
            "h-[0.8em] w-[0.8em] shrink-0 opacity-0 transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)]",
            "group-focus-visible:opacity-100 group-hover:opacity-100",
            /* Each arrow travels the way it points. */
            kind === "anchor"
              ? "-translate-y-1 group-hover:translate-y-0 group-focus-visible:translate-y-0"
              : kind === "external"
                ? "translate-y-1 -translate-x-1 group-hover:translate-x-0 group-hover:translate-y-0 group-focus-visible:translate-x-0 group-focus-visible:translate-y-0"
                : "-translate-x-1 group-hover:translate-x-0 group-focus-visible:translate-x-0",
          )}
        >
          <path
            d={ARROW_PATH[kind]}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "block h-[2px] w-full origin-center scale-x-100 rounded-full transition-[transform,height,background-color] duration-500 ease-[var(--ease-out-expo)]",
          "group-hover:h-[3px] group-hover:scale-x-110 group-focus-visible:h-[3px] group-focus-visible:scale-x-110",
          light
            ? "bg-white/70 group-hover:bg-white group-focus-visible:bg-white"
            : "bg-brand-rule group-hover:bg-brand-deep group-focus-visible:bg-brand-deep",
        )}
      />
    </span>
  );

  const classes = cn(
    "group inline-flex text-[length:var(--text-body-lg)] font-light",
    "transition-[color,transform] duration-300 ease-[var(--ease-out-soft)] active:scale-[0.98]",
    light
      ? "text-white"
      : "text-ink-900 hover:text-brand-deep focus-visible:text-brand-deep",
    className,
  );

  if (kind === "external") {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noreferrer noopener"
      >
        {content}
        <span className="sr-only-8x"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
