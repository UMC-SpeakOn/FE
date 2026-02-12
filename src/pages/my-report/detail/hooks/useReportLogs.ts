import { useMemo } from 'react';

import { useQuery } from '@/hooks/useApi';
import type { ReportLogsApiResult } from '@/types/api/myreport.type';
import type { ServerApiResponse } from '@/types/api/server.type';

export const useReportLogs = (reportId?: number, viewUUID?: string | null) => {
  const queryConfig = useMemo(() => {
    if (!reportId || !viewUUID) return null;

    return {
      method: 'GET',
      url: `/reports/${reportId}/logs`,
      params: { viewUUID },
    };
  }, [reportId, viewUUID]);

  const { data, isLoading, isError, error, execute } = useQuery<
    ServerApiResponse<ReportLogsApiResult>
  >(queryConfig ?? { method: 'GET', url: '' }, {
    enabled: Boolean(queryConfig),
  });

  return {
    logs: data?.result.messages ?? [],
    isLoading,
    isError,
    error,
    refetch: execute,
  };
};
