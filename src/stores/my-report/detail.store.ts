import { create } from 'zustand';

import type { ReportDetailResult } from '@/types/api/myreport.type';

interface ReportDetailState {
  report: ReportDetailResult | null;
  setReport: (report: ReportDetailResult) => void;
  reset: () => void;
}

export const useReportDetailStore = create<ReportDetailState>((set) => ({
  report: null,
  setReport: (report) =>
    set((state) =>
      state.report?.reportId === report.reportId ? state : { report },
    ),
  reset: () => set({ report: null }),
}));
