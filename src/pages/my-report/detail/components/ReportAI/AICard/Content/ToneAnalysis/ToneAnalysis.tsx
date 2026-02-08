import clsx from 'clsx';
import { useState } from 'react';

import type { ToneAnalysisInsightItem } from '@/pages/my-report/detail/types/myreport.type';

const ToneAnalysis = ({ item }: { item: ToneAnalysisInsightItem }) => {
  const [revealed, setRevealed] = useState<boolean[]>(() =>
    item.tones.map(() => false),
  );

  const handleReveal = (index: number) => {
    setRevealed((prev) => prev.map((v, i) => (i === index ? true : v)));
  };

  return (
    <>
      <p className="font-bold text-[1.5rem] text-purple-900">{item.title}</p>

      <div className="flex flex-col gap-[0.8rem]">
        {item.tones.map((tone, idx) => {
          const isRevealed = revealed[idx];
          const hasValue = Boolean(tone.value);

          return (
            <div key={idx} className="flex items-center gap-[1.3rem]">
              <p className="text-[1.4rem] font-medium leading-[1.5] text-black">
                {tone.label}
              </p>

              <button
                type="button"
                className={clsx(
                  'inline-flex items-center justify-center py-[0.9rem] rounded-full border-[0.1rem] text-[1.4rem] font-medium leading-none transition cursor-pointer',
                  isRevealed && hasValue
                    ? 'px-[1.6rem] border-purple-500 text-purple-600'
                    : 'px-[1.8rem] border-gray-200 bg-gray-50 text-gray-400',
                )}
                onPointerDown={(e) => e.stopPropagation()}
                onPointerUp={(e) => e.stopPropagation()}
                onClick={() => handleReveal(idx)}
              >
                {isRevealed && hasValue ? tone.value : '?'}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ToneAnalysis;
