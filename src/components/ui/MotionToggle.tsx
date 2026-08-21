"use client";

import { cn } from "@/lib/cn";

type MotionToggleProps = {
  paused: boolean;
  onToggle: () => void;
  /**
   * What the button controls, in lower case — e.g. "sector animation".
   * Used to build the accessible name, since the button shows no text.
   */
  label: string;
  /** "dark" for use over the gradient artwork, "light" over the page. */
  tone?: "light" | "dark";
  className?: string;
};

/**
 * The icon-only play/pause control for anything that animates on its own
 * (WCAG 2.2.2 Pause, Stop, Hide).
 *
 * Deliberately small and unlabelled so it reads as chrome rather than as a
 * call to action; the name it exposes to assistive tech, and the tooltip it
 * shows on hover, carry what the icon alone cannot.
 */
export function MotionToggle({
  paused,
  onToggle,
  label,
  tone = "light",
  className,
}: MotionToggleProps) {
  const name = `${paused ? "Play" : "Pause"} ${label}`;

  return (
    <button
      type="button"
      onClick={onToggle}
      /* A play/pause toggle carries its state in its name, the way media
         controls do. `aria-pressed` on top of that gets the state announced
         twice, so the name changes and this stays a plain button. */
      aria-label={name}
      title={name}
      className={cn(
        "fc-border inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
        tone === "dark"
          ? "border-white/45 text-white hover:bg-white/12"
          : "border-ink-900/15 text-ink-500 hover:bg-ink-900/5 hover:text-ink-800",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-3.5 w-3.5"
        fill="currentColor"
      >
        {paused ? (
          <path d="M8 5v14l11-7z" />
        ) : (
          <path d="M7 5h3.5v14H7zm6.5 0H17v14h-3.5z" />
        )}
      </svg>
    </button>
  );
}
