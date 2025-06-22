import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import {
  selectIsLoading,
  selectUser
} from '../../services/slices/profile-slices';
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

  if (isLoading) {
    return <Preloader />;
  }

  if (requireAuth && !user) {
    return <Navigate replace to='/login' />;
  }

  if (!requireAuth && user) {
    return <Navigate replace to='/profile' />;
  }

  return children;
};
