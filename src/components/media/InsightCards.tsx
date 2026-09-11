"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { InsightPlateVideo } from "@/components/media/InsightPlateVideo";
import type { MediaInsight } from "@/content/media";

/* The frame's play triangle, sitting in the plate's white disc. */
function PlayGlyph() {
  return (
    <svg viewBox="0 0 20 22" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M19 9.27a1.5 1.5 0 0 1 0 2.6L2.75 21.25A1.5 1.5 0 0 1 .5 19.95V2.19A1.5 1.5 0 0 1 2.75.89Z" />
    </svg>
  );
}

/**
 * Turns a YouTube link into something that can be framed.
 *
 * Takes any of the three shapes a link is copied in — a watch URL, a `youtu.be`
 * short link, or the bare id — so whoever fills these in does not have to think
 * about which one they pasted. `nocookie` because the reader has not asked for
 * anything to be set on them by opening a video.
 */
function embedUrl(video: string): string | null {
  const id = video.includes("/")
    ? (video.match(/[?&]v=([\w-]{6,})/) ?? video.match(/youtu\.be\/([\w-]{6,})/) ??
       video.match(/\/embed\/([\w-]{6,})/))?.[1]
    : video;
  return id ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0` : null;
}

/**
 * The three recorded appearances, and the dialog they play in.
 *
 * The cards are buttons, not links, and that is the honest markup now that they
 * open something in place rather than going somewhere: each used to point at a
 * `/media/…` page that was never written and only ever rendered "this piece is
 * being prepared".
 *
 * The dialog is the platform's own. `showModal` brings the focus trap, the
 * Escape key, the inert page behind it and the backdrop with it, so none of
 * that is re-implemented here badly. The frame is only mounted while the dialog
 * is open, which is what stops a closed video going on playing underneath.
 */
export function InsightCards({ items }: { items: readonly MediaInsight[] }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [playing, setPlaying] = useState<MediaInsight | null>(null);

  const open = useCallback((item: MediaInsight) => {
    setPlaying(item);
    ref.current?.showModal();
  }, []);

  const close = useCallback(() => {
    ref.current?.close();
  }, []);

  /* `close` fires for the Escape key too, so the frame is torn down there
     rather than in the button's own handler. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onClose = () => setPlaying(null);
    el.addEventListener("close", onClose);
    return () => el.removeEventListener("close", onClose);
  }, []);

  const src = playing?.video ? embedUrl(playing.video) : null;

  return (
    <>
      {/* No corner arrow on these: the play button already says the card opens
          something, and two affordances on one plate is one more than it
          needs. */}
      <ul role="list" className="md-ins-cards">
        {items.map((item, i) => (
          <Reveal as="li" variant="card" key={item.title} delay={i * 120}>
            <button type="button" onClick={() => open(item)} className="group md-ins-card">
              <div aria-hidden="true" className="md-ins-plate">
                <InsightPlateVideo />
                <span className="md-ins-play relative z-10">
                  <PlayGlyph />
                </span>
              </div>

              <div className="md-ins-text">
                <h3 className="md-ins-name">{item.title}</h3>
                <span className="md-ins-kicker">{item.kicker}</span>
              </div>
            </button>
          </Reveal>
        ))}
      </ul>

      <dialog
        ref={ref}
        aria-label={playing ? `${playing.title} — video` : "Video"}
        className="lightbox lightbox--video"
        /* A click that lands on the dialog itself is a click on the backdrop:
           everything inside is in the frame or the button. */
        onClick={(e) => {
          if (e.target === ref.current) close();
        }}
      >
        <button type="button" onClick={close} className="lightbox-close">
          <span aria-hidden="true">×</span>
          <span className="sr-only-8x">Close video</span>
        </button>

        <div className="md-video-frame">
          {src ? (
            <iframe
              src={src}
              title={playing?.title ?? "Video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <p className="md-video-pending">
              {playing?.title}
              <span>This recording has not been linked yet.</span>
            </p>
          )}
        </div>
      </dialog>
    </>
  );
}
