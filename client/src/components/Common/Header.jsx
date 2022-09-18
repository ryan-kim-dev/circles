import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import Logo from '../../assets/android-chrome-512x512.png';
import { logoutUser } from '../../redux/userSlice';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = () => {
    return navigate('/register');
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    localStorage.clear();
    alert('로그아웃 되었습니다');
    return navigate('/');
  };

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
      <HeaderSignInNOutBox>
        {localStorage.loginStatus === 'true' ? (
          <>
            <FaSignOutAlt onClick={handleLogout} />
            <SignInNOutText>
              <i>Sign Out</i>
            </SignInNOutText>
          </>
        ) : (
          <>
            <FaSignInAlt onClick={handleSignIn} />
            <SignInNOutText>
              <i>Sign In</i>
            </SignInNOutText>
          </>
        )}
      </HeaderSignInNOutBox>
    </HeaderLayout>
  );
}

export default Header;

const HeaderLayout = styled.div`
  position: relative;
  top: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: center;
  font-family: 'League Gothic', sans-serif;
`;

const HeaderTitleBox = styled.div`
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

const HeaderSignInNOutBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  position: absolute;
  right: 15px;
  top: 10px;
  cursor: pointer;
`;

const SignInNOutText = styled.div`
  font-size: 16px;
`;
