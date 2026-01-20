import { useEffect, useState } from "react";

import cameraIcon from "@/assets/images/icons/camera.svg";
import ccIcon from "@/assets/images/icons/cc.svg";
import chatingIcon from "@/assets/images/icons/chating.svg";
import continueIcon from "@/assets/images/icons/continue.svg";
import finishIcon from "@/assets/images/icons/finish.svg";
import loopIcon from "@/assets/images/icons/loop.svg";
import speakIcon from "@/assets/images/icons/speak.svg";
import stopIcon from "@/assets/images/icons/stop.svg";
import talkingIcon from "@/assets/images/icons/talking.svg";
import useNavigation from "@/hooks/useNavigation";
import { personsData } from "@/mocks/addData";

import AudioOverlay from "./components/ChatSection/AudioOverlay";
import ChatInput from "./components/ChatSection/ChatInput";
import FinishingOverlay from "./components/ChatSection/FinishingOverlay";
import MessageList from "./components/ChatSection/MessageList";
import ControlButton from "./components/Controls/ControlButton";
import SubtitleOverlay from "./components/VideoSection/SubtitleOverlay";
import UserVideoStream from "./components/VideoSection/UserVideoStream";
import { useChat } from "./hooks/useChat";
import { useInterviewTimer } from "./hooks/useInterviewTimer";
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
   * 말하기 버튼 핸들러 (영상 모드)
   */
  const handleSpeak = () => {
    if (speakState === "ready") {
      setSpeakState("speaking");
      // TODO: 음성 인식 시작
    } else if (speakState === "speaking") {
      setSpeakState("done");
      // TODO: 음성 인식 중지
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

    // 로딩 상태 활성화
    setIsFinishing(true);

    // 2초 후 결과 페이지로 이동
    setTimeout(() => {
      navigateTo("/my-speak/interview/result");
    }, 2000);
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
          <>
            {/* 비디오 모드 */}
            <div className="relative h-[48vh] bg-white rounded-2xl overflow-hidden border border-white">
              {/* 사용자 웹캠 */}
              <UserVideoStream />

              {/* AI 면접관 PIP */}
              <div className="absolute top-4 left-4 w-45 h-60 rounded-2xl overflow-hidden shadow-lg border border-white">
                <img
                  src={interviewer.imageUrl}
                  alt={interviewer.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 타이머 + CC 버튼 */}
              <div className="absolute top-2 right-2 flex items-center gap-2">
                <button
                  onClick={() => setShowSubtitles(!showSubtitles)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    showSubtitles
                      ? "bg-violet-500"
                      : "bg-neutral-900 opacity-30"
                  }`}
                >
                  <img src={ccIcon} alt="자막" />
                </button>
                <button
                  onClick={handleRestart}
                  className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center"
                >
                  <img src={loopIcon} alt="재시작" />
                </button>
                <div className="flex items-center gap-0.5 bg-black/50 px-1.5 py-0.5 rounded-full">
                  <span className="text-white p-2 text-lg">
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

            {/* 말하기 버튼 */}
            <div className="flex items-center justify-center py-4">
              <button
                onClick={handleSpeak}
                className="w-full h-21 bg-indigo-600 hover:bg-indigo-700 rounded-[10px] inline-flex justify-center items-center gap-2 transition-colors"
                disabled={isPaused}
              >
                <img
                  src={speakState === "speaking" ? talkingIcon : speakIcon}
                  alt="말하기"
                />
                {speakState !== "speaking" && (
                  <span className="text-white text-xl font-semibold">
                    말하기
                  </span>
                )}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* 채팅 모드 */}
            <div className="h-[48vh] bg-white rounded-2xl overflow-hidden flex flex-col">
              <MessageList
                messages={messages}
                onPlayAudio={handlePlayAudio}
              />
              <ChatInput onSend={sendMessage} disabled={isLoading} />
            </div>

            {/* 채팅 모드에서는 말하기 버튼 영역 빈 공간 */}
            <div className="py-4" />
          </>
        )}

        {/* 하단 컨트롤 버튼 */}
        <div className="flex items-center justify-between px-13 pt-4">
          <ControlButton
            icon={finishIcon}
            label="마무리하기"
            onClick={handleFinish}
            iconSize="w-5 h-5"
          />

          <ControlButton
            icon={isPaused ? continueIcon : stopIcon}
            label={isPaused ? "이어서하기" : "일시멈춤"}
            onClick={handlePauseToggle}
          />

          <ControlButton
            icon={viewMode === "video" ? chatingIcon : cameraIcon}
            label={viewMode === "video" ? "채팅" : "카메라"}
            onClick={handleToggleMode}
          />
        </div>
      </div>

      {/* 오디오 오버레이 */}
      <AudioOverlay
        isOpen={audioOverlay.isOpen}
        onClose={() => setAudioOverlay({ isOpen: false, message: null })}
        message={audioOverlay.message?.content || ""}
      />

      {/* 마무리 로딩 오버레이 */}
      <FinishingOverlay isOpen={isFinishing} />
    </div>
  );
};

export default InterviewPage;
