type FilterBarProps = {
  value?: string;
  onClick: () => void;
};

const FilterBar = ({ value, onClick }: FilterBarProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center"
    >
      <div className="flex-1 h-[5.0rem] rounded-[1.6rem] bg-[#EEF1F6] flex items-center pl-[1.7rem]">
        <span className="text-[1.5rem] font-semibold text-[#B1B8C5]">
          {value ?? '조회 기간 선택'}
        </span>
      </div>
      <div className="w-[4.7rem] h-[4.7rem] rounded-[1.5rem] bg-[#7F68FF] flex items-center justify-center shrink-0">
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="3"
            y="5"
            width="18"
            height="16"
            rx="3"
            stroke="white"
            strokeWidth="2.4"
          />
          <path
            d="M8 2.8v4.4M16 2.8v4.4"
            stroke="white"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M3 9.2h18"
            stroke="white"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </button>
  );
};

export default FilterBar;
