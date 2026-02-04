import { useMemo } from 'react';

import { useQuery } from '@/hooks/useApi';
import type { RoleProfileListResponse } from '@/types/api/role-profile.type';
import type { ServerApiResponse } from '@/types/api/server.type';
import { mapRoleProfileApiToItem } from '@/types/role-profile/role-profile.type';

export const useRoleProfile = () => {
  const queryConfig = useMemo(
    () => ({
      method: 'GET',
      url: '/my-role',
    }),
    [],
  );

  const { data, isLoading, isError, error, execute } =
    useQuery<ServerApiResponse<RoleProfileListResponse>>(queryConfig);

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
