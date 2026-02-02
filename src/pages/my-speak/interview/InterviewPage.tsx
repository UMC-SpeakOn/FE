import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import { getAIOpener } from "@/api/ai";
import { sendConversationTurnText } from "@/api/myspeak";
import navIcon from "@/assets/images/icons/nav.svg";
import Spinner from "@/components/Spinner/Spinner";
import useNavigation from "@/hooks/useNavigation";

import ChatModeContent from "./components/ChatModeContent";
import ControlButtons from "./components/ControlButtons";
import SpeakButton from "./components/SpeakButton";
import VideoModeContent from "./components/VideoModeContent";
import { useAudioPlayer } from "./hooks/useAudioPlayer";
import { useChat } from "./hooks/useChat";
import { useInterviewTimer } from "./hooks/useInterviewTimer";
import { useSession } from "./hooks/useSession";
import { useSpeechRecognition } from "./hooks/useSpeechRecognition";
import { useVideoSwap } from "./hooks/useVideoSwap";
import type { ChatMessage } from "./types/chat.type";
import type { FinishStep } from "./types/finish.type";

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
  const { sessionId: sessionIdFromUrl } = useParams<{ sessionId: string }>();
  const location = useLocation();

  // state에서 roleId 가져오기 (기본값: 1)
  const myRoleId = (location.state as { myRoleId?: number })?.myRoleId ?? 1;
  const sessionIdNumber = sessionIdFromUrl ? Number(sessionIdFromUrl) : null;

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

  // 초기 로딩 상태 (세션 시작 중)
  const [isInitializing, setIsInitializing] = useState(true);

  // 채팅 입력 상태 (음성 인식 텍스트 표시용)
  const [chatInput, setChatInput] = useState('');

  // 초기화 완료 여부 추적 (마운트 시 1회만 실행)
  const hasInitialized = useRef(false);

  // 면접관 데이터 (기본값)
  const interviewer = {
    name: "AI 면접관",
    nationality: "AI",
    imgUrl: "/images/default-interviewer.png",
  };

  // 세션 관리 훅
  const { sessionId, setSessionId, complete: completeSession } = useSession();

  // 오디오 재생 훅
  const { play: playAudio } = useAudioPlayer();

  // 타이머 훅
  const { formattedTime, seconds, start, pause, resume } = useInterviewTimer();

  // 채팅 훅 (초기 메시지는 AI 오프너 로드 후 추가)
  const { messages, isLoading, addMessage } = useChat();

  // 음성 인식 훅
  const {
    startListening,
    stopListening,
    clearTranscript,
    audioLevel,
    transcript,
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

  /**
   * 컴포넌트 마운트 시 세션 초기화 및 AI 오프너 로드
   * ChatSetting에서 생성된 세션을 사용
   */
  useEffect(() => {
    if (hasInitialized.current) return;

    const initializeSession = async () => {
      hasInitialized.current = true;
      setIsInitializing(true);

      try {
        // 1. sessionId 유효성 검사
        if (!sessionIdNumber) {
          alert("잘못된 접근입니다. 세션 설정 페이지로 이동합니다.");
          navigateTo("/my-speak/setting");
          return;
        }

        // 2. ChatSetting에서 생성된 세션 사용
        setSessionId(sessionIdNumber);

        // 3. 타이머 시작
        start();

        // 4. AI 오프너 로드
        const opener = await getAIOpener(myRoleId);

        // 5. 오프닝 메시지 추가 (텍스트만, 오디오 없음)
        const firstMessage: ChatMessage = {
          id: "opener",
          type: "AI",
          content: opener.result, // Swagger 응답 result 필드 사용
          timestamp: new Date(),
        };
        addMessage(firstMessage);
      } catch (error) {
        console.error("[InterviewPage] Failed to initialize session:", error);
        alert("면접 세션을 시작하는데 실패했습니다. 다시 시도해주세요.");
        navigateTo("/my-speak/setting");
      } finally {
        setIsInitializing(false);
      }
    };

    initializeSession();
  }, [sessionIdNumber, setSessionId, start, myRoleId, addMessage, navigateTo]);

  // 음성 인식 transcript를 chatInput에 실시간 반영
  useEffect(() => {
    if (viewMode === 'chat' && transcript) {
      setChatInput(transcript);
    }
  }, [transcript, viewMode]);

  /**
   * 사용자 응답 처리 (텍스트 → AI 응답 → TTS 재생)
   */
  const handleUserResponse = async (transcript: string) => {
    if (!transcript.trim() || !sessionId) return;

    try {
      // 1. 사용자 메시지 추가
      const userMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        type: "User",
        content: transcript.trim(),
        timestamp: new Date(),
      };
      addMessage(userMessage);

      // 2. AI 응답 요청 (텍스트 전용 API 사용)
      const response = await sendConversationTurnText(
        sessionId!,
        transcript.trim(),
        "MAIN",
        "en-US"
      );

      // 응답이 없으면 종료
      if (!response) {
        alert("AI 응답을 받는데 실패했습니다. 다시 시도해주세요.");
        return;
      }

      // 3. AI 메시지 추가
      const aiMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        type: "AI",
        content: response.questionText,
        timestamp: new Date(),
      };
      addMessage(aiMessage);

      // 4. TTS 오디오 재생 (영상 모드일 때)
      if (viewMode === "video" && response.base64Audio) {
        await playAudio(response.base64Audio);
      }
    } catch (error) {
      console.error("[InterviewPage] Failed to send turn:", error);
      alert("대화 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

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
   * - 카메라 모드: 말하기 완료 시 즉시 메시지 전송 (API 호출)
   * - 채팅 모드: 말하기 완료 시 입력창에만 입력 (사용자가 전송 버튼으로 컨트롤)
   */
  const handleSpeak = () => {
    if (speakState === 'ready') {
      setSpeakState('speaking');
      setChatInput(''); // 입력 필드 초기화
      startListening();
    } else if (speakState === 'speaking') {
      setSpeakState('done');

      // 카메라 모드일 경우 API를 통해 즉시 전송
      if (viewMode === 'video' && transcript.trim()) {
        handleUserResponse(transcript.trim());
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
   * 마무리하기 핸들러
   * - 플로우: 세션 완료 API → 마무리 TTS 재생 → 결과 페이지 이동
   */
  const handleFinish = async () => {
    try {
      // 1. 로딩 상태 표시
      setFinishStep('loading');

      // 2. 세션 완료 API 호출
      const result = await completeSession(seconds); // 총 시간(초) 전달

      if (!result) {
        throw new Error("Session completion failed: no result");
      }

      // 3. 마무리 TTS 재생 (영상 모드일 때)
      if (viewMode === 'video' && result.closingTtsBase64) {
        await playAudio(result.closingTtsBase64);
      }

      // 4. 결과 페이지로 이동 (세션 완료 데이터를 state로 전달)
      navigateTo('/my-speak/result', {
        state: {
          sessionId: result.sessionId,
          totalTime: result.totalTime,
          sentenceCount: result.sentenceCount,
        }
      });
    } catch (error) {
      console.error("[InterviewPage] Failed to complete session:", error);
      setFinishStep('idle'); // 로딩 상태 해제
      alert("세션 종료 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setFinishStep('idle'); // 로딩 상태 초기화
    }
  };

  // 초기 로딩 중
  if (isInitializing) {
    return (
      <div className="relative flex flex-col items-center justify-center w-full h-full flex-1 bg-purple-500">
        <Spinner />
        <p className="mt-6 text-white text-lg">면접 준비 중...</p>
      </div>
    );
  }

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
              onPlayAudio={() => { }}
              onSendMessage={handleUserResponse}
              finishStep={finishStep}
              transcript={transcript}
              inputValue={chatInput}
              onInputChange={setChatInput}
              clearTranscript={clearTranscript}
              interviewer={interviewer}
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
