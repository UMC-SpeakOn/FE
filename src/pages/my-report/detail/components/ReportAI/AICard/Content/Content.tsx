import type { InsightItem } from '@/pages/my-report/detail/types/myreport.type';

import Correction from './Correction/Correction';
import Evidence from './Evidence/Evidence';
import Summary from './Summary/Summary';
import ToneAnalysis from './ToneAnalysis/ToneAnalysis';

interface ContentProps {
  item?: InsightItem;
}

const renderContent = (item: InsightItem) => {
  switch (item.tab) {
    case '핵심요약':
      return <Summary item={item} />;

    case '톤 분석':
      return <ToneAnalysis item={item} />;

    case '근거':
      return <Evidence item={item} />;

    case '교정':
      return <Correction item={item} />;

    default:
      return null;
  }
};

const Content = ({ item }: ContentProps) => {
  if (!item) return null;

  return (
    <div className="w-full flex flex-col gap-[1.6rem] rounded-2xl border-[0.1rem] border-gray-100 bg-white pl-[2.4rem] pr-[4.7rem] py-[2.6rem]">
      {renderContent(item)}
    </div>
  );
};

export default Content;
