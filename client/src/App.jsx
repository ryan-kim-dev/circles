import React from 'react';
// 함수형 컴포넌트의 jsx 리턴문에 리액트의 여러 기능을 제대로 적용하려면 명시적으로 React를 import 해주어야 한다.
// import Kakao from 'kakaojs';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Upload from './pages/Upload';
import Home from './pages/Home';
import GlobalStyle from './GlobalStyle';
import 'react-toastify/dist/ReactToastify.css';
import Course from './pages/Course';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Common/Navbar';
import Mypage from './pages/Mypage';

function App() {
  return (
    <div>
      <ToastContainer />
      <GlobalStyle />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/course" element={<Course />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Navbar />
    </div>
  );
}

export default App;
