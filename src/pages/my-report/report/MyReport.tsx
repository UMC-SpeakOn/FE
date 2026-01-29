import clsx from 'clsx';

import useNavigation from '@/hooks/useNavigation';

import { useMyReportViewModel } from '../report/hooks/useMyReportViewModel';
import TabBar from './components/Bar/Bar';
import FilterBar from './components/Filter/Filter';
import ReportCard from './components/ReportCard/ReportCard';
import {
  JOB_FILTERS,
  SITUATION_COLORS,
  SITUATION_FILTERS,
} from './constants/myreport';

const MyReport = () => {
  const { navigateTo } = useNavigation();

  const {
    activeTab,
    setActiveTab,
    rangeLabel,
    setRange,
    activeJob,
    setActiveJob,
    activeSituation,
    setActiveSituation,
    dateItems,
    activeJobItems,
    activeSituationItems,
  } = useMyReportViewModel();

  const handleCardClick = (id: string) => {
    navigateTo(`/my-report/${id}`);
  };

  const handleOpenDatePicker = () => {
    void setRange;
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
            <FilterBar value={rangeLabel} onClick={handleOpenDatePicker} />
          </div>

          <div className="w-full flex flex-col gap-[1.8rem]">
            {dateItems.map((item) => (
              <ReportCard
                key={item.id}
                item={item}
                onClick={() => handleCardClick(item.id)}
              />
            ))}
          </div>
        </div>
      )}

      {activeTab !== '날짜 별' && (
        <div className="w-full -mt-[3.2rem] flex flex-col gap-[2.2rem]">
          {activeTab === '직무 별' && (
            <>
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
                {activeJobItems.map((item) => (
                  <ReportCard
                    key={item.id}
                    item={item}
                    onClick={() => handleCardClick(item.id)}
                  />
                ))}
              </div>
            </>
          )}

          {activeTab === '상황 별' && (
            <>
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
                        className={clsx(
                          'shrink-0 whitespace-nowrap rounded-full border-[1.25px]',
                          'h-[3.6rem] px-[1.7rem] text-[1.35rem] font-semibold leading-none',
                          isActive ? 'text-white' : '',
                        )}
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
                {activeSituationItems.map((item) => (
                  <ReportCard
                    key={item.id}
                    item={item}
                    onClick={() => handleCardClick(item.id)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MyReport;
