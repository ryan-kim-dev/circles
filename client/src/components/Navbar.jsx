import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Navbar() {
  const navigate = useNavigate();

  return (
    <NavbarLayout>
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
          드라이브 코스
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
  width: 100px;
`;
