import type {
  JobItem,
  PersonItem,
  SituationItem,
} from '@/pages/my-role/types/add.type';

// STEP 1: 사람
export const personsData: PersonItem[] = [
  {
    id: 1,
    name: 'Emily',
    nationality: '시카고',
    age: 29,
    imgUrl: 'https://i.pravatar.cc/120?img=47',
  },
  {
    id: 2,
    name: 'Paul',
    nationality: '런던',
    age: 41,
    imgUrl: 'https://i.pravatar.cc/120?img=12',
  },
  {
    id: 3,
    name: 'Mina',
    nationality: '서울',
    age: 33,
    imgUrl: 'https://i.pravatar.cc/120?img=32',
  },
  {
    id: 4,
    name: 'Emily',
    nationality: '토론토',
    age: 27,
    imgUrl: 'https://i.pravatar.cc/120?img=5',
  },
  {
    id: 5,
    name: 'James',
    nationality: '뉴욕',
    age: 31,
    imgUrl: 'https://i.pravatar.cc/120?img=22',
  },
];

// STEP 2: 직무
export const jobsData: JobItem[] = [
  { id: 1, label: '마케팅', value: 'MARKETING' },
  { id: 2, label: '개발', value: 'DEVELOPMENT' },
  { id: 3, label: '디자인', value: 'DESIGN' },
  { id: 4, label: '기획', value: 'PLANNING' },
  { id: 5, label: '영업', value: 'SALES' },
  { id: 6, label: '일반 비즈니스', value: 'BUSINESS' },
];

// STEP 3: 상황
export const situationsData: SituationItem[] = [
  { id: 1, label: '면접', value: 'INTERVIEW' },
  { id: 2, label: '회의', value: 'MEETING' },
  { id: 3, label: '1:1미팅', value: 'ONE_ON_ONE_MEETING' },
];
