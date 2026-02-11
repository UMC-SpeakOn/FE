import { paymentsData } from '@/mocks/subscribeData';

const PlanCard = () => {
  return (
    <div className="w-full flex flex-col rounded-[1rem] border-[0.1rem] border-gray-100">
      <div className="p-[2.1rem] w-full flex flex-col gap-[2.3rem]">
        <p className="font-bold text-[1.5rem] leading-none text-gray-400">
          {paymentsData.name}
        </p>

        <div className="flex flex-col gap-[0.9rem]">
          <div className="flex items-end gap-[0.5rem]">
            <p className="font-bold text-[2.6rem] leading-none text-purple-700">
              ₩ {paymentsData.price.toLocaleString()}
            </p>
            <p className="font-bold text-[1.9rem] leading-none text-gray-300">
              /월
            </p>
          </div>

          <p className="font-bold text-[1.6rem] leading-none text-black">
            {paymentsData.explain}
          </p>
        </div>
      </div>

      <div className="p-[2.2rem] w-full bg-gray-50">
        <p className="font-bold text-[clamp(1.2rem,3.2vw,1.3rem)] leading-[1.4] text-gray-500">
          구독을 시작하면 내가 말한 대화 문장들을 저장하고
          <br />
          언제든 다시 꺼내 볼 수 있어요
        </p>
      </div>
    </div>
  );
};

export default PlanCard;
