import { useEffect, useRef, useState } from 'react';

type VideoSource =
  | { webmSrc: string; mp4Src?: string }
  | { webmSrc?: string; mp4Src: string };

type OnboardingVideoProps = VideoSource & {
  fallbackSrc: string;
  isActive: boolean;
  widthClass?: string;
  fallbackWidthClass?: string;
};

const OnboardingVideo = ({
  webmSrc,
  mp4Src,
  fallbackSrc,
  isActive,
  widthClass = 'w-full',
  fallbackWidthClass,
}: OnboardingVideoProps) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);

  const isSafari =
    typeof navigator !== 'undefined' &&
    navigator.userAgent.includes('Safari') &&
    !navigator.userAgent.includes('Chrome') &&
    !navigator.userAgent.includes('CriOS') &&
    !navigator.userAgent.includes('FxiOS');

  useEffect(() => {
    const video = ref.current;
    if (!video || hasError || isSafari) return;

    if (isActive) {
      video.currentTime = 0;
      video.play().catch(() => {
        setHasError(true);
      });
    } else {
      video.pause();
    }
  }, [isActive, hasError, isSafari]);

  if (isSafari || hasError) {
    return (
      <img
        src={fallbackSrc}
        alt="fallback"
        className={`${fallbackWidthClass ?? widthClass} h-auto`}
      />
    );
  }

  return (
    <video
      ref={ref}
      poster={fallbackSrc}
      muted
      playsInline
      autoPlay
      loop
      preload="metadata"
      controls={false}
      disablePictureInPicture
      controlsList="nodownload nofullscreen noremoteplayback"
      className={`${widthClass} h-auto`}
      onError={() => setHasError(true)}
    >
      {webmSrc && <source src={webmSrc} type="video/webm" />}
      {mp4Src && <source src={mp4Src} type="video/mp4" />}
    </video>
  );
};

export default OnboardingVideo;
