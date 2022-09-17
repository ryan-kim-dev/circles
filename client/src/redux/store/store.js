import { configureStore } from '@reduxjs/toolkit';
import postSlice from '../postSlice';
import userSlice from '../userSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice,
  },
});

export default store;
