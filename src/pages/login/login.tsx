import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useAppSelector, useDispatch } from '../../services/store';
import { selectIsLoading } from '../../services/slices/profile';
import { Preloader } from '@ui';
import loginSlice, { login } from '../../services/slices/login';

export const Login: FC = () => {
  const isLoading = useAppSelector(selectIsLoading);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const isError = useAppSelector(loginSlice.selectors.selectIsError);

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
      errorText={isError ? 'Неверный логин или пароль' : ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
