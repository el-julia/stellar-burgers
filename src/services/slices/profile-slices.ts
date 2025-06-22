import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  registerUserApi,
  TLoginData,
  TRegisterData
} from '@api';
import { TUser } from '@utils-types';
import { setCookie } from '../../utils/cookie';

type TProfileState = {
  isLoading: boolean;
  user: TUser | null;
  errorMessage: string | null;
};
const initialState: TProfileState = {
  isLoading: true,
  user: null,
  errorMessage: null
};

export const register = createAsyncThunk(
  'profile/register',
  async (data: TRegisterData) => await registerUserApi(data)
);

export const login = createAsyncThunk(
  'profile/login',
  async (data: TLoginData) => await loginUserApi(data)
);

export const getUser = createAsyncThunk(
  'profile/user',
  async () => await getUserApi()
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  selectors: {
    selectUser: (sliceState) => sliceState.user,
    selectIsLoading: (sliceState) => sliceState.isLoading,
    selectErrorMessage: (sliceState) => sliceState.errorMessage
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message ?? null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message ?? null;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message ?? null;
      });
  }
});
export const { selectUser, selectIsLoading, selectErrorMessage } =
  profileSlice.selectors;

export default profileSlice;
