import { useMutation } from '@/hooks/useApi';
import type { ReportDetailResult } from '@/types/api/myreport.type';
import type { ServerApiResponse } from '@/types/api/server.type';

export const useCreateReport = (
  onSuccess?: (data: ReportDetailResult) => void,
) => {
  const { mutate, isLoading, isError, error } = useMutation<
    ServerApiResponse<ReportDetailResult>,
    { sessionId: number }
  >(
    ({ sessionId }) => ({
      method: 'POST',
      url: `/reports/sessions/${sessionId}`,
    }),
    {
      onSuccess: (res) => {
        onSuccess?.(res.result);
      },
    },
  );

  return {
    createReport: mutate,
    isLoading,
    isError,
    error,
  };
};
