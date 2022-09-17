import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/userSlice';

import { Layout } from '../GlobalStyle';

function LoginForm() {
  const dispatch = useDispatch();
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
    const res = await dispatch(loginUser(userInfo));
    console.log(res);
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
