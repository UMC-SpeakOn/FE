export interface ReportLogResult {
  messageId: number;
  senderRole: 'AI' | 'USER';
  content: string;
  audioUrl?: string;
  createdAt: string;
}

// 리포트 상세 조회 응답
export interface ReportDetailResult {
  reportId: number;

  sessionSummary: {
    avatarName: string;
    avatarImgUrl: string;
    job: string;
    situation: string;
    totalTime: string;
    sentenceCount: number;
    difficulty: number;
    createdAt: string;
  };

  aiInsightCard: {
    aiSummary: string;

    toneAnalysis: {
      userTone: string;
      expectedTone: string;
    };

    aiReason: string[];

    corrections: {
      original: string;
      corrected: string;
      reason: string;
    }[];
  };

  userReflection: string;

  conversationLog: ReportLogResult[];
}

export interface ReportLogResult {
  messageId: number;
  senderRole: 'AI' | 'USER';
  content: string;
  audioUrl?: string;
  createdAt: string;
}

// 대화 로그 상세 조회 응답
export interface ReportLogsApiResult {
  reportId: number;
  totalMessageCount: number;
  messages: ReportLogResult[];
}
