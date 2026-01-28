import clsx from 'clsx';

import type { AiItem } from '@/types/my-speak/setting.type';

interface ItemProps {
  item: AiItem;
  isSelected: boolean;
  onClick: () => void;
}

const ItemFavs = ({ item, isSelected, onClick }: ItemProps) => {
  const isLongJob = item.job === '일반 비즈니스';

  return (
    <div
      className={clsx(
        'shrink-0 relative w-[clamp(11.338rem,11vw,12.7rem)] min-h-[clamp(20rem,20vw,22rem)] overflow-hidden rounded-2xl bg-white cursor-pointer',
        isSelected
          ? 'border-[0.2rem] border-purple-500'
          : 'border-[0.1rem] border-gray-100',
      )}
      onClick={onClick}
    >
      <img
        src={item.imageUrl}
        className="block object-cover w-full h-[12.4rem] bg-gray-100 border-b-[0.1rem] border-gray-100 rounded-t-2xl"
      />

      <div className="px-[clamp(0.8rem,0.8vw,0.9rem)] py-[clamp(1rem,1vw,1.18rem)] flex flex-col gap-[0.6rem]">
        <p className="font-bold text-[clamp(1.3rem,1.3vw,1.5rem)] leading-none text-black">
          {item.name}
        </p>

        <div className="w-fit py-[clamp(0.3rem,0.3vw,0.4rem)] px-[clamp(0.8rem,0.8vw,1rem)] rounded-2xl bg-purple-50 flex items-center">
          <p
            className={[
              'text-purple-900 leading-none font-medium text-[clamp(1rem,1vw,1.2rem)]',
              isLongJob ? 'max-w-[3.2rem] truncate' : 'whitespace-nowrap',
            ].join(' ')}
          >
            {item.job}
          </p>

          <p className="mx-[clamp(0.6rem,0.6vw,0.7rem)] text-purple-900 leading-none font-medium text-[clamp(1rem,1vw,1.2rem)]">
            |
          </p>

          <p className="text-purple-900 leading-none font-medium text-[clamp(1rem,1vw,1.2rem)] whitespace-nowrap">
            {item.situation}
          </p>
        </div>

        <div className="w-fit py-[clamp(0.3rem,0.3vw,0.4rem)] px-[clamp(0.8rem,0.8vw,1rem)] rounded-2xl bg-purple-50 flex items-center gap-[clamp(0.6rem,0.6vw,0.7rem)] text-purple-900 leading-none font-medium text-[clamp(1rem,1vw,1.2rem)] whitespace-nowrap">
          <p>{item.city}</p>
          <p>|</p>
          <p>{item.age}세</p>
        </div>
      </div>
    </div>
  );
};

export default ItemFavs;
