import { useState, useCallback } from 'react';

export type VideoPosition = 'main' | 'pip';

interface VideoSwapState {
  isUserInMain: boolean;
}

/**
 * 비디오 스왑 커스텀 훅
 *
 * @description
 * User 영상과 AI 면접관 사진의 위치를 서로 교환하는 상태 관리 훅
 *
 * @returns
 * - isUserInMain: User가 메인 화면에 있는지 여부
 * - swapLayout: 화면 스왑 함수
 */
export const useVideoSwap = () => {
  const [isUserInMain, setIsUserInMain] = useState<boolean>(true);

  /**
   * 화면 스왑 핸들러
   *
   * @description
   * User와 AI의 위치를 서로 교환합니다.
   */
  const swapLayout = useCallback(() => {
    setIsUserInMain((prev) => !prev);
  }, []);

  return {
    isUserInMain,
    swapLayout,
  };
};
