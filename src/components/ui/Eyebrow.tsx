import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The small uppercase blue label that sits above most section headings.
 * Purely presentational — headings carry the document structure.
 */
/** The artboard uses the same #009EFF for eyebrows on every surface. */
const TONES = {
  dark: "text-brand",
  light: "text-brand",
  tint: "text-brand",
} as const;

export function Eyebrow({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof TONES;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-[length:var(--text-eyebrow)] font-bold tracking-[0.06em] uppercase",
        TONES[tone],
        className,
      )}
    >
      {children}
    </p>
  );
}
