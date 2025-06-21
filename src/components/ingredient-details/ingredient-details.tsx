import { FC } from 'react';
import { Preloader } from '@ui';
import { IngredientDetailsUI } from '@ui';
import { useAppSelector } from '../../services/store';
import { selectIngredients } from '../../services/slices/ingredients-slices';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const { id } = useParams();

  const ingredientData = useAppSelector(selectIngredients);

  if (!ingredientData || ingredientData.length <= 0 || !id) {
    return <Preloader />;
  }

  let ingredient = ingredientData.find((ingredient) => ingredient._id == id);
  if (!ingredient) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredient} />;
};
