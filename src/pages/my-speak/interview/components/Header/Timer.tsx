/**
 * Timer - 면접 경과 시간 타이머
 *
 * @description
 * 면접 세션이 시작된 이후 경과된 시간을 표시하는 컴포넌트입니다.
 * 상단 헤더 우측에 배치되며, 시계 아이콘과 함께 표시됩니다.
 *
 * @features
 * - 경과 시간 표시 (MM:SS 형식)
 * - 반투명 배경 + 블러 효과 (가독성)
 * - Unbounded 폰트 사용 (숫자 가독성)
 * - 상위 컴포넌트로부터 formattedTime을 props로 전달받음
 *
 * @param {TimerProps} props - 컴포넌트 props
 *
 * @related
 * - docs/my-speak.md (섹션 8-4. 세션 내부 최대 시간 15분)
 * - hooks/useInterviewTimer.ts
 */

interface TimerProps {
  /** 포맷된 시간 문자열 (MM:SS) */
  formattedTime: string;
}

const Timer = ({ formattedTime }: TimerProps) => {
  return (
    <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
      {/* 시계 아이콘 */}
      <svg
        className="w-4 h-4 text-green-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      {/* 경과 시간 표시 (MM:SS) */}
      <span className="text-white font-medium text-sm font-unbounded">
        {formattedTime}
      </span>
    </div>
  );
};

export default Timer;
