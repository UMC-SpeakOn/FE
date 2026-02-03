import { useEffect,useRef } from "react";

interface UseSwipeOptions {
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    onSwipeUp?: () => void;
    onSwipeDown?: () => void;
    threshold?: number;
}

export const useSwipe = (options: UseSwipeOptions) => {
    const {
        onSwipeLeft,
        onSwipeRight,
        onSwipeUp,
        onSwipeDown,
        threshold = 50,
    } = options;

    const touchStartX = useRef<number>(0);
    const touchStartY = useRef<number>(0);
    const touchEndX = useRef<number>(0);
    const touchEndY = useRef<number>(0);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        // 공통 처리 로직
        const handleSwipeEnd = () => {
            const deltaX = touchEndX.current - touchStartX.current;
            const deltaY = touchEndY.current - touchStartY.current;
            const absDeltaX = Math.abs(deltaX);
            const absDeltaY = Math.abs(deltaY);

            // 수평 스와이프가 더 큰 경우
            if (absDeltaX > absDeltaY && absDeltaX > threshold) {
                if (deltaX > 0 && onSwipeRight) {
                    onSwipeRight();
                } else if (deltaX < 0 && onSwipeLeft) {
                    onSwipeLeft();
                }
            }
            // 수직 스와이프가 더 큰 경우
            else if (absDeltaY > threshold) {
                if (deltaY > 0 && onSwipeDown) {
                    onSwipeDown();
                } else if (deltaY < 0 && onSwipeUp) {
                    onSwipeUp();
                }
            }

            // 초기화
            touchStartX.current = 0;
            touchStartY.current = 0;
            touchEndX.current = 0;
            touchEndY.current = 0;
        };

        // 터치 이벤트 핸들러
        const handleTouchStart = (e: TouchEvent) => {
            touchStartX.current = e.touches[0].clientX;
            touchStartY.current = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            touchEndX.current = e.touches[0].clientX;
            touchEndY.current = e.touches[0].clientY;
        };

        // 마우스 이벤트 핸들러
        const handleMouseDown = (e: MouseEvent) => {
            touchStartX.current = e.clientX;
            touchStartY.current = e.clientY;
            // document에 등록하여 마우스가 영역 밖으로 나가도 감지
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        };

        const handleMouseMove = (e: MouseEvent) => {
            touchEndX.current = e.clientX;
            touchEndY.current = e.clientY;
        };

        const handleMouseUp = () => {
            handleSwipeEnd();
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        // 이벤트 리스너 등록
        element.addEventListener("touchstart", handleTouchStart);
        element.addEventListener("touchmove", handleTouchMove);
        element.addEventListener("touchend", handleSwipeEnd);
        element.addEventListener("mousedown", handleMouseDown);

        return () => {
            element.removeEventListener("touchstart", handleTouchStart);
            element.removeEventListener("touchmove", handleTouchMove);
            element.removeEventListener("touchend", handleSwipeEnd);
            element.removeEventListener("mousedown", handleMouseDown);
            // document에 등록된 이벤트 제거
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, threshold]);

    return elementRef;
};
