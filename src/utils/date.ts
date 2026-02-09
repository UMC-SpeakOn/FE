export const formatDate = (iso?: string | null): string => {
  if (!iso) return '-';

  return new Date(iso).toLocaleDateString('ko-KR');
};

export const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};
