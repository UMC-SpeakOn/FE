import clsx from 'clsx';

interface ItemCommonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const ItemCommon = ({ label, isSelected, onClick }: ItemCommonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'w-fit py-[0.9rem] px-[1.2rem] rounded-[1.6rem] text-[1.4rem] font-medium leading-none transition-colors whitespace-nowrap',
        'border-[0.1rem]',
        isSelected
          ? 'bg-purple-500 text-white border-purple-500'
          : 'bg-white text-gray-500 border-gray-300',
      )}
    >
      {label}
    </button>
  );
};

export default ItemCommon;
