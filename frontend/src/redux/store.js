// frontend/src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import testReducer from './slices/testSlice';
import resultReducer from './slices/resultSlice';
import questionReducer from './slices/questionSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    test: testReducer,
    result: resultReducer,
    question: questionReducer,
  },
});

export default store;
