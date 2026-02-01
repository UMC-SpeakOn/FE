import type { SummaryInsightItem } from '@/pages/my-report/detail/types/report.type';

const Summary = ({ item }: { item: SummaryInsightItem }) => (
  <>
    <p className="font-bold text-[1.5rem] text-purple-900">{item.title}</p>
    <p className="text-[1.4rem] leading-[1.5]">{item.summary}</p>
  </>
);

export default Summary;
