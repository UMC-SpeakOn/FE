import { useState } from 'react';

import RoleProfileList from '@/components/RoleProfile/ListRoleProfile';
import { useRoleProfile } from '@/hooks/role/useRoleProfile';
import useNavigation from '@/hooks/useNavigation';

import ListGoal from './Step/Goal/ListGoal';
import StepSection from './Step/StepSection';

const ChatSetting = () => {
  const { navigateTo } = useNavigation();
  const { profiles } = useRoleProfile();

  const [selectedAIId, setSelectedAIId] = useState<number | null>(null);
  const [selectedGoalId, setSelectedGoalId] = useState<number | null>(null);

  const isAllSelected = selectedAIId !== null && selectedGoalId !== null;

  const handleChatClick = () => {
    if (selectedAIId === null || selectedGoalId === null) return;

    // InterviewPage로 roleId와 goalId를 전달하여 이동
    // 세션 생성은 InterviewPage에서 처리
    navigateTo(`/my-speak/interview?roleId=${selectedAIId}&goalId=${selectedGoalId}`);
  };

  return (
    <div className="flex flex-col relative">
      <div className="mt-[3.8rem] flex flex-col">
        <StepSection
          stepNumber={1}
          title="AI 롤 선택"
          done={selectedAIId !== null}
        >
          <RoleProfileList
            data={profiles}
            selectedId={selectedAIId}
            onSelect={setSelectedAIId}
          />
        </StepSection>

        {selectedAIId !== null && (
          <StepSection
            stepNumber={2}
            title="세션 목표"
            done={selectedGoalId !== null}
          >
            <ListGoal
              selectedId={selectedGoalId}
              onSelect={setSelectedGoalId}
            />
          </StepSection>
        )}

        {isAllSelected && (
          <StepSection done={false} isLast hideNumber>
            <button
              type="button"
              className="w-full py-[1.4rem] rounded-2xl bg-purple-600 text-white font-semibold text-[1.6rem] leading-none"
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
