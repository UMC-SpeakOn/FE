import { useMemo } from 'react';

import { useQuery } from '@/hooks/useApi';
import type { ReportDetailResult } from '@/types/api/myreport.type';
import type { ServerApiResponse } from '@/types/api/server.type';

export const useReportDetail = (reportId?: number) => {
  const queryConfig = useMemo(() => {
    if (!reportId) return null;

    return {
      method: 'GET',
      url: `/reports/${reportId}`,
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
