import {
  ActionCreatorWithPayload,
  combineReducers,
  configureStore
} from '@reduxjs/toolkit';
import ingredients from './slices/ingredients';
import burgerConstructor from './slices/burger-constructor';
import order from './slices/order';
import profile from './slices/profile';
import feed from './slices/feed';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import login from './slices/login';

export const rootReducer = combineReducers({
  ingredients: ingredients.reducer,
  burgerConstructor: burgerConstructor.reducer,
  orders: order.reducer,
  profile: profile.reducer,
  feed: feed.reducer,
  login: login.reducer
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
