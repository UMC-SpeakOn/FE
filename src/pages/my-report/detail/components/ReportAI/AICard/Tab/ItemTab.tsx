import clsx from 'clsx';

import type { InsightTab } from '../../../../types/myreport.type';

interface ItemTabProps {
  tab: InsightTab;
  active: boolean;
  onClick: () => void;
}

const ItemTab = ({ tab, active, onClick }: ItemTabProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'w-full py-[1.9rem] text-[1.2rem] font-bold leading-none transition',
        active ? 'bg-purple-100 text-purple-900' : 'text-purple-400',
      )}
    >
      {tab}
    </button>
  );
};

export default ItemTab;
