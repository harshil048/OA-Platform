// frontend/src/store/slices/testSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching tests
export const fetchTests = createAsyncThunk('test/fetchTests', async () => {
  const response = await axios.get('/api/tests');
  return response.data;
});

const testSlice = createSlice({
  name: 'test',
  initialState: {
    tests: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTests.fulfilled, (state, action) => {
        state.loading = false;
        state.tests = action.payload;
      })
      .addCase(fetchTests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default testSlice.reducer;
