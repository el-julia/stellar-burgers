import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useAppSelector, useDispatch } from '../../services/store';
import {
  login,
  selectErrorMessage,
  selectIsLoading
} from '../../services/slices/profile-slices';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const isLoading = useAppSelector(selectIsLoading);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const errorMessage = useAppSelector(selectErrorMessage);

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
