import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  email: '',
  username: '',
  password: '',
  token: '',
  loading: false,
  error: '',
  msg: '',
};

export const signUpUser = createAsyncThunk('signupuser', async (userInfo) => {
  const res = await axios.post('/api/users/register', userInfo);
  return res.data;
});

export const loginUser = createAsyncThunk('loginuser', async (userInfo) => {
  const res = await axios.post('/api/users/login', userInfo);
  return res.data;
});

export const logoutUser = createAsyncThunk('logoutuser', async () => {
  const res = await axios.get('/api/users/logout');
  return res.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addToken: (state) => {
      state.token = localStorage.getItem('token');
    },
    addUser: (state) => {
      state.user = localStorage.getItem('user');
    },
    logout: (state) => {
      state.token = null;
      localStorage.clear();
    },
  },
  extraReducers: {
    // * 회원가입 요청에 따른 예외처리
    [signUpUser.pending]: (state) => {
      state.loading = true;
    },
    [signUpUser.fulfilled]: (state, { payload: { error, msg } }) => {
      state.loading = false;
      if (error) {
        state.error = error;
      } else {
        state.msg = msg;
      }
    },
    [signUpUser.rejected]: (state) => {
      state.loading = true;
    },
  },
  // * 로그인 요청의 응답에 따른 예외처리
  [loginUser.pending]: (state) => {
    state.loading = true;
  },
  [loginUser.fulfilled]: (state, { payload: { error, msg, token, user } }) => {
    // * 서버에서 보내는 응답에 없는 항목들이라 현재 아래 코드 동작 안함!
    state.loading = false;
    if (error) {
      state.error = error;
    } else {
      state.msg = msg;
      state.token = token;
      state.user = user;

      localStorage.setItem('msg', msg);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    }
  },
  [loginUser.rejected]: (state) => {
    state.loading = true;
  },
  // * 로그아웃 요청의 응답에 따른 예외처리
  [logoutUser.pending]: (state) => {
    state.loading = true;
  },
  [logoutUser.fulfilled]: (state, error) => {
    state.loading = false;
    if (error) {
      state.error = error;
    }
  },
  [logoutUser.rejected]: (state) => {
    state.loading = true;
  },
});

export const { addToken, addUser, logout } = userSlice.actions;

export default userSlice.reducer;
