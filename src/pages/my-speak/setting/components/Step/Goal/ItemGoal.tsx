import clsx from 'clsx';

import type { GoalItem } from '../../../types/setting.type';

interface ItemGoalProps {
  item: GoalItem;
  isSelected: boolean;
  onClick: () => void;
}

const ItemGoal = ({ item, isSelected, onClick }: ItemGoalProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'w-fit py-[0.9rem] px-[1.4rem] rounded-full text-[clamp(1.2rem,1.2vw,1.4rem)] font-medium leading-none transition-colors whitespace-nowrap',
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

export default ItemGoal;
