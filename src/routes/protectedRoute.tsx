import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { tokenManager } from '@/utils/apiClient';

const ProtectedRoute = () => {
  const location = useLocation();
  const isLoggedIn = tokenManager.hasTokens();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
