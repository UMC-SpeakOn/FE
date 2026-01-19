/**
 * ControlBar Props 인터페이스
 */
interface ControlBarProps {
  /** 자막 표시 여부 */
  showSubtitles: boolean;
  /** 자막 토글 핸들러 */
  onToggleSubtitles: () => void;
  /** 일시정지 상태 */
  isPaused: boolean;
  /** 일시정지/재개 핸들러 */
  onPause: () => void;
  /** 면접 마무리 핸들러 */
  onFinish: () => void;
}

/**
 * ControlBar - 하단 컨트롤 바
 *
 * @description
 * 면접 세션 중 사용자가 사용할 수 있는 주요 컨트롤을 제공하는 하단 바입니다.
 * 반투명 그라데이션 배경으로 비디오 위에 오버레이됩니다.
 *
 * @features
 * - 마무리 버튼: 세션 종료 (AI 마무리 멘트 후 종료)
 * - 일시정지/재개 버튼: 세션 일시 중지 및 재개
 * - 자막 토글: 실시간 자막 표시/숨김
 * - 채팅 버튼: 면접관과 텍스트 채팅 (추후 구현)
 *
 * @param {ControlBarProps} props - 컴포넌트 props
 *
 * @related
 * - docs/my-speak.md (섹션 6-3. UI 요소, 섹션 8. 대화 종료 기준)
 * - docs/issue14-implementation-solution.md (ControlBar 섹션)
 */
const ControlBar = ({
  showSubtitles,
  onToggleSubtitles,
  isPaused,
  onPause,
  onFinish,
}: ControlBarProps) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-4 z-10">
      <div className="flex items-center justify-around">
        {/* 마무리 버튼 - 세션 종료 */}
        <button
          onClick={onFinish}
          className="flex flex-col items-center gap-1 text-white hover:text-red-400 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <span className="text-xs">마무리</span>
        </button>

        {/* 일시정지/재개 버튼 */}
        <button
          onClick={onPause}
          className="flex flex-col items-center gap-1 text-white hover:text-purple-400 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            {isPaused ? (
              // 재개 아이콘 (재생 버튼)
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              // 일시정지 아이콘
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            )}
          </div>
          <span className="text-xs">{isPaused ? '재개' : '일시정지'}</span>
        </button>

        {/* 자막 토글 버튼 - CC (Closed Caption) */}
        <button
          onClick={onToggleSubtitles}
          className={`flex flex-col items-center gap-1 transition-colors ${
            showSubtitles
              ? 'text-green-500 hover:text-green-400' // 자막 ON: 녹색
              : 'text-white hover:text-gray-400' // 자막 OFF: 흰색
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
          </div>
          <span className="text-xs">자막</span>
        </button>

        {/* 채팅 버튼 - TODO: 채팅 모달 구현 */}
        <button className="flex flex-col items-center gap-1 text-white hover:text-purple-400 transition-colors">
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <span className="text-xs">채팅</span>
        </button>
      </div>
    </div>
  );
};

export default ControlBar;
