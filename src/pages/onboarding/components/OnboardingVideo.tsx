import { useEffect, useRef } from 'react';

type OnboardingVideoProps = {
  src: string;
  isActive: boolean;
  widthClass?: string;
};

const OnboardingVideo = ({
  src,
  isActive,
  widthClass = 'w-full',
}: OnboardingVideoProps) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (isActive) {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isActive]);

  return (
    <video
      ref={ref}
      src={src}
      muted
      playsInline
      loop
      preload="metadata"
      controls={false}
      disablePictureInPicture
      controlsList="nodownload nofullscreen noremoteplayback"
      className={`${widthClass} h-auto`}
    />
  );
};

export default OnboardingVideo;
