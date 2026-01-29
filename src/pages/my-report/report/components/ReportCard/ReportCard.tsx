import type { ReportItem } from '../../types/myreport.type';
import Chip from '../Chip/Chip';

const profileImages = import.meta.glob(
  '@/assets/images/myreport/profile*.png',
  {
    eager: true,
    import: 'default',
  },
);

const profiles = Object.entries(profileImages)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, v]) => v as string);

const ReportCard = ({
  item,
  onClick,
}: {
  item: ReportItem;
  onClick: () => void;
}) => {
  const idx = Number(item.id) % profiles.length;
  const profileImg = profiles[idx] ?? profiles[0];

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left rounded-[1.8rem] bg-white border border-[#DDE6F2] px-[2.0rem] py-[1.55rem]"
      style={{ boxShadow: '0 0.2rem 1.0rem rgba(0,0,0,0.04)' }}
    >
      <p className="text-[1.55rem] font-semibold text-[#9AA3B2] mb-[1.1rem]">
        {item.dateText}
      </p>
      <div className="flex items-center gap-[1.8rem]">
        <img
          src={profileImg}
          alt="profile"
          className="w-[8.0rem] h-[8.0rem] rounded-full object-cover border border-[#DDE6F2] shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="text-[2.05rem] font-bold text-[#1F2A37] leading-snug mb-[0.65rem]">
            {item.title}
          </p>
          <p
            className="text-[1.45rem] font-medium text-[#9AA3B2] leading-snug mb-[1.15rem]"
            style={{
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {item.summary}
          </p>
          <div className="flex items-center gap-[1.1rem]">
            <Chip variant="job" label={item.job} />
            <Chip variant="situation" label={item.situation} />
          </div>
        </div>
      </div>
    </button>
  );
};

export default ReportCard;
