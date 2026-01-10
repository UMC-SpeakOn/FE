import ItemFavs from './ItemFavs';
import type { FavItem } from '@/types/my-role/favs';

interface ListProps {
  data: FavItem[];
}

const ListFavs = ({ data }: ListProps) => {
  return (
    <div className="flex flex-nowrap gap-[0.9rem] mt-8 overflow-x-auto">
      {data.map((item) => (
        <ItemFavs key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ListFavs;
