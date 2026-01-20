import speakIcon from "@/assets/images/icons/speak.svg";

import SoundWaveAnimation from "./Controls/SoundWaveAnimation";

interface SpeakButtonProps {
  speakState: "ready" | "speaking" | "done";
  audioLevel: number;
  isPaused: boolean;
  onClick: () => void;
}

/**
 * SpeakButton - 말하기 버튼 컴포넌트
 *
 * @description
 * 말하기 상태에 따라 다른 UI를 표시합니다.
 * - ready/done: 말하기 버튼 + 텍스트
 * - speaking: 사운드 웨이브 애니메이션
 */
const SpeakButton = ({
  speakState,
  audioLevel,
  isPaused,
  onClick,
}: SpeakButtonProps) => {
  return (
    <div className="flex items-center justify-center py-4">
      <button
        onClick={onClick}
        className="w-full h-21 bg-purple-600 hover:bg-purple-700 rounded-[10px] inline-flex justify-center items-center gap-2 transition-colors"
        disabled={isPaused}
      >
        {speakState === "speaking" ? (
          <SoundWaveAnimation isActive={audioLevel > 10} />
        ) : (
          <>
            <img src={speakIcon} alt="말하기" />
            <span className="text-white text-xl font-semibold">말하기</span>
          </>
        )}
      </button>
    </div>
  );
};

export default SpeakButton;
