import { TIngredient } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {},
  selectors: {
    selectConstructorItems: (state) => ({
      bun: state.bun,
      ingredients: state.ingredients
    })
  }
});

export const { selectConstructorItems } = burgerConstructorSlice.selectors
export default burgerConstructorSlice.reducer;
