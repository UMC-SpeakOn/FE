import { useMutation } from '@/hooks/useApi';
import type {
  AddMyRoleRequest,
  AddMyRoleResult,
} from '@/types/api/myrole.type';
import type { ServerApiResponse } from '@/types/api/server.type';

interface Options {
  onSuccess?: () => void;
}

export const useAddMyRole = (options?: Options) => {
  return useMutation<ServerApiResponse<AddMyRoleResult>, AddMyRoleRequest>(
    (body) => ({
      method: 'POST',
      url: '/my-role',
      data: body,
    }),
    {
      onSuccess: () => {
        options?.onSuccess?.();
      },
    },
  );
};
