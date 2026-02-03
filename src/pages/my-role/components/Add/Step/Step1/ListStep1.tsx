import { useAvatar } from '@/pages/my-role/hooks/useAvatar';

import ItemStep1 from './ItemStep1';

interface ListStep1Props {
  selectedId: number | null;
  onSelect: (id: number) => void;
}

const ListStep1 = ({ selectedId, onSelect }: ListStep1Props) => {
  const { avatars } = useAvatar();

  return (
    <div className="w-full flex gap-3 overflow-x-auto">
      {avatars?.map((person) => (
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
