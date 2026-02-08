import { useMutation } from '@/hooks/useApi';
import type { ServerApiResponse } from '@/types/api/server.type';

export const useDeleteRoleProfile = () => {
  return useMutation<ServerApiResponse<{ myRoleId: number }>, number>((id) => ({
    method: 'PATCH',
    url: `/my-role/${id}`,
  }));
};
