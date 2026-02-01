import type { AnimationItem } from 'lottie-web';
import lottie from 'lottie-web';
import { useEffect, useRef } from 'react';

type UseLottieAnimationProps = {
  animationData: object;
  loop?: boolean;
  autoplay?: boolean;
  onComplete?: () => void;
};

export const useLottieAnimation = ({
  animationData,
  loop = false,
  autoplay = true,
  onComplete,
}: UseLottieAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const animation: AnimationItem = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'canvas',
      loop,
      autoplay,
      animationData,
    });

    if (onComplete) {
      animation.addEventListener('complete', onComplete);
    }

    return () => {
      animation.destroy();
    };
  }, [animationData, loop, autoplay, onComplete]);

  return containerRef;
};
