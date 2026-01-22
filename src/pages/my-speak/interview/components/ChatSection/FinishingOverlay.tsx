import navIcon from "@/assets/images/icons/nav.svg";

interface FinishingOverlayProps {
  isOpen: boolean;
}

/**
 * FinishingOverlay - 면접 마무리 로딩 오버레이
 *
 * @description
 * 면접 마무리 후 결과 페이지로 이동하기 전에 표시되는 로딩 화면입니다.
 * nav.svg 아이콘이 회전하며 분석 중임을 나타냅니다.
 *
 * @features
 * - nav.svg 회전 애니메이션
 * - 분석 중 메시지 표시
 * - 전체 화면 반투명 배경
 */
const FinishingOverlay = ({ isOpen }: FinishingOverlayProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center z-50">
      {/* nav.svg 회전 애니메이션 */}
      <img src={navIcon} alt="로딩 중" className="w-16 h-16 animate-spin" />

      {/* 분석 중 메시지 */}
      <p className="text-white text-xl mt-6">결과를 분석하고 있습니다...</p>
    </div>
  );
};

export default FinishingOverlay;
