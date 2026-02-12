import { useEffect, useRef, useState } from 'react';

type OnboardingVideoProps = {
  webmSrc: string;
  fallbackSrc: string;
  isActive: boolean;
  widthClass?: string;
  fallbackWidthClass?: string;
};

const OnboardingVideo = ({
  webmSrc,
  fallbackSrc,
  isActive,
  widthClass = 'w-full',
  fallbackWidthClass,
}: OnboardingVideoProps) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);

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
      <source src={webmSrc} type="video/webm" />
    </video>
  );
};

export default OnboardingVideo;
