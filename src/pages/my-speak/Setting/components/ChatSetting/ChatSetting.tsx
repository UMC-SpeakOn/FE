import { useState } from 'react';

import useNavigation from '@/hooks/useNavigation';

import ListStep1 from './Step/Step1/ListStep1';
import ListStep2 from './Step/Step2/ListStep2';
import StepSection from './Step/StepSection';

const ChatSetting = () => {
  const { navigateTo } = useNavigation();
  const [selectedAIId, setSelectedAIId] = useState<number | null>(null);
  const [selectedGoalId, setSelectedGoalId] = useState<number | null>(null);
  const isAllSelected = selectedAIId !== null && selectedGoalId !== null;

  const handleChatClick = () => {
    navigateTo('/my-speak');
  };

  return (
    <div className="flex flex-col relative">
      <div className="mt-[3.8rem] flex flex-col">
        <StepSection
          stepNumber={1}
          title="AI 롤 선택"
          done={selectedAIId !== null}
        >
          <ListStep1 selectedId={selectedAIId} onSelect={setSelectedAIId} />
        </StepSection>

        {selectedAIId !== null && (
          <StepSection
            stepNumber={2}
            title="세션 목표"
            done={selectedGoalId !== null}
          >
            <ListStep2
              selectedId={selectedGoalId}
              onSelect={setSelectedGoalId}
            />
          </StepSection>
        )}

        {isAllSelected && (
          <StepSection done={false} isLast hideNumber>
            <button
              type="button"
              className="w-full py-[1.4rem] rounded-2xl bg-purple-600 text-white font-semibold text-[1.6rem] leading-none cursor-pointer"
              onClick={handleChatClick}
            >
              대화 시작하기
            </button>
          </StepSection>
        )}
      </div>
    </div>
  );
};

export default ChatSetting;
