import step5Default from '@/assets/images/onboarding/step1-default.svg';
import step5Video from '@/assets/videos/step5.mp4';
import useNavigation from '@/hooks/useNavigation';

import { useComplete } from '../../hooks/useComplete';
import OnboardingVideo from '../OnboardingVideo';

const Step5 = () => {
  const { navigateTo } = useNavigation();

  const { complete, isLoading } = useComplete({
    onSuccess: () => {
      navigateTo('/my-role');
    },
    onError: (err) => {
      console.error('온보딩 완료 실패', err);
    },
  });

  return (
    <div className="relative h-screen w-full flex flex-col items-center overflow-hidden">
      <div className="flex-1 flex flex-col gap-[2rem] items-center justify-center w-full">
        <OnboardingVideo
          src={step5Video}
          fallbackSrc={step5Default}
          isActive={true}
          widthClass="w-[76%]"
        />
        <div className="w-full px-[4rem]">
          <button
            className="w-full rounded-[1rem] bg-purple-700 py-[1.45rem] font-semibold leading-[1.25] text-[1.8rem] text-white"
            onClick={complete}
            disabled={isLoading}
          >
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step5;
