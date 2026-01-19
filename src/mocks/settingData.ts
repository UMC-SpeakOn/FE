import type { AiItem, GoalItem } from '@/types/my-speak/setting.type';

export const aiData: AiItem[] = [
  {
    id: 1,
    name: 'Emily',
    job: '마케팅',
    situation: '1:1 미팅',
    city: '시카고',
    age: 29,
    imageUrl: 'https://i.pravatar.cc/120?img=47',
  },
  {
    id: 2,
    name: 'Paul',
    job: '일반 비즈니스',
    situation: '면접',
    city: '런던',
    age: 41,
    imageUrl: 'https://i.pravatar.cc/120?img=12',
  },
  {
    id: 3,
    name: 'Mina',
    job: '디자이너',
    situation: '피드백',
    city: '서울',
    age: 33,
    imageUrl: 'https://i.pravatar.cc/120?img=32',
  },
  {
    id: 4,
    name: 'Emily',
    job: 'PM',
    situation: '회의',
    city: '토론토',
    age: 27,
    imageUrl: 'https://i.pravatar.cc/120?img=5',
  },
];

export const goalData: GoalItem[] = [
  { id: 1, label: '질문 5개 · 빠르게 연습' },
  { id: 2, label: '질문 10개 · 충분히 연습' },
];
