import { useMutation } from '@/hooks/useApi';
import type { SaveRequest } from '@/types/api/myspeak.type';
import type { ServerApiResponse } from '@/types/api/server.type';

export const useSave = (onSuccess?: () => void) => {
  const { mutate, data, isLoading, isError, error } = useMutation<
    ServerApiResponse<void>,
    SaveRequest
  >(
    ({ sessionId, userDifficulty }) => ({
      method: 'POST',
      url: `/myspeak/sessions/${sessionId}/difficulty`,
      data: {
        userDifficulty,
      },
    }),
    {
      onSuccess,
    },
  );

  return {
    save: mutate,
    data: data?.result ?? null,
    isLoading,
    isError,
    error,
  };
};
