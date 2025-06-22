import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppSelector, useDispatch } from '../../services/store';
import { selectConstructorItems } from '../../services/slices/burger-constructor';
import {
  clearOrderData,
  placeOrder,
  selectOrderData,
  selectOrderRequest
} from '../../services/slices/order';

export const BurgerConstructor: FC = () => {
  const constructorItems = useAppSelector(selectConstructorItems);
  const orderRequest = useAppSelector(selectOrderRequest);
  const orderModalData = useAppSelector(selectOrderData);

  const dispatch = useDispatch();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    const ingredientsIds = [
      constructorItems.bun._id,
      constructorItems.ingredients.map((i) => i._id),
      constructorItems.bun._id
    ].flat();

    dispatch(placeOrder(ingredientsIds));
  };

  const closeOrderModal = () => {
    dispatch(clearOrderData());
  };

  const price = useMemo(() => {
    let bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
    let ingredientsPrice = constructorItems.ingredients.reduce(
      (total: number, item: TConstructorIngredient) => total + item.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [constructorItems]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
