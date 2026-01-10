import Delete from '@/assets/images/icons/delete.svg';
import type { FavItem } from '@/types/my-role/favs.type';

interface ItemProps {
  item: FavItem;
}

const ItemFavs = ({ item }: ItemProps) => {
  const isLongJob = item.job === '일반 비즈니스';

  return (
    <div className="shrink-0 relative w-[12.7rem] h-88 overflow-hidden rounded-2xl bg-white border-[0.1rem] border-gray-100">
      <div className="w-full h-[12.4rem] bg-gray-100 border-[0.1rem] border-gray-100" />

      <button
        type="button"
        aria-label="삭제"
        className="absolute top-[0.68rem] right-[0.68rem]"
      >
        <img src={Delete} alt="" className="w-[1.2rem]" />
      </button>

      <div className="px-4 py-[1.18rem] flex flex-col gap-3">
        <p className="font-bold text-[1.5rem] leading-8 text-black">
          {item.name}
        </p>

        <div className="w-fit py-[0.3rem] px-4 rounded-2xl bg-purple-50 flex items-center">
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

        <div className="w-fit py-[0.3rem] px-4 rounded-2xl bg-purple-50 flex items-center gap-[0.7rem] text-purple-900 leading-none font-medium text-[1.2rem] whitespace-nowrap">
          <p>{item.city}</p>
          <p>|</p>
          <p>{item.age}세</p>
        </div>
      </div>
    </div>
  );
};

export default ItemFavs;
