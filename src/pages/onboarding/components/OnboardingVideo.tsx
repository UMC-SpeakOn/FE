import { useEffect, useRef, useState } from 'react';

type OnboardingVideoProps = {
  src: string;
  fallbackSrc: string;
  isActive: boolean;
  widthClass?: string;
};

const OnboardingVideo = ({
  src,
  fallbackSrc,
  isActive,
  widthClass = 'w-full',
}: OnboardingVideoProps) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || hasError) return;

    if (isActive) {
      video.currentTime = 0;

      const tryPlay = async () => {
        try {
          await video.play();
        } catch {
          setHasError(true);
          return;
        }

        setTimeout(() => {
          if (video.readyState < 2) {
            setHasError(true);
          }
        }, 1000);
      };

      tryPlay();
    } else {
      video.pause();
    }
  }, [isActive, hasError]);

  return hasError ? (
    <img src={fallbackSrc} alt="fallback" className={`${widthClass} h-auto`} />
  ) : (
    <video
      ref={ref}
      src={src}
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
    />
  );
};

export default OnboardingVideo;
