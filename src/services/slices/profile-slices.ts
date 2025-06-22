import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUserApi, registerUserApi, TLoginData, TRegisterData } from '@api';
import { TUser } from '@utils-types';

type TProfileState = {
  isLoading: boolean;
  refreshToken: string | null;
  accessToken: string | null;
  user: TUser | null;
};
const initialState: TProfileState = {
  isLoading: false,
  refreshToken: null,
  accessToken: null,
  user: null
};

export const register = createAsyncThunk(
  'profile/register',
  async (data: TRegisterData, thunkAPI) => {
    try {
      return await registerUserApi(data);
    } catch (error) {
      return thunkAPI.rejectWithValue('Ошибка при регистрации');
    }
  }
);

export const login = createAsyncThunk(
  'profile/login',
  async (data: TLoginData, thunkAPI) => {
    try {
      return await loginUserApi(data);
    } catch (error) {
      return thunkAPI.rejectWithValue('Ошибка при регистрации');
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  selectors: {
    selectUser: (sliceState) => sliceState.user,
    selectIsLoading: (sliceState) => sliceState.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.refreshToken = action.payload.refreshToken;
        state.accessToken = action.payload.accessToken;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.refreshToken = action.payload.refreshToken;
        state.accessToken = action.payload.accessToken;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      });
  }
});
export const { selectUser, selectIsLoading } = profileSlice.selectors;

export default profileSlice;
