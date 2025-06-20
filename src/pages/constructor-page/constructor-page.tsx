import styles from './constructor-page.module.css';

import { BurgerConstructor, BurgerIngredients } from '@components';
import { Preloader } from '@ui';
import { FC, useEffect } from 'react';
import {
  fetchIngredients,
  selectIsLoading
} from '../../services/slices/ingredients-slices';
import { useAppSelector, useDispatch } from '../../services/store';

export const ConstructorPage: FC = () => {
  const dispatch = useDispatch();
  const isIngredientsLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
