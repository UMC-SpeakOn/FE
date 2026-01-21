import type { FinishStep } from "../types/finish.type";
import InterviewTimer from "./VideoSection/InterviewTimer";
import NotificationOverlay from "./NotificationOverlay";
import SubtitleOverlay from "./VideoSection/SubtitleOverlay";
import UserVideoStream from "./VideoSection/UserVideoStream";

interface VideoModeContentProps {
  interviewer: {
    imageUrl: string;
    name: string;
    city: string;
  };
  formattedTime: string;
  showSubtitles: boolean;
  onToggleSubtitles: () => void;
  onRestart: () => void;
  isPaused: boolean;
  finishStep: FinishStep;
}

/**
 * VideoModeContent - 영상 모드 컨텐츠
 *
 * @description
 * 영상 모드에서 표시되는 웹캠, AI 면접관 PIP, 타이머, 자막 등을 포함합니다.
 */
const VideoModeContent = ({
  interviewer,
  formattedTime,
  showSubtitles,
  onToggleSubtitles,
  onRestart,
  isPaused,
  finishStep,
}: VideoModeContentProps) => {
  return (
    <div className="relative h-[48vh] bg-white rounded-2xl overflow-hidden border border-white">
      {/* 사용자 웹캠 */}
      <UserVideoStream />

      {/* AI 면접관 PIP */}
      <div className="absolute top-4 left-4 w-45 h-60 rounded-2xl overflow-hidden shadow-lg border border-white">
        <img
          src={interviewer.imageUrl}
          alt={interviewer.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 타이머 + CC 버튼 */}
      <InterviewTimer
        formattedTime={formattedTime}
        showSubtitles={showSubtitles}
        onToggleSubtitles={onToggleSubtitles}
        onRestart={onRestart}
        variant="video"
      />

      {/* 일시정지 오버레이 */}
      {isPaused && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
          <p className="text-white text-2xl font-bold">
            학습을 잠시 멈췄습니다
          </p>
        </div>
      )}

      {/* Step 1: 알림 오버레이 (부분 화면) */}
      {finishStep === "notification" && <NotificationOverlay />}

      {/* 자막 오버레이 */}
      {showSubtitles && !isPaused && finishStep === "idle" && (
        <div className="absolute bottom-0 left-0 right-0">
          <SubtitleOverlay />
        </div>
      )}
    </div>
  );
};

export default VideoModeContent;
