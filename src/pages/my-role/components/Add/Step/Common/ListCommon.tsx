import ItemCommon from './ItemCommon';

type ListCommonData = {
  id: number;
  label: string;
};

interface ListCommonProps {
  data: ListCommonData[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  chunkSize?: number;
}

const ListCommon = ({
  data,
  selectedId,
  onSelect,
  chunkSize = 4,
}: ListCommonProps) => {
  const rows = Array.from(
    { length: Math.ceil(data.length / chunkSize) },
    (_, i) => data.slice(i * chunkSize, i * chunkSize + chunkSize),
  );

  return (
    <div className="w-full flex flex-col gap-[0.8rem]">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-[0.8rem]">
          {row.map((item) => (
            <ItemCommon
              key={item.id}
              label={item.label}
              isSelected={selectedId === item.id}
              onClick={() => onSelect(item.id)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ListCommon;
