import { useEffect, useState } from 'react';

import ccIcon from '@/assets/images/icons/cc.svg';
import chatingIcon from '@/assets/images/icons/chating.svg';
import continueIcon from '@/assets/images/icons/continue.svg';
import finishIcon from '@/assets/images/icons/finish.svg';
import loopIcon from '@/assets/images/icons/loop.svg';
import speakIcon from '@/assets/images/icons/speak.svg';
import talkingIcon from '@/assets/images/icons/talking.svg';
import { personsData } from '@/mocks/addData';

import SubtitleOverlay from './components/VideoSection/SubtitleOverlay';
import UserVideoStream from './components/VideoSection/UserVideoStream';
import { useInterviewTimer } from './hooks/useInterviewTimer';

/**
 * InterviewPage - My Speak 면접 실전 연습 페이지 (In-session)
 *
 * @description
 * 실시간 음성 기반 AI 면접 시뮬레이션이 진행되는 메인 페이지입니다.
 * Figma 디자인에 따라 사용자 웹캠, AI 면접관 PIP, 자막, 컨트롤 버튼을 포함합니다.
 *
 * @features
 * - 상단: SpeakOn 로고 + 면접명 표시
 * - 비디오: 라운드 카드 형태의 메인 비디오 (사용자 웹캠)
 * - PIP: 왼쪽 상단 오버레이로 AI 면접관 영상 표시
 * - 타이머: 우측 상단 녹화 아이콘과 함께 경과 시간 표시
 * - 자막: 하단 보라색 바로 면접관 질문/AI 응답 표시
 * - 버튼: 3개 원형 버튼 (재생하기, 일시정지, 재시) + 중앙 말하기 버튼
 * - 일시정지 시: 화면 어두워짐 + "학습을 잠시 멈췄습니다" 메시지
 *
 * @related
 * - Issue: https://github.com/UMC-SpeakOn/FE/issues/14
 * - Figma: figma/200 PWA_My Speak (*.png)
 * - Route: /my-speak/interview
 */
const InterviewPage = () => {
  // 자막 표시 여부 상태 (기본값: 표시)
  const [showSubtitles, setShowSubtitles] = useState(true);

  // 일시정지 상태 (기본값: 진행 중)
  const [isPaused, setIsPaused] = useState(false);

  // 말하기 상태 (기본값: 준비, 'ready' | 'speaking' | 'done')
  const [speakState, setSpeakState] = useState<
    'ready' | 'speaking' | 'done'
  >('ready');

  // 면접관 데이터 (personsData에서 첫 번째 사람 사용)
  const interviewer = personsData[0];

  // 타이머 훅
  const { formattedTime, start, pause, resume, reset } = useInterviewTimer();

  // 컴포넌트 마운트 시 타이머 시작
  useEffect(() => {
    start();
  }, []);

  /**
   * 일시정지/재개 핸들러
   * - 일시정지 상태를 토글하고 타이머도 함께 제어
   */
  const handlePauseToggle = () => {
    if (isPaused) {
      // 재개: 타이머 재개
      resume();
      setIsPaused(false);
    } else {
      // 일시정지: 타이머 일시정지
      pause();
      setIsPaused(true);
    }
  };

  /**
   * 재시작 핸들러
   * - 타이머 리셋 및 상태 초기화
   */
  const handleRestart = () => {
    reset();
    start();
    setIsPaused(false);
    setSpeakState('ready');
  };

  /**
   * 말하기 버튼 핸들러
   * - ready → speaking → done 순환
   */
  const handleSpeak = () => {
    if (speakState === 'ready') {
      setSpeakState('speaking');
      // TODO: 음성 인식 시작
    } else if (speakState === 'speaking') {
      setSpeakState('done');
      // TODO: 음성 인식 중지
    } else {
      setSpeakState('ready');
    }
  };

  return (
    <div className="pageContainer relative flex flex-col h-screen bg-purple-500 overflow-hidden">
      {/* 상단 헤더: SpeakOn 로고 + 면접명 */}
      <header className="flex flex-col items-center pt-2 pb-1.5 px-4 shrink-0">
        <h1 className="text-white text-base font-bold font-unbounded">
          SpeakOn
        </h1>
        <p className="text-white text-[10px]">{interviewer.city} 면접 연습</p>
      </header>

      {/* 메인 컨텐츠 영역 */}
      <div className="flex-1 flex flex-col px-2.5 pb-2 min-h-0">
        {/* 비디오 카드 영역 */}
        <div className="relative flex-1 bg-white rounded-2xl overflow-hidden min-h-0">
          {/* 사용자 웹캠 스트림 */}
          <UserVideoStream />

          {/* AI 면접관 PIP - 왼쪽 상단 오버레이 (이미지) */}
          <div className="absolute top-2 left-2 w-14 h-16 rounded-lg overflow-hidden shadow-lg">
            <img
              src={interviewer.imageUrl}
              alt={interviewer.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 타이머 + CC 버튼 - 우측 상단 */}
          <div className="absolute top-2 right-2 flex items-center gap-1">
            {/* CC 자막 토글 버튼 */}
            <button
              onClick={() => setShowSubtitles(!showSubtitles)}
              className="w-7 h-7 rounded-full bg-black/50 flex items-center justify-center"
            >
              <img src={ccIcon} alt="자막" className="w-3 h-1.5" />
            </button>
            {/* 타이머 */}
            <div className="flex items-center gap-0.5 bg-black/50 px-1.5 py-0.5 rounded">
              <span className="text-white text-[10px] font-medium">
                {formattedTime}
              </span>
            </div>
          </div>

          {/* 일시정지 오버레이 */}
          {isPaused && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <p className="text-white text-sm font-medium">
                학습을 잠시 멈췄습니다
              </p>
            </div>
          )}

          {/* 자막 오버레이 */}
          {showSubtitles && !isPaused && (
            <div className="absolute bottom-0 left-0 right-0">
              <SubtitleOverlay />
            </div>
          )}
        </div>

        {/* 말하기 버튼 영역 */}
        <div className="flex items-center justify-center py-2 shrink-0">
          <button
            onClick={handleSpeak}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors"
            disabled={isPaused}
          >
            <img
              src={speakState === 'speaking' ? talkingIcon : speakIcon}
              alt="말하기"
              className="w-4 h-4"
            />
            <span className="text-white text-xs font-medium">말하기</span>
          </button>
        </div>

        {/* 하단 컨트롤 버튼 4개 */}
        <div className="flex items-center justify-center gap-4 pb-1.5 shrink-0">
          {/* 재생하기 버튼 */}
          <button
            onClick={() => {
              /* TODO: 재생 기능 */
            }}
            className="flex flex-col items-center gap-0.5"
          >
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
              <img src={continueIcon} alt="재생" className="w-5 h-5" />
            </div>
            <span className="text-white text-[9px]">재생하기</span>
          </button>

          {/* 일시정지 버튼 */}
          <button
            onClick={handlePauseToggle}
            className="flex flex-col items-center gap-0.5"
          >
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
              <img src={finishIcon} alt="일시정지" className="w-3.5 h-3.5" />
            </div>
            <span className="text-white text-[9px]">일시정지</span>
          </button>

          {/* 재시 버튼 */}
          <button
            onClick={handleRestart}
            className="flex flex-col items-center gap-0.5"
          >
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
              <img src={loopIcon} alt="재시" className="w-3.5 h-3.5" />
            </div>
            <span className="text-white text-[9px]">재시</span>
          </button>

          {/* 채팅 버튼 */}
          <button
            onClick={() => {
              /* TODO: 채팅 기능 */
            }}
            className="flex flex-col items-center gap-0.5"
          >
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
              <img src={chatingIcon} alt="채팅" className="w-4 h-4" />
            </div>
            <span className="text-white text-[9px]">채팅</span>
          </button>
        </div>
      </div>

      {/* 하단 푸터 */}
      <footer className="flex flex-col items-center py-1.5 bg-white shrink-0">
        <h2 className="text-purple-500 text-xs font-bold font-unbounded">
          SpeakOn
        </h2>
        <p className="text-gray-400 text-[9px]">
          Terms and Conditions · Privacy Policy
        </p>
      </footer>
    </div>
  );
};

export default InterviewPage;
