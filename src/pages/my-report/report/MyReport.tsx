import clsx from 'clsx';
import { useState } from 'react';

import useNavigation from '@/hooks/useNavigation';

import { useMyReportViewModel } from '../report/hooks/useMyReportViewModel';
import TabBar from './components/Bar/Bar';
import DateRangePickerBottomSheet from './components/DateRangePicker/DateRangePicker';
import FilterBar from './components/Filter/Filter';
import ReportCard from './components/ReportCard/ReportCard';
import {
  JOB_FILTERS,
  SITUATION_COLORS,
  SITUATION_FILTERS,
} from './constants/myreport';

const REMOVED_IDS_KEY = 'myreport_removed_ids';

const MyReport = () => {
  const { navigateTo } = useNavigation();

  const {
    activeTab,
    setActiveTab,
    range,
    rangeLabel,
    setRange,
    activeJob,
    setActiveJob,
    activeSituation,
    setActiveSituation,
    dateItems,
    activeJobItems,
    activeSituationItems,
    isLoading,
    error,
  } = useMyReportViewModel();

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const [removedIds, setRemovedIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(REMOVED_IDS_KEY);
      const parsed = raw ? (JSON.parse(raw) as unknown) : [];
      return Array.isArray(parsed)
        ? parsed.filter((v) => typeof v === 'string')
        : [];
    } catch {
      return [];
    }
  });

  const handleCardClick = (reportId: string) => {
    navigateTo(`/my-report/${reportId}`);
  };

  const handleDeleted = (id: string) => {
    setRemovedIds((prev) => {
      if (prev.includes(id)) return prev;

      const next = [...prev, id];
      try {
        localStorage.setItem(REMOVED_IDS_KEY, JSON.stringify(next));
      } catch {
        // localStorage 실패해도 UI는 유지
      }
      return next;
    });
  };

  return (
    <div className="myreport-pageContainer">
      <style>{`
        .jobChipsScroller {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .jobChipsScroller::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <TabBar activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === '날짜 별' && (
        <div className="w-full -mt-[3.2rem] flex flex-col gap-[1.6rem]">
          <div className="w-full">
            <FilterBar
              value={rangeLabel}
              onClick={() => setIsDatePickerOpen(true)}
            />
          </div>

          <div className="w-full flex flex-col gap-[1.8rem]">
            {isLoading && (
              <p className="text-[1.45rem] text-[#9AA3B2]">로딩중…</p>
            )}

            {!isLoading && error && (
              <p className="text-[1.45rem] text-[#FF3535]">
                데이터를 불러오지 못했습니다.
              </p>
            )}

            {!isLoading && !error && dateItems.length === 0 && (
              <p className="text-[1.45rem] text-[#9AA3B2]">
                리포트가 없습니다.
              </p>
            )}

            {!isLoading &&
              !error &&
              dateItems
                .filter((item) => !removedIds.includes(item.id))
                .map((item) => (
                  <ReportCard
                    key={item.id}
                    item={item}
                    onClick={() => handleCardClick(item.id)}
                    onDeleted={handleDeleted}
                  />
                ))}
          </div>
        </div>
      )}

      {activeTab === '직무 별' && (
        <div className="w-full -mt-[3.2rem] flex flex-col gap-[2.2rem]">
          <div className="w-full">
            <div
              className={clsx(
                'jobChipsScroller',
                'w-full overflow-x-auto overflow-y-hidden',
                'flex flex-nowrap items-center gap-[0.8rem]',
                'pb-[0.4rem]',
              )}
              style={{ touchAction: 'pan-x' }}
            >
              {JOB_FILTERS.map((job) => {
                const isActive = job === activeJob;

                return (
                  <button
                    key={job}
                    type="button"
                    onClick={() => setActiveJob(job)}
                    className={clsx(
                      'shrink-0 whitespace-nowrap rounded-full border-[1.25px]',
                      'h-[3.6rem] px-[1.7rem] text-[1.35rem] font-semibold leading-none',
                      isActive
                        ? 'bg-[#7F68FF] border-[#7F68FF] text-white'
                        : 'bg-white border-[#7F68FF] text-[#7F68FF]',
                    )}
                  >
                    {job}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="w-full flex flex-col gap-[1.8rem]">
            {!isLoading &&
              activeJobItems
                .filter((item) => !removedIds.includes(item.id))
                .map((item) => (
                  <ReportCard
                    key={item.id}
                    item={item}
                    onClick={() => handleCardClick(item.id)}
                    onDeleted={handleDeleted}
                  />
                ))}
          </div>
        </div>
      )}

      {activeTab === '상황 별' && (
        <div className="w-full -mt-[3.2rem] flex flex-col gap-[2.2rem]">
          <div className="w-full">
            <div
              className={clsx(
                'jobChipsScroller',
                'w-full overflow-x-auto overflow-y-hidden',
                'flex flex-nowrap items-center gap-[0.8rem]',
                'pb-[0.4rem]',
              )}
              style={{ touchAction: 'pan-x' }}
            >
              {SITUATION_FILTERS.map((s) => {
                const isActive = s === activeSituation;
                const color = SITUATION_COLORS[s];

                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setActiveSituation(s)}
                    className="shrink-0 whitespace-nowrap rounded-full border-[1.25px] h-[3.6rem] px-[1.7rem] text-[1.35rem] font-semibold leading-none"
                    style={{
                      borderColor: color,
                      backgroundColor: isActive ? color : '#ffffff',
                      color: isActive ? '#ffffff' : color,
                    }}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="w-full flex flex-col gap-[1.8rem]">
            {!isLoading &&
              activeSituationItems
                .filter((item) => !removedIds.includes(item.id))
                .map((item) => (
                  <ReportCard
                    key={item.id}
                    item={item}
                    onClick={() => handleCardClick(item.id)}
                    onDeleted={handleDeleted}
                  />
                ))}
          </div>
        </div>
      )}

      <DateRangePickerBottomSheet
        open={isDatePickerOpen}
        initialRange={range}
        onClose={() => setIsDatePickerOpen(false)}
        onConfirm={(next) => {
          setRange(next);
          setIsDatePickerOpen(false);
        }}
      />
    </div>
  );
};

export default MyReport;
