import ItemStep1 from './ItemStep1';
import { aiData } from '@/mocks/settingData';

interface ListStep1Props {
  selectedId: number | null;
  onSelect: (id: number) => void;
}

const ListStep1 = ({ selectedId, onSelect }: ListStep1Props) => {
  return (
    <div className="w-full max-w-full flex flex-nowrap gap-[1.2rem] overflow-x-auto overflow-y-hidden scroll">
      {aiData.map((item) => (
        <ItemStep1
          key={item.id}
          item={item}
          isSelected={selectedId === item.id}
          onClick={() => onSelect(item.id)}
        />
      ))}
    </div>
  );
};

export default ListStep1;
