import { useEffect, useMemo, useRef, useState } from 'react';

type OnboardingVideoProps = {
  webmSrc?: string;
  mp4Src?: string;
  fallbackSrc: string;
  isActive: boolean;

  webmWidthClass?: string;
  mp4WidthClass?: string;
  fallbackWidthClass?: string;
};

const OnboardingVideo = ({
  webmSrc,
  mp4Src,
  fallbackSrc,
  isActive,
  webmWidthClass = 'w-full',
  mp4WidthClass = 'w-full',
  fallbackWidthClass = 'w-full',
}: OnboardingVideoProps) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);

  const isMobile = useMemo(() => {
    if (typeof navigator === 'undefined') return false;
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }, []);

  const usingWebm = !isMobile && !!webmSrc;

  useEffect(() => {
    const video = ref.current;
    if (!video || hasError) return;

    if (isActive) {
      video.currentTime = 0;
      video.play().catch(() => {
        setHasError(true);
      });
    } else {
      video.pause();
    }
  }, [isActive, hasError]);

  if (hasError) {
    return (
      <img
        src={fallbackSrc}
        alt="fallback"
        className={`${fallbackWidthClass} h-auto`}
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
      className={`${usingWebm ? webmWidthClass : mp4WidthClass} h-auto`}
      onError={() => setHasError(true)}
    >
      {!isMobile && webmSrc && <source src={webmSrc} type="video/webm" />}

      {mp4Src && <source src={mp4Src} type="video/mp4" />}
    </video>
  );
};

export default OnboardingVideo;
