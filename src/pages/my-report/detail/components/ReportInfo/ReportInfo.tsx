import { useState } from 'react';

import type { ReportData } from '../../types/report.type';
import ReportSection from '../common/ReportSection/ReportSection';
import DifficultyCard from './DifficultyCard/DifficultyCard';
import InfoCard from './InfoCard/InfoCard';
import ReviewCard from './ReviewCard/ReviewCard';

interface ReportInfoProps {
  data: ReportData;
}

const ReportInfo = ({ data }: ReportInfoProps) => {
  const [difficulty, setDifficulty] = useState<number>(data.meta.difficulty);
  const [review, setReview] = useState(data.meta.review);

  return (
    <div className="flex flex-col gap-[2.8rem]">
      <div className="grid grid-cols-2 gap-[1.7rem]">
        <ReportSection title="시간">
          <InfoCard text={data.meta.time} />
        </ReportSection>

        <ReportSection title="문장 수">
          <InfoCard text={data.meta.sentenceCount} />
        </ReportSection>
      </div>

      <ReportSection title="난이도" description="눌러서 수정할 수 있어요">
        <DifficultyCard value={difficulty} onChange={setDifficulty} />
      </ReportSection>

      <ReportSection title="소감">
        <ReviewCard text={review} onChange={setReview} maxLength={120} />
      </ReportSection>
    </div>
  );
};

export default ReportInfo;
