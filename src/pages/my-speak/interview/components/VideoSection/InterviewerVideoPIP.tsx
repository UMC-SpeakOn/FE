/**
 * InterviewerVideoPIP - AI 면접관 영상 Picture-in-Picture
 *
 * @description
 * AI 면접관의 영상 또는 아바타를 PIP 형태로 표시하는 컴포넌트입니다.
 * Figma 디자인에 따라 왼쪽 상단에 작은 오버레이로 배치됩니다.
 *
 * @features
 * - 작은 크기 (w-20 h-28, 약 80x112px)
 * - 라운드 모서리
 * - shadow 효과로 입체감
 * - 플레이스홀더 아바타 표시
 *
 * @todo
 * - AI 면접관 실제 영상/이미지 연동
 * - 음소거/볼륨 컨트롤 추가
 *
 * @related
 * - Figma: figma/200 PWA_My Speak.png (왼쪽 상단 PIP)
 * - docs/my-speak.md (섹션 6-3. UI 요소 - AI 상대방 화면)
 */
const InterviewerVideoPIP = () => {
  // TODO: 실제 면접관 비디오 또는 아바타 이미지 연동

  return (
    <div className="w-full h-full rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
      {/* 플레이스홀더 아바타 (실제 AI 영상으로 교체 예정) */}
      <div className="text-center">
        {/* 사용자 아이콘 */}
        <div className="w-12 h-12 mx-auto rounded-full bg-purple-600 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
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
      </div>
    </div>
  );
};

export default InterviewerVideoPIP;
