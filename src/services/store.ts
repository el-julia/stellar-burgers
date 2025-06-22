import {
  ActionCreatorWithPayload,
  combineReducers,
  configureStore
} from '@reduxjs/toolkit';
import ingredients from './slices/ingredients-slices';
import burgerConstructor from './slices/burgerConstructor-slices';
import order from './slices/order-slice';
import profile from './slices/profile-slices';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  ingredients: ingredients.reducer,
  burgerConstructor: burgerConstructor.reducer,
  orders: order.reducer,
  profile: profile.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
