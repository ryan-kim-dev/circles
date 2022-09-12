import axios from 'axios';

const postsApi = axios.create({
  baseURL: 'http://localhost:5000',
});

export const getPosts = async () => {
  const response = await postsApi.get('/api/posts');
  return response.data;
};

export const addPost = async (post) => {
  const response = await axios.post('/api/posts', post, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const updatePost = async (post) => {
  const response = await postsApi.patch(`/api/posts/${post.id}`, post);
  return response.data;
};
export const deletePost = async ({ id }) => {
  const response = await postsApi.delete(`/api/posts/${id}`, id);
  return response;
};

export default postsApi;
