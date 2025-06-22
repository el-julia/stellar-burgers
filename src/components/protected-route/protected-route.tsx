import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import { selectUser } from '../../services/slices/profile-slices';

interface ProtectedRouteProps {
  requireAuth?: boolean;
  children: React.ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  requireAuth,
  children
}: ProtectedRouteProps) => {
  const user = useAppSelector(selectUser);

  if (requireAuth && !user) {
    return <Navigate replace to='/login' />;
  }

  if (!requireAuth && user) {
    return <Navigate replace to='/profile' />;
  }

  return children;
};
