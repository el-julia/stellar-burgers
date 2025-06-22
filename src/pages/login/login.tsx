import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useAppSelector, useDispatch } from '../../services/store';
import {
  login,
  selectErrorMessage,
  selectIsLoading,
  selectUser
} from '../../services/slices/profile-slices';
import { Preloader } from '@ui';
import { useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const isLoading = useAppSelector(selectIsLoading);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const errorMessage = useAppSelector(selectErrorMessage);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/profile', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = (e: SyntheticEvent) => {
    let loginData = {
      email: email,
      password: password
    };
    dispatch(login(loginData));
    e.preventDefault();
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <LoginUI
      errorText={errorMessage ?? undefined}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
