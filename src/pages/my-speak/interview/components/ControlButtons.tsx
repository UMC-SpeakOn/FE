import cameraIcon from "@/assets/images/icons/camera.svg";
import chatingIcon from "@/assets/images/icons/chating.svg";
import continueIcon from "@/assets/images/icons/continue.svg";
import finishIcon from "@/assets/images/icons/finish.svg";
import stopIcon from "@/assets/images/icons/stop.svg";

import ControlButton from "./Controls/ControlButton";

interface ControlButtonsProps {
  viewMode: "video" | "chat";
  isPaused: boolean;
  isFinishing?: boolean;
  onFinish: () => void;
  onPauseToggle: () => void;
  onToggleMode: () => void;
}

/**
 * ControlButtons - 하단 컨트롤 버튼 3개
 *
 * @description
 * 마무리하기, 일시정지/재개, 모드 전환 버튼을 포함합니다.
 */
const ControlButtons = ({
  viewMode,
  isPaused,
  isFinishing = false,
  onFinish,
  onPauseToggle,
  onToggleMode,
}: ControlButtonsProps) => {
  return (
    <div className="flex items-center justify-between px-13 pt-4">
      <ControlButton
        icon={finishIcon}
        label="마무리하기"
        onClick={onFinish}
        iconSize="w-5 h-5"
        disabled={isFinishing}
      />

      <ControlButton
        icon={isPaused ? continueIcon : stopIcon}
        label={isPaused ? "이어서하기" : "일시멈춤"}
        onClick={onPauseToggle}
      />

      <ControlButton
        icon={viewMode === "video" ? chatingIcon : cameraIcon}
        label={viewMode === "video" ? "채팅" : "카메라"}
        onClick={onToggleMode}
      />
    </div>
  );
};

export default ControlButtons;
