import { useState } from 'react';

import RightArrow from '@/assets/images/icons/right-arrow.svg';
import { resultData } from '@/mocks/resultData';

import ListCard from './components/Card/ListCard/ListCard';
import StarRating from './components/Card/StarRating/StarRating';
import Header from './components/Header/Header';

const Result = () => {
  const [rating, setRating] = useState(0);
  const { timeText, sentenceText } = resultData;

  return (
    <div className="flex flex-col w-full px-[1.55rem] pb-[17.72rem]">
      <Header />

      <ListCard timeText={timeText} sentenceText={sentenceText}>
        <StarRating value={rating} onChange={setRating} />
      </ListCard>

      <button
        className="flex justify-center gap-[1.2rem] mt-[2.492rem] w-full rounded-2xl bg-purple-700 py-[1.4rem] text-[1.6rem] font-semibold text-white"
        disabled={rating === 0}
      >
        리포트 확인하기
        <img src={RightArrow} alt="right" className="w-2" />
      </button>
    </div>
  );
};

export default Result;
