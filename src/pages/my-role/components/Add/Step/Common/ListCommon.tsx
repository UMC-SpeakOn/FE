import ItemCommon from './ItemCommon';

type ListCommonData = {
  id: number;
  label: string;
};

interface ListCommonProps {
  data: ListCommonData[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

const ListCommon = ({ data, selectedId, onSelect }: ListCommonProps) => {
  return (
    <div className="w-full flex flex-wrap gap-[clamp(0.7rem,1vw,0.8rem)]">
      {data.map((item) => (
        <ItemCommon
          key={item.id}
          label={item.label}
          isSelected={selectedId === item.id}
          onClick={() => onSelect(item.id)}
        />
      ))}
    </div>
  );
};

export default ListCommon;
