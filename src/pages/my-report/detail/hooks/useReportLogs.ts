import { useMemo } from 'react';

import { useQuery } from '@/hooks/useApi';
import type { ReportLogsApiResult } from '@/types/api/myreport.type';
import type { ServerApiResponse } from '@/types/api/server.type';

export const useReportLogs = (reportId?: number) => {
  const queryConfig = useMemo(() => {
    if (!reportId) return null;

    return {
      method: 'GET',
      url: `/reports/${reportId}/logs`,
    };
  }, [reportId]);

  const { data, isLoading, isError, error, execute } = useQuery<
    ServerApiResponse<ReportLogsApiResult>
  >(queryConfig ?? { method: 'GET', url: '' }, { enabled: Boolean(reportId) });

  return {
    logs: data?.result.messages ?? [],
    isLoading,
    isError,
    error,
    refetch: execute,
  };
};
