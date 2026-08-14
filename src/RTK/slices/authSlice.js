import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authUserApi, logoutApi } from '../../api/authApi';

export const authUser = createAsyncThunk(
  'auth/authUser',
  async (userData, thunkAPI) => {
    try {
      const data = await authUserApi(userData);
      console.log('Авторизация успешна:', data);
      return data;
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: null,
    isLoading: false,
  },
  reducers: {
    logoutUser: (state) => {
      logoutApi();
      state.user = null;
      state.error = null;
      state.isLoading = false;
      console.log('Пользователь вышел');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
