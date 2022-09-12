import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { loginWithEmailPw } from '../../../apis/userApi';
import { Layout } from '../../../GlobalStyle';

function LoginForm() {
  const loginWithEmailPwMutation = useMutation(loginWithEmailPw, {
    onSuccess: () => {
      // 캐시 무효화하고 다시 Fetch
      console.log('로그인 성공');
    },
  });
  const navigate = useNavigate();

  const [userInfo, setuserInfo] = useState({
    email: '',
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
    loginWithEmailPwMutation.mutate(userInfo);

    return navigate('/');
  };

  return (
    <Layout>
      <form htmlFor="register" onSubmit={onSubmit} onChange={onChange}>
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

        <button type="submit">로그인</button>
      </form>
    </Layout>
  );
}

export default LoginForm;
