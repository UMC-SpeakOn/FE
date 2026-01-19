import { personsData } from '@/mocks/addData';

import ItemStep1 from './ItemStep1';

interface ListStep1Props {
  selectedId: number | null;
  onSelect: (id: number) => void;
}

const ListStep1 = ({ selectedId, onSelect }: ListStep1Props) => {
  return (
    <div className="w-full max-w-full flex flex-nowrap gap-[1.2rem] overflow-x-auto overflow-y-hidden scroll">
      {personsData.map((person) => (
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
