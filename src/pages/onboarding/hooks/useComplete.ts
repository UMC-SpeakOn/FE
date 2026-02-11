import { useEffect } from 'react';

import { useMutation } from '@/hooks/useApi';
import type { CompleteResponse } from '@/types/api/onboarding.type';
import type { ServerApiResponse } from '@/types/api/server.type';

type UseCompleteOptions = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

export const useComplete = (options?: UseCompleteOptions) => {
  const { mutate, data, isError, error, isLoading } = useMutation<
    ServerApiResponse<CompleteResponse>,
    void
  >(() => ({
    method: 'PATCH',
    url: '/user/onboarded',
  }));

  useEffect(() => {
    if (data?.isSuccess) {
      options?.onSuccess?.();
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      options?.onError?.(error);
    }
  }, [isError, error]);

  const complete = () => {
    mutate();
  };

  return {
    complete,
    isLoading,
  };
};
