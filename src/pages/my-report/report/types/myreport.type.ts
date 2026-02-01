export type ViewTab = '날짜 별' | '직무 별' | '상황 별';

export type ReportItem = {
  id: string;
  date: string;
  dateText: string;
  job: string;
  situation: string;
  title: string;
  summary: string;
};

export type ReportGroup = {
  id: string;
  title: string;
  items: ReportItem[];
};
