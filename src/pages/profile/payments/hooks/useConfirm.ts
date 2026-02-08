import { useMutation } from '@/hooks/useApi';
import type { ConfirmRequest, ConfirmResult } from '@/types/api/payments.type';
import type { ServerApiResponse } from '@/types/api/server.type';

export const useConfirm = () => {
  const { mutate, isLoading, data } = useMutation<
    ServerApiResponse<ConfirmResult>,
    ConfirmRequest
  >((body) => ({
    method: 'POST',
    url: '/subscription/confirm',
    data: body,
  }));

  return {
    confirm: mutate,
    isLoading,
    result: data?.result,
  };
};
