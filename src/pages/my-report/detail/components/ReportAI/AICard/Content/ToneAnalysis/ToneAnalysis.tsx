import clsx from 'clsx';

import type { ToneAnalysisInsightItem } from '@/pages/my-report/detail/types/report.type';

const ToneAnalysis = ({ item }: { item: ToneAnalysisInsightItem }) => {
  return (
    <>
      <p className="font-bold text-[1.5rem] text-purple-900">{item.title}</p>

      <div className="flex flex-col gap-[0.8rem]">
        {item.tones.map((tone, idx) => {
          const hasValue = Boolean(tone.value);

          return (
            <div key={idx} className="flex items-center gap-[1.3rem]">
              <p className="text-[1.4rem] font-medium leading-[1.5] text-black">
                {tone.label}
              </p>

              <div
                className={clsx(
                  'py-[0.9rem] rounded-full border-[0.1rem] text-[1.4rem] font-medium leading-none',
                  hasValue
                    ? 'px-[1.6rem] border-purple-500 text-purple-600'
                    : 'px-[1.8rem] border-gray-200 bg-gray-50 text-gray-400',
                )}
              >
                {hasValue ? tone.value : '?'}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ToneAnalysis;
