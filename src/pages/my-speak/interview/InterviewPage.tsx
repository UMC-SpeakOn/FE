import { useEffect, useState } from 'react';

import ccIcon from '@/assets/images/icons/cc.svg';
import chatingIcon from '@/assets/images/icons/chating.svg';
import continueIcon from '@/assets/images/icons/continue.svg';
import finishIcon from '@/assets/images/icons/finish.svg';
import loopIcon from '@/assets/images/icons/loop.svg';
import speakIcon from '@/assets/images/icons/speak.svg';
import talkingIcon from '@/assets/images/icons/talking.svg';

import InterviewerVideoPIP from './components/VideoSection/InterviewerVideoPIP';
import SubtitleOverlay from './components/VideoSection/SubtitleOverlay';
import UserVideoStream from './components/VideoSection/UserVideoStream';
import { useInterviewTimer } from './hooks/useInterviewTimer';
import {
  fetchInterviewSession,
  type InterviewSession,
} from './mocks/interviewMockData';

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

  // 면접 세션 데이터 (더미 데이터)
  const [session, setSession] = useState<InterviewSession | null>(null);

  // 타이머 훅
  const { formattedTime, start, pause, resume, reset } = useInterviewTimer();

  // 컴포넌트 마운트 시 세션 데이터 로드 및 타이머 시작
  useEffect(() => {
    const initSession = async () => {
      // 더미 데이터 로드 (실제로는 API 호출)
      const sessionData = await fetchInterviewSession();
      setSession(sessionData);

      // 타이머 시작
      start();
    };

    initSession();
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
    <div className="pageContainer relative flex flex-col h-screen bg-purple-500">
      {/* 상단 헤더: SpeakOn 로고 + 면접명 */}
      <header className="flex flex-col items-center pt-4 pb-3 px-4">
        <h1 className="text-white text-xl font-bold font-unbounded">
          SpeakOn
        </h1>
        <p className="text-white text-sm mt-1">
          {session?.interviewer.role || '면접명 직무 연습'}
        </p>
      </header>

      {/* 메인 컨텐츠 영역 */}
      <div className="flex-1 flex flex-col px-4 pb-4">
        {/* 비디오 카드 영역 */}
        <div className="relative flex-1 bg-white rounded-3xl overflow-hidden">
          {/* 사용자 웹캠 스트림 */}
          <UserVideoStream />

          {/* AI 면접관 PIP - 왼쪽 상단 오버레이 */}
          <div className="absolute top-4 left-4 w-20 h-28 rounded-lg overflow-hidden shadow-lg">
            <InterviewerVideoPIP />
          </div>

          {/* 타이머 + 녹화 아이콘 - 우측 상단 */}
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 px-2 py-1 rounded-lg">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-white text-sm font-medium">
              {formattedTime}
            </span>
          </div>

          {/* 일시정지 오버레이 */}
          {isPaused && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <p className="text-white text-lg font-medium">
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
        <div className="flex items-center justify-center py-4">
          <button
            onClick={handleSpeak}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors"
            disabled={isPaused}
          >
            <img
              src={speakState === 'speaking' ? talkingIcon : speakIcon}
              alt="말하기"
              className="w-6 h-6"
            />
            <span className="text-white font-medium">말하기</span>
          </button>
        </div>

        {/* 하단 컨트롤 버튼 3개 */}
        <div className="flex items-center justify-center gap-8 pb-2">
          {/* 재생하기 버튼 */}
          <button
            onClick={() => {
              /* TODO: 재생 기능 */
            }}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
              <img src={continueIcon} alt="재생" className="w-7 h-7" />
            </div>
            <span className="text-white text-xs">재생하기</span>
          </button>

          {/* 일시정지 버튼 */}
          <button
            onClick={handlePauseToggle}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
              <img src={finishIcon} alt="일시정지" className="w-5 h-5" />
            </div>
            <span className="text-white text-xs">일시정지</span>
          </button>

          {/* 재시 버튼 */}
          <button
            onClick={handleRestart}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
              <img src={loopIcon} alt="재시" className="w-5 h-5" />
            </div>
            <span className="text-white text-xs">재시</span>
          </button>
        </div>
      </div>

      {/* 하단 푸터 */}
      <footer className="flex flex-col items-center py-3 bg-white">
        <h2 className="text-purple-500 text-base font-bold font-unbounded">
          SpeakOn
        </h2>
        <p className="text-gray-400 text-xs mt-1">
          Terms and Conditions · Privacy Policy
        </p>
      </footer>
    </div>
  );
};

export default InterviewPage;
