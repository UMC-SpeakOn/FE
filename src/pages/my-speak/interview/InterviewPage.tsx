import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { getSessionOpener, sendConversationTurnText } from "@/api/myspeak";
import navIcon from "@/assets/images/icons/nav.svg";
import Spinner from "@/components/Spinner/Spinner";
import useNavigation from "@/hooks/useNavigation";
import { useRoleProfile } from "@/hooks/role-profile/useRoleProfile";

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
  const sessionIdNumber = sessionIdFromUrl ? Number(sessionIdFromUrl) : null;

  // state에서 myRoleId 가져오기
  const myRoleIdFromState = (location.state as { myRoleId?: number })?.myRoleId;

  // Role Profile 조회 (interviewer 정보 가져오기)
  const { profiles, isLoading: isLoadingProfiles } = useRoleProfile();

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

  // AI 응답 대기 중 상태
  const [isAIResponding, setIsAIResponding] = useState(false);

  // 초기화 완료 여부 추적 (마운트 시 1회만 실행)
  const hasInitialized = useRef(false);

  // 처리된 AI 응답 추적 (중복 메시지 방지)
  const lastProcessedResponseRef = useRef<typeof aiResponse>(null);

  // 면접관 데이터 (API로부터 가져오기)
  const interviewer = useMemo(() => {
    if (!myRoleIdFromState || !profiles.length) {
      // 기본값 (로딩 중이거나 데이터가 없을 때)
      return {
        name: "AI Interviewer",
        nationality: "AI",
        imgUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Ccircle cx='24' cy='24' r='24' fill='%23a855f7'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='20' font-family='Arial'%3EAI%3C/text%3E%3C/svg%3E",
      };
    }

    // myRoleId로 profile 찾기
    const profile = profiles.find((p) => p.id === myRoleIdFromState);

    if (!profile) {
      console.warn(`[InterviewPage] Profile not found for myRoleId: ${myRoleIdFromState}`);
      return {
        name: "AI Interviewer",
        nationality: "AI",
        imgUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Ccircle cx='24' cy='24' r='24' fill='%23a855f7'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='20' font-family='Arial'%3EAI%3C/text%3E%3C/svg%3E",
      };
    }

    // Profile에서 interviewer 정보 추출
    return {
      name: profile.name,
      nationality: profile.city, // city = nationality
      imgUrl: profile.imageUrl,
    };
  }, [myRoleIdFromState, profiles]);

  // 세션 관리 훅
  const { sessionId, setSessionId, complete: completeSession } = useSession();

  // 오디오 재생 훅
  const { play: playAudio } = useAudioPlayer();

  // 타이머 훅
  const { formattedTime, seconds, start, pause, resume } = useInterviewTimer();

  // 채팅 훅 (초기 메시지는 AI 오프너 로드 후 추가)
  const { messages, isLoading, addMessage } = useChat();

  // 음성 인식 훅 (하이브리드: PC는 Web Speech API, 모바일은 서버 STT)
  const {
    startListening,
    stopListening,
    clearTranscript,
    audioLevel,
    transcript,
    aiResponse,
    error: speechError,
  } = useSpeechRecognition({
    sessionId: sessionId ? Number(sessionId) : undefined,
    messageType: 'MAIN',
  });

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

        // 4. 세션 오프너 로드
        const opener = await getSessionOpener(sessionIdNumber);

        // 5. 오프닝 메시지 추가
        const firstMessage: ChatMessage = {
          id: "opener",
          type: "AI",
          content: opener.questionText,
          timestamp: new Date(),
        };
        addMessage(firstMessage);

        // 6. 로딩 완료 (TTS보다 먼저 화면 표시)
        setIsInitializing(false);

        // 7. 오프닝 TTS 재생 (백그라운드, 로딩 완료 후)
        if (opener.base64Audio) {
          // await 제거 - 백그라운드에서 재생
          playAudio(opener.base64Audio).catch((audioError: any) => {
            // Autoplay 정책으로 인한 실패는 치명적 에러가 아니므로 로그만 출력
            console.warn("[InterviewPage] TTS autoplay blocked by browser policy. User interaction required.");
            console.warn("[InterviewPage] Audio error:", audioError);
            // 사용자가 페이지와 상호작용(버튼 클릭 등)한 후 TTS가 재생됩니다.
          });
        }
      } catch (error) {
        console.error("[InterviewPage] Failed to initialize session:", error);
        setIsInitializing(false); // 에러 시에도 로딩 해제
        alert("면접 세션을 시작하는데 실패했습니다. 다시 시도해주세요.");
        navigateTo("/my-speak/setting");
      }
    };

    initializeSession();
  }, [sessionIdNumber, setSessionId, start, addMessage, navigateTo, playAudio]);

  // 음성 인식 transcript를 chatInput에 실시간 반영
  useEffect(() => {
    if (viewMode === 'chat' && transcript) {
      setChatInput(transcript);
    }
  }, [transcript, viewMode]);

  // 모바일 환경: 서버 STT 응답 처리
  useEffect(() => {
    // 중복 처리 방지: 이미 처리된 응답이면 무시
    if (aiResponse && aiResponse !== lastProcessedResponseRef.current) {
      lastProcessedResponseRef.current = aiResponse;

      // 0. 로딩 상태 해제
      setIsAIResponding(false);

      // 1. 사용자 메시지 추가 (STT 결과가 있는 경우만)
      if (aiResponse.answerText) {
        const userMessage: ChatMessage = {
          id: `msg-${Date.now()}`,
          type: 'User',
          content: aiResponse.answerText,
          timestamp: new Date(),
        };
        addMessage(userMessage);
      }

      // 2. AI 메시지 추가
      const aiMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        type: 'AI',
        content: aiResponse.questionText,
        timestamp: new Date(),
      };
      addMessage(aiMessage);

      // TTS 재생 (있는 경우)
      if (aiResponse.base64Audio) {
        playAudio(aiResponse.base64Audio).catch((err) => {
          console.warn('[InterviewPage] Mobile TTS playback failed:', err);
        });
      }
    }
  }, [aiResponse, addMessage, playAudio]);

  // 음성 인식 에러 감지 (모바일 환경에서 음성 전송 실패 시)
  useEffect(() => {
    if (speechError) {
      setIsAIResponding(false);
      console.error('[InterviewPage] Speech recognition error:', speechError);
    }
  }, [speechError]);

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

      // 2. AI 응답 대기 시작
      setIsAIResponding(true);

      // 3. AI 응답 요청 (텍스트 전용 API 사용)
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

      // 4. AI 메시지 추가
      const aiMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        type: "AI",
        content: response.questionText,
        timestamp: new Date(),
      };
      addMessage(aiMessage);

      // 5. AI 응답 대기 종료 (메시지 추가 직후)
      setIsAIResponding(false);

      // 6. TTS 오디오 재생 (백그라운드, await 제거)
      if (response.base64Audio) {
        playAudio(response.base64Audio).catch((audioError) => {
          console.warn("[InterviewPage] TTS playback failed:", audioError);
        });
      }
    } catch (error: any) {
      console.error("[InterviewPage] Failed to send turn:", error);
      console.error("[InterviewPage] Error response:", error.response?.data);
      const errorMessage = error.response?.data?.message || "대화 중 오류가 발생했습니다.";
      setIsAIResponding(false); // 에러 시에도 로딩 해제
      alert(`${errorMessage}\n\n다시 시도해주세요.`);
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
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (speakState === 'ready') {
      setSpeakState('speaking');
      setChatInput(''); // 입력 필드 초기화
      startListening();
    } else if (speakState === 'speaking') {
      setSpeakState('done');

      if (isMobile) {
        // 모바일 환경: stopListening()이 서버에 음성 파일 전송
        // transcript가 없는 것이 정상 (서버 STT 사용)
        setIsAIResponding(true);
      } else {
        // PC 환경: Web Speech API 사용
        if (viewMode === 'video') {
          // 카메라 모드: 즉시 API 호출
          if (transcript.trim()) {
            handleUserResponse(transcript.trim());
            clearTranscript();
          }
        } else {
          // 채팅 모드: 입력창에만 설정 (사용자가 전송 버튼으로 컨트롤)
          if (transcript.trim()) {
            setChatInput(transcript.trim());
            clearTranscript();
          }
        }
      }

      // 음성 인식 중지
      stopListening().catch((error) => {
        console.error('[InterviewPage] stopListening failed:', error);
        setIsAIResponding(false);
      });
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
   * - 플로우: 알림(1초) → API 호출 → 마무리 멘트 + TTS(2초) → 로딩(0.5초) → 결과 페이지
   */
  const handleFinish = async () => {
    try {
      // 0. 타이머 중지
      pause();

      // 1. 알림 표시: "AI의 마무리 멘트가 한 턴 추가됩니다." (1초)
      setFinishStep('notification');
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 2. API 호출하여 마무리 멘트 가져오기 (오버레이 없이)
      setFinishStep('idle');
      console.log('[handleFinish] Step 2: Calling completeSession API...');
      const result = await completeSession(seconds);

      if (!result) {
        throw new Error("Session completion failed: no result");
      }

      console.log('[handleFinish] Full API Response:', result);
      console.log('[handleFinish] API Response Summary:', {
        closingText: result.closingText,
        hasClosingTts: !!result.closingTtsBase64,
        closingTtsLength: result.closingTtsBase64?.length || 0,
        allFields: Object.keys(result),
      });

      // 3. 마무리 메시지 추가 및 TTS 재생 (2초 동안 표시)
      const closingText = result.closingText || "Great job! The interview is complete.";
      const closingMessage: ChatMessage = {
        id: `closing-${Date.now()}`,
        type: "AI",
        content: closingText,
        timestamp: new Date(),
      };
      addMessage(closingMessage);
      setFinishStep('ai_message');
      console.log('[handleFinish] Step 3: Added closing message and set finishStep to ai_message');

      // TTS 재생 (재생이 완료될 때까지 대기)
      if (result.closingTtsBase64) {
        console.log('[handleFinish] Starting TTS playback...');
        try {
          await playAudio(result.closingTtsBase64);
          console.log('[handleFinish] TTS playback completed successfully');
        } catch (audioError) {
          console.error('[handleFinish] TTS playback failed:', audioError);
          // TTS 실패해도 계속 진행
        }
      } else {
        console.warn('[handleFinish] No closingTtsBase64 - skipping TTS playback');
        // TTS가 없으면 최소 2초 대기 (메시지를 읽을 시간 제공)
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      console.log('[handleFinish] Step 3 completed (TTS playback finished)');

      // 4. 결과 로딩 표시 (0.5초)
      setFinishStep('loading');
      await new Promise(resolve => setTimeout(resolve, 500));

      // 5. 결과 페이지로 이동
      navigateTo('/my-speak/result', {
        state: {
          sessionId: result.sessionId,
          totalTime: result.totalTime,
          sentenceCount: result.sentenceCount,
        }
      });
    } catch (error: any) {
      console.error("[InterviewPage] Failed to complete session:", error);
      console.error("[InterviewPage] Error response:", error.response?.data);
      setFinishStep('idle'); // 로딩 상태 해제
      const errorMessage = error.response?.data?.message || "세션 종료 중 오류가 발생했습니다.";
      alert(`${errorMessage}\n\n다시 시도해주세요.`);
    } finally {
      setFinishStep('idle'); // 로딩 상태 초기화
    }
  };

  // 초기 로딩 중 (세션 초기화 또는 프로필 로딩)
  if (isInitializing || isLoadingProfiles) {
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
              isAIResponding={isAIResponding}
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
