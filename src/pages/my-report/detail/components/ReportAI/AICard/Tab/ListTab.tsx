import type { InsightTab } from '../../../../types/myreport.type';
import ItemTab from './ItemTab';

interface ListTabProps {
  tabs: InsightTab[];
  activeTab: InsightTab;
  onChange: (tab: InsightTab) => void;
}

const ListTab = ({ tabs, activeTab, onChange }: ListTabProps) => {
  return (
    <div className="w-full grid grid-cols-4 overflow-hidden rounded-2xl bg-purple-50 divide-x divide-purple-100">
      {tabs.map((tab) => (
        <ItemTab
          key={tab}
          tab={tab}
          active={tab === activeTab}
          onClick={() => onChange(tab)}
        />
      ))}
    </div>
  );
};

export default ListTab;
