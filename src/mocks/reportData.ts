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
        summary:
          '이번 대화는 전반적으로 Neutral 톤에 가까웠으며,\n면접 상황에 비해 개인적인 표현이 비교적 빠르게 등장했습니다.',
      },

      {
        tab: '톤 분석',
        title: '대화 톤은 어땠을까요?',
        tones: [
          {
            label: '나의 대화 톤',
            value: 'Neutral',
          },
          {
            label: '상황에 기대된 톤',
            value: 'Confident',
          },
        ],
      },

      {
        tab: '근거',
        title: '이런 점이 보였어요',
        evidences: [
          '이 상황에서는 의견을 말하기 전 배경 설명이 자주 사용됩니다.',
          '이번 대화에서는 결론 중심의 응답이 많았습니다.',
        ],
      },

      {
        tab: '교정',
        title: '이 문장을 이렇게 말할 수도 있어요',
        corrections: [
          {
            before: 'I think this will work.',
            after: 'From our perspective, this approach could be effective.',
          },
          {
            before:
              'Your background shows a strong fit for user-centered marketing.',
            after:
              'Based on our discussion, your background aligns well with user-centered marketing.',
          },
        ],
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
    {
      id: 5,
      role: 'ai',
      speakerName: 'SpeakOn',
      avatarUrl: AI_AVATAR,
      message: 'That sounds relevant! What made you interested in marketing?',
    },
    {
      id: 6,
      role: 'user',
      speakerName: 'You',
      avatarUrl: USER_AVATAR,
      message:
        'Yes, it helped me understand how to create content from a user-centered perspective, combining clear messaging with thoughtful design.',
    },
  ],
};
