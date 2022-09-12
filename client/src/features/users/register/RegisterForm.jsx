import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { regiWithEmailPw } from '../../../apis/userApi';
import { Layout } from '../../../GlobalStyle';

function Register() {
  const queryClient = useQueryClient();
  const regiWithEmailPwMutation = useMutation(regiWithEmailPw, {
    onSuccess: () => {
      // 캐시 무효화하고 다시 Fetch
      queryClient.invalidateQueries('users');
    },
  });
  const navigate = useNavigate();

  const [userInfo, setuserInfo] = useState({
    email: '',
    username: '',
    password: '',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setuserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    regiWithEmailPwMutation.mutate(userInfo);

    return navigate('/');
  };

  return (
    <Layout>
      <form htmlFor="register" onSubmit={onSubmit} onChange={onChange}>
        <div>
          <label htmlFor="username">
            닉네임
            <input id="username" name="username" type="text" />
          </label>
        </div>
        <div>
          <label htmlFor="email">
            이메일 주소
            <input id="email" name="email" type="email" />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            비밀번호
            <input id="password" name="password" type="password" />
          </label>
        </div>

        <button type="submit">회원가입</button>
      </form>
    </Layout>
  );
}

export default Register;
