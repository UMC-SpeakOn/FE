import { useEffect, useMemo, useState } from 'react';

import navIcon from '@/assets/images/icons/nav.svg';
import useNavigation from '@/hooks/useNavigation';
import { personsData } from '@/mocks/addData';

import ChatModeContent from './components/ChatModeContent';
import ControlButtons from './components/ControlButtons';
import SpeakButton from './components/SpeakButton';
import VideoModeContent from './components/VideoModeContent';
import { useChat } from './hooks/useChat';
import { useInterviewTimer } from './hooks/useInterviewTimer';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { useVideoSwap } from './hooks/useVideoSwap';
import type { FinishStep } from './types/finish.type';

/**
 * InterviewPage - My Speak 면접 실전 연습 페이지 (통합)
 *
 * @description
 * 영상 모드와 채팅 모드를 통합한 면접 페이지입니다.
 * 하단 버튼을 통해 모드를 전환할 수 있습니다.
 *
 * @features
 * - 영상 모드: 웹캠, AI 면접관 PIP, 자막, 말하기 버튼
 * - 채팅 모드: 메시지 리스트, 텍스트 입력
 * - 모드 전환: 채팅 ↔ 카메라 버튼
 * - 마무리 플로우: AI 멘트 → 로딩 → 결과 페이지
 *
 * @related
 * - Issue: https://github.com/UMC-SpeakOn/FE/issues/15
 * - Route: /my-speak/interview
 */
const InterviewPage = () => {
  const { navigateTo } = useNavigation();

  // 뷰 모드 상태 (video | chat)
  const [viewMode, setViewMode] = useState<'video' | 'chat'>('video');

  // 자막 표시 여부 (영상 모드에서만 사용)
  const [showSubtitles, setShowSubtitles] = useState(false);

  // 일시정지 상태
  const [isPaused, setIsPaused] = useState(false);

  // 말하기 상태 (영상 모드에서만 사용)
  const [speakState, setSpeakState] = useState<'ready' | 'speaking' | 'done'>(
    'ready',
  );

  // 마무리 플로우 상태
  const [finishStep, setFinishStep] = useState<FinishStep>('idle');

  // 채팅 입력 상태 (음성 인식 텍스트 표시용)
  const [chatInput, setChatInput] = useState('');

  // 면접관 데이터
  const interviewer = personsData[0];

  // 타이머 훅
  const { formattedTime, start, pause, resume } = useInterviewTimer();

  // 채팅 훅
  const { messages, isLoading, sendMessage, addFinishMessage } = useChat();

  // 음성 인식 훅
  const {
    startListening,
    stopListening,
    clearTranscript,
    audioLevel,
    transcript,
    // error: speechError,
  } = useSpeechRecognition();

  // 비디오 스왑 훅
  const { isUserInMain, swapLayout } = useVideoSwap();

  // 최신 AI 메시지 (자막용)
  const latestAIMessage = useMemo(() => {
    const aiMessages = messages.filter((m) => m.type === 'AI');
    return aiMessages.length > 0
      ? aiMessages[aiMessages.length - 1].content
      : undefined;
  }, [messages]);

  // 컴포넌트 마운트 시 타이머 시작
  useEffect(() => {
    start();
  }, []);

  // 음성 인식 transcript를 chatInput에 실시간 반영
  useEffect(() => {
    if (viewMode === 'chat' && transcript) {
      setChatInput(transcript);
    }
  }, [transcript, viewMode]);

  /**
   * 일시정지/재개 핸들러
   */
  const handlePauseToggle = () => {
    if (isPaused) {
      resume();
      setIsPaused(false);
    } else {
      pause();
      setIsPaused(true);
    }
  };

  /**
   * 화면 스왑 핸들러
   */
  const handleSwap = () => {
    swapLayout();
  };

  /**
   * 말하기 버튼 핸들러
   * - ready → speaking → done 순환
   * - 음성 인식 시작/중지 통합
   * - 카메라 모드: 말하기 완료 시 즉시 메시지 전송
   * - 채팅 모드: 말하기 완료 시 입력창에만 입력 (사용자가 전송 버튼으로 컨트롤)
   */
  const handleSpeak = () => {
    if (speakState === 'ready') {
      setSpeakState('speaking');
      setChatInput(''); // 입력 필드 초기화
      startListening();
    } else if (speakState === 'speaking') {
      setSpeakState('done');

      // 카메라 모드일 경우 transcript를 직접 사용하여 즉시 전송
      if (viewMode === 'video' && transcript.trim()) {
        sendMessage(transcript.trim());
        setChatInput(''); // 전송 후 입력 필드 초기화
        clearTranscript(); // transcript도 초기화
      }

      // 음성 인식 중지
      // 채팅 모드일 경우 chatInput은 유지되어 사용자가 전송 버튼으로 컨트롤
      stopListening();
    } else {
      setSpeakState('ready');
    }
  };

  /**
   * 모드 전환 핸들러 (채팅 ↔ 영상)
   * 모드 전환 시 입력 상태 초기화
   */
  const handleToggleMode = () => {
    setViewMode((prev) => (prev === 'video' ? 'chat' : 'video'));
    setChatInput(''); // 입력창 초기화
    clearTranscript(); // transcript 초기화
  };

  /**
   * Step 2: AI 마무리 멘트 출력
   */
  const playFinishMessage = () => {
    if (viewMode === 'chat') {
      addFinishMessage();
    }
    setFinishStep('ai_message');
  };

  /**
   * Step 3: 결과 로딩 스피너 표시
   */
  const showLoadingSpinner = () => {
    setFinishStep('loading');
  };

  /**
   * Step 4: 결과 페이지로 이동
   */
  const navigateToResult = () => {
    navigateTo('/my-speak/result');
  };

  /**
   * 마무리하기 핸들러
   * - 공통 플로우: 알림(1초) → 멘트(영상: TTS, 채팅: 채팅) → 로딩 스피너(2초) → 결과 페이지
   */
  const handleFinish = () => {
    // Step 1: 알림 - "AI의 마무리 멘트가 한 턴 추가됩니다."
    setFinishStep('notification');

    // Step 2: AI 마무리 멘트 출력 (1초 후)
    setTimeout(playFinishMessage, 1000);

    // Step 3: 결과 로딩 스피너 (4초 후: 알림 1초 + 멘트 3초)
    setTimeout(showLoadingSpinner, 4000);

    // Step 4: 결과 화면 이동 (6초 후: 알림 1초 + 멘트 3초 + 로딩 2초)
    setTimeout(navigateToResult, 6000);
  };

  return (
    <div className="relative flex flex-col w-full h-full flex-1 bg-purple-500 overflow-hidden">
      {/* 상단 헤더 */}
      <header className="flex flex-col items-center px-4 gap-10 mb-5">
        <p className="text-white text-xl">
          {interviewer.nationality} 면접 연습
        </p>
      </header>

      {/* 메인 컨텐츠 영역 */}
      <div className="flex flex-col px-6 pb-10">
        <div className="relative">
          <div
            className={`
              transition-opacity duration-300 ease-in-out
              ${viewMode === 'video' ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}
            `}
          >
            <VideoModeContent
              interviewer={interviewer}
              formattedTime={formattedTime}
              showSubtitles={showSubtitles}
              onToggleSubtitles={() => setShowSubtitles(!showSubtitles)}
              onSwap={handleSwap}
              isPaused={isPaused}
              finishStep={finishStep}
              isUserInMain={isUserInMain}
              subtitleText={latestAIMessage}
            />
          </div>

          <div
            className={`
              transition-opacity duration-300 ease-in-out
              ${viewMode === 'chat' ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}
            `}
          >
            <ChatModeContent
              messages={messages}
              formattedTime={formattedTime}
              isLoading={isLoading}
              onPlayAudio={() => {}}
              onSendMessage={sendMessage}
              finishStep={finishStep}
              transcript={transcript}
              inputValue={chatInput}
              onInputChange={setChatInput}
              clearTranscript={clearTranscript}
            />
          </div>
        </div>

        <SpeakButton
          speakState={speakState}
          audioLevel={audioLevel}
          isPaused={isPaused}
          onClick={handleSpeak}
        />

        <ControlButtons
          viewMode={viewMode}
          isPaused={isPaused}
          onFinish={handleFinish}
          onPauseToggle={handlePauseToggle}
          onToggleMode={handleToggleMode}
        />
      </div>

      {/* 웹앱 영역 로딩 오버레이 (Footer 포함) */}
      <div
        className={`
          fixed inset-0 flex items-center justify-center z-50
          transition-opacity duration-300 ease-in-out
          ${finishStep === 'loading' ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      >
        <div className="max-w-[430px] w-full h-full bg-black/70 flex flex-col items-center justify-center px-6 gap-6">
          <img src={navIcon} alt="loading" className="w-16 h-16 animate-spin" />
          <p className="text-white text-xl font-bold text-center">
            결과를 불러오는 중...
          </p>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
