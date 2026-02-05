import PrevNavbar from '@/components/Navbar/PrevNavbar';
import { reportData } from '@/mocks/reportData';

import ReportBar from './components/common/ReportBar/ReportBar';
import ReportButton from './components/common/ReportButton/ReportButton';
import ReportAI from './components/ReportAI/ReportAI';
import ReportChat from './components/ReportChat/ReportChat';
import ReportInfo from './components/ReportInfo/ReportInfo';

const Detail = () => {
  return (
    <>
      <PrevNavbar title={reportData.interviewTitle} path={'/my-report'} />

      <div className="white-pageContainer pr-[1.597rem] gap-[3.3rem]">
        <ReportInfo data={reportData} />

        <ReportBar />

        <ReportAI data={reportData} />

        <ReportBar />

        <ReportChat data={reportData} />

        <ReportButton text="저장하기" />
      </div>
    </>
  );
};

export default Detail;
