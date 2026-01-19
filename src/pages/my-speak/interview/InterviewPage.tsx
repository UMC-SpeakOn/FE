import { useState } from 'react';

import ControlBar from './components/Controls/ControlBar';
import SpeakButton from './components/Controls/SpeakButton';
import InterviewHeader from './components/Header/InterviewHeader';
import InterviewerVideoPIP from './components/VideoSection/InterviewerVideoPIP';
import SubtitleOverlay from './components/VideoSection/SubtitleOverlay';
import UserVideoStream from './components/VideoSection/UserVideoStream';

/**
 * InterviewPage - My Speak 학습 화면 (In-session)
 *
 * @description
 * 실시간 음성 기반 AI 대화 시뮬레이션이 진행되는 메인 페이지입니다.
 * 사용자 웹캠 스트림, AI 면접관 영상(PIP), 자막, 컨트롤 버튼 등을 포함합니다.
 *
 * @features
 * - 사용자 웹캠 전체 화면 표시
 * - AI 면접관 영상 PIP (Picture-in-Picture) 우측 하단 배치
 * - 실시간 음성 인식 자막 오버레이
 * - 말하기 버튼 (준비/말하는중/완료 상태)
 * - 하단 컨트롤 바 (마무리, 일시정지, 자막 토글, 채팅)
 *
 * @related
 * - Issue: https://github.com/UMC-SpeakOn/FE/issues/14
 * - Docs: docs/my-speak.md (섹션 6. In-session Experience)
 * - Route: /my-speak/interview
 */
const InterviewPage = () => {
  // 자막 표시 여부 상태 (기본값: 표시)
  const [showSubtitles, setShowSubtitles] = useState(true);

  // 일시정지 상태 (기본값: 진행 중)
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="pageContainer relative h-screen overflow-hidden bg-gray-900">
      {/* 상단 헤더: 질문 번호, 상태, 타이머 */}
      <InterviewHeader />

      {/* 메인 비디오 영역 */}
      <div className="relative w-full h-full">
        {/* 사용자 웹캠 스트림 (전체 화면) */}
        <UserVideoStream />

        {/* AI 면접관 영상 (PIP - 우측 하단 고정) */}
        <div className="absolute bottom-24 right-4">
          <InterviewerVideoPIP />
        </div>

        {/* 실시간 자막 오버레이 (토글 가능) */}
        {showSubtitles && (
          <div className="absolute bottom-32 left-0 right-0 px-4">
            <SubtitleOverlay />
          </div>
        )}
      </div>

      {/* 말하기 버튼 (중앙 하단) */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10">
        <SpeakButton />
      </div>

      {/* 하단 컨트롤 바: 마무리, 일시정지, 자막, 채팅 */}
      <ControlBar
        showSubtitles={showSubtitles}
        onToggleSubtitles={() => setShowSubtitles(!showSubtitles)}
        isPaused={isPaused}
        onPause={() => setIsPaused(!isPaused)}
        onFinish={() => {
          // TODO: 피드백 페이지로 이동 (Post-session)
          console.log('Interview finished');
        }}
      />
    </div>
  );
};

export default InterviewPage;
