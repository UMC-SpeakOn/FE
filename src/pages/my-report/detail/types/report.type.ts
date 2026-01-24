export type ChatRole = 'ai' | 'user';

export type ReportMeta = {
  time: string;
  sentenceCount: string;
  difficulty: number;
  review: string;
};

export type InsightTab = '핵심요약' | '톤 분석' | '근거' | '교정';

export type InsightItem = {
  tab: InsightTab;
  title: string;
  content: string;
};

export type InsightCard = {
  tabs: InsightTab[];
  items: InsightItem[];
};

export type ChatLog = {
  id: number;
  role: ChatRole;
  speakerName: string;
  avatarUrl: string;
  message: string;
};

export type ReportData = {
  interviewTitle: string;
  meta: ReportMeta;
  insightCard: InsightCard;
  chatLogs: ChatLog[];
};
