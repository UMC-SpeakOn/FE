type ItemCardProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

const ItemCard = ({ title, children, className }: ItemCardProps) => {
  return (
    <section
      className={`overflow-hidden rounded-2xl bg-purple-700 ${className ?? ''}`}
    >
      <div className="pt-[1.613rem] pb-[1.388rem] text-center text-white font-bold text-[1.8rem] leading-none">
        {title}
      </div>

      <div className="bg-white flex items-center justify-center pt-12 pb-14">
        {children}
      </div>
    </section>
  );
};

export default ItemCard;
