import { useMutation } from '@/hooks/useApi';
import type { ApiResponse } from '@/types/common/common.type';
import type { DeleteRoleProfileResponse } from '@/types/role/role-profile.type';

export const useDeleteRoleProfile = () => {
  return useMutation<ApiResponse<DeleteRoleProfileResponse>, number>(
    (myRoleId) => ({
      method: 'DELETE',
      url: `/my-role/${myRoleId}`,
    }),
  );
};
