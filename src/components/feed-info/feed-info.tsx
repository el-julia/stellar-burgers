import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '@ui';
import { useAppSelector } from '../../services/store';
import {
  selectOrders,
  selectTotal,
  selectTotalToday
} from '../../services/slices/feed';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders: TOrder[] = useAppSelector(selectOrders);
  const feed = {
    total: useAppSelector(selectTotal),
    totalToday: useAppSelector(selectTotalToday)
  };

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
