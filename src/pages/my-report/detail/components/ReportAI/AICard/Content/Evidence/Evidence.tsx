import type { EvidenceInsightItem } from '@/pages/my-report/detail/types/myreport.type';

const Evidence = ({ item }: { item: EvidenceInsightItem }) => {
  return (
    <>
      <p className="font-bold text-[1.5rem] text-purple-900">{item.title}</p>

      <ul className="pl-[0.5rem] space-y-[0.9rem]">
        {item.evidences.map((e, idx) => (
          <li key={idx} className="flex items-start gap-[0.9rem]">
            <span className="mt-[0.9rem] block h-[0.4rem] w-[0.4rem] rounded-full bg-black" />
            <p className="text-[1.4rem] font-medium leading-[1.5] text-black">
              {e}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Evidence;
