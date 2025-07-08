import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/ingredients/ingredients';
import burgerConstructorSlice from './slices/burger-constructor/burger-constructor';
import orderSlice from './slices/order/order';
import profileSlice from './slices/profile/profile';
import feedSlice from './slices/feeds/feed';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import loginSlice from './slices/login/login';
import registerSlice from './slices/register';

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  burgerConstructor: burgerConstructorSlice.reducer,
  orders: orderSlice.reducer,
  profile: profileSlice.reducer,
  feed: feedSlice.reducer,
  login: loginSlice.reducer,
  register: registerSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
