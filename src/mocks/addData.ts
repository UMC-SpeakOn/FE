import type {
  PersonItem,
  JobItem,
  SituationItem,
} from '@/types/my-role/add.type';

// STEP 1: 사람
export const personsData: PersonItem[] = [
  {
    id: 1,
    name: 'Emily',
    city: '시카고',
    age: 29,
    imageUrl: 'https://i.pravatar.cc/120?img=47',
  },
  {
    id: 2,
    name: 'Paul',
    city: '런던',
    age: 41,
    imageUrl: 'https://i.pravatar.cc/120?img=12',
  },
  {
    id: 3,
    name: 'Mina',
    city: '서울',
    age: 33,
    imageUrl: 'https://i.pravatar.cc/120?img=32',
  },
  {
    id: 4,
    name: 'Emily',
    city: '토론토',
    age: 27,
    imageUrl: 'https://i.pravatar.cc/120?img=5',
  },
  {
    id: 5,
    name: 'James',
    city: '뉴욕',
    age: 31,
    imageUrl: 'https://i.pravatar.cc/120?img=22',
  },
];

// STEP 2: 직무
export const jobsData: JobItem[] = [
  { id: 1, label: '마케팅' },
  { id: 2, label: '개발' },
  { id: 3, label: '디자인' },
  { id: 4, label: '기획' },
  { id: 5, label: '영업' },
  { id: 6, label: '일반 비즈니스' },
];

// STEP 3: 상황
export const situationsData: SituationItem[] = [
  { id: 1, label: '면접' },
  { id: 2, label: '회의' },
  { id: 3, label: '1:1미팅' },
  { id: 4, label: '커피챗' },
];
