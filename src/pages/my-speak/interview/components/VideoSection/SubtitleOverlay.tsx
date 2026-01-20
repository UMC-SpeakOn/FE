interface SubtitleOverlayProps {
  text?: string;
  isVisible?: boolean;
}

/**
 * SubtitleOverlay - 면접관 질문/AI 응답 자막 오버레이
 *
 * @description
 * 비디오 하단에 보라색 배경 바 형태로 면접관의 질문이나 AI 응답을 표시합니다.
 * Figma 디자인에 따라 반투명 보라색 배경에 흰색 텍스트를 표시합니다.
 *
 * @features
 * - 면접관 질문 표시
 * - AI 응답 표시 (선택 사항)
 * - 보라색 반투명 배경 바
 * - 중앙 정렬 텍스트
 *
 * @related
 * - Figma: figma/200 PWA_My Speak (1).png, (3).png, (4).png
 * - docs/my-speak.md (섹션 6. In-session Experience)
 */
const SubtitleOverlay = ({ text, isVisible = true }: SubtitleOverlayProps) => {
  // 기본 자막 텍스트
  const defaultSubtitle =
    'Thank you for coming in today.\nCould you start by telling me a bit about yourself?';

  if (!isVisible) return null;

  return (
    <div className="w-full  px-4 py-3 h-28 bg-gradient-to-b from-neutral-900/0 to-neutral-900 rounded-bl-[10px] rounded-br-[10px]">
      {/* 자막 텍스트 */}
      <p className="text-white text-center text-xl leading-relaxed whitespace-pre-line">
        {text || defaultSubtitle}
      </p>
    </div>
  );
};

export default SubtitleOverlay;
