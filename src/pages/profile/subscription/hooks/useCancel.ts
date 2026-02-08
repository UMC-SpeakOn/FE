import { useMutation } from '@/hooks/useApi';
import type { ServerApiResponse } from '@/types/api/server.type';
import type { CancelResult } from '@/types/api/subscription.type';

export const useCancel = () => {
  const { mutate, data, isLoading, isError, error } = useMutation<
    ServerApiResponse<CancelResult>,
    void
  >(() => ({
    method: 'PATCH',
    url: '/subscription/cancel',
  }));

  return {
    cancel: mutate,
    data: data?.result ?? null,
    isLoading,
    isError,
    error,
  };
};
