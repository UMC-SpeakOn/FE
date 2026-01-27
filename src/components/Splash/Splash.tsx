import Lottie from 'lottie-react';

import SplashBg from '@/assets/lottie/splash-bg.json';
import SplashText from '@/assets/lottie/splash-text.json';
import { useLottieAnimation } from '@/hooks/useLottieAnimation';
import useNavigation from '@/hooks/useNavigation';

const Splash = () => {
  const { navigateTo } = useNavigation();

  const bgRef = useLottieAnimation({
    animationData: SplashBg,
    onComplete: () => navigateTo('/login'),
  });

  return (
    <div className="pageContainer">
      <div className="pt-[23.64rem] flex justify-center relative">
        <div ref={bgRef} className="relative z-0" />

        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="flex justify-center">
            <Lottie
              animationData={SplashText}
              loop={false}
              autoplay
              renderer="svg"
              className="translate-y-[26rem]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Splash;
