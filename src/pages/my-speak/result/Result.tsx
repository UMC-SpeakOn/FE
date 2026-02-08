import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import RightArrow from '@/assets/images/icons/right-arrow.svg';
import useNavigation from '@/hooks/useNavigation';

import StarRating from '../../../components/StarRating/StarRating';
import ListCard from './components/Card/ListCard/ListCard';
import Header from './components/Header/Header';
import { useCreateReport } from './hooks/useCreateReport';
import { useSave } from './hooks/useSave';

const Result = () => {
  const [rating, setRating] = useState(0);
  const { navigateTo } = useNavigation();

  const location = useLocation();
  const { sessionId, totalTime, sentenceCount } = location.state || {};

  useEffect(() => {
    if (!location.state) {
      alert('세션 정보가 없어 설정 화면으로 이동합니다.');
      navigateTo('/my-speak/setting');
    }
  }, [location.state, navigateTo]);

  const { createReport, isLoading: isCreating } = useCreateReport(() => {
    navigateTo(`/my-report/${sessionId}`);
  });

  const { save, isLoading: isSaving } = useSave(() => {
    createReport({ sessionId });
  });

  const handleReportClick = () => {
    if (rating < 1 || rating > 5) return;

    save({
      sessionId,
      userDifficulty: rating,
    });
  };

  return (
    <div className="flex flex-col w-full px-[1.55rem] pb-[17.72rem]">
      <Header />

      <ListCard timeText={totalTime} sentenceText={sentenceCount}>
        <StarRating value={rating} onChange={setRating} />
      </ListCard>

      <button
        className="flex justify-center gap-[1.2rem] mt-[2.492rem] w-full rounded-2xl bg-purple-700 py-[1.4rem] text-[1.6rem] font-semibold text-white"
        disabled={rating === 0 || isSaving || isCreating}
        onClick={handleReportClick}
      >
        리포트 확인하기
        <img src={RightArrow} alt="right" className="w-2" />
      </button>
    </div>
  );
};

export default Result;
