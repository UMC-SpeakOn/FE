import Toss from '@/assets/images/icons/toss.svg';
import { paymentsData } from '@/mocks/subscribeData';

const Pay = () => {
  return (
    <div className="flex flex-col gap-[1rem]">
      <p className="font-bold text-[1.9rem] leading-none text-black">
        결제수단 관리
      </p>

      <button className="w-full py-[1.4rem] rounded-[1rem] border-[0.1rem] border-gray-100 flex items-center gap-[1.2rem] justify-center">
        <img src={Toss} alt="toss" className="w-[2rem]" />
        <p className="font-semibold text-[1.6rem] leading-none text-black">
          {paymentsData.paymentMethod}
        </p>
      </button>
    </div>
  );
};

export default Pay;
