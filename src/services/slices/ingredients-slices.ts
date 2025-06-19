import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';
import type { PayloadAction } from '@reduxjs/toolkit';

type TIngredientsState = {
  items: TIngredient[];
  isLoading: boolean;
};
const initialState: TIngredientsState = {
  items: [],
  isLoading: false
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchingIngredients',
  async () => {
    try {
      const response = await getIngredientsApi();
      console.log('1111', response);
      return response;
    } catch (error) {
      console.log('22226', error);
      throw error;
    }
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (sliceState) => sliceState.items,
    selectIsLoading: (sliceState) => sliceState.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.isLoading = false;
      });
  }
});
export const { selectIngredients, selectIsLoading } = ingredientsSlice.selectors

export default ingredientsSlice.reducer;
