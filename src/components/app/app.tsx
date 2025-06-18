import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { AppHeader, Modal, OrderInfo } from '@components';
import { Routes, Route, useLocation } from 'react-router-dom';

const App = () => (

  const location = useLocation();
  const background = location.state?.background;
  <div className={styles.app}>
    <AppHeader />
    <Routes location={background || location}>
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/profile/orders' element={<ProfileOrders />} />
      <Route path='/ingredients/:id' element={<IngredientsDetails />} />
      <Route path='/feed/:number' element={<OrderInfo />} />
      <Route path='/profile/orders/:number' element={<OrderInfo />} />
      <Route path='*' element={<NotFound404 />} />
    </Routes>
  </div>
);

export default App;
