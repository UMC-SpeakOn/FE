import { useMutation } from '@/hooks/useApi';
import type { DeleteProfileResult } from '@/types/api/account.type';
import type { ServerApiResponse } from '@/types/api/server.type';

export const useDeleteProfile = () => {
  const { mutate, isLoading, isError, error, data } = useMutation<
    ServerApiResponse<DeleteProfileResult>,
    void
  >(() => ({
    method: 'DELETE',
    url: '/user/withdraw',
  }));

  return {
    deleteProfile: mutate,
    isLoading,
    isError,
    error,
    result: data?.result ?? null,
  };
};
