import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
      list-style: none;
      text-decoration: none;
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {  
        font-family: 'Noto Sans KR', sans-serif;
    }
`;

export default GlobalStyle;

export const Layout = styled.div`
  width: 100vw;
  height: max-content;
`;
