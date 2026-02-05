import clsx from 'clsx';
import { useState } from 'react';

import Toss from '@/assets/images/icons/toss.svg';
import { paymentsData } from '@/mocks/subscribeData';

import SuccessModal from '../../../../components/Modal/SuccessModal';

const Pay = () => {
  const [isSelected, setIsSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectMethod = () => {
    setIsSelected(true);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full flex flex-col gap-[1rem]">
      <p className="font-bold text-[1.9rem] leading-none text-black">
        결제수단 선택
      </p>

      <div className="flex flex-col gap-[2.3rem]">
        <button
          type="button"
          onClick={handleSelectMethod}
          className={clsx(
            'flex justify-center py-[1.2rem] gap-[1.2rem] rounded-[1rem] border-[0.1rem] border-gray-100',
            isSelected ? 'bg-purple-50' : 'bg-white',
          )}
        >
          <img src={Toss} alt="toss" className="w-[2rem]" />
          <p className="font-semibold text-[1.6rem] leading-none text-black">
            {paymentsData.paymentMethod}
          </p>
        </button>

        {isSelected && (
          <button
            type="button"
            onClick={handleOpenModal}
            className="flex justify-center py-[1.4rem] bg-purple-700 rounded-[1rem] font-semibold text-[1.6rem] leading-none text-white"
          >
            ₩ {paymentsData.price.toLocaleString()} 결제하기
          </button>
        )}
      </div>
      {isModalOpen && (
        <SuccessModal
          open={isModalOpen}
          onClose={handleCloseModal}
          title="결제 완료"
          descriptions={[
            '이제부터 내가 말한 대화 기록을 저장하고',
            '언제든지 다시 확인할 수 있어요',
          ]}
        />
      )}
    </div>
  );
};

export default Pay;
