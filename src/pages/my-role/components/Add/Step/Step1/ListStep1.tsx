import { usePersons } from '@/pages/my-role/hooks/usePersons';

import ItemStep1 from './ItemStep1';

interface ListStep1Props {
  selectedId: number | null;
  onSelect: (id: number) => void;
}

const ListStep1 = ({ selectedId, onSelect }: ListStep1Props) => {
  const { response } = usePersons();

  return (
    <div className="w-full flex gap-3 overflow-x-auto">
      {response?.result?.map((person) => (
        <ItemStep1
          key={person.id}
          person={person}
          isSelected={selectedId === person.id}
          onClick={() => onSelect(person.id)}
        />
      ))}
    </div>
  );
};

export default ListStep1;
