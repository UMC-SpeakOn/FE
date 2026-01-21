import ccIcon from "@/assets/images/icons/cc.svg";
import loopIcon from "@/assets/images/icons/loop.svg";

interface InterviewTimerProps {
  formattedTime: string;
  showSubtitles?: boolean;
  onToggleSubtitles?: () => void;
  onRestart?: () => void;
  variant?: "video" | "chat";
}

/**
 * InterviewTimer - 면접 타이머 컴포넌트
 *
 * @description
 * 영상 모드와 채팅 모드에서 공통으로 사용되는 타이머 컴포넌트입니다.
 *
 * @features
 * - 경과 시간 표시
 * - 재시작 버튼 (영상 모드만)
 * - CC 자막 토글 (영상 모드만)
 * - 통일된 타이머 스타일
 */
const InterviewTimer = ({
  formattedTime,
  showSubtitles,
  onToggleSubtitles,
  onRestart,
  variant = "video",
}: InterviewTimerProps) => {
  const isVideoMode = variant === "video";

  return (
    <div className="absolute top-2 right-2 flex items-center gap-2 z-10">
      {/* CC 자막 토글 버튼 (영상 모드만) */}
      {isVideoMode && onToggleSubtitles && (
        <button
          onClick={onToggleSubtitles}
          className={`w-10 h-10 rounded-full flex items-center justify-center ${showSubtitles ? "bg-violet-500" : "bg-neutral-900 opacity-30"
            }`}
        >
          <img src={ccIcon} alt="자막" />
        </button>
      )}

      {/* 재시작 버튼 (영상 모드만) */}
      {isVideoMode && onRestart && (
        <button
          onClick={onRestart}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-black/50 hover:bg-black/60"
        >
          <img src={loopIcon} alt="재시작" />
        </button>
      )}

      {/* 타이머 */}
      <div className="flex items-center px-3 py-1.5 rounded-full bg-black/50">
        <span className="text-white text-lg leading-10 tabular-nums min-w-[4.5rem] text-center">
          {formattedTime}
        </span>
      </div>
    </div>
  );
};

export default InterviewTimer;
