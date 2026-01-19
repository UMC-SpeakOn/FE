/**
 * InterviewerVideoPIP - AI 면접관 영상 Picture-in-Picture
 *
 * @description
 * AI 면접관의 영상 또는 아바타를 PIP 형태로 표시하는 컴포넌트입니다.
 * 사용자 웹캠 화면 위에 우측 하단에 오버레이 형태로 배치됩니다.
 *
 * @features
 * - 120x160px 고정 크기 (모바일 최적화)
 * - 보라색 테두리로 강조
 * - shadow-modal 효과로 입체감 부여
 * - 현재는 플레이스홀더 아바타 표시
 *
 * @todo
 * - AI 면접관 실제 영상/이미지 연동
 * - Draggable 기능 추가 (선택적)
 * - 음소거/볼륨 컨트롤 추가
 *
 * @related
 * - docs/my-speak.md (섹션 6-3. UI 요소 - AI 상대방 화면)
 * - docs/issue14-implementation-solution.md (InterviewerVideoPIP 섹션)
 */
const InterviewerVideoPIP = () => {
  // TODO: 실제 면접관 비디오 또는 아바타 이미지 연동

  return (
    <div className="w-[120px] h-[160px] rounded-lg overflow-hidden shadow-modal bg-gray-800 border-2 border-purple-500">
      <div className="w-full h-full flex items-center justify-center">
        {/* 플레이스홀더 아바타 (실제 AI 영상으로 교체 예정) */}
        <div className="text-center">
          {/* 사용자 아이콘 */}
          <div className="w-16 h-16 mx-auto rounded-full bg-purple-600 flex items-center justify-center mb-2">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <p className="text-xs text-white">면접관</p>
        </div>
      </div>
    </div>
  );
};

export default InterviewerVideoPIP;
