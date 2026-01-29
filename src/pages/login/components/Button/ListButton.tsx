import ItemButton from './ItemButton';
import { loginData } from '@/mocks/loginData';

const ListButton = () => {
  return (
    <div className="flex flex-col w-full gap-[1.5rem]">
      {loginData.map((item) => (
        <ItemButton key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ListButton;
