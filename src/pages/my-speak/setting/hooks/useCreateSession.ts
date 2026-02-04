import { useMutation } from '@/hooks/useApi';
import type {
  CreateSessionRequest,
  CreateSessionResult,
} from '@/types/api/myspeak.type';
import type { ServerApiResponse } from '@/types/api/server.type';

export const useCreateSession = (options?: {
  onSuccess?: (sessionId: number) => void;
  onError?: (error: string) => void;
}) => {
  return useMutation<
    ServerApiResponse<CreateSessionResult>,
    CreateSessionRequest
  >(
    (data) => ({
      method: 'POST',
      url: '/myspeak/sessions',
      data,
    }),
    {
      onSuccess: (response) => {
        options?.onSuccess?.(response.result);
      },
      onError: options?.onError,
    },
  );
};
