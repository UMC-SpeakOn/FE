import job from '@/assets/images/onboarding/job.svg';
import situation from '@/assets/images/onboarding/situation.svg';

type Step2Props = {
  onNext: () => void;
};

const Step2 = ({ onNext }: Step2Props) => {
  return (
    <div className="relative h-screen w-full flex flex-col">
      <div className="flex flex-col items-center pt-[5.4rem]">
        <div className="flex flex-col gap-[0.5rem] items-center text-center">
          <div className="flex items-center gap-[0.4rem]">
            <p className="font-unbounded font-bold text-[2.147rem] leading-none text-green-500">
              SpeakOn
            </p>
            <p className="font-bold text-[2.2rem] leading-[1.25] text-white">
              은 다양한
            </p>
          </div>
          <p className="font-bold text-[2.2rem] leading-[1.25] text-white">
            비즈니스 상황을 제공합니다!
          </p>
        </div>

        <p className="mt-[5.25rem] mb-[3.387rem] font-semibold text-white text-[1.7rem] leading-[1.25] text-center">
          오늘 연습해 볼 상황을 골라보세요
        </p>
      </div>

      <div
        className="
          relative
          flex-1
          [background:var(--gradient-purple-onboarding)]
          rounded-t-[3rem]
          p-[3.9rem]
          flex
          flex-col
          overflow-hidden
        "
      >
        <div className="flex flex-col gap-[3rem] mb-[6rem]">
          <img src={job} alt="job" className="w-full" />
          <img src={situation} alt="situation" className="w-full" />
        </div>

        <button
          onClick={onNext}
          className="relative z-10 w-full py-[1.4rem] rounded-[1rem] bg-purple-700 font-semibold text-[1.8rem] leading-[1.25] text-white"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default Step2;
