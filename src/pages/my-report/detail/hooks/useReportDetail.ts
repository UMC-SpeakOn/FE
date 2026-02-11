import { useMemo } from 'react';

import { useQuery } from '@/hooks/useApi';
import type { ReportDetailResult } from '@/types/api/myreport.type';
import type { ServerApiResponse } from '@/types/api/server.type';

import { getOrCreateViewUUID } from '../utils/viewUuid';

export const useReportDetail = (reportId?: number) => {
  const queryConfig = useMemo(() => {
    if (!reportId) return null;

    const viewUUID = getOrCreateViewUUID(`report-${reportId}`);

    return {
      method: 'GET',
      url: `/reports/${reportId}`,
      params: { viewUUID },
    };
  }, [reportId]);

  const { data, isLoading, isError, error, execute } = useQuery<
    ServerApiResponse<ReportDetailResult>
  >(queryConfig ?? { method: 'GET', url: '' }, { enabled: Boolean(reportId) });

  const report = useMemo<ReportDetailResult | null>(() => {
    return data?.result ?? null;
  }, [data]);

  return {
    report,
    isLoading,
    isError,
    error,
    refetch: execute,
  };
};
