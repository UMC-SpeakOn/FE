import { goalData } from '@/mocks/settingData';

import Title from '../../Title/Title';
import ItemGoal from './ItemGoal';

interface ListGoalProps {
  selectedId: number | null;
  onSelect: (id: number) => void;
}

const ListGoal = ({ selectedId, onSelect }: ListGoalProps) => {
  return (
    <div className="w-full flex flex-col gap-[clamp(1.1rem,1.1vw,1.2rem)] mt-[1.118rem]">
      <Title
        title="질문 개수"
        description="마지막 질문은 항상 정리 질문으로 마무리됩니다"
      />

      <div className="w-full flex gap-[clamp(0.7rem,0.5vw,0.8rem)] items-center max-[375px]:flex-col max-[375px]:items-stretch">
        {goalData.map((item) => (
          <ItemGoal
            key={item.id}
            item={item}
            isSelected={selectedId === item.id}
            onClick={() => onSelect(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ListGoal;
