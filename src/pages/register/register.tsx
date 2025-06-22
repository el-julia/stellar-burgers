import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useAppSelector, useDispatch } from '../../services/store';
import { selectIsLoading } from '../../services/slices/profile';
import { Preloader } from '@ui';
import registerSlice, { register } from '../../services/slices/register';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const isError = useAppSelector(registerSlice.selectors.selectIsError);
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
      errorText={isError ? 'Проверьте правильность введённых данных' : ''}
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
