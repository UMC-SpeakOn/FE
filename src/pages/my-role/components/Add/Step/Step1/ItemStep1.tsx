import clsx from 'clsx';

import type { AvatarItem } from '@/types/api/myrole.type';

interface ItemStep1Props {
  avatar: AvatarItem;
  isSelected: boolean;
  onClick: () => void;
}

const ItemStep1 = ({ avatar, isSelected, onClick }: ItemStep1Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 w-[clamp(7rem,7vw,7.8rem)] flex flex-col gap-[clamp(0.8rem,0.8vw,0.9rem)] cursor-pointer"
    >
      <img
        src={avatar.imgUrl}
        alt={avatar.name}
        className={clsx(
          'w-full aspect-square rounded-full object-cover',
          isSelected
            ? 'border-[0.2rem] border-purple-500'
            : 'border-[0.1rem] border-gray-100',
        )}
      />
      <div className="w-full flex flex-col gap-[clamp(0.27rem,0.2vw,0.3rem)] items-center text-center">
        <p className="font-bold text-[clamp(1.3rem,1vw,1.5rem)] text-black leading-none">
          {avatar.name}
        </p>
        <div className="flex items-center gap-[clamp(0.63rem,1vw,0.7rem)] text-[clamp(1rem,1vw,1.2rem)] leading-none font-medium text-gray-500">
          <p>{avatar.nationality}</p>
          <p className="opacity-[0.5]">|</p>
          <p>{avatar.age}세</p>
        </div>
      </div>
    </button>
  );
};

export default ItemStep1;
