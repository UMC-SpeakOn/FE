import { useEffect, useState } from 'react';

/**
 * useInterviewTimer 훅의 반환 타입
 */
interface UseInterviewTimerReturn {
  /** 경과된 총 초(seconds) */
  seconds: number;
  /** 타이머 실행 중 여부 */
  isRunning: boolean;
  /** 포맷된 시간 문자열 (MM:SS) */
  formattedTime: string;
  /** 타이머 시작 함수 */
  start: () => void;
  /** 타이머 일시정지 함수 */
  pause: () => void;
  /** 타이머 재개 함수 */
  resume: () => void;
  /** 타이머 리셋 함수 (0으로 초기화 및 중지) */
  reset: () => void;
}

/**
 * useInterviewTimer - 면접 세션 타이머 관리 훅
 *
 * @description
 * 면접 세션의 경과 시간을 추적하고 관리하는 커스텀 훅입니다.
 * 시작, 일시정지, 재개, 리셋 기능을 제공합니다.
 *
 * @features
 * - 초 단위 시간 카운팅
 * - MM:SS 형식 자동 포맷
 * - 시작/일시정지/재개/리셋 제어
 * - 최대 시간 제한 (15분 = 900초)
 *
 * @constraints
 * - 최대 15분까지 카운트 (내부 안전 제한)
 * - docs/my-speak.md 섹션 8-4 참고
 *
 * @example
 * ```tsx
 * const { seconds, formattedTime, start, pause, resume, reset } = useInterviewTimer();
 *
 * // 면접 시작 시
 * useEffect(() => {
 *   start();
 * }, []);
 *
 * // 일시정지 버튼
 * <button onClick={pause}>일시정지</button>
 *
 * // 화면에 표시
 * <span>{formattedTime}</span>
 * ```
 *
 * @param {number} initialSeconds - 초기 시간(초) (기본값: 0)
 * @returns {UseInterviewTimerReturn} 타이머 제어 객체
 *
 * @related
 * - components/Header/Timer.tsx
 * - docs/my-speak.md (섹션 8-4. 세션 내부 최대 시간 15분)
 * - docs/issue14-implementation-solution.md (Phase 3)
 */
export const useInterviewTimer = (
  initialSeconds = 0,
): UseInterviewTimerReturn => {
  // 경과된 총 초
  const [seconds, setSeconds] = useState(initialSeconds);

  // 타이머 실행 상태
  const [isRunning, setIsRunning] = useState(false);

  /**
   * 초를 MM:SS 형식 문자열로 변환
   * @param totalSeconds - 변환할 총 초
   * @returns MM:SS 형식 문자열 (예: "05:42")
   */
  const formatTime = (totalSeconds: number): string => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  /**
   * 타이머 시작 함수
   * - 타이머를 0부터 시작하거나 재개
   */
  const start = () => {
    setIsRunning(true);
  };

  /**
   * 타이머 일시정지 함수
   * - 현재 시간을 유지한 채 타이머 정지
   */
  const pause = () => {
    setIsRunning(false);
  };

  /**
   * 타이머 재개 함수
   * - 일시정지된 시점부터 타이머 재개
   */
  const resume = () => {
    setIsRunning(true);
  };

  /**
   * 타이머 리셋 함수
   * - 시간을 0으로 초기화하고 타이머 정지
   */
  const reset = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  /**
   * 타이머 인터벌 효과
   * - isRunning이 true일 때 1초마다 seconds 증가
   * - 최대 15분(900초) 제한
   */
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          // 최대 15분(900초) 제한
          if (prev >= 900) {
            setIsRunning(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }

    // 클린업: 인터벌 제거
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  return {
    seconds,
    isRunning,
    formattedTime: formatTime(seconds),
    start,
    pause,
    resume,
    reset,
  };
};
