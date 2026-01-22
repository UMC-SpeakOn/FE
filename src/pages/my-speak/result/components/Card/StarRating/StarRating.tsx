import StarIcon from '@/assets/images/icons/star.svg?react';

type StarRatingProps = {
  value: number;
  onChange: (v: number) => void;
  max?: number;
};

const StarRating = ({ value, onChange, max = 5 }: StarRatingProps) => {
  return (
    <div className="flex gap-[0.7rem] items-center">
      {Array.from({ length: max }).map((_, idx) => {
        const ratingValue = idx + 1;
        const filled = ratingValue <= value;

        return (
          <button
            key={ratingValue}
            type="button"
            onClick={() => onChange(ratingValue)}
            className="p-0"
            aria-label={`rate ${ratingValue}`}
          >
            <StarIcon
              className={`w-12 h-12 ${
                filled ? 'text-purple-600' : 'text-gray-300'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
