export const JOB_FILTERS = [
  '마케팅',
  '개발',
  '디자인',
  '영업',
  '기획',
  '일반 비즈니스',
] as const;

export const SITUATION_FILTERS = ['면접', '1:1 미팅', '회의'] as const;

export const SITUATION_COLORS: Record<
  (typeof SITUATION_FILTERS)[number],
  string
> = {
  면접: '#FF1BB7',
  '1:1 미팅': '#FF3535',
  회의: '#0A9A00',
};
