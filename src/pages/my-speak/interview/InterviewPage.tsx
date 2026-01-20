import { useEffect, useState } from 'react';

import ccIcon from '@/assets/images/icons/cc.svg';
import chatingIcon from '@/assets/images/icons/chating.svg';
import continueIcon from '@/assets/images/icons/continue.svg';
import finishIcon from '@/assets/images/icons/finish.svg';
import loopIcon from '@/assets/images/icons/loop.svg';
import speakIcon from '@/assets/images/icons/speak.svg';
import stopIcon from '@/assets/images/icons/stop.svg';
import { personsData } from '@/mocks/addData';

import ControlButton from './components/Controls/ControlButton';
import SoundWaveAnimation from './components/Controls/SoundWaveAnimation';
import SubtitleOverlay from './components/VideoSection/SubtitleOverlay';
import UserVideoStream from './components/VideoSection/UserVideoStream';
import { useInterviewTimer } from './hooks/useInterviewTimer';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';

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

  // 음성 인식 훅
  const {
    startListening,
    stopListening,
    audioLevel,
    // transcript,
    // error: speechError,
  } = useSpeechRecognition();

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
   * - 음성 인식 시작/중지 통합
   */
  const handleSpeak = () => {
    if (speakState === 'ready') {
      setSpeakState('speaking');
      startListening();
    } else if (speakState === 'speaking') {
      setSpeakState('done');
      stopListening();
    } else {
      setSpeakState('ready');
    }
  };

  return (
    <div className="relative flex flex-col  bg-purple-500 overflow-hidden">
      {/* 상단 헤더: SpeakOn 로고 + 면접명 */}
      <header className="flex flex-col items-center pt-2 pb-1.5 px-4 gap-10 my-5">
        <h1 className="text-white text-4xl font-unbounded">
          SpeakOn
        </h1>
        <p className="text-white text-xl">{interviewer.city} 면접 연습</p>
      </header>

      {/* 메인 컨텐츠 영역 */}
      <div className="flex flex-col px-6 pb-10">
        {/* 비디오 카드 영역 */}
        <div className="relative h-[48vh] bg-white rounded-2xl overflow-hidden border border-white">
          {/* 사용자 웹캠 스트림 */}
          <UserVideoStream />

          {/* AI 면접관 PIP - 왼쪽 상단 오버레이 (이미지) */}
          <div className="absolute top-4 left-4 w-45 h-60 rounded-2xl overflow-hidden shadow-lg border border-white">
            <img
              src={interviewer.imageUrl}
              alt={interviewer.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 타이머 + CC 버튼 - 우측 상단 */}
          <div className="absolute top-2 right-2 flex items-center gap-2">
            {/* CC 자막 토글 버튼 */}
            <button
              onClick={() => setShowSubtitles(!showSubtitles)}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${showSubtitles ? 'bg-purple-500' : 'bg-neutral-900 opacity-30'}`}
            >
              <img src={ccIcon} alt="자막" />
            </button>
            {/* 새로고침 버튼*/}
            <button
              onClick={handleRestart}
              className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center"
            >
              <img src={loopIcon} alt="재시작" />
            </button>
            {/* 타이머 */}
            <div className="flex items-center gap-0.5 bg-black/50 px-1.5 py-0.5 rounded-full">
              <span className="text-white p-2 text-lg ">
                {formattedTime}
              </span>
            </div>
          </div>

          {/* 일시정지 오버레이 */}
          {isPaused && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <p className="text-white text-2xl font-bold">
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
            className="w-full h-21 bg-purple-600 hover:bg-purple-700 rounded-[10px] inline-flex justify-center items-center gap-2 transition-colors"
            disabled={isPaused}
          >
            {speakState === 'speaking' ? (
              <SoundWaveAnimation isActive={audioLevel > 10} />
            ) : (
              <>
                <img src={speakIcon} alt="말하기" />
                <span className="text-white text-xl font-semibold">
                  말하기
                </span>
              </>
            )}
          </button>
        </div>

        {/* 하단 컨트롤 버튼 3개 */}
        <div className="flex items-center justify-between px-13 pt-4 ">
          <ControlButton
            icon={finishIcon}
            label="마무리하기"
            onClick={() => {
              /* TODO: 재생 기능 */
            }}
            iconSize="w-5 h-5"
          />

          <ControlButton
            icon={isPaused ? continueIcon : stopIcon}
            label={isPaused ? '이어서하기' : '일시멈춤'}
            onClick={handlePauseToggle}
          />

          <ControlButton
            icon={chatingIcon}
            label="채팅"
            onClick={() => {
              /* TODO: 채팅 기능 */
            }}
          />
        </div>
      </div>

    </div>
  );
};

export default InterviewPage;
