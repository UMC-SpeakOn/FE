import Timer from './Timer';

/**
 * InterviewHeader - 학습 화면 상단 헤더
 *
 * @description
 * 면접 진행 중 상단에 고정 배치되는 헤더 컴포넌트입니다.
 * 현재 질문 진행 상황, 세션 상태, 타이머를 표시합니다.
 *
 * @features
 * - 질문 번호 / 전체 질문 수 표시 (예: "질문 1 / 5")
 * - 세션 상태 표시 (면접 진행 중, 일시정지 등)
 * - 경과 시간 타이머 (Timer 컴포넌트)
 * - 반투명 그라데이션 배경 (비디오 위 가독성 확보)
 *
 * @related
 * - docs/my-speak.md (섹션 6-3. UI 요소)
 * - docs/issue14-implementation-solution.md (Header 섹션)
 */
const InterviewHeader = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/60 to-transparent px-4 py-4">
      <div className="flex items-center justify-between text-white">
        {/* 질문 진행 상황 정보 */}
        <div className="flex flex-col">
          {/* TODO: 실제 질문 번호와 전체 개수를 상태에서 가져오기 */}
          <span className="text-sm text-gray-300">질문 1 / 5</span>
          <span className="text-xs text-gray-400 mt-1">면접 진행 중</span>
        </div>

        {/* 타이머 컴포넌트 */}
        <Timer />
      </div>
    </header>
  );
};

export default InterviewHeader;
