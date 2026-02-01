import { useMemo } from 'react';

import { useQuery } from '@/hooks/useApi';
import type { ApiResponse } from '@/types/common/common.type';
import type { RoleProfileListResponse } from '@/types/role/role-profile.type';
import { mapRoleProfileApiToItem } from '@/types/role/role-profile.type';

export const useRoleProfile = () => {
  const queryConfig = useMemo(
    () => ({
      method: 'GET',
      url: '/my-role',
    }),
    [],
  );

  const { data, isLoading, isError, error, execute } =
    useQuery<ApiResponse<RoleProfileListResponse>>(queryConfig);

  const profiles = data?.result.roles.map(mapRoleProfileApiToItem) ?? [];

  return {
    profiles,
    totalCount: data?.result.totalCount ?? 0,
    isLoading,
    isError,
    error,
    refetch: execute,
  };
};
