import { useMutation } from '@/hooks/useApi';
import type {
  AddMyRoleRequest,
  AddMyRoleResult,
} from '@/pages/my-role/types/add.type';
import type { ApiResponse } from '@/types/common/common.type';

interface Options {
  onSuccess?: () => void;
}

export const useAddMyRole = (options?: Options) => {
  return useMutation<ApiResponse<AddMyRoleResult>, AddMyRoleRequest>(
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
