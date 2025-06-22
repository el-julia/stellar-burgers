import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUserApi, TLoginData } from '@api';

type TLoginState = {
  isError: boolean;
};
const initialState: TLoginState = {
  isError: false
};

export const login = createAsyncThunk(
  'profile/login',
  async (data: TLoginData) => await loginUserApi(data)
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  selectors: {
    selectIsError: (sliceState) => sliceState.isError
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isError = false;
      })
      .addCase(login.rejected, (state) => {
        state.isError = true;
      });
  }
});

export default loginSlice;
