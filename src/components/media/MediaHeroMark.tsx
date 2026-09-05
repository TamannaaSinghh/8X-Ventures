"use client";

import { useEffect, useRef } from "react";

export function MediaHeroMark() {
  const videoRef = useRef<HTMLVideoElement>(null);

  /* Pause while off-screen so the browser is free to drop the decode; resume
     when it re-enters the viewport. Keeps the animation fluid when in view
     without burning resources on a section the reader hasn't scrolled to. */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      disablePictureInPicture
      disableRemotePlayback
      preload="auto"
      aria-hidden="true"
      className="art-3d h-auto w-full"
    >
      <source src="/videos/loop-03.mp4" type="video/mp4" />
    </video>
  );
}
