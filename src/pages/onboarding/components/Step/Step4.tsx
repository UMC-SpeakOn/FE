import Card from '@/assets/images/onboarding/card.svg';
import Chat from '@/assets/images/onboarding/chat.svg';
import downArrow3 from '@/assets/images/onboarding/down-arrow3.svg';
import NavPurple2 from '@/assets/images/onboarding/nav-purple2.svg';

type Step4Props = {
  onNext: () => void;
};

const Step4 = ({ onNext }: Step4Props) => {
  return (
    <div className="relative h-screen w-full flex flex-col [background:var(--gradient-purple-onboarding2)] overflow-hidden">
      <div className="pt-[4.8rem] flex flex-col items-center gap-[0.925rem] shrink-0">
        <div className="flex items-center gap-[0.75rem]">
          <p className="text-[2.147rem] font-bold font-unbounded text-purple-700">
            SpeakOn
          </p>
          <p className="font-bold text-[2.2rem] text-purple-700 leading-[1.25]">
            AI가 분석해주는
          </p>
        </div>

        <span className="py-[0.1rem] px-[0.7rem] bg-green-500 text-purple-700 font-bold text-[2.2rem]">
          진짜 비즈니스 영어
        </span>
      </div>

      <div className="flex justify-end mt-[clamp(2.4rem,12vw,6.6rem)] px-[3.6rem] shrink-0">
        <img src={Chat} alt="chat" className="w-[22.9rem] max-w-full" />
      </div>

      <p className="font-bold text-[2.2rem] leading-[1.25] text-purple-700 text-center mt-[0.4rem] shrink-0">
        AI Insight Card
      </p>

      <div className="h-[1.83rem] shrink-0" />

      <div className="px-[3.6rem] flex justify-center shrink-0">
        <img src={Card} alt="card" className="w-full" />
      </div>

      <div className="relative mt-auto h-[10.8rem] flex items-center justify-center shrink-0">
        <img
          src={NavPurple2}
          alt="nav-bg"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <button className="relative z-10 py-[3.4rem]" onClick={onNext}>
          <img src={downArrow3} alt="down" className="w-[2.8rem]" />
        </button>
      </div>
    </div>
  );
};

export default Step4;
