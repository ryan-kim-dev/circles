import React from 'react';
// 함수형 컴포넌트의 jsx 리턴문에 리액트의 여러 기능을 제대로 적용하려면 명시적으로 React를 import 해주어야 한다.
import Upload from './components/Upload';
import GlobalStyle from './GlobalStyle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <ToastContainer />
      <GlobalStyle />
      <Upload />
    </div>
  );
};

export default App;
