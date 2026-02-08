import { formatDate } from '@/utils/date';

import type { PaymentsItem } from '../../types/account.type';

interface SubscribeCardProps {
  data: PaymentsItem;
  nextPaymentDate: string | null;
}

const SubscribeCard = ({ data, nextPaymentDate }: SubscribeCardProps) => {
  return (
    <div className="w-full p-[2.1rem] border-[0.1rem] border-gray-100 rounded-[1rem]">
      <div className="flex flex-col gap-[2.7rem]">
        <p className="font-bold text-[1.5rem] text-gray-400 leading-none">
          {data.name}
        </p>

        <div className="flex gap-[2.7rem] items-center">
          <div className="flex flex-col gap-[1.4rem] min-w-[6.9rem] text-[1.5rem] font-bold leading-none text-black">
            <p>결제 내역</p>
            <p>다음 결제일</p>
            <p>결제 수단</p>
          </div>

          <div className="flex flex-col gap-[1.6rem] text-[1.3rem] font-medium leading-none text-gray-600">
            <p>₩ {data.price.toLocaleString()} /월</p>
            <p>{formatDate(nextPaymentDate)}</p>
            <p>{data.paymentMethod}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribeCard;
