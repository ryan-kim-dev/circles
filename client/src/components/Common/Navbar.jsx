import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import { logoutUser } from '../../redux/userSlice';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    const res = dispatch(logoutUser());
    console.log(res);
    return navigate('/');
  };

  const handleMypage = async () => {
    const response = await axios.get('/api/users/auth');
    console.log(response.data);
    navigate('/mypage');
  };

  return (
    <NavbarLayout>
      <NavbarBtnBox>
        <NavBtn type="button" onClick={() => navigate('/register')}>
          회원가입
        </NavBtn>
      </NavbarBtnBox>
      <NavbarBtnBox>
        <NavBtn type="button" onClick={() => navigate('/login')}>
          로그인
        </NavBtn>
      </NavbarBtnBox>
      <NavbarBtnBox>
        <NavBtn type="button" onClick={handleLogout}>
          로그아웃
        </NavBtn>
      </NavbarBtnBox>
      <NavbarBtnBox>
        <NavBtn type="button" onClick={() => navigate('/')}>
          홈
        </NavBtn>
      </NavbarBtnBox>
      <NavbarBtnBox>
        <NavBtn type="button" onClick={() => navigate('/upload')}>
          업로드
        </NavBtn>
      </NavbarBtnBox>
      <NavbarBtnBox>
        <NavBtn type="button" onClick={() => navigate('/course')}>
          드라이브코스
        </NavBtn>
      </NavbarBtnBox>
      <NavbarBtnBox>
        <NavBtn type="button" onClick={handleMypage}>
          마이페이지
        </NavBtn>
      </NavbarBtnBox>
    </NavbarLayout>
  );
}

export default Navbar;

const NavbarLayout = styled.div`
  background-color: #fff;
  width: 100vw;
  height: 3rem;
  border: 1px solid black;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavbarBtnBox = styled.div``;

const NavBtn = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
  width: 60px;
`;
