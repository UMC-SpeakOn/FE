import { useState } from 'react';

import { deleteReport } from '@/api/myspeak';
import ProfileModal from '@/components/Modal/ProfileModal';

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
  onDeleted,
}: {
  item: ReportItem;
  onClick: () => void;
  onDeleted?: (id: string) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const idx = Number(item.id) % profiles.length;
  const profileImg = profiles[idx] ?? profiles[0];

  return (
    <>
      <div
        onClick={onClick}
        className="relative w-full text-left rounded-[1.8rem] bg-white border border-[#DDE6F2] px-[2.0rem] py-[1.55rem] cursor-pointer"
        style={{ boxShadow: '0 0.2rem 1.0rem rgba(0,0,0,0.04)' }}
      >
        <div className="flex items-center justify-between mb-[1.1rem]">
          <p className="text-[1.55rem] font-semibold text-[#9AA3B2]">
            {item.dateText}
          </p>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            className="w-[3.0rem] h-[3.0rem] flex items-center justify-center -mr-[0.5rem]"
          >
            <svg
              className="w-[2.0rem] h-[2.0rem]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9AA3B2"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14H6L5 6" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
              <path d="M9 6V4h6v2" />
            </svg>
          </button>
        </div>

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
              {item.summary?.trim() ? (
                item.summary
              ) : (
                <span style={{ visibility: 'hidden' }}>placeholder</span>
              )}
            </p>

            <div className="flex items-center gap-[1.1rem]">
              <Chip variant="job" label={item.job} />
              <Chip variant="situation" label={item.situation} />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ProfileModal
          title="리포트를 삭제하시겠습니까?"
          descriptions={['삭제한 리포트는 복구할 수 없습니다.']}
          confirmText="삭제하기"
          onClose={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
          onConfirm={async () => {
            try {
              await deleteReport(Number(item.id));
              onDeleted?.(item.id);
            } catch (error) {
              console.error('삭제 실패:', error);
            } finally {
              setIsModalOpen(false);
            }
          }}
        />
      )}
    </>
  );
};

export default ReportCard;
