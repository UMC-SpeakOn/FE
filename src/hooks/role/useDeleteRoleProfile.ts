import { useMutation } from '@/hooks/useApi';
import type { ApiResponse } from '@/types/common/common.type';

export const useDeleteRoleProfile = () => {
  return useMutation<ApiResponse<{ myRoleId: number }>, number>((id) => ({
    method: 'DELETE',
    url: `/my-role/${id}`,
  }));
};
