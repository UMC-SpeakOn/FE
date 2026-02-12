import { useState } from 'react';

import RoleProfileList from '@/components/RoleProfile/ListRoleProfile';
import { useRoleProfile } from '@/hooks/role-profile/useRoleProfile';
import useNavigation from '@/hooks/useNavigation';
import { goalData } from '@/mocks/settingData';
import { useCreateSession } from '@/pages/my-speak/setting/hooks/useCreateSession';

import ListGoal from './Step/Goal/ListGoal';
import StepSection from './Step/StepSection';

const ChatSetting = () => {
  const { navigateTo } = useNavigation();
  const { profiles } = useRoleProfile();

  const [selectedAIId, setSelectedAIId] = useState<number | null>(null);
  const [selectedGoalId, setSelectedGoalId] = useState<number | null>(null);

  const isAllSelected = selectedAIId !== null && selectedGoalId !== null;

  const { mutate: createSession, isLoading } = useCreateSession({
    onSuccess: (sessionId) => {
      // console.log('sessionId:', sessionId);
      alert('대화 세션이 생성되었습니다.');

      const selectedGoal = goalData.find((goal) => goal.id === selectedGoalId);
      const selectedProfile = profiles.find((profile) => profile.id === selectedAIId);

      // "직무 | 상황" 형식으로 조합
      const situationText = selectedProfile
        ? `${selectedProfile.job} | ${selectedProfile.situation}`
        : undefined;

      navigateTo(`/my-speak/interview/${sessionId}`, {
        state: {
          myRoleId: selectedAIId,
          targetQuestionCount: selectedGoal?.targetQuestionCount,
          situation: situationText,
        },
      });
    },
  });

  const handleChatClick = () => {
    const selectedGoal = goalData.find((goal) => goal.id === selectedGoalId);

    if (!selectedAIId || !selectedGoal) return;

    createSession({
      myRoleId: selectedAIId,
      targetQuestionCount: selectedGoal.targetQuestionCount,
      startedAt: new Date().toISOString(),
    });
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
              disabled={isLoading}
              className="w-full py-[1.4rem] rounded-2xl bg-purple-600 text-white font-semibold text-[1.6rem] leading-none disabled:opacity-50"
              onClick={handleChatClick}
            >
              {isLoading ? '세션 생성 중...' : '대화 시작하기'}
            </button>
          </StepSection>
        )}
      </div>
    </div>
  );
};

export default ChatSetting;
