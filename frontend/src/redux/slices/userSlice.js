// frontend/src/store/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for user login
export const loginUser = createAsyncThunk('user/loginUser', async (userData) => {
  const response = await axios.post('/api/auth/login', userData);
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    loading: false,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
