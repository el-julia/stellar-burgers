import { TOrder } from '@utils-types';
import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type TFeedState = {
  orders: TOrder[];
  error: string | null;
  total: number;
  totalToday: number;
};

const initialState: TFeedState = {
  orders: [],
  error: null,
  total: 0,
  totalToday: 0
};

export const fetchFeed = createAsyncThunk<{
  orders: TOrder[];
  total: number;
  totalToday: number;
}>('orders/fetchFeed', async () => await getFeedsApi());

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeed.rejected, (state) => {
        state.error = 'Ошибка загрузки ленты заказов';
      });
  }
});

export const {} = feedSlice.actions;

export const { selectOrders } = feedSlice.selectors;

export default feedSlice;
