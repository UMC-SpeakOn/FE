import { useState, useEffect } from "react";

/**
 * useKeyboardLayout - 모바일 키보드 레이아웃 관리 훅
 *
 * @description
 * 모바일 환경에서 키보드가 올라올 때 레이아웃 조정을 위한 훅입니다.
 * visualViewport API를 사용하여 키보드 높이를 감지합니다.
 */
export const useKeyboardLayout = () => {
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

    useEffect(() => {
        const viewport = window.visualViewport;

        if (!viewport) return;

        const handleResize = () => {
            const currentHeight = window.innerHeight - viewport.height;
            setKeyboardHeight(Math.max(0, currentHeight));
            setIsKeyboardOpen(currentHeight > 100);
        };

        viewport.addEventListener("resize", handleResize);
        viewport.addEventListener("scroll", handleResize);

        return () => {
            viewport.removeEventListener("resize", handleResize);
            viewport.removeEventListener("scroll", handleResize);
        };
    }, []);

    return {
        keyboardHeight,
        isKeyboardOpen,
    };
};
