import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

type TIngredientsState = {
  items: TIngredient[];
  isLoading: boolean;
}
const initialState: TIngredientsState = {
  items: [],
  isLoading: false,
}

export const fetchingIngredients = createAsyncThunk(
  'ingredients/fetchingIngredients',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);
