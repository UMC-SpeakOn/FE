import { useMemo, useState } from 'react';

import { myReportData } from '@/mocks/myreportData';

import { JOB_FILTERS, SITUATION_FILTERS } from '../constants/myreport';
import type { ReportGroup, ReportItem, ViewTab } from '../types/myreport.type';
import {
  type DateRange,
  formatRangeLabel,
  isInRange,
  normalize,
} from '../utils/dateRange';

export const useMyReportViewModel = () => {
  const [activeTab, setActiveTab] = useState<ViewTab>('날짜 별');
  const [range, setRange] = useState<DateRange>({});

  const [activeJob, setActiveJob] =
    useState<(typeof JOB_FILTERS)[number]>('마케팅');

  const [activeSituation, setActiveSituation] =
    useState<(typeof SITUATION_FILTERS)[number]>('면접');

  const dateItems: ReportItem[] = useMemo(() => {
    return myReportData.byDate.filter((it) => isInRange(it.date, range));
  }, [range]);

  const situationGroups: ReportGroup[] = useMemo(() => {
    return myReportData.bySituation;
  }, []);

  const activeJobItems: ReportItem[] = useMemo(() => {
    const group = myReportData.byJob.find((g) => g.title === activeJob);
    return group?.items ?? [];
  }, [activeJob]);

  const activeSituationItems: ReportItem[] = useMemo(() => {
    const key = normalize(activeSituation);
    const group = situationGroups.find((g) => normalize(g.title) === key);
    return group?.items ?? [];
  }, [activeSituation, situationGroups]);

  const rangeLabel = useMemo(() => formatRangeLabel(range), [range]);

  return {
    activeTab,
    setActiveTab,
    range,
    setRange,
    activeJob,
    setActiveJob,
    activeSituation,
    setActiveSituation,
    dateItems,
    activeJobItems,
    activeSituationItems,
    rangeLabel,
  };
};
