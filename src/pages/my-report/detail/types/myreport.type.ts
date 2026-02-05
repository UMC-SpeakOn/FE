// InsightTab UI
export type InsightTab = '핵심요약' | '톤 분석' | '근거' | '교정';

export type SummaryInsightItem = {
  tab: '핵심요약';
  title: string;
  summary: string;
};

export type ToneAnalysisInsightItem = {
  tab: '톤 분석';
  title: string;
  tones: {
    label: string;
    value: string;
  }[];
};

export type EvidenceInsightItem = {
  tab: '근거';
  title: string;
  evidences: string[];
};

export type CorrectionInsightItem = {
  tab: '교정';
  title: string;
  corrections: {
    before: string;
    after: string;
  }[];
};

export type InsightItem =
  | SummaryInsightItem
  | ToneAnalysisInsightItem
  | EvidenceInsightItem
  | CorrectionInsightItem;

export type InsightCard = {
  tabs: InsightTab[];
  items: InsightItem[];
};

// ChatLog UI
export interface ChatLog {
  id: number;
  role: string;
  speakerName: string;
  avatarUrl: string;
  message: string;
}
