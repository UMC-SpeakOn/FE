import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * SpeechRecognition 타입 정의 (브라우저 호환성)
 */
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

/**
 * useSpeechRecognition 훅의 반환 타입
 */
interface UseSpeechRecognitionReturn {
  /** 음성 인식 시작 */
  startListening: () => void;
  /** 음성 인식 중지 */
  stopListening: () => void;
  /** 현재 인식 중인지 여부 */
  isListening: boolean;
  /** 인식된 텍스트 */
  transcript: string;
  /** 현재 오디오 볼륨 레벨 (0-100) */
  audioLevel: number;
  /** 에러 메시지 */
  error: string | null;
}

/**
 * useSpeechRecognition - 음성 인식 및 오디오 레벨 감지 훅
 *
 * @description
 * Web Speech API를 사용하여 음성을 텍스트로 변환하고,
 * Web Audio API를 사용하여 실시간 오디오 볼륨을 감지합니다.
 *
 * @features
 * - 실시간 음성 인식 (한국어)
 * - 오디오 볼륨 레벨 실시간 감지
 * - 브라우저 호환성 체크
 * - 자동 재시작 (연속 인식)
 *
 * @browser
 * - Chrome/Edge: 완전 지원
 * - Safari: 부분 지원
 * - Firefox: 미지원
 *
 * @example
 * ```tsx
 * const { startListening, stopListening, isListening, transcript, audioLevel } = useSpeechRecognition();
 *
 * // 말하기 시작
 * startListening();
 *
 * // 오디오 레벨에 따른 애니메이션
 * <div style={{ height: `${audioLevel}%` }} />
 * ```
 */
export const useSpeechRecognition = (): UseSpeechRecognitionReturn => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [audioLevel, setAudioLevel] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  /**
   * 오디오 볼륨 레벨 측정
   */
  const measureAudioLevel = useCallback(() => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    // 평균 볼륨 계산 (0-255 → 0-100)
    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
    const normalizedLevel = Math.min(100, (average / 255) * 100 * 2);

    setAudioLevel(normalizedLevel);

    animationFrameRef.current = requestAnimationFrame(measureAudioLevel);
  }, []);

  /**
   * 오디오 컨텍스트 및 분석기 초기화
   */
  const initAudioAnalyser = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;

      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);

      measureAudioLevel();
    } catch (err) {
      console.error('Audio analyser error:', err);
      setError('마이크 권한이 필요합니다.');
    }
  }, [measureAudioLevel]);

  /**
   * 음성 인식 시작
   */
  const startListening = useCallback(() => {
    // 브라우저 호환성 체크
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError('이 브라우저는 음성 인식을 지원하지 않습니다.');
      return;
    }

    // 음성 인식 인스턴스 생성
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = 'ko-KR';
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    // 인식 결과 처리
    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPiece = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptPiece;
        }
      }

      if (finalTranscript) {
        setTranscript((prev) => prev + ' ' + finalTranscript);
      }
    };

    // 에러 처리
    recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'no-speech') {
        // 음성이 감지되지 않으면 자동 재시작
        recognitionRef.current?.start();
      } else {
        setError('음성 인식 중 오류가 발생했습니다.');
        setIsListening(false);
      }
    };

    // 인식 종료 처리 (자동 재시작)
    recognitionRef.current.onend = () => {
      if (isListening) {
        recognitionRef.current?.start();
      }
    };

    // 인식 시작
    recognitionRef.current.start();
    setIsListening(true);
    setError(null);

    // 오디오 분석기 초기화
    initAudioAnalyser();
  }, [isListening, initAudioAnalyser]);

  /**
   * 음성 인식 중지
   */
  const stopListening = useCallback(() => {
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

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      stopListening();
    };
  }, [stopListening]);

  return {
    startListening,
    stopListening,
    isListening,
    transcript,
    audioLevel,
    error,
  };
};
