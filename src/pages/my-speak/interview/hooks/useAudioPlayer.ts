import { useCallback, useRef, useState } from "react";

/**
 * useAudioPlayer - Base64 오디오 재생 관리 훅
 *
 * @description
 * Base64로 인코딩된 mp3 오디오를 Blob으로 변환하여 재생합니다.
 *
 * @example
 * const { play, stop, isPlaying } = useAudioPlayer();
 *
 * // 오디오 재생
 * await play(base64AudioString);
 *
 * // 재생 중지
 * stop();
 */
export const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  /**
   * Base64 오디오 재생
   * @param base64Audio - Base64로 인코딩된 mp3 문자열
   */
  const play = useCallback(async (base64Audio: string) => {
    try {
      // Base64 → Blob 변환
      const binaryString = atob(base64Audio);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: "audio/mp3" });
      const url = URL.createObjectURL(blob);

      // 기존 오디오 정지
      if (audioRef.current) {
        audioRef.current.pause();
      }

      // Audio 재생
      const audio = new Audio(url);
      audioRef.current = audio;
      setIsPlaying(true);

      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(url);
      };

      await audio.play();
    } catch (error) {
      console.error("[useAudioPlayer] Failed to play audio:", error);
      setIsPlaying(false);
    }
  }, []);

  /**
   * 오디오 재생 중지
   */
  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsPlaying(false);
    }
  }, []);

  return { play, stop, isPlaying };
};
