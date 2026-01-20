import { memo } from "react";

interface ChatControlsProps {
    onSwitchToVideo: () => void;
    onFinish: () => void;
}

/**
 * ChatControls - 채팅 모드 하단 컨트롤 바
 *
 * @description
 * 영상 모드 전환 및 면접 마무리 버튼을 제공합니다.
 */
const ChatControls = memo(
    ({ onSwitchToVideo, onFinish }: ChatControlsProps) => {
        return (
            <div className="bg-purple-500 px-4 py-3 flex justify-between items-center">
                {/* 영상 모드 전환 버튼 */}
                <button
                    onClick={onSwitchToVideo}
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-colors"
                >
                    <span>📹</span>
                    <span className="text-sm font-medium">영상으로 전환</span>
                </button>

                {/* 면접 마무리 버튼 */}
                <button
                    onClick={onFinish}
                    className="flex items-center gap-2 bg-white hover:bg-gray-100 text-purple-500 px-4 py-2 rounded-full transition-colors"
                >
                    <span className="text-sm font-medium">면접 마무리</span>
                </button>
            </div>
        );
    }
);

ChatControls.displayName = "ChatControls";

export default ChatControls;
