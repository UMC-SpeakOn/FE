import clsx from 'clsx';

import type { GoalItem } from '@/types/my-speak/setting.type';

interface ItemStep2Props {
  item: GoalItem;
  isSelected: boolean;
  onClick: () => void;
}

const ItemStep2 = ({ item, isSelected, onClick }: ItemStep2Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'w-fit py-[0.9rem] px-[1.4rem] rounded-[1.6rem] text-[1.4rem] font-medium leading-none transition-colors whitespace-nowrap',
        'border-[0.1rem]',
        isSelected
          ? 'bg-purple-600 text-white border-purple-600'
          : 'bg-white text-gray-500 border-gray-300',
      )}
    >
      {item.label}
    </button>
  );
};

export default ItemStep2;
