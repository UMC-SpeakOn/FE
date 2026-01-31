import clsx from 'clsx';

import Delete from '@/assets/images/icons/delete.svg';
import type { RoleProfileItem } from '@/types/role/role-profile.type';

interface ItemRoleProfileProps {
  item: RoleProfileItem;
  selectable?: boolean;
  selected?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
}

const ItemRoleProfile = ({
  item,
  selectable = false,
  selected = false,
  onClick,
  onDelete,
}: ItemRoleProfileProps) => {
  const isLongJob = item.job === '일반 비즈니스';

  return (
    <div
      className={clsx(
        'shrink-0 relative w-[12.7rem] min-h-[22rem] overflow-hidden rounded-2xl bg-white',
        selectable
          ? selected
            ? 'border-[0.2rem] border-purple-500 cursor-pointer'
            : 'border-[0.1rem] border-gray-100 cursor-pointer'
          : 'border-[0.1rem] border-gray-100',
      )}
      onClick={selectable ? onClick : undefined}
    >
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full h-[12.4rem] object-cover bg-gray-100 border-b border-gray-100"
      />

      {onDelete && (
        <button
          type="button"
          aria-label="삭제"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="absolute top-2 right-2"
        >
          <img src={Delete} alt="" className="w-[1.2rem]" />
        </button>
      )}

      <div className="px-4 py-3 flex flex-col gap-3">
        <p className="font-bold text-[1.5rem] text-black">{item.name}</p>

        <div className="w-fit py-1 px-4 rounded-2xl bg-purple-50 flex items-center">
          <p
            className={clsx(
              'text-purple-900 text-[1.2rem] font-medium',
              isLongJob ? 'max-w-[3.2rem] truncate' : 'whitespace-nowrap',
            )}
          >
            {item.job}
          </p>
          <p className="mx-2 text-purple-900">|</p>
          <p className="text-purple-900 text-[1.2rem] whitespace-nowrap">
            {item.situation}
          </p>
        </div>

        <div className="w-fit py-1 px-4 rounded-2xl bg-purple-50 flex items-center gap-2 text-purple-900 text-[1.2rem]">
          <p>{item.city}</p>
          <p>|</p>
          <p>{item.age}세</p>
        </div>
      </div>
    </div>
  );
};

export default ItemRoleProfile;
