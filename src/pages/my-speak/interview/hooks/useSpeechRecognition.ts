import { useCallback, useEffect, useRef, useState } from 'react';

import { sendConversationTurn } from '@/api/myspeak';

/**
 * Window 객체 확장 (브라우저 호환성)
 */
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
    webkitAudioContext: typeof AudioContext;
  }
}

/**
 * SpeechRecognition 타입 정의 (브라우저 호환성)
 */
interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

/**
 * useSpeechRecognition 훅의 Props
 */
interface UseSpeechRecognitionProps {
  /** 세션 ID (모바일에서 음성 파일 전송 시 필요) */
  sessionId?: number;
  /** 메시지 타입 (기본값: MAIN) */
  messageType?: 'MAIN' | 'FOLLOW' | 'CLOSING';
}

/**
 * useSpeechRecognition 훅의 반환 타입
 */
interface UseSpeechRecognitionReturn {
  /** 음성 인식 시작 */
  startListening: () => void;
  /** 음성 인식 중지 */
  stopListening: () => Promise<void>;
  /** transcript 초기화 */
  clearTranscript: () => void;
  /** 현재 인식 중인지 여부 */
  isListening: boolean;
  /** 인식된 텍스트 */
  transcript: string;
  /** 현재 오디오 볼륨 레벨 (0-100) */
  audioLevel: number;
  /** 에러 메시지 */
  error: string | null;
  /** 서버 응답 (모바일에서 음성 파일 전송 후) */
  aiResponse: { answerText?: string; questionText: string; base64Audio: string } | null;
}

/**
 * useSpeechRecognition - 하이브리드 음성 인식 훅 (PC: Web Speech API, 모바일: 서버 STT)
 *
 * @description
 * PC 환경: Web Speech API로 실시간 음성 인식
 * 모바일 환경: MediaRecorder로 녹음 후 서버에 음성 파일 전송
 *
 * @features
 * - PC: 실시간 음성 인식 (Web Speech API)
 * - 모바일: 음성 파일 녹음 및 서버 전송
 * - 오디오 볼륨 레벨 실시간 감지
 * - 자동 환경 감지
 *
 * @example
 * ```tsx
 * const { startListening, stopListening, isListening, transcript, audioLevel, aiResponse } =
 *   useSpeechRecognition({ sessionId: 123, messageType: 'MAIN' });
 * ```
 */
export const useSpeechRecognition = ({
  sessionId,
  messageType = 'MAIN',
}: UseSpeechRecognitionProps = {}): UseSpeechRecognitionReturn => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [audioLevel, setAudioLevel] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState<{
    answerText?: string;
    questionText: string;
    base64Audio: string;
  } | null>(null);

  // 누적된 최종 결과를 저장 (interim 업데이트 시 기준점)
  const finalTranscriptRef = useRef('');

  // 모바일 환경 감지
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // PC용: Web Speech API
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // 모바일용: MediaRecorder
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  // 공통: 오디오 분석
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  /**
   * 오디오 볼륨 레벨 측정
   */
  const measureAudioLevel = useCallback(function measure() {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    // 평균 볼륨 계산 (0-255 → 0-100)
    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
    const normalizedLevel = Math.min(100, (average / 255) * 100 * 2);

    setAudioLevel(normalizedLevel);

    animationFrameRef.current = requestAnimationFrame(measure);
  }, []);

  /**
   * 오디오 컨텍스트 및 분석기 초기화
   */
  const initAudioAnalyser = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;

      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);

      measureAudioLevel();
    } catch (err) {
      console.warn('Audio analyser initialization failed (non-critical):', err);
      // 오디오 레벨 측정 실패는 치명적이지 않음 - Speech Recognition은 계속 작동
      // 사용자는 말하기 애니메이션이 없어도 음성 인식은 사용 가능
    }
  }, [measureAudioLevel]);

  /**
   * PC: Web Speech API로 음성 인식 시작
   */
  const startListeningPC = useCallback(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError('이 브라우저는 음성 인식을 지원하지 않습니다.');
      return;
    }

    setTranscript('');
    finalTranscriptRef.current = '';

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; // 영어 학습 앱이므로 영어로 설정
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      // console.log('[Speech Recognition] Started successfully');
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = '';
      let newFinalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPiece = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          newFinalTranscript += transcriptPiece;
        } else {
          interimTranscript += transcriptPiece;
        }
      }

      if (newFinalTranscript) {
        finalTranscriptRef.current = (
          finalTranscriptRef.current +
          ' ' +
          newFinalTranscript
        ).trim();
      }

      const combined = (
        finalTranscriptRef.current +
        ' ' +
        interimTranscript
      ).trim();
      setTranscript(combined);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('[Speech Recognition] Error:', event.error);

      // 마이크 권한 거부
      if (event.error === 'not-allowed') {
        setError('마이크 권한을 허용해주세요. 브라우저 설정에서 마이크 권한을 확인해주세요.');
        setIsListening(false);
        return;
      }

      if (event.error === 'no-speech') return;
      if (event.error === 'aborted') return;

      if (event.error === 'network') {
        setIsListening(false);
        return;
      }

      setError(`음성 인식 오류: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      // recognitionRef가 존재하면 아직 인식 중인 것으로 간주 (사용자가 stopListening 호출 전)
      // stopListening에서 recognitionRef.current를 null로 설정하므로, null이면 재시작하지 않음
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (err) {
          console.error('[Speech Recognition] Failed to restart:', err);
        }
      }
    };

    try {
      // CRITICAL: recognitionRef를 start() 호출 전에 설정!
      // start() 호출 시 즉시 onend가 발생할 수 있으므로, onend 콜백에서 ref를 확인할 수 있어야 함
      recognitionRef.current = recognition;
      setIsListening(true);
      setError(null);

      recognition.start();
    } catch (err) {
      console.error('[Speech Recognition] Failed to start:', err);
      setError('음성 인식을 시작할 수 없습니다.');
      recognitionRef.current = null; // 실패 시 ref 초기화
      return;
    }

    initAudioAnalyser();
  }, [initAudioAnalyser]); // isListening 의존성 제거!

  /**
   * 모바일: MediaRecorder로 음성 녹음 시작
   */
  const startListeningMobile = useCallback(async () => {
    if (!sessionId) {
      setError('세션 ID가 필요합니다.');
      return;
    }

    try {
      setError(null);
      setTranscript('');
      setAiResponse(null);
      audioChunksRef.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 48000, // 고품질 샘플링
        },
      });
      streamRef.current = stream;

      // 오디오 분석기 초기화
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;

      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      measureAudioLevel();

      // MediaRecorder 초기화
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm',
      });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onerror = (event) => {
        console.error('[Mobile] MediaRecorder error:', event);
      };

      // timeslice를 1초(1000ms)로 설정하여 주기적으로 데이터 수집
      mediaRecorder.start(1000);
      setIsListening(true);
    } catch (err) {
      console.error('[Mobile] Failed to start recording:', err);
      setError('마이크 권한을 허용해주세요.');
      setIsListening(false);
    }
  }, [sessionId, measureAudioLevel]);

  /**
   * 통합: 환경에 따라 음성 인식 시작
   */
  const startListening = useCallback(() => {
    if (isMobile) {
      startListeningMobile();
    } else {
      startListeningPC();
    }
  }, [isMobile, startListeningMobile, startListeningPC]);

  /**
   * PC: Web Speech API 중지
   */
  const stopListeningPC = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    setIsListening(false);
    setAudioLevel(0);
  }, []);

  /**
   * 모바일: MediaRecorder 중지 및 서버 전송
   */
  const stopListeningMobile = useCallback(async () => {
    if (!mediaRecorderRef.current || !isListening || !sessionId) {
      return;
    }

    return new Promise<void>((resolve) => {
      mediaRecorderRef.current!.onstop = async () => {
        try {

          // 오디오 정리
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
          }
          setAudioLevel(0);

          if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
          }

          if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
          }

          // Blob을 File로 변환
          const audioBlob = new Blob(audioChunksRef.current, {
            type: 'audio/webm',
          });
          const audioFile = new File([audioBlob], 'recording.webm', {
            type: 'audio/webm',
          });

          // 실제 서버에 음성 파일 전송
          const response = await sendConversationTurn(sessionId, audioFile, {
            languageCode: 'en-US', // 영어 학습 앱이므로 영어로 설정
            messageType,
          });

          // 서버 응답 저장 (AI 응답만)
          // transcript는 사용자 입력용이므로 비워둠
          setTranscript(''); // 입력창 초기화
          setAiResponse({
            answerText: response.answerText,
            questionText: response.questionText,
            base64Audio: response.base64Audio,
          });
          setIsListening(false);

          resolve();
        } catch (err) {
          console.error('[Mobile] Failed to send audio:', err);
          setError('음성 전송에 실패했습니다. 다시 시도해주세요.');
          setIsListening(false);
          resolve();
        }
      };

      mediaRecorderRef.current!.stop();
    });
  }, [isListening, sessionId, messageType]);

  /**
   * 통합: 환경에 따라 음성 인식 중지
   */
  const stopListening = useCallback(async () => {
    if (isMobile) {
      await stopListeningMobile();
    } else {
      stopListeningPC();
    }
  }, [isMobile, stopListeningMobile, stopListeningPC]);

  /**
   * transcript 명시적 초기화 (카메라 모드에서 전송 후 호출)
   */
  const clearTranscript = useCallback(() => {
    setTranscript('');
    finalTranscriptRef.current = '';
  }, []);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      // 언마운트 시에만 정리하도록 의존성 배열을 비움
      // stopListening을 의존성에 넣으면 함수가 재생성될 때마다 cleanup이 실행됨
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 빈 배열: 마운트 시 1회 실행, 언마운트 시 cleanup

  return {
    startListening,
    stopListening,
    clearTranscript,
    isListening,
    transcript,
    audioLevel,
    error,
    aiResponse,
  };
};
