import { useState } from 'react';
import Title from '../../../../components/Title/Title';
import StepSection from './Step/StepSection';
import ListStep1 from './Step/Step1/ListStep1';
import ListStep2 from './Step/Step2/ListStep2';
import ListStep3 from './Step/Step3/ListStep3';

interface AddProps {
  onSubmit: () => void;
}

const Add = ({ onSubmit }: AddProps) => {
  const [selectedPersonId, setSelectedPersonId] = useState<number | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [selectedSituationId, setSelectedSituationId] = useState<number | null>(
    null,
  );
  const isAllSelected =
    selectedPersonId !== null &&
    selectedJobId !== null &&
    selectedSituationId !== null;

  return (
    <div className="flex flex-col relative">
      <Title
        title="롤 추가하기"
        description="사람 · 직무 · 상황을 선택해주세요"
      />

      <div className="mt-10 flex flex-col">
        <StepSection
          stepNumber={1}
          title="사람"
          done={selectedPersonId !== null}
        >
          <ListStep1
            selectedId={selectedPersonId}
            onSelect={setSelectedPersonId}
          />
        </StepSection>

        {selectedPersonId !== null && (
          <StepSection
            stepNumber={2}
            title="직무"
            done={selectedJobId !== null}
          >
            <ListStep2 selectedId={selectedJobId} onSelect={setSelectedJobId} />
          </StepSection>
        )}

        {selectedJobId !== null && (
          <StepSection
            stepNumber={3}
            title="상황"
            done={selectedSituationId !== null}
          >
            <ListStep3
              selectedId={selectedSituationId}
              onSelect={setSelectedSituationId}
            />
          </StepSection>
        )}

        {isAllSelected && (
          <StepSection done={false} isLast hideNumber>
            <button
              type="button"
              className="w-full py-[1.4rem] rounded-2xl bg-purple-600 text-white font-semibold text-[1.6rem] leading-none cursor-pointer"
              onClick={onSubmit}
            >
              추가하기
            </button>
          </StepSection>
        )}
      </div>
    </div>
  );
};

export default Add;
