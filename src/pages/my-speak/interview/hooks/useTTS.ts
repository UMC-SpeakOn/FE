import { useCallback, useEffect, useRef, useState } from "react";

/**
 * useTTS - TTS 오디오 재생 관리 훅
 *
 * @description
 * AI 응답의 TTS 오디오를 재생하고 상태를 관리합니다.
 * HTML Audio API를 사용하여 오디오를 재생하며, 자동 정리 기능을 제공합니다.
 *
 * @example
 * const { play, stop, isPlaying, cleanup } = useTTS();
 *
 * // TTS 오디오 재생
 * await play('https://example.com/audio.mp3');
 *
 * // 재생 중지
 * stop();
 *
 * // 컴포넌트 언마운트 시 cleanup 호출
 * useEffect(() => cleanup, [cleanup]);
 */
export const useTTS = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * 오디오 재생
   * @param audioUrl - 재생할 오디오 파일 URL
   */
  const play = useCallback(async (audioUrl: string) => {
    try {
      // 이전 오디오 정리
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      // 새 오디오 생성 및 재생
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      setCurrentAudioUrl(audioUrl);
      setIsPlaying(true);
      setError(null);

      // 이벤트 리스너 등록
      audio.onended = () => {
        setIsPlaying(false);
      };

      audio.onerror = (e) => {
        console.error("[useTTS] Audio playback error:", e);
        setError("오디오 재생 중 오류가 발생했습니다.");
        setIsPlaying(false);
      };

      // 재생 시작
      await audio.play();
    } catch (err) {
      console.error("[useTTS] Failed to play audio:", err);
      setError("오디오 재생을 시작할 수 없습니다.");
      setIsPlaying(false);
    }
  }, []);

  /**
   * 오디오 중지
   */
  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, []);

  /**
   * 일시정지
   */
  const pause = useCallback(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [isPlaying]);

  /**
   * 재개
   */
  const resume = useCallback(async () => {
    if (audioRef.current && !isPlaying) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.error("[useTTS] Failed to resume audio:", err);
        setError("오디오 재개에 실패했습니다.");
      }
    }
  }, [isPlaying]);

  /**
   * 클린업 (컴포넌트 언마운트 시 호출)
   */
  const cleanup = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);
    setCurrentAudioUrl(null);
    setError(null);
  }, []);

  // 컴포넌트 언마운트 시 자동 클린업
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return {
    isPlaying,
    currentAudioUrl,
    error,
    play,
    stop,
    pause,
    resume,
    cleanup,
  };
};
