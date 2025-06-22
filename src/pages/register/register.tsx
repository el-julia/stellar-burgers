import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useAppSelector, useDispatch } from '../../services/store';
import {
  register,
  selectErrorMessage,
  selectIsLoading
} from '../../services/slices/profile';
import { Preloader } from '@ui';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const errorMessage = useAppSelector(selectErrorMessage);
  const isLoading = useAppSelector(selectIsLoading);

  const handleSubmit = (e: SyntheticEvent) => {
    let data = {
      name: userName,
      email,
      password
    };
    dispatch(register(data));
    e.preventDefault();
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <RegisterUI
      errorText={errorMessage ?? undefined}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
