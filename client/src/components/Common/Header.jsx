import React from 'react';
import styled from 'styled-components';

function Header() {
  return <HeaderLayout>Header</HeaderLayout>;
}

export default Header;

const HeaderLayout = styled.div`
  position: relative;
  top: 0;
  width: 100%;
  height: 50px;
  background-color: #fff;
  border: 1px solid black;
`;
