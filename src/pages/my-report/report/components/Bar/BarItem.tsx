import clsx from 'clsx';

interface Props {
  label: string;
  active: boolean;
  onClick: () => void;
}

const TabItem = ({ label, active, onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'w-full h-full flex items-center justify-center relative',
        'text-[1.6rem] font-semibold transition-colors',

        active ? 'text-black' : 'text-[#B3B8C2]',
      )}
    >
      {label}
    </button>
  );
};

export default TabItem;
