import type { CorrectionInsightItem } from '@/pages/my-report/detail/types/report.type';

const Correction = ({ item }: { item: CorrectionInsightItem }) => {
  return (
    <>
      <p className="font-bold text-[1.5rem] text-purple-900">{item.title}</p>

      <div className="flex flex-col gap-[1.6rem]">
        {item.corrections.map((c, idx) => (
          <div key={idx}>
            <div className="flex items-start gap-[0.9rem]">
              <span className="mt-[0.9rem] block h-[0.4rem] w-[0.4rem] rounded-full bg-black" />
              <p className="text-[1.4rem] font-medium leading-[1.4] text-black">
                {c.before}
              </p>
            </div>

            <div className="ml-[1.3rem] mt-[1rem] flex items-start gap-[0.6rem] text-[1.4rem] font-medium leading-[1.4] text-purple-900">
              <p>→</p>
              <p>{c.after}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Correction;
