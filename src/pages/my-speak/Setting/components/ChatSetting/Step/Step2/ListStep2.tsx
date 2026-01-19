import { goalData } from '@/mocks/settingData';

import Title from '../../Title/Title';
import ItemStep2 from './ItemStep2';

interface ListStep2Props {
  selectedId: number | null;
  onSelect: (id: number) => void;
}

const ListStep2 = ({ selectedId, onSelect }: ListStep2Props) => {
  return (
    <div className="w-full flex flex-col gap-[1.2rem] mt-[1.118rem]">
      <Title
        title="질문 개수"
        description="마지막 질문은 항상 정리 질문으로 마무리됩니다"
      />

      <div className="w-full flex gap-[0.8rem] items-center max-[375px]:flex-col max-[375px]:items-stretch">
        {goalData.map((item) => (
          <ItemStep2
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

export default ListStep2;
