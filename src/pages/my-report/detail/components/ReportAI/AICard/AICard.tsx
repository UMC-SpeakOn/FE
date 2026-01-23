import { useMemo, useState } from 'react';

import type { InsightCard, InsightTab } from '../../../types/report.type';
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

  return (
    <div className="w-full flex flex-col gap-[1rem]">
      <ListTab tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      <Content item={currentItem} />
      <Pagination total={tabs.length} activeIndex={activeIndex} />
    </div>
  );
};

export default AICard;
