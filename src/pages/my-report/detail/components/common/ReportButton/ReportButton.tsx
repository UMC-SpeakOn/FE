import clsx from 'clsx';

interface ReportButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

const ReportButton = ({
  text,
  onClick,
  disabled = false,
}: ReportButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'w-full flex items-center justify-center rounded-2xl py-[1.4rem] text-[1.6rem] font-semibold transition-colors',
        disabled
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-purple-700 text-white',
      )}
    >
      {text}
    </button>
  );
};

export default ReportButton;
