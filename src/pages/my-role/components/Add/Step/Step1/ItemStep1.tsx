import clsx from 'clsx';

import type { PersonItem } from '@/types/my-role/add.type';

interface ItemStep1Props {
  person: PersonItem;
  isSelected: boolean;
  onClick: () => void;
}

const ItemStep1 = ({ person, isSelected, onClick }: ItemStep1Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 w-[7.8rem] flex flex-col gap-[0.9rem] cursor-pointer"
    >
      <img
        src={person.imageUrl}
        alt={person.name}
        className={clsx(
          'w-full aspect-square rounded-full object-cover',
          isSelected
            ? 'border-[0.2rem] border-purple-500'
            : 'border-[0.1rem] border-gray-100',
        )}
      />
      <div className="w-full flex flex-col gap-[0.3rem] items-center text-center">
        <p className="font-bold text-[1.5rem] text-black leading-none">
          {person.name}
        </p>
        <div className="flex items-center gap-[0.7rem] text-[1.2rem] leading-none font-medium text-gray-500">
          <p>{person.city}</p>
          <p className="opacity-[0.5]">|</p>
          <p>{person.age}세</p>
        </div>
      </div>
    </button>
  );
};

export default ItemStep1;
