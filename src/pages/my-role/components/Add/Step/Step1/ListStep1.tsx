import { useAvatar } from '@/pages/my-role/hooks/useAvatar';

import ItemStep1 from './ItemStep1';

interface ListStep1Props {
  selectedId: number | null;
  onSelect: (id: number) => void;
}

const ListStep1 = ({ selectedId, onSelect }: ListStep1Props) => {
  const { avatars } = useAvatar();

  return (
    <div className="w-full flex gap-3 overflow-x-auto scroll">
      {avatars?.map((avatar) => (
        <ItemStep1
          key={avatar.id}
          avatar={avatar}
          isSelected={selectedId === avatar.id}
          onClick={() => onSelect(avatar.id)}
        />
      ))}
    </div>
  );
};

export default ListStep1;
