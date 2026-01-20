import { memo } from "react";

interface AudioOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
}

/**
 * AudioOverlay - 음성 재생 오버레이
 *
 * @description
 * AI 메시지를 음성으로 들을 수 있는 오버레이 컴포넌트입니다.
 * Mock 구현으로 실제 TTS 기능은 없습니다.
 */
const AudioOverlay = memo(({ isOpen, onClose, message }: AudioOverlayProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 mx-4 max-w-sm w-full">
                {/* 헤더 */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">🔊 음성 재생</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl"
                        aria-label="닫기"
                    >
                        ×
                    </button>
                </div>

                {/* 메시지 내용 */}
                <div className="bg-gray-100 rounded-xl p-4 mb-4 max-h-40 overflow-y-auto">
                    <p className="text-gray-700 text-sm leading-relaxed">
                        {message}
                    </p>
                </div>

                {/* 재생 컨트롤 (Mock) */}
                <div className="flex items-center justify-center gap-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full w-1/3 animate-pulse" />
                    </div>
                </div>

                <p className="text-center text-gray-400 text-xs mt-3">
                    🎧 음성 재생 중... (Mock)
                </p>
            </div>
        </div>
    );
});

AudioOverlay.displayName = "AudioOverlay";

export default AudioOverlay;
