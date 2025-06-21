import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useAppSelector, useDispatch } from '../../services/store';
import {
  selectConstructorItems,
  setBun,
  addIngredient
} from '../../services/slices/burgerConstructor-slices';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const constructorItems = useAppSelector(selectConstructorItems);

    const dispatch = useDispatch();

    const handleAdd = () => {
      if (constructorItems.bun) {
        dispatch(setBun(constructorItems.bun));
      } else {
        dispatch(addIngredient(ingredient));
      }
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
