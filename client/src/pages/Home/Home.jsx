import React from 'react';
import PostList from './PostList';
import * as S from './HomeStyles';
import Navbar from '../../components/Navbar/Navbar';

function Home() {
  return (
    <S.HomeLayout>
      <PostList />
      <Navbar />
    </S.HomeLayout>
  );
}

export default Home;
