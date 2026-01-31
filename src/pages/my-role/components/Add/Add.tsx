import { useState } from 'react';

import { jobsData, situationsData } from '@/mocks/addData';
import { useAddMyRole } from '@/pages/my-role/hooks/useAddMyRole';

import Title from '../../../../components/Title/Title';
import AddModal from '../Modal/AddModal';
import ErrorModal from '../Modal/ErrorModal';
import ListStep1 from './Step/Step1/ListStep1';
import ListStep2 from './Step/Step2/ListStep2';
import ListStep3 from './Step/Step3/ListStep3';
import StepSection from './Step/StepSection';

interface AddProps {
  onSubmit: () => void;
}

const Add = ({ onSubmit }: AddProps) => {
  const [selectedPersonId, setSelectedPersonId] = useState<number | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [selectedSituationId, setSelectedSituationId] = useState<number | null>(
    null,
  );

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { mutate, isLoading, isError, reset } = useAddMyRole();

  const isAllSelected =
    selectedPersonId !== null &&
    selectedJobId !== null &&
    selectedSituationId !== null;

  const handleAdd = async () => {
    if (!isAllSelected) return;

    const job = jobsData.find((j) => j.id === selectedJobId)?.value;
    const situation = situationsData.find(
      (s) => s.id === selectedSituationId,
    )?.value;

    if (!job || !situation) return;

    const result = await mutate({
      avatarId: selectedPersonId,
      job,
      situation,
    });

    if (result?.isSuccess) {
      setIsAddModalOpen(true);
      onSubmit();
    }
  };

  return (
    <div className="flex flex-col relative">
      <Title
        title="롤 추가하기"
        description="사람 · 직무 · 상황을 선택해주세요"
      />

      <div className="mt-10 flex flex-col">
        <StepSection stepNumber={1} title="사람" done={!!selectedPersonId}>
          <ListStep1
            selectedId={selectedPersonId}
            onSelect={setSelectedPersonId}
          />
        </StepSection>

        {selectedPersonId !== null && (
          <StepSection stepNumber={2} title="직무" done={!!selectedJobId}>
            <ListStep2
              data={jobsData}
              selectedId={selectedJobId}
              onSelect={setSelectedJobId}
            />
          </StepSection>
        )}

        {selectedJobId !== null && (
          <StepSection stepNumber={3} title="상황" done={!!selectedSituationId}>
            <ListStep3
              data={situationsData}
              selectedId={selectedSituationId}
              onSelect={setSelectedSituationId}
            />
          </StepSection>
        )}

        {isAllSelected && (
          <StepSection done={false} isLast hideNumber>
            <button
              type="button"
              disabled={isLoading}
              className="w-full py-[1.4rem] rounded-2xl bg-purple-600 text-white font-semibold text-[1.6rem] disabled:opacity-50"
              onClick={handleAdd}
            >
              추가하기
            </button>
          </StepSection>
        )}
      </div>

      <AddModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <ErrorModal open={isError} onClose={reset} />
    </div>
  );
};

export default Add;
