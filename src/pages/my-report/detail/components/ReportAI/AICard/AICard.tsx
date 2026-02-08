import { useMemo, useState } from 'react';

import { useSwipe } from '../../../hooks/useSwipe';
import type { InsightCard, InsightTab } from '../../../types/myreport.type';
import Content from './Content/Content';
import Pagination from './Pagination/Pagination';
import ListTab from './Tab/ListTab';

interface AICardProps {
  data: InsightCard;
}

const AICard = ({ data }: AICardProps) => {
  const { tabs, items } = data;
  const [activeTab, setActiveTab] = useState<InsightTab>(tabs[0]);

  const currentItem = useMemo(() => {
    return items.find((item) => item.tab === activeTab) ?? items[0];
  }, [items, activeTab]);

  const activeIndex = useMemo(() => {
    const idx = tabs.findIndex((t) => t === activeTab);
    return idx < 0 ? 0 : idx;
  }, [tabs, activeTab]);

  const { onSwipeStart, onSwipeMove, onSwipeEnd } = useSwipe(
    tabs,
    activeTab,
    setActiveTab,
  );

  return (
    <div className="w-full flex flex-col gap-[1rem]">
      <ListTab tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div
        className="w-full touch-pan-y select-none"
        onPointerDown={onSwipeStart}
        onPointerMove={onSwipeMove}
        onPointerUp={onSwipeEnd}
        onPointerCancel={onSwipeEnd}
      >
        <Content item={currentItem} />
      </div>

      <Pagination total={tabs.length} activeIndex={activeIndex} />
    </div>
  );
};

export default AICard;
