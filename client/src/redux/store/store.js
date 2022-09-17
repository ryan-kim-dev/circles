import { configureStore } from '@reduxjs/toolkit';
import postSlice from '../postSlice';
import userSlice from '../userSlice';
import authSlice from '../authSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice,
    auth: authSlice,
  },
});

export default store;
