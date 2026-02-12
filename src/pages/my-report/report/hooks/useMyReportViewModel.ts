import { useMemo, useState } from 'react';

import { useQuery } from '@/hooks/useApi';

import { JOB_FILTERS, SITUATION_FILTERS } from '../constants/myreport';
import type { ReportItem, ViewTab } from '../types/myreport.type';
import { type DateRange, formatRangeLabel } from '../utils/dateRange';

type ReportListItemDto = {
  reportId: number;
  job: string;
  situation: string;
  userReflection: string;
  createdAt: string;
  difficulty: number;
  // 인서 추가
  avatarImgUrl: string;
};

type ReportListResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: {
    reportList: ReportListItemDto[];
    listSize: number;
    totalPage: number;
    totalElements: number;
    isFirst: boolean;
    isLast: boolean;
  };
};

const JOB_TO_API: Record<(typeof JOB_FILTERS)[number], string> = {
  마케팅: 'MARKETING',
  개발: 'DEVELOPMENT',
  디자인: 'DESIGN',
  기획: 'PLANNING',
  영업: 'SALES',
  '일반 비즈니스': 'BUSINESS',
};

// 인서 수정
const API_TO_JOB: Record<string, (typeof JOB_FILTERS)[number]> = {
  마케팅: '마케팅',
  개발: '개발',
  디자인: '디자인',
  기획: '기획',
  영업: '영업',
  '일반 비지니스': '일반 비즈니스',
};

const SITUATION_TO_API: Record<(typeof SITUATION_FILTERS)[number], string> = {
  면접: 'INTERVIEW',
  회의: 'MEETING',
  '1:1 미팅': 'ONE_ON_ONE_MEETING',
};

// 인서 수정
const API_TO_SITUATION: Record<string, (typeof SITUATION_FILTERS)[number]> = {
  면접: '면접',
  회의: '회의',
  '1:1미팅': '1:1 미팅',
};

const DAY_KO = ['일', '월', '화', '수', '목', '금', '토'] as const;

const toDateText = (dateISO: string) => {
  const d = new Date(dateISO);
  const day = DAY_KO[d.getDay()] ?? '';
  return `${dateISO.replaceAll('-', '/')} (${day})`;
};

const toReportItem = (dto: ReportListItemDto): ReportItem => {
  const job = API_TO_JOB[dto.job] ?? '일반 비즈니스';
  const situation = API_TO_SITUATION[dto.situation] ?? '회의';

  return {
    id: String(dto.reportId),
    date: dto.createdAt,
    dateText: toDateText(dto.createdAt),
    job,
    situation,
    title: `${job} 직무 ${situation}`,
    summary: dto.userReflection,
    // 인서 추가
    avatarImgUrl: dto.avatarImgUrl,
  };
};

export const useMyReportViewModel = () => {
  const [activeTab, setActiveTab] = useState<ViewTab>('날짜 별');
  const [range, setRange] = useState<DateRange>({});

  const [activeJob, setActiveJob] =
    useState<(typeof JOB_FILTERS)[number]>('마케팅');

  const [activeSituation, setActiveSituation] =
    useState<(typeof SITUATION_FILTERS)[number]>('면접');

  const params = useMemo(() => {
    const base: Record<string, string | number | undefined> = {
      page: 0,
      size: 50,
    };

    if (activeTab === '직무 별') {
      base.job = JOB_TO_API[activeJob];
    }

    if (activeTab === '상황 별') {
      base.situation = SITUATION_TO_API[activeSituation];
    }

    if (activeTab === '날짜 별') {
      if (range.start) base.startDate = range.start;
      if (range.end) base.endDate = range.end;
    }

    return base;
  }, [activeJob, activeSituation, activeTab, range.start, range.end]);

  const queryConfig = useMemo(
    () => ({
      method: 'GET' as const,
      url: '/reports',
      params,
    }),
    [params],
  );

  const { data, isLoading, error } = useQuery<ReportListResponse>(queryConfig);

  const items = useMemo((): ReportItem[] => {
    const list = data?.result?.reportList ?? [];

    return list
      .map(toReportItem)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [data]);

  const rangeLabel = useMemo(() => formatRangeLabel(range), [range]);

  return {
    activeTab,
    setActiveTab,
    range,
    setRange,
    rangeLabel,

    activeJob,
    setActiveJob,

    activeSituation,
    setActiveSituation,

    dateItems: items,
    activeJobItems: items,
    activeSituationItems: items,

    isLoading,
    error,
  };
};
