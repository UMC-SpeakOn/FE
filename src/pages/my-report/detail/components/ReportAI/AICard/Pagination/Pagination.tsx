import clsx from 'clsx';

interface PaginationProps {
  total: number;
  activeIndex: number;
}

const Pagination = ({ total, activeIndex }: PaginationProps) => {
  return (
    <div className="flex items-center justify-center gap-[0.6rem]">
      {Array.from({ length: total }).map((_, idx) => (
        <span
          key={idx}
          className={clsx(
            'rounded-full transition',
            idx === activeIndex
              ? 'w-[1rem] h-[1rem] bg-gray-300'
              : 'w-[0.6rem] h-[0.6rem] bg-gray-100',
          )}
        />
      ))}
    </div>
  );
};

export default Pagination;
