import React, { FC } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import { selectIsLoading, selectUser } from '../../services/slices/profile';
import { Preloader } from '@ui';

interface ProtectedRouteProps {
  requireAuth?: boolean;
  children: React.ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  requireAuth,
  children
}: ProtectedRouteProps) => {
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectIsLoading);
  const location = useLocation();

  if (isLoading) {
    return <Preloader />;
  }

  if (requireAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (!requireAuth && user) {
    if (location.state?.from) {
      return <Navigate replace to={location.state.from} />;
    }
    return <Navigate replace to='/profile' />;
  }

  return children;
};
