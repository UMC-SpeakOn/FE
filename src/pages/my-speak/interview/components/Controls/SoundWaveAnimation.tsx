/**
 * SoundWaveAnimation - 음성 입력 시각화 애니메이션
 *
 * @description
 * 사용자가 말하는 중일 때 표시되는 파형 애니메이션 컴포넌트입니다.
 * 5개의 막대가 다른 타이밍으로 움직이며 음파 효과를 표현합니다.
 *
 * @features
 * - Pure CSS 애니메이션 (SVG 불필요)
 * - 5개 막대의 비동기 애니메이션
 * - 흰색 배경에 최적화된 디자인
 */
interface SoundWaveAnimationProps {
  isActive?: boolean;
}

const SoundWaveAnimation = ({ isActive = true }: SoundWaveAnimationProps) => {
  // 15개의 막대를 생성
  const bars = Array.from({ length: 15 }, (_, i) => i);

  return (
    <div className="flex items-center justify-center gap-[2px] h-8">
      {bars.map((i) => (
        <div
          key={i}
          className={`w-[3px] bg-white rounded-full ${isActive ? 'animate-wave' : ''}`}
          style={{
            // 중앙(7번 인덱스)에 가까울수록 기본 높이가 큼
            height: isActive
              ? `${Math.max(8, 24 - Math.abs(7 - i) * 2)}px`
              : '4px', // 비활성 시 작은 점으로 표시
            // 애니메이션 딜레이를 인덱스 기반으로 주어 자연스러운 파동 효과 연출
            animationDelay: `${(i * 0.05) % 0.5}s`,
            opacity: isActive ? 0.8 : 0.4,
            transition: 'all 0.3s ease', // 부드러운 전환 추가
          }}
        />
      ))}
    </div>
  );
};

export default SoundWaveAnimation;
