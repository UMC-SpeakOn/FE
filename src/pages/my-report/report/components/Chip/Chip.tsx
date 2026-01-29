import clsx from 'clsx';

type ChipProps = {
  variant: 'job' | 'situation';
  label: string;
};

const getSituationStyle = (label: string) => {
  if (label === '면접') return 'border-[#FF4D8D] text-[#FF4D8D]';
  if (label === '회의') return 'border-[#008C2F] text-[#008C2F]';
  if (label === '1:1미팅') return 'border-[#FF4B4B] text-[#FF4B4B]';
  return 'border-gray-300 text-gray-500';
};

const Chip = ({ variant, label }: ChipProps) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center justify-center rounded-full border bg-white',
        'h-[3.0rem] px-[1.45rem] text-[1.25rem] font-semibold leading-none',
        variant === 'job' && 'border-[#7F68FF] text-[#7F68FF]',
        variant === 'situation' && getSituationStyle(label),
      )}
    >
      {label}
    </span>
  );
};

export default Chip;
