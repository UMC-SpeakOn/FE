import { useRef } from 'react';

import NavPurple1 from '@/assets/images/onboarding/nav-purple1.svg';

import Step1 from './components/Step/Step1';
import Step2 from './components/Step/Step2';
import Step3 from './components/Step/Step3';
import Step4 from './components/Step/Step4';
import Step5 from './components/Step/Step5';
import { scroll } from './utils/scroll';

const Onboarding = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const step4Ref = useRef<HTMLDivElement>(null);
  const step5Ref = useRef<HTMLDivElement>(null);

  const goToStep2 = () => {
    if (!containerRef.current || !step2Ref.current) return;
    scroll(containerRef.current, step2Ref.current, 300);
  };

  const goToStep3 = () => {
    if (!containerRef.current || !step3Ref.current) return;
    scroll(containerRef.current, step3Ref.current, 500);
  };

  const goToStep4 = () => {
    if (!containerRef.current || !step4Ref.current) return;
    scroll(containerRef.current, step4Ref.current, 500);
  };

  const goToStep5 = () => {
    if (!containerRef.current || !step5Ref.current) return;
    scroll(containerRef.current, step5Ref.current, 500);
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-screen overflow-y-scroll scroll bg-purple-500"
    >
      <Step1 onNext={goToStep2} />

      <div ref={step2Ref}>
        <Step2 onNext={goToStep3} />
      </div>

      <div ref={step3Ref}>
        <div className="relative pointer-events-none">
          <img
            src={NavPurple1}
            alt="nav-purple"
            className="absolute left-0 top-0 -translate-y-1/2 w-full"
          />
        </div>
        <Step3 onNext={goToStep4} />
      </div>

      <div ref={step4Ref}>
        <Step4 onNext={goToStep5} />
      </div>

      <div ref={step5Ref}>
        <Step5 />
      </div>
    </div>
  );
};

export default Onboarding;
