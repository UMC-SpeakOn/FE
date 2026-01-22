interface AIInterviewerPIPProps {
  interviewer: {
    imageUrl: string;
    name: string;
  };
  position: 'main' | 'pip';
}

/**
 * AI 면접관 PIP 컴포넌트
 *
 * @description
 * AI 면접관 사진을 표시하는 컴포넌트입니다.
 * position에 따라 전체 화면(main) 또는 작은 PIP(pip)로 표시됩니다.
 *
 * @features
 * - position='main': 전체 화면 표시
 * - position='pip': 좌상단 작은 화면 표시
 * - 스왑 애니메이션 지원 (transition)
 */
const AIInterviewerPIP = ({ interviewer, position }: AIInterviewerPIPProps) => {
  const isPIP = position === 'pip';

  return (
    <div
      className={`
        rounded-2xl overflow-hidden shadow-lg border border-white
        transition-all duration-500 ease-in-out
        ${
          isPIP
            ? 'absolute top-4 left-4 w-45 h-60 z-20'
            : 'absolute inset-0 w-full h-full z-10'
        }
      `}
    >
      <img
        src={interviewer.imageUrl}
        alt={interviewer.name}
        className="w-full h-full object-cover transition-transform duration-500"
      />
    </div>
  );
};

export default AIInterviewerPIP;
