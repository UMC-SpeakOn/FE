import { useEffect, useState } from 'react';

/**
 * useKeyboardHeight - 모바일 가상 키보드 높이 감지 훅
 *
 * @description
 * 모바일 환경에서 가상 키보드가 올라올 때 viewport 높이 변화를 감지하여
 * 키보드 높이를 계산합니다. UI 레이아웃 조정에 사용됩니다.
 *
 * @features
 * - Visual Viewport API 사용 (iOS/Android 호환)
 * - 키보드 높이 실시간 계산
 * - 키보드 표시 여부 상태 제공
 *
 * @returns
 * - keyboardHeight: 키보드 높이 (px)
 * - isKeyboardVisible: 키보드 표시 여부
 *
 * @example
 * ```tsx
 * const { keyboardHeight, isKeyboardVisible } = useKeyboardHeight();
 *
 * <div style={{ paddingBottom: isKeyboardVisible ? keyboardHeight : 0 }}>
 *   Content
 * </div>
 * ```
 */
export const useKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    // Visual Viewport API 지원 확인
    if (!window.visualViewport) {
      console.warn('[useKeyboardHeight] Visual Viewport API not supported');
      return;
    }

    const handleResize = () => {
      // viewport 높이 변화로 키보드 높이 계산
      const viewport = window.visualViewport;
      if (!viewport) return; // null 체크

      const windowHeight = window.innerHeight;
      const viewportHeight = viewport.height;

      // 키보드가 올라오면 visualViewport.height가 줄어듦
      const calculatedKeyboardHeight = windowHeight - viewportHeight;

      // 임계값: 50px 이상 차이나면 키보드가 올라온 것으로 간주
      const threshold = 50;
      const visible = calculatedKeyboardHeight > threshold;

      setKeyboardHeight(visible ? calculatedKeyboardHeight : 0);
      setIsKeyboardVisible(visible);

      if (visible) {
        console.log(
          `[useKeyboardHeight] Keyboard visible: ${calculatedKeyboardHeight}px`
        );
      }
    };

    // 초기 상태 체크
    handleResize();

    // viewport resize 이벤트 리스닝
    window.visualViewport.addEventListener('resize', handleResize);

    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    keyboardHeight,
    isKeyboardVisible,
  };
};
