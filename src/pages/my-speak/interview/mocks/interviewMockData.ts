/**
 * Interview 더미 데이터
 *
 * @description
 * 개발 및 테스트를 위한 면접 세션 더미 데이터입니다.
 * 실제 API 연동 시 이 파일의 데이터를 API 응답으로 교체하면 됩니다.
 */

/**
 * 면접 세션 정보 타입
 */
export interface InterviewSession {
  /** 세션 ID */
  sessionId: string;
  /** 현재 질문 번호 (1부터 시작) */
  currentQuestion: number;
  /** 전체 질문 개수 */
  totalQuestions: number;
  /** 면접관 정보 */
  interviewer: {
    name: string;
    avatarUrl?: string;
    role: string;
  };
}

/**
 * 질문 데이터 타입
 */
export interface Question {
  /** 질문 ID */
  id: string;
  /** 질문 유형 (main: 메인 질문, follow-up: 꼬리 질문) */
  type: 'main' | 'follow-up';
  /** 질문 텍스트 */
  text: string;
  /** 질문 순서 */
  order: number;
}

/**
 * 더미 면접 세션 데이터
 */
export const mockInterviewSession: InterviewSession = {
  sessionId: 'session-001',
  currentQuestion: 1,
  totalQuestions: 5,
  interviewer: {
    name: 'AI 면접관',
    role: '기술 면접관',
    // avatarUrl: '/images/interviewer-avatar.png', // 실제 이미지 경로로 교체
  },
};

/**
 * 더미 질문 목록
 */
export const mockQuestions: Question[] = [
  {
    id: 'q1',
    type: 'main',
    text: '자기소개를 부탁드립니다.',
    order: 1,
  },
  {
    id: 'q2',
    type: 'main',
    text: '본인의 강점과 약점에 대해 말씀해주세요.',
    order: 2,
  },
  {
    id: 'q3',
    type: 'main',
    text: '가장 도전적이었던 프로젝트 경험을 공유해주세요.',
    order: 3,
  },
  {
    id: 'q4',
    type: 'main',
    text: '팀워크에서 갈등 상황을 어떻게 해결하셨나요?',
    order: 4,
  },
  {
    id: 'q5',
    type: 'main',
    text: '5년 후 본인의 모습은 어떨 것 같나요?',
    order: 5,
  },
];

/**
 * 더미 자막 데이터
 * (실제로는 Web Speech API에서 실시간으로 생성)
 */
export const mockSubtitles = [
  '안녕하세요, 저는...',
  '제 강점은 문제 해결 능력입니다.',
  '그 프로젝트에서 가장 어려웠던 점은...',
];

/**
 * API 응답 시뮬레이션 헬퍼 함수
 */

/**
 * 세션 시작 시뮬레이션
 * @returns Promise<InterviewSession>
 */
export const fetchInterviewSession = async (): Promise<InterviewSession> => {
  // 실제 API 호출로 교체
  // return await api.post('/interview/start', { presetId, questionCount });

  // 더미 데이터 반환 (200ms 딜레이)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockInterviewSession);
    }, 200);
  });
};

/**
 * 질문 목록 가져오기
 * @param sessionId - 세션 ID
 * @returns Promise<Question[]>
 */
export const fetchQuestions = async (
  sessionId: string,
): Promise<Question[]> => {
  // 실제 API 호출로 교체
  // return await api.get(`/interview/${sessionId}/questions`);

  // 더미 데이터 반환 (200ms 딜레이)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockQuestions);
    }, 200);
  });
};

/**
 * 다음 질문 가져오기
 * @param sessionId - 세션 ID
 * @param currentQuestionId - 현재 질문 ID
 * @returns Promise<Question | null>
 */
export const fetchNextQuestion = async (
  sessionId: string,
  currentQuestionId: string,
): Promise<Question | null> => {
  // 실제 API 호출로 교체
  // return await api.get(`/interview/${sessionId}/next-question`);

  // 더미 데이터 반환
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentIndex = mockQuestions.findIndex(
        (q) => q.id === currentQuestionId,
      );
      const nextQuestion = mockQuestions[currentIndex + 1] || null;
      resolve(nextQuestion);
    }, 200);
  });
};
