import SplashAnimation from '@/assets/lottie/splash-animation.json';
import { useLottieAnimation } from '@/hooks/useLottieAnimation';
import useNavigation from '@/hooks/useNavigation';

const Splash = () => {
  const { navigateTo } = useNavigation();

  const lottieRef = useLottieAnimation({
    animationData: SplashAnimation,
    onComplete: () => navigateTo('/login'),
  });

  return (
    <div className="pageContainer">
      <div className="pt-[23.64rem] flex justify-center">
        <div ref={lottieRef} />
      </div>
    </div>
  );
};

export default Splash;
