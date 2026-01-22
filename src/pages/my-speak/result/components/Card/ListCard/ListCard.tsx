import type { ReactNode } from 'react';

import type { ResultProps } from '../../../types/result.type';
import ItemCard from '../ItemCard/ItemCard';

type ListCardProps = ResultProps & {
  children: ReactNode;
};

const ListCard = ({ timeText, sentenceText, children }: ListCardProps) => {
  return (
    <div className="grid grid-cols-2 gap-[1.6rem]">
      <ItemCard title="시간">
        <p className="font-bold text-[2.2rem] text-purple-900 leading-none">
          {timeText}
        </p>
      </ItemCard>

      <ItemCard title="문장 수">
        <p className="font-bold text-[2.2rem] text-purple-900 leading-none">
          {sentenceText}
        </p>
      </ItemCard>

      <ItemCard title="난이도" className="col-span-2">
        {children}
      </ItemCard>
    </div>
  );
};

export default ListCard;
