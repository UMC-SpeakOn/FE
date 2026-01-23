import type { ReportData } from '@/pages/my-report/detail/types/report.type';

const AI_AVATAR = 'https://placehold.co/64x64/png?text=AI';
const USER_AVATAR = 'https://placehold.co/64x64/png?text=ME';

export const reportData: ReportData = {
  interviewTitle: '마케팅 직무 면접',

  meta: {
    time: '15:31',
    sentenceCount: '12문장',
    difficulty: 3,
    review: '첫 모의 면접이라 너무 긴장했다.',
  },

  insightCard: {
    tabs: ['핵심요약', '톤 분석', '근거', '교정'],
    items: [
      {
        tab: '핵심요약',
        title: 'Summary On',
        content:
          '이번 대화는 전반적으로 Neutral 톤에 가까웠으며, 면접 상황에 비해 개인적인 표현이 비교적 빠르게 등장했습니다.',
      },
      {
        tab: '톤 분석',
        title: 'Tone Analysis',
        content:
          '전체적으로 차분한 톤이었으나, 일부 문장에서 확신이 낮은 표현이 반복되었습니다.',
      },
      {
        tab: '근거',
        title: 'Evidence',
        content:
          '"I think maybe..." / "I’m not sure" 표현이 반복되어 자신감이 낮게 전달될 수 있습니다.',
      },
      {
        tab: '교정',
        title: 'Correction',
        content:
          '"I think maybe" → "I believe"\n"I’m not sure" → "Let me clarify"\n\n확신형 문장으로 교정해보세요.',
      },
    ],
  },

  chatLogs: [
    {
      id: 1,
      role: 'ai',
      speakerName: 'SpeakOn',
      avatarUrl: AI_AVATAR,
      message:
        'Thank you for coming in today. Could you start by telling me a bit about yourself?',
    },
    {
      id: 2,
      role: 'user',
      speakerName: 'You',
      avatarUrl: USER_AVATAR,
      message:
        "Sure. I majored in English with a minor in Media Design, and I'm particularly interested in marketing focused on user experience and content.",
    },
    {
      id: 3,
      role: 'ai',
      speakerName: 'SpeakOn',
      avatarUrl: AI_AVATAR,
      message: 'That sounds relevant! What made you interested in marketing?',
    },
    {
      id: 4,
      role: 'user',
      speakerName: 'You',
      avatarUrl: USER_AVATAR,
      message:
        'Yes, it helped me understand how to create content from a user-centered perspective, combining clear messaging with thoughtful design.',
    },
  ],
};
