import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// * 의도대로 동작하지 않아서 아직 사용되지 않고있는 Slice. 공부 좀 더 해보자

const initialState = {
  posts: [],
  status: 'idle', // 상태: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const getPosts = createAsyncThunk('getposts', async () => {
  const response = await axios.get('/api/posts');
  return response.data;
});

export const addPost = createAsyncThunk('addpost', async (post) => {
  const response = await axios.post('/api/posts', post, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
});

export const updatePost = createAsyncThunk('updatepost', async (post) => {
  const response = await axios.patch(`/api/posts/${post.id}`, post);
  return response.data;
});
export const deletePost = createAsyncThunk('deletePost', async ({ id }) => {
  const response = await axios.delete(`/api/posts/${id}`, id);
  return response;
});

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
    },
  },
});
//   export const { addToken, addUser, logout } = postSlice.actions;

export default postSlice.reducer;
