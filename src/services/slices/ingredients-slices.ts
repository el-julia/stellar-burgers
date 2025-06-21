import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

type TIngredientsState = {
  items: TIngredient[];
  isLoading: boolean;
  selectedIngredients: TIngredient | null;
};
const initialState: TIngredientsState = {
  items: [],
  isLoading: false,
  selectedIngredients: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchingIngredients',
  async () => {
    try {
      return await getIngredientsApi();
    } catch (error) {
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
export const { selectIngredients, selectIsLoading } =
  ingredientsSlice.selectors;

export default ingredientsSlice;
