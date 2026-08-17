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

/**
 * The design's signature call-to-action: a plain label sitting on a short
 * brand-blue rule that sweeps on hover.
 *
 * The rule is decorative — the link is still identifiable by its text, and
 * hover/focus states are conveyed by more than colour alone (the rule
 * thickens and the label shifts), satisfying WCAG 1.4.1 Use of Colour.
 */
export function UnderlineLink({ href, children, tone = "dark", className }: Props) {
  const isInternal = href.startsWith("/") || href.startsWith("#");

  const content = (
    <span className="relative inline-flex flex-col items-center gap-[0.55em]">
      <span className="transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-0.5">
        {children}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "block h-[2px] w-full origin-center scale-x-100 rounded-full transition-[transform,height] duration-500 ease-[var(--ease-out-expo)]",
          "group-hover:h-[3px] group-hover:scale-x-110 group-focus-visible:h-[3px]",
          tone === "light" ? "bg-white/70" : "bg-brand-rule",
        )}
      />
    </span>
  );

  const classes = cn(
    "group inline-flex text-[length:var(--text-body-lg)] font-light",
    tone === "light" ? "text-white" : "text-ink-900",
    className,
  );

  if (isInternal) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} target="_blank" rel="noreferrer noopener">
      {content}
    </a>
  );
}
