import type { InsightItem } from '@/pages/my-report/detail/types/report.type';

interface ContentProps {
  item?: InsightItem;
}

const Content = ({ item }: ContentProps) => {
  return (
    <div className="w-full flex flex-col gap-[1.6rem] rounded-2xl border-[0.1rem] border-gray-100 bg-white pl-[2.4rem] pr-[4.7rem] py-[2.6rem]">
      <p className="font-bold text-[1.5rem] leading-none text-purple-900">
        {item?.title}
      </p>

      <p className="text-[1.4rem] leading-[1.5] text-black font-medium whitespace-pre-line">
        {item?.content}
      </p>
    </div>
  );
};

export default Content;
