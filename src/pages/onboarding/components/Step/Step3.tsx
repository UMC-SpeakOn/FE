import downArrow2 from '@/assets/images/onboarding/down-arrow2.svg';
import step3Default from '@/assets/images/onboarding/step3-default.svg';
import step3Video from '@/assets/videos/step3.mp4';

import OnboardingVideo from '../OnboardingVideo';

type Step3Props = {
  onNext: () => void;
};

const Step3 = ({ onNext }: Step3Props) => {
  return (
    <div className="relative h-screen w-full flex flex-col">
      <div className="pt-[6rem] flex flex-col items-center gap-[1.68rem]">
        <div className="flex flex-col items-center gap-[0.7rem]">
          <p className="font-bold text-[2.2rem] leading-[1.25] text-white text-center">
            AI와 직접 대화하며 연습하는
          </p>

          <span className="py-[0.1rem] px-[0.7rem] bg-green-500 text-purple-700 font-bold text-[2.2rem]">
            실무 비즈니스 영어
          </span>
        </div>

        <p className="font-semibold text-[1.7rem] text-white leading-[1.25]">
          실제 대화처럼 듣고 말하며 연습해요
        </p>
      </div>

      <div className="mt-[3.3rem] flex-1 flex flex-col items-center bg-white rounded-t-[3rem] px-[2.7rem] pt-[3.2rem] overflow-hidden">
        <div className="w-full rounded-[1rem] overflow-hidden">
          <OnboardingVideo
            src={step3Video}
            fallbackSrc={step3Default}
            isActive={true}
            widthClass="w-full"
          />
        </div>

        <button onClick={onNext} className="py-[3.4rem]">
          <img src={downArrow2} alt="down" className="w-[2.8rem]" />
        </button>
      </div>
    </div>
  );
};

export default Step3;
