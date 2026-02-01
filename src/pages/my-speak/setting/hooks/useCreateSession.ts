import { useMutation } from '@/hooks/useApi';
import type {
  CreateSessionRequest,
  CreateSessionResult,
} from '@/pages/my-speak/setting/types/setting.type';
import type { ApiResponse } from '@/types/common/common.type';

export const useCreateSession = (options?: {
  onSuccess?: (sessionId: number) => void;
  onError?: (error: string) => void;
}) => {
  return useMutation<ApiResponse<CreateSessionResult>, CreateSessionRequest>(
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
