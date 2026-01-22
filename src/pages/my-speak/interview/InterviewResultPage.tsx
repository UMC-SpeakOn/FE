import useNavigation from "@/hooks/useNavigation";

/**
 * InterviewResultPage - 면접 결과 페이지 (임시)
 *
 * @description
 * 면접 종료 후 표시되는 결과 페이지입니다.
 * 현재는 임시 페이지로, 추후 실제 결과 분석 UI를 구현할 예정입니다.
 *
 * @todo
 * - 면접 점수 표시
 * - 답변 분석 결과
 * - 개선 사항 피드백
 * - 다시 보기 기능
 */
const InterviewResultPage = () => {
  const { navigateTo } = useNavigation();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-purple-500 px-6">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          면접이 완료되었습니다!
        </h1>

        <p className="text-gray-600 mb-8">
          결과 페이지는 현재 개발 중입니다.
          <br />곧 상세한 분석 결과를 제공할 예정입니다.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigateTo("/my-speak")}
            className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            메인으로 돌아가기
          </button>

          <button
            onClick={() => navigateTo("/my-speak/interview")}
            className="w-full px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors"
          >
            다시 연습하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewResultPage;
