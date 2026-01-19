import clsx from 'clsx';

import type { AddStepSectionProps } from '@/types/my-role/add.type';

const StepSection = ({
  stepNumber,
  title,
  done,
  isLast,
  hideNumber,
  children,
}: AddStepSectionProps) => {
  if (hideNumber) {
    return (
      <section className="flex gap-[0.876rem] items-center mr-[1.462rem]">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 shrink-0">
          <div className="w-[0.614rem] h-[0.614rem] rounded-full bg-purple-500" />
        </div>

        <div className="flex-1 min-w-0">{children}</div>
      </section>
    );
  }

  return (
    <section className="flex gap-[0.876rem]">
      <div className="relative flex flex-col items-center shrink-0">
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold bg-gray-50 text-purple-500 text-[1.6rem]">
          {stepNumber}
        </div>

        {!isLast && (
          <div className="relative w-[0.2rem] flex-1 my-2 overflow-hidden">
            <div
              className={clsx(
                'absolute top-0 left-0 w-full h-full bg-gray-50 origin-top transition-transform duration-700 ease-out',
                done ? 'scale-y-100' : 'scale-y-0',
              )}
            />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 pt-[0.3rem] flex flex-col gap-5 pb-[3.161rem]">
        <h2 className="text-[1.9rem] font-bold text-black leading-none">
          {title}
        </h2>

        {children}
      </div>
    </section>
  );
};

export default StepSection;
