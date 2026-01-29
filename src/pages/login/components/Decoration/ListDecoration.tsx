import type { DecorationItem } from '../../types/login.type';

interface ListDecorationProps {
  items: DecorationItem[];
}

const ListDecoration = ({ items }: ListDecorationProps) => {
  return (
    <>
      {items.map((item, index) => (
        <img
          key={index}
          src={item.src}
          alt={item.alt}
          className={item.className}
        />
      ))}
    </>
  );
};

export default ListDecoration;
