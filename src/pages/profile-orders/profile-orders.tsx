import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useAppSelector, useDispatch } from '../../services/store';
import { fetchOrders, selectOrders } from '../../services/slices/order-slice';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useAppSelector(selectOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
