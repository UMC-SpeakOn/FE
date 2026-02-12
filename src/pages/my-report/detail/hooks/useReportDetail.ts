import { useMemo } from 'react';

import { useQuery } from '@/hooks/useApi';
import type { ReportDetailResult } from '@/types/api/myreport.type';
import type { ServerApiResponse } from '@/types/api/server.type';

import { getOrCreateViewUUID } from '../utils/viewUuid';

export const useReportDetail = (reportId?: number) => {
  const viewUUID = useMemo(() => {
    if (!reportId) return null;
    return getOrCreateViewUUID(`report-${reportId}`);
  }, [reportId]);

  const queryConfig = useMemo(() => {
    if (!reportId || !viewUUID) return null;

    return {
      method: 'GET',
      url: `/reports/${reportId}`,
      params: { viewUUID },
    };
  }, [reportId, viewUUID]);

  const { data, isLoading, isError, error, execute } = useQuery<
    ServerApiResponse<ReportDetailResult>
  >(queryConfig ?? { method: 'GET', url: '' }, {
    enabled: Boolean(queryConfig),
  });

  const report = useMemo<ReportDetailResult | null>(() => {
    return data?.result ?? null;
  }, [data]);

  return {
    report,
    viewUUID, // ✅ 여기서 내려줌
    isLoading,
    isError,
    error,
    refetch: execute,
  };
};
