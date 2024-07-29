// frontend/src/store/slices/questionSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching questions
export const fetchQuestions = createAsyncThunk('question/fetchQuestions', async () => {
  const response = await axios.get('/api/questions');
  return response.data;
});

// Async thunk for adding a question
export const addQuestion = createAsyncThunk('question/addQuestion', async (questionData) => {
  const response = await axios.post('/api/questions', questionData);
  return response.data;
});

// Async thunk for updating a question
export const updateQuestion = createAsyncThunk('question/updateQuestion', async ({ id, questionData }) => {
  const response = await axios.put(`/api/questions/${id}`, questionData);
  return response.data;
});

// Async thunk for deleting a question
export const deleteQuestion = createAsyncThunk('question/deleteQuestion', async (id) => {
  await axios.delete(`/api/questions/${id}`);
  return id;
});

const questionSlice = createSlice({
  name: 'question',
  initialState: {
    questions: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.questions.push(action.payload);
      })
      .addCase(addQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.questions.findIndex(question => question._id === action.payload._id);
        if (index !== -1) {
          state.questions[index] = action.payload;
        }
      })
      .addCase(updateQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = state.questions.filter(question => question._id !== action.payload);
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default questionSlice.reducer;
