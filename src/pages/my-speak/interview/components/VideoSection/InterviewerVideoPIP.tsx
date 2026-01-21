/**
 * InterviewerVideoPIP - AI 면접관 이미지 Picture-in-Picture
 *
 * @description
 * AI 면접관의 이미지를 PIP 형태로 표시하는 컴포넌트입니다.
 * Figma 디자인에 따라 왼쪽 상단에 작은 오버레이로 배치됩니다.
 * 비디오가 아닌 정적 이미지로 표시됩니다.
 *
 * @features
 * - 작은 크기 (w-16 h-20, 약 64x80px)
 * - 라운드 모서리
 * - object-cover로 비율 유지
 * - 플레이스홀더 이미지 표시
 *
 * @todo
 * - AI 면접관 실제 프로필 이미지 연동
 * - 세션 데이터에서 면접관 이미지 URL 가져오기
 *
 * @related
 * - Figma: figma/200 PWA_My Speak.png (왼쪽 상단 PIP)
 * - docs/my-speak.md (섹션 6-3. UI 요소 - AI 상대방 화면)
 */
const InterviewerVideoPIP = () => {
  // TODO: 세션 데이터에서 면접관 이미지 URL 가져오기
  // const { session } = useInterviewSession();
  // const interviewerImage = session?.interviewer.avatarUrl;

  return (
    <div className="w-full h-full">
      {/* 면접관 이미지 (플레이스홀더) */}
      <img
        src="https://via.placeholder.com/64x80/6366f1/ffffff?text=AI"
        alt="AI 면접관"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default InterviewerVideoPIP;
