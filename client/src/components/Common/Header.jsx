import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../assets/android-chrome-512x512.png';

function Header() {
  const navigate = useNavigate();

  return (
    <HeaderLayout>
      <HeaderTitleBox onClick={() => navigate('/')}>
        <HeaderTitleLogoBox>
          <HeaderTitleLogoImg src={Logo} />
        </HeaderTitleLogoBox>
        <HeaderTitleText>
          <i>Lit Cars</i>
        </HeaderTitleText>
      </HeaderTitleBox>
    </HeaderLayout>
  );
}

export default Header;

const HeaderLayout = styled.div`
  position: relative;
  top: 0;
  width: 100%;
  height: 50px;
  background-color: #fff;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: center;
`;

const HeaderTitleBox = styled.div`
  font-family: 'League Gothic', sans-serif;
  width: 150px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  column-gap: 10px;
  line-height: 1;
`;

const HeaderTitleLogoBox = styled.div``;

const HeaderTitleLogoImg = styled.img`
  width: 30px;
`;

const HeaderTitleText = styled.h1``;
