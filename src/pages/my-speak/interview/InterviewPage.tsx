import { useEffect, useState } from "react";

import useNavigation from "@/hooks/useNavigation";
import { personsData } from "@/mocks/addData";

import ChatModeContent from "./components/ChatModeContent";
import AudioOverlay from "./components/ChatSection/AudioOverlay";
import FinishingOverlay from "./components/ChatSection/FinishingOverlay";
import ControlButtons from "./components/ControlButtons";
import SpeakButton from "./components/SpeakButton";
import VideoModeContent from "./components/VideoModeContent";
import { useChat } from "./hooks/useChat";
import { useInterviewTimer } from "./hooks/useInterviewTimer";
import { useSpeechRecognition } from "./hooks/useSpeechRecognition";
import type { ChatMessage } from "./types/chat.type";

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
  const [viewMode, setViewMode] = useState<"video" | "chat">("video");

  // 마무리 진행 상태
  const [isFinishing, setIsFinishing] = useState(false);

  // 자막 표시 여부 (영상 모드에서만 사용)
  const [showSubtitles, setShowSubtitles] = useState(true);

  // 일시정지 상태
  const [isPaused, setIsPaused] = useState(false);

  // 말하기 상태 (영상 모드에서만 사용)
  const [speakState, setSpeakState] = useState<
    "ready" | "speaking" | "done"
  >("ready");

  // 오디오 오버레이 상태
  const [audioOverlay, setAudioOverlay] = useState<{
    isOpen: boolean;
    message: ChatMessage | null;
  }>({ isOpen: false, message: null });

  // 면접관 데이터
  const interviewer = personsData[0];

  // 타이머 훅
  const { formattedTime, start, pause, resume, reset } = useInterviewTimer();

  // 채팅 훅
  const { messages, isLoading, sendMessage, addFinishMessage } = useChat();

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
   * 재시작 핸들러
   */
  const handleRestart = () => {
    reset();
    start();
    setIsPaused(false);
    setSpeakState("ready");
    setViewMode("video");
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
      setSpeakState("ready");
    }
  };

  /**
   * 모드 전환 핸들러 (채팅 ↔ 영상)
   */
  const handleToggleMode = () => {
    setViewMode((prev) => (prev === "video" ? "chat" : "video"));
  };

  /**
   * 오디오 재생 핸들러
   */
  const handlePlayAudio = (message: ChatMessage) => {
    setAudioOverlay({ isOpen: true, message });
  };

  /**
   * 마무리하기 핸들러
   */
  const handleFinish = () => {
    // 채팅 모드로 전환
    setViewMode("chat");

    // AI 마무리 멘트 추가
    addFinishMessage();

    // 1.5초 후 로딩 오버레이 표시 (멘트 확인 시간)
    setTimeout(() => {
      setIsFinishing(true);

      // 추가 2초 후 결과 페이지로 이동
      setTimeout(() => {
        navigateTo("/my-speak/interview/result");
      }, 2000);
    }, 1500);
  };

  return (
    <div className="relative flex flex-col bg-purple-500 overflow-hidden">
      {/* 상단 헤더 */}
      <header className="flex flex-col items-center pt-2 pb-1.5 px-4 gap-10 my-5">
        <h1 className="text-white text-4xl font-unbounded">SpeakOn</h1>
        <p className="text-white text-xl">{interviewer.city} 면접 연습</p>
      </header>

      {/* 메인 컨텐츠 영역 */}
      <div className="flex flex-col px-6 pb-10">
        {viewMode === "video" ? (
          <VideoModeContent
            interviewer={interviewer}
            formattedTime={formattedTime}
            showSubtitles={showSubtitles}
            onToggleSubtitles={() => setShowSubtitles(!showSubtitles)}
            onRestart={handleRestart}
            isPaused={isPaused}
          />
        ) : (
          <ChatModeContent
            formattedTime={formattedTime}
            messages={messages}
            isLoading={isLoading}
            onPlayAudio={handlePlayAudio}
            onSendMessage={sendMessage}
          />
        )}

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

        {/* 오디오 오버레이 */}
        <AudioOverlay
          isOpen={audioOverlay.isOpen}
          onClose={() => setAudioOverlay({ isOpen: false, message: null })}
          message={audioOverlay.message?.content || ""}
        />

        {/* 마무리 로딩 오버레이 */}
        <FinishingOverlay isOpen={isFinishing} />
      </div>
    </div>
  );
};

export default InterviewPage;
