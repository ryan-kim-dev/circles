import React from 'react';
import PostList from './PostList';
import * as S from './HomeStyles';

function Home() {
  return (
    <S.HomeLayout>
      <PostList />
    </S.HomeLayout>
  );
}

export default Home;
