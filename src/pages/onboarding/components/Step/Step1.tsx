import downArrow1 from '@/assets/images/onboarding/down-arrow1.svg';
import step1Default from '@/assets/images/onboarding/step1-default.svg';
import step1Video from '@/assets/videos/step1.mp4';

import OnboardingVideo from '../OnboardingVideo';

type Step1Props = {
  onNext: () => void;
};

const Step1 = ({ onNext }: Step1Props) => {
  return (
    <div className="relative h-screen w-full flex flex-col items-center overflow-hidden">
      <div className="flex-1 flex items-center justify-center w-full">
        <OnboardingVideo
          src={step1Video}
          fallbackSrc={step1Default}
          isActive={true}
          widthClass="w-[76%]"
        />
      </div>

      <button onClick={onNext}>
        <img
          src={downArrow1}
          alt="down"
          className="py-[3.4rem] cursor-pointer w-[2.8rem]"
        />
      </button>
    </div>
  );
};

export default Step1;
