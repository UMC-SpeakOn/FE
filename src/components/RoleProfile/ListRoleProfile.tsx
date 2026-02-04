import type { RoleProfileItem } from '@/types/role-profile/role-profile.type';

import ItemRoleProfile from './ItemRoleProfile';

interface RoleProfileListProps {
  data: RoleProfileItem[];
  selectedId?: number | null;
  onSelect?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const RoleProfileList = ({
  data,
  selectedId,
  onSelect,
  onDelete,
}: RoleProfileListProps) => {
  return (
    <div className="flex flex-nowrap gap-4 overflow-x-auto scroll">
      {data.map((item) => (
        <ItemRoleProfile
          key={item.id}
          item={item}
          selectable={!!onSelect}
          selected={selectedId === item.id}
          onClick={onSelect ? () => onSelect(item.id) : undefined}
          onDelete={onDelete ? () => onDelete(item.id) : undefined}
        />
      ))}
    </div>
  );
};

export default RoleProfileList;
