import type { ViewTab } from '../../types/myreport.type';
import TabItem from './BarItem';

const tabs: ViewTab[] = ['날짜 별', '직무 별', '상황 별'];

const PAGE_X_PADDING_REM = 1.462;

const TabBar = ({
  activeTab,
  onChange,
}: {
  activeTab: ViewTab;
  onChange: (tab: ViewTab) => void;
}) => {
  const activeIndex = Math.max(0, tabs.indexOf(activeTab));
  const segmentWidth = 100 / tabs.length;

  return (
    <div className="w-full">
      <div className="-translate-y-[3.2rem]">
        <div className="h-[6.2rem] grid grid-cols-3 items-center">
          {tabs.map((tab) => {
            const nudgeClass =
              tab === '날짜 별'
                ? '-translate-x-[1rem]'
                : tab === '상황 별'
                  ? 'translate-x-[1rem]'
                  : '';

            return (
              <div
                key={tab}
                className={`w-full flex justify-center ${nudgeClass}`}
              >
                <TabItem
                  label={tab}
                  active={activeTab === tab}
                  onClick={() => onChange(tab)}
                />
              </div>
            );
          })}
        </div>

        <div
          className="-mt-[0.6rem] h-[0.32rem] -mx-[1.462rem] relative"
          style={{
            width: `calc(100% + ${PAGE_X_PADDING_REM * 2}rem)`,
          }}
        >
          <div
            className="h-full bg-[#7F68FF]"
            style={{
              width: `${segmentWidth}%`,
              transform: `translateX(${activeIndex * 100}%)`,
              transition: 'transform 200ms ease',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TabBar;
