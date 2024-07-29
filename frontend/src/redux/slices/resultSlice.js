// frontend/src/store/slices/resultSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching results
export const fetchResults = createAsyncThunk('result/fetchResults', async () => {
  const response = await axios.get('/api/results');
  return response.data;
});

const resultSlice = createSlice({
  name: 'result',
  initialState: {
    results: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default resultSlice.reducer;
