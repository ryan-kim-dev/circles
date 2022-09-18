import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import { AiOutlineHome, AiOutlinePlusCircle } from 'react-icons/ai';
import { GiHorizonRoad } from 'react-icons/gi';
import { FaUserAlt } from 'react-icons/fa';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMypage = async () => {
    const response = await axios.get('/api/users/auth');
    if (response.data.isAuth === true) return navigate('/mypage');
    alert('로그인 후 이용해주세요');
    return navigate('/');
  };

  return (
    <NavbarLayout>
      <NavbarBtnBox>
        <NavBtn type="button" onClick={() => navigate('/')}>
          <AiOutlineHome />
        </NavBtn>
      </NavbarBtnBox>
      <NavbarBtnBox>
        <NavBtn type="button" onClick={() => navigate('/upload')}>
          <AiOutlinePlusCircle />
        </NavBtn>
      </NavbarBtnBox>
      <NavbarBtnBox>
        <NavBtn type="button" onClick={() => navigate('/course')}>
          <GiHorizonRoad />
        </NavBtn>
      </NavbarBtnBox>
      {localStorage.loginStatus === 'true' && (
        <NavbarBtnBox>
          <NavBtn type="button" onClick={handleMypage}>
            <FaUserAlt />
          </NavBtn>
        </NavbarBtnBox>
      )}
    </NavbarLayout>
  );
}

export default Navbar;

const NavbarLayout = styled.div`
  background-color: #fff;
  width: 100vw;
  height: 50px;
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

  svg {
    font-size: 20px;
  }
`;
