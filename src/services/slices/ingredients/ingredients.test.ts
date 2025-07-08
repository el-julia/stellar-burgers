import { describe, expect, test } from '@jest/globals';
import ingredientsSlice, { fetchIngredients } from './ingredients';
import { TIngredient } from '@utils-types';

describe('ingredientsSlice reducer', () => {
  const initialState = {
    items: undefined,
    isLoading: false,
    selectedIngredients: null
  };

  test('должен обработать fetchIngredients.pending', () => {
    const nextState = ingredientsSlice.reducer(
      initialState,
      fetchIngredients.pending('', undefined)
    );
    expect(nextState.isLoading).toBe(true);
  });

  test('должен обработать fetchIngredients.fulfilled', () => {
    const mockItems: TIngredient[] = [];
    const nextState = ingredientsSlice.reducer(
      initialState,
      fetchIngredients.fulfilled(mockItems, '', undefined)
    );
    expect(nextState.items).toEqual(mockItems);
    expect(nextState.isLoading).toBe(false);
  });

  test('должен обработать fetchIngredients.rejected', () => {
    const nextState = ingredientsSlice.reducer(
      initialState,
      fetchIngredients.rejected(null, '', undefined, undefined)
    );
    expect(nextState.isLoading).toBe(false);
  });
});
