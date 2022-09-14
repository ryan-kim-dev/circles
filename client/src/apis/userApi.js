import axios from 'axios';

const userApi = axios.create({
  baseURL: 'http://localhost:5000',
});

export const regiWithEmailPw = async (userInfo) => {
  const response = await userApi.post('/api/users/register', userInfo);
  return response.data;
};

export const loginWithEmailPw = async (userInfo) => {
  const response = await userApi.post('/api/users/login', userInfo);
  return response.data;
};

export const logout = async () => {
  const response = await userApi.get('/api/users/logout');
  return response.data;
};

export default userApi;
