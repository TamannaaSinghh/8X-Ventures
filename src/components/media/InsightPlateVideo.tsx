"use client";

export function InsightPlateVideo() {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      disablePictureInPicture
      disableRemotePlayback
      preload="auto"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover"
    >
      <source src="/videos/loop-03.mp4" type="video/mp4" />
    </video>
  );
}
