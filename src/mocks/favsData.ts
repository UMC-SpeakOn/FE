import type { FavItem } from '@/types/my-role/favs';

const favsData: FavItem[] = [
  {
    id: 1,
    name: 'Emily',
    job: '마케팅',
    situation: '1:1 미팅',
    city: '시카고',
    age: 29,
  },
  {
    id: 2,
    name: 'Paul',
    job: '일반 비즈니스',
    situation: '면접',
    city: '런던',
    age: 41,
  },
  {
    id: 3,
    name: 'Mina',
    job: '디자이너',
    situation: '피드백',
    city: '서울',
    age: 33,
  },
  {
    id: 4,
    name: 'Emily',
    job: 'PM',
    situation: '회의',
    city: '토론토',
    age: 27,
  },
];

export default favsData;
