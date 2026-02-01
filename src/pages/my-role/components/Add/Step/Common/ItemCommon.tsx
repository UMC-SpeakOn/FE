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
        'w-fit py-[0.9rem] px-[clamp(1.4rem,1.5vw,1.6rem)] rounded-full text-[clamp(1.2rem,1vw,1.4rem)] font-medium leading-none transition-colors whitespace-nowrap',
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
