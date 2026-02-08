import { paymentsData } from '@/mocks/subscribeData';
import { formatDate } from '@/utils/date';

interface PlanCardProps {
  expiredAt: string | null;
  isCancelled: boolean | null;
}

const PlanCard = ({ expiredAt, isCancelled }: PlanCardProps) => {
  const formattedDate = formatDate(expiredAt);
  const cancelled = isCancelled === true;

  return (
    <div className="flex flex-col gap-[1rem]">
      <p className="font-bold text-[1.9rem] leading-none text-black">
        구독 중인 항목
      </p>

      <div className="w-full flex flex-col gap-[2.3rem] px-[2.1rem] pt-[2.1rem] pb-[2.5rem] rounded-[1rem] border-[0.1rem] border-gray-100">
        <p className="font-bold text-[1.5rem] leading-none text-gray-400">
          {paymentsData.name}
        </p>

        <div className="flex flex-col gap-[0.9rem]">
          <div className="flex items-end gap-[0.5rem]">
            <p className="font-bold text-[2.6rem] leading-none text-purple-700">
              ₩ {paymentsData.price.toLocaleString()}
            </p>
            <p className="font-bold text-[1.9rem[ leading-none text-gray-300">
              /월
            </p>
          </div>

          <p className="font-bold text-[1.6rem] leading-none text-black">
            {paymentsData.explain}
          </p>
        </div>

        <div className="flex gap-[1.7rem] items-center font-medium text-[1.3rem] leading-none text-gray-600">
          {cancelled ? (
            <>
              <p>이용 종료일</p>
              <p>{formattedDate} 까지 이용 가능</p>
            </>
          ) : (
            <>
              <p>다음 결제일</p>
              <p>{formattedDate}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
