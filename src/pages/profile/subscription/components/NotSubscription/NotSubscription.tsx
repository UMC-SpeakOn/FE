import Nav from '@/assets/images/icons/nav.svg';

import PlanCard from './PlanCard';

const NotSubscription = () => {
  return (
    <div className="w-full flex flex-col gap-[3.8rem] pt-[3.5rem]">
      <div className="flex flex-col gap-[1.632rem] items-center">
        <p className="relative font-extrabold text-[2.4rem] leading-[1.35] text-purple-600 text-center">
          <img
            src={Nav}
            alt="nav"
            className="absolute -left-[0.5rem] -top-[1rem] w-[2.3rem]"
          />
          내가 말한 대화,
          <br />
          기록으로 남겨보세요
        </p>

        <p className="font-semibold text-[1.4rem] leading-[1.35] text-gray-400 text-center">
          AI와 나눈 대화를 저장해두고
          <br />
          필요할 때 다시 확인할 수 있어요.
        </p>
      </div>

      <PlanCard />
    </div>
  );
};

export default NotSubscription;
