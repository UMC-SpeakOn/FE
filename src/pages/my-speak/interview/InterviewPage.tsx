import { useEffect, useState } from "react";

import useNavigation from "@/hooks/useNavigation";
import navIcon from "@/assets/images/icons/nav.svg";
import { personsData } from "@/mocks/addData";

import ChatModeContent from "./components/ChatModeContent";
import ControlButtons from "./components/ControlButtons";
import SpeakButton from "./components/SpeakButton";
import VideoModeContent from "./components/VideoModeContent";
import { useChat } from "./hooks/useChat";
import { useInterviewTimer } from "./hooks/useInterviewTimer";
import { useSpeechRecognition } from "./hooks/useSpeechRecognition";

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

  // 자막 표시 여부 (영상 모드에서만 사용)
  const [showSubtitles, setShowSubtitles] = useState(false);

  // 일시정지 상태
  const [isPaused, setIsPaused] = useState(false);

  // 말하기 상태 (영상 모드에서만 사용)
  const [speakState, setSpeakState] = useState<
    "ready" | "speaking" | "done"
  >("ready");

  // 마무리 플로우 상태
  const [finishStep, setFinishStep] = useState<
    "idle" | "notification" | "ai_message" | "loading"
  >("idle");

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
    transcript,
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
   * - 채팅 모드에서 말하기 완료 시 transcript를 메시지로 전송
   */
  const handleSpeak = () => {
    if (speakState === 'ready') {
      setSpeakState('speaking');
      startListening();
    } else if (speakState === 'speaking') {
      setSpeakState('done');
      stopListening();

      // 채팅 모드이고 transcript가 있으면 자동 전송
      if (viewMode === 'chat' && transcript.trim()) {
        sendMessage(transcript.trim());
      }
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
   * 마무리하기 핸들러
   * - 공통 플로우: 알림(1초) → 멘트(영상: TTS, 채팅: 채팅) → 로딩 스피너(2초) → 결과 페이지
   */
  const handleFinish = () => {
    // Step 1: 알림 - "AI의 마무리 멘트가 한 턴 추가됩니다."
    setFinishStep("notification");

    setTimeout(() => {
      // Step 2: AI 마무리 멘트 출력
      if (viewMode === "video") {
        // 영상 모드: TTS 음성만 재생 (텍스트 없음)
        setFinishStep("ai_message");
      } else {
        // 채팅 모드: 채팅에 멘트 추가
        addFinishMessage();
        setFinishStep("ai_message");
      }

      setTimeout(() => {
        // Step 3: 결과 로딩 스피너
        setFinishStep("loading");

        setTimeout(() => {
          // Step 4: 결과 화면 이동
          navigateTo("/my-speak/interview/result");
        }, 2000); // 로딩 2초
      }, 3000); // AI 멘트 3초
    }, 1000); // 알림 1초
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
            finishStep={finishStep}
          />
        ) : (
          <ChatModeContent
            messages={messages}
            isLoading={isLoading}
            onPlayAudio={() => {}}
            onSendMessage={sendMessage}
            finishStep={finishStep}
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
      </div>

      {/* 전체 화면 로딩 오버레이 */}
      {finishStep === "loading" && (
        <div className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center px-6 gap-6 z-50">
          <img
            src={navIcon}
            alt="loading"
            className="w-16 h-16 animate-spin"
          />
          <p className="text-white text-xl font-bold text-center">
            결과를 불러오는 중...
          </p>
        </div>
      )}
    </div>
  );
};

export default InterviewPage;
