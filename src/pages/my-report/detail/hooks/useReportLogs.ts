import { useMemo } from 'react';

import { useQuery } from '@/hooks/useApi';
import type { ReportLogsApiResult } from '@/types/api/myreport.type';
import type { ServerApiResponse } from '@/types/api/server.type';

import { getOrCreateViewUUID } from '../utils/viewUuid';

export const useReportLogs = (reportId?: number) => {
  const queryConfig = useMemo(() => {
    if (!reportId) return null;

    const viewUUID = getOrCreateViewUUID(`report-${reportId}`);

    return {
      method: 'GET',
      url: `/reports/${reportId}/logs`,
      params: { viewUUID },
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
