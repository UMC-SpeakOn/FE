export type DateRange = {
  start?: string; // YYYY-MM-DD
  end?: string; // YYYY-MM-DD
};

export const isInRange = (dateISO: string, range: DateRange) => {
  if (!range.start || !range.end) return true;

  const d = new Date(dateISO).getTime();
  const s = new Date(range.start).getTime();
  const e = new Date(range.end).getTime();

  return d >= s && d <= e;
};

export const formatRangeLabel = (range: DateRange) => {
  if (!range.start || !range.end) return undefined;

  const s = range.start.replaceAll('-', '/');
  const e = range.end.replaceAll('-', '/');

  return `${s} → ${e}`;
};

export const normalize = (v: string) => v.replaceAll(' ', '');
