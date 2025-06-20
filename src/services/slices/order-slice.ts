import { TOrder } from '@utils-types';
import { getOrderByNumberApi, getOrdersApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type TOrderState = {
  orders: TOrder[];
  orderData: TOrder | null;
  orderRequest: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  orders: [],
  orderData: null,
  orderRequest: false,
  error: null
};

// подгружаю список заказов
export const fetchOrders = createAsyncThunk<TOrder[]>(
  'orders/fetchOrders',
  async () => {
    const response = await getOrdersApi();
    return response;
  }
);

// подгружаем один заказ
export const fetchOrderByNumber = createAsyncThunk(
  'orders/fetchOrderByNumber',
  async (orderNumber: number) => {
    const response = await getOrderByNumberApi(orderNumber);
    return response.orders[0];
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrderData: (state, action: PayloadAction<string>) => {
      state.orderData = null;
    }
  },
  selectors: {
    selectOrders: (state) => state.orders,
    selectOrderData: (state) => state.orderData,
    selectOrderRequest: (state) => state.orderRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.orderRequest = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = 'Ошибка загрузки заказов';
      })

      .addCase(fetchOrderByNumber.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.orderData = action.payload;
        state.orderRequest = false;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = 'Ошибка загрузки заказов';
      });
  }
});

export const { clearOrderData } = orderSlice.actions;

export const { selectOrders, selectOrderData, selectOrderRequest } =
  orderSlice.selectors;

export default orderSlice.reducer;
