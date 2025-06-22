import { TOrder } from '@utils-types';
import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async () => await getOrdersApi()
);

export const fetchOrderByNumber = createAsyncThunk(
  'orders/fetchOrderByNumber',
  async (orderNumber: number) => {
    const response = await getOrderByNumberApi(orderNumber);
    return response.orders[0];
  }
);

export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (ingredientIds: string[], thunkAPI) => {
    try {
      const response = await orderBurgerApi(ingredientIds);
      return response.order;
    } catch (err) {
      return thunkAPI.rejectWithValue('Ошибка при оформлении заказа');
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrderData: (state) => {
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
      .addCase(fetchOrders.rejected, (state) => {
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
      .addCase(fetchOrderByNumber.rejected, (state) => {
        state.orderRequest = false;
        state.error = 'Ошибка загрузки заказа';
      })
      .addCase(placeOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.orderData = action.payload;
        state.orderRequest = false;
      })
      .addCase(placeOrder.rejected, (state) => {
        state.orderRequest = false;
        state.error = 'Ошибка отправки заказа';
      });
  }
});

export const { clearOrderData } = orderSlice.actions;

export const { selectOrders, selectOrderData, selectOrderRequest } =
  orderSlice.selectors;

export default orderSlice;
