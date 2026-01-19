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
        'shrink-0 relative w-[12.7rem] h-88 overflow-hidden rounded-2xl bg-white cursor-pointer',
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

      <div className="px-[0.9rem] py-[1.18rem] flex flex-col gap-[0.6rem]">
        <p className="font-bold text-[1.5rem] leading-none text-black">
          {item.name}
        </p>

        <div className="w-fit py-[0.4rem] px-4 rounded-2xl bg-purple-50 flex items-center">
          <p
            className={[
              'text-purple-900 leading-none font-medium text-[1.2rem]',
              isLongJob ? 'max-w-[3.2rem] truncate' : 'whitespace-nowrap',
            ].join(' ')}
          >
            {item.job}
          </p>

          <p className="mx-[0.7rem] text-purple-900 leading-none font-medium text-[1.2rem]">
            |
          </p>

          <p className="text-purple-900 leading-none font-medium text-[1.2rem] whitespace-nowrap">
            {item.situation}
          </p>
        </div>

        <div className="w-fit py-[0.4rem] px-4 rounded-2xl bg-purple-50 flex items-center gap-[0.7rem] text-purple-900 leading-none font-medium text-[1.2rem] whitespace-nowrap">
          <p>{item.city}</p>
          <p>|</p>
          <p>{item.age}세</p>
        </div>
      </div>
    </div>
  );
};

export default ItemFavs;
