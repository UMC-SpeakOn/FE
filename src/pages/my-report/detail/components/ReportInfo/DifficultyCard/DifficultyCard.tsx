import StarRating from '@/components/StarRating/StarRating';

interface DifficultyCardProps {
  value: number;
  onChange: (v: number) => void;
}

const DifficultyCard = ({ value, onChange }: DifficultyCardProps) => {
  return (
    <div className="w-full rounded-2xl border-[0.1rem] border-gray-100 py-[1.25rem] px-[1.6rem] flex justify-center">
      <StarRating value={value} onChange={onChange} />
    </div>
  );
};

export default DifficultyCard;
