export const formatDate = (iso?: string | null): string => {
  if (!iso) return '-';

  return new Date(iso).toLocaleDateString('ko-KR');
};
