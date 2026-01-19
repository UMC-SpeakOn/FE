/**
 * SubtitleOverlay - 실시간 자막 오버레이
 *
 * @description
 * 사용자의 음성을 실시간으로 인식하여 텍스트로 변환 후 표시하는 컴포넌트입니다.
 * Web Speech API를 사용하여 STT(Speech-to-Text) 기능을 제공합니다.
 *
 * @features
 * - 실시간 음성 인식 자막 표시
 * - 반투명 배경 + 블러 효과 (가독성)
 * - 하단 중앙 배치
 * - 토글 가능 (ControlBar의 자막 버튼)
 *
 * @todo
 * - Phase 5에서 useSpeechRecognition 훅 연결 예정
 * - Web Speech API 통합
 * - 자막 히스토리 관리 (최근 N개 문장)
 *
 * @related
 * - hooks/useSpeechRecognition.ts (Phase 5에서 구현)
 * - docs/my-speak.md (섹션 6-1. 음성 기반 대화)
 * - docs/issue14-implementation-solution.md (SubtitleOverlay 섹션)
 */
const SubtitleOverlay = () => {
  // TODO: Phase 5에서 useSpeechRecognition 훅 연결
  const subtitle = '여기에 실시간 자막이 표시됩니다...';

  return (
    <div className="flex justify-center">
      {/* 자막 컨테이너 */}
      <div className="max-w-md bg-black/60 backdrop-blur-sm px-4 py-3 rounded-lg">
        {/* 자막 텍스트 */}
        <p className="text-white text-center text-sm leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default SubtitleOverlay;
