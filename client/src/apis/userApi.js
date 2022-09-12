import axios from 'axios';

const userApi = axios.create({
  baseURL: 'http://localhost:5000',
});

export const regiWithEmailPw = async (userInfo) => {
  const response = await userApi.post('/api/users/register', userInfo);
  return response.data;
};

export default userApi;
