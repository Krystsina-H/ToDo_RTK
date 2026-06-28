import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { token } from '../../helpers/token';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://todo-redev.onrender.com/api';
export const authUser = createAsyncThunk(
  'auth/authUser',
  async (userData, thuncAPI) => {
    try {
      const url = userData.name ? 'register' : 'login';
      const response = await fetch(`${API_BASE_URL}/auth/${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) {
        return thuncAPI.rejectWithValue(data);
      }

      return data.access_token;
    } catch (error) {
      return thuncAPI.rejectWithValue(error);
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      email: '',
      password: '',
      name: '',
    },
    errors: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authUser.fulfilled, (state, action) => {
      token.set(action.payload);
    });
    builder.addCase(authUser.rejected, (state, action) => {
      state.errors = action.payload;
    });
  },
});

export default authSlice.reducer;
